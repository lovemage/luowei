import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const DEFAULT_CONFIGS: Record<string, unknown> = {
  "short-video": {
    title: "立即諮詢",
    submitText: "送出諮詢",
    successTitle: "感謝您的諮詢",
    successDesc: "我們會盡快與您聯繫",
    fields: [
      { key: "name", label: "姓名", type: "text", placeholder: "姓名", required: true },
      { key: "phone", label: "電話", type: "tel", placeholder: "電話", required: true },
      { key: "lineId", label: "LINE ID", type: "text", placeholder: "LINE ID", required: false },
      { key: "email", label: "Email", type: "email", placeholder: "Email", required: false },
      { key: "courseName", label: "方案選擇", type: "select", placeholder: "選擇感興趣的方案", required: false, options: ["品牌啟航方案", "流量爆發方案", "行業壟斷方案"] },
      { key: "message", label: "留言", type: "textarea", placeholder: "留言", required: false },
    ],
  },
  "course": {
    title: "立即報名",
    submitText: "送出報名",
    successTitle: "感謝您的報名",
    successDesc: "我們會盡快與您聯繫",
    fields: [
      { key: "name", label: "姓名", type: "text", placeholder: "姓名", required: true },
      { key: "phone", label: "電話", type: "tel", placeholder: "電話", required: true },
      { key: "lineId", label: "LINE ID", type: "text", placeholder: "LINE ID", required: false },
      { key: "email", label: "Email", type: "email", placeholder: "Email", required: false },
      { key: "courseName", label: "課程選擇", type: "select", placeholder: "選擇感興趣的課程", required: false, options: ["初階實戰班", "進階陪跑班"] },
      { key: "message", label: "留言", type: "textarea", placeholder: "留言", required: false },
    ],
  },
  "ai-course": {
    title: "活動報名",
    submitText: "送出報名",
    successTitle: "感謝您的報名",
    successDesc: "請依照付款資訊完成匯款，我們確認後會邀請您加入活動群組",
    fields: [
      { key: "courseName", label: "報名場次", type: "select", placeholder: "選擇報名場次", required: true, options: ["5/7 週四", "5/23 週六", "6/11 週四", "6/27 週六", "7/9 週四", "7/25 週六"] },
      { key: "name", label: "姓名", type: "text", placeholder: "姓名", required: true },
      { key: "phone", label: "聯絡電話", type: "tel", placeholder: "聯絡電話", required: true },
      { key: "lineId", label: "LINE ID", type: "text", placeholder: "LINE ID", required: false },
      { key: "message", label: "留言", type: "textarea", placeholder: "其他想說的話", required: false },
    ],
  },
};

export async function GET() {
  const page = await prisma.page.findUnique({ where: { slug: "registration-form" } });
  if (!page) return NextResponse.json(DEFAULT_CONFIGS);
  try {
    const raw = typeof page.sections === "string" ? JSON.parse(page.sections) : page.sections;
    // If old format (has "fields" directly), wrap as default
    if (raw && raw.fields) {
      return NextResponse.json({ ...DEFAULT_CONFIGS, default: raw });
    }
    // Merge with defaults so all pages always have config
    return NextResponse.json({ ...DEFAULT_CONFIGS, ...raw });
  } catch {
    return NextResponse.json(DEFAULT_CONFIGS);
  }
}

export async function PUT(request: Request) {
  const body = await request.json();
  const page = await prisma.page.upsert({
    where: { slug: "registration-form" },
    update: { sections: JSON.stringify(body) },
    create: { slug: "registration-form", title: "報名表單設定", sections: JSON.stringify(body) },
  });
  return NextResponse.json(page);
}
