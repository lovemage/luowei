import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  await prisma.case.upsert({
    where: { slug: "groupbuying-ihome" },
    update: {
      name: "愛嘉行銷",
      avatarUrl: "/images/avatar-groupbuying.png",
      category: "short-video",
      title: "B2B B2C 大型團購倉儲",
      bio: "我們是一間擁有 1500 坪倉儲的 B2B/B2C 進口商，過去主要靠線下通路和老客戶轉介做生意，線上曝光幾乎為零。\n\n與羅威傳媒合作代操短影音後，團隊為我們規劃了「倉儲開箱 + 團購好物推薦」的內容策略，把枯燥的批發生意變成有趣的影片。每支影片都由專業團隊操刀，從選品介紹、開箱實測到限時優惠，完整串接導購流程。\n\n合作成果：TikTok 帳號快速建立品牌知名度，VIP 會員月月開團的參與度提升超過 60%，來自社群的新客詢問量翻倍成長。最明顯的改變是，以前要主動跑業務才有訂單，現在客戶看到影片就直接來電下單，省下大量業務開發時間。",
      stats: { warehouse: "1500坪", vip: "月月開團", type: "進口商" },
      order: 10,
    },
    create: {
      slug: "groupbuying-ihome",
      name: "愛嘉行銷",
      avatarUrl: "/images/avatar-groupbuying.png",
      category: "short-video",
      title: "B2B B2C 大型團購倉儲",
      bio: "我們是一間擁有 1500 坪倉儲的 B2B/B2C 進口商，過去主要靠線下通路和老客戶轉介做生意，線上曝光幾乎為零。\n\n與羅威傳媒合作代操短影音後，團隊為我們規劃了「倉儲開箱 + 團購好物推薦」的內容策略，把枯燥的批發生意變成有趣的影片。每支影片都由專業團隊操刀，從選品介紹、開箱實測到限時優惠，完整串接導購流程。\n\n合作成果：TikTok 帳號快速建立品牌知名度，VIP 會員月月開團的參與度提升超過 60%，來自社群的新客詢問量翻倍成長。最明顯的改變是，以前要主動跑業務才有訂單，現在客戶看到影片就直接來電下單，省下大量業務開發時間。",
      stats: { warehouse: "1500坪", vip: "月月開團", type: "進口商" },
      order: 10,
      visible: true,
    },
  });

  console.log("Case seeded: groupbuying-ihome");
  await prisma.$disconnect();
}

main().catch(console.error);
