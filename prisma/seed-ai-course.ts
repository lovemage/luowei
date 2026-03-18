import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Upsert Page record for ai-course
  await prisma.page.upsert({
    where: { slug: "ai-course" },
    update: { title: "AI 影像力變現課程" },
    create: {
      slug: "ai-course",
      title: "AI 影像力變現課程",
      sections: JSON.stringify([
        {
          key: "hero_title",
          label: "主標題",
          value: "商業級影視 AI｜技術公開 × 變現拆解",
        },
        {
          key: "hero_subtitle",
          label: "副標題",
          value: "AI 影像力變現｜活動報名申請",
        },
        {
          key: "goal",
          label: "目標說明",
          value:
            "在 2027 年前，幫助 100 個人透過 AI 與自媒體實現變現。",
        },
        {
          key: "event_schedule",
          label: "場次時間",
          value: "每月固定兩場（週四、週六），時間：14:00–17:30",
        },
        {
          key: "event_location",
          label: "活動地點",
          value: "台中市西區法院前街 17 號 4 樓",
        },
        {
          key: "event_price",
          label: "票價",
          value: "NT$1,000 ／ 單場限量 30 人",
        },
        {
          key: "bank_code",
          label: "銀行代碼",
          value: "006（合作金庫銀行｜雲林分行）",
        },
        {
          key: "bank_account",
          label: "匯款帳號",
          value: "5665717273711",
        },
        {
          key: "bank_name",
          label: "戶名",
          value: "羅威傳媒數位行銷股份有限公司",
        },
        {
          key: "line_id",
          label: "官方 LINE ID",
          value: "@021xhxhx",
        },
      ]),
    },
  });

  console.log("ai-course page seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
