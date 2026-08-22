import { NextResponse } from "next/server";
import { issueCaptcha } from "@/lib/captcha";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!rateLimit(`captcha:${clientIp(request)}`, 40, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "請求過於頻繁，請稍後再試" }, { status: 429 });
  }

  const captcha = await issueCaptcha();
  return NextResponse.json(captcha, { headers: { "Cache-Control": "no-store" } });
}
