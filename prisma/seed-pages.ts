import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const pages = [
  {
    slug: "short-video",
    title: "短影音與廣告服務",
    sections: JSON.stringify([
      { key: "heroTitle", label: "頁面主標題", content: "短影音與廣告服務" },
      { key: "heroSubtitle", label: "頁面副標題", content: "用影像說故事，讓品牌被看見" },
      { key: "videoTabTitle", label: "短影音代操 - 標題", content: "短影音代操" },
      { key: "videoTabDesc", label: "短影音代操 - 說明", content: "從策略規劃到內容產出，我們幫你打造高流量短影音品牌" },
      { key: "adTabTitle", label: "廣告投放代操 - 標題", content: "廣告投放代操" },
      { key: "adTabDesc", label: "廣告投放代操 - 說明", content: "精準投放、數據優化，讓每一分廣告預算都花在刀口上" },
      { key: "ctaText", label: "行動呼籲文字", content: "立即諮詢，開始你的品牌成長之路" },
    ]),
  },
  {
    slug: "course",
    title: "影響力變現課程",
    sections: JSON.stringify([
      { key: "heroTitle", label: "頁面主標題", content: "影響力變現課程" },
      { key: "heroSubtitle", label: "頁面副標題", content: "從零開始，打造你的個人品牌影響力" },
      { key: "beginnerTitle", label: "初階實戰班 - 標題", content: "初階實戰班" },
      { key: "beginnerDesc", label: "初階實戰班 - 說明", content: "適合零基礎、想開始經營個人品牌的你" },
      { key: "advancedTitle", label: "進階陪跑班 - 標題", content: "進階陪跑班" },
      { key: "advancedDesc", label: "進階陪跑班 - 說明", content: "適合已有基礎、想規模化變現的創作者" },
      { key: "ctaText", label: "行動呼籲文字", content: "名額有限，立即報名搶先卡位" },
    ]),
  },
  {
    slug: "ai-course",
    title: "AI 影像力變現課程",
    sections: JSON.stringify([
      { key: "heroTitle", label: "頁面主標題", content: "商業級影視 AI\n技術公開 × 變現拆解" },
      { key: "heroSubtitle", label: "頁面副標題", content: "AI 影像力變現" },
      { key: "intro", label: "課程介紹", content: "這不是一堂普通課程，而是未來幾年你一定會遇到的現實。現在真正拉開差距的，不是 AI 會不會取代你，而是：誰先學會用 AI 放大自己。" },
      { key: "goal", label: "課程目標", content: "在 2027 年前，幫助 100 個人透過 AI 與自媒體實現變現。" },
      { key: "topics", label: "課程主題（每行一項）", content: "AI 怎麼做出商業級影像\nAI 怎麼降低成本、提升效率\n怎麼打造虛擬角色與內容 IP\n怎麼把創作變成可複製的收入模式" },
      { key: "schedule", label: "活動時間", content: "每月固定兩場（週四、週六）\n時間：14:00–17:30" },
      { key: "location", label: "活動地點", content: "台中市西區法院前街 17 號 4 樓" },
      { key: "price", label: "票價", content: "NT$ 1,000" },
      { key: "capacity", label: "名額限制", content: "單場限量 30 人" },
      { key: "dates", label: "可報名場次（每行一個）", content: "5/7 週四\n5/23 週六\n6/11 週四\n6/27 週六\n7/9 週四\n7/25 週六" },
      { key: "bankCode", label: "銀行代碼", content: "006（合作金庫銀行｜雲林分行）" },
      { key: "bankAccount", label: "匯款帳號", content: "5665717273711" },
      { key: "bankName", label: "匯款戶名", content: "羅威傳媒數位行銷股份有限公司" },
      { key: "lineId", label: "官方 LINE", content: "@021xhxhx" },
    ]),
  },
];

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  for (const p of pages) {
    await prisma.page.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        sections: p.sections,
      },
      create: {
        slug: p.slug,
        title: p.title,
        sections: p.sections,
      },
    });
    console.log(`Page seeded: ${p.slug}`);
  }

  await prisma.$disconnect();
}

main().catch(console.error);
