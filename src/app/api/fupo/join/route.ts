import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyCaptcha } from "@/lib/captcha";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { sendAdminNotificationEmail } from "@/lib/email";
import {
  FUPO_COURSE_NAME,
  buildLineMessage,
  buildLineUrl,
} from "@/lib/fupo-line";

/** 統一成 09xxxxxxxx；使用者常會打成 +886 或帶分隔符號。 */
function normalizePhone(raw: string): string {
  const digits = raw.replace(/[^\d+]/g, "");
  if (digits.startsWith("+886")) return `0${digits.slice(4)}`;
  if (digits.startsWith("886")) return `0${digits.slice(3)}`;
  return digits;
}

const joinSchema = z.object({
  name: z.string().trim().min(1, "請填寫姓名").max(30, "姓名過長"),
  gender: z.enum(["女", "男", "其他"]),
  phone: z
    .string()
    .transform(normalizePhone)
    .refine((v) => /^09\d{8}$/.test(v), "手機號碼格式不正確"),
  lineId: z
    .string()
    .trim()
    .min(2, "請填寫 LINE ID")
    .max(40, "LINE ID 過長")
    .regex(/^[A-Za-z0-9._@-]+$/, "LINE ID 只能包含英數字與 . _ - @"),
  socialPlatform: z.enum(["IG", "FB", "Threads", "其他"]).default("IG"),
  socialLink: z.string().trim().max(200, "社群連結過長").default(""),
  captchaToken: z.string().min(1),
  captchaInput: z.string().trim().min(1, "請填寫驗證碼"),
  /** 蜜罐欄位：正常使用者看不到，填了就是機器人。 */
  website: z.string().max(0, "資料驗證失敗").default(""),
});

export async function POST(request: Request) {
  const ip = clientIp(request);

  // 寬鬆的那層擋暴力嘗試；填錯驗證碼也算，但額度給得夠一般人重試。
  if (!rateLimit(`fupo-join:attempt:${ip}`, 20, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: "嘗試次數過多，請稍後再試" },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "請求格式錯誤" }, { status: 400 });
  }

  const parsed = joinSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "資料驗證失敗" },
      { status: 400 }
    );
  }

  const data = parsed.data;

  const verdict = await verifyCaptcha(data.captchaToken, data.captchaInput);
  if (verdict !== "ok") {
    const message =
      verdict === "expired"
        ? "驗證碼已過期，請換一張重新輸入"
        : verdict === "too-fast"
          ? "送出速度異常，請稍候再試一次"
          : "驗證碼錯誤，請再試一次";
    // field 讓前端知道要換圖並把游標移回驗證碼欄
    return NextResponse.json({ error: message, field: "captcha" }, { status: 400 });
  }

  // 嚴格的那層只算真的寫進資料庫的次數，避免同一人洗版
  if (!rateLimit(`fupo-join:success:${ip}`, 5, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: "送出次數過多，請稍後再試" },
      { status: 429 }
    );
  }

  const socialLink = data.socialLink;
  const messageLines = [`【性別】${data.gender}`];
  if (socialLink) messageLines.push(`【${data.socialPlatform}】${socialLink}`);

  try {
    await prisma.registration.create({
      data: {
        name: data.name,
        phone: data.phone,
        lineId: data.lineId,
        email: "",
        courseName: FUPO_COURSE_NAME,
        message: messageLines.join("\n"),
      },
    });
  } catch (error) {
    console.error("Failed to save fupo registration:", error);
    return NextResponse.json({ error: "伺服器錯誤，請稍後再試" }, { status: 500 });
  }

  // 通知信不擋回應：寄不出去也不該讓使用者以為報名失敗
  prisma.siteSettings
    .findUnique({ where: { id: "singleton" } })
    .then((settings) => {
      if (!settings?.adminEmail) return;
      return sendAdminNotificationEmail(settings.adminEmail, {
        name: data.name,
        phone: data.phone,
        lineId: data.lineId,
        courseName: FUPO_COURSE_NAME,
        message: messageLines.join("\n"),
      });
    })
    .catch((err) => console.error("Failed to send admin notification:", err));

  const lineMessage = buildLineMessage({
    name: data.name,
    gender: data.gender,
    phone: data.phone,
    lineId: data.lineId,
    socialPlatform: data.socialPlatform,
    socialLink,
  });
  const { url, prefilled } = buildLineUrl(lineMessage);

  return NextResponse.json({ lineUrl: url, lineMessage, prefilled }, { status: 201 });
}
