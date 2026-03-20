import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const DEFAULT_CONFIG = {
  fields: [],
  title: "立即報名",
  submitText: "送出報名",
  successTitle: "感謝您的報名",
  successDesc: "我們會盡快與您聯繫",
};

const DEFAULT_CONFIGS: Record<string, unknown> = {
  "second-income": {
    title: "合作申請表",
    submitText: "送出申請",
    successTitle: "感謝你的申請",
    successDesc: "我會先閱讀你的資料，如果背景與方向適合，才會安排進一步交流。請私訊 IG：lw__wel 告知「我填表了」。",
    fields: [
      { key: "name", label: "請問怎麼稱呼你？", type: "text", placeholder: "你的名字", required: true },
      { key: "ig", label: "你的 IG 或社群帳號", type: "text", placeholder: "IG 或社群帳號", required: true },
      { key: "city", label: "目前居住城市", type: "text", placeholder: "居住城市", required: true },
      { key: "job", label: "目前主要工作", type: "text", placeholder: "主要工作", required: true },
      { key: "income", label: "目前每月收入區間", type: "radio", placeholder: "", required: true, options: ["3萬以下", "3–5萬", "5–8萬", "8–12萬", "12萬以上"] },
      { key: "experience", label: "過去是否有創業或副業經驗？", type: "radio", placeholder: "", required: true, options: ["沒有", "嘗試過", "目前有副業", "曾創業"] },
      { key: "whySecondIncome", label: "為什麼你想建立第二收入？", type: "textarea", placeholder: "開放回答", required: true },
      { key: "weeklyTime", label: "每週大約可以投入多少時間？", type: "radio", placeholder: "", required: true, options: ["0–2小時", "3–5小時", "5–10小時", "10小時以上"] },
      { key: "currentState", label: "你現在的狀態比較接近哪一種？", type: "radio", placeholder: "", required: true, options: ["只是想了解看看", "正在尋找機會", "準備開始行動", "已經決定要改變收入"] },
      { key: "whySuitable", label: "為什麼你覺得自己適合參與這個計畫？", type: "textarea", placeholder: "開放回答", required: true },
    ],
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageSlug = searchParams.get("page") || "default";

  const page = await prisma.page.findUnique({ where: { slug: "registration-form" } });
  if (!page) return NextResponse.json(DEFAULT_CONFIGS[pageSlug] || DEFAULT_CONFIG);
  try {
    const allConfigs = typeof page.sections === "string" ? JSON.parse(page.sections) : page.sections;
    // Support old single-config format (has "fields" key directly)
    if (allConfigs && allConfigs.fields) {
      return NextResponse.json(allConfigs);
    }
    // New multi-page format — check DB first, then built-in defaults
    const config = allConfigs?.[pageSlug] || DEFAULT_CONFIGS[pageSlug] || allConfigs?.["default"] || DEFAULT_CONFIG;
    return NextResponse.json(config);
  } catch {
    return NextResponse.json(DEFAULT_CONFIGS[pageSlug] || DEFAULT_CONFIG);
  }
}
