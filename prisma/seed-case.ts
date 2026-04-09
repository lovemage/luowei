import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  await prisma.case.upsert({
    where: { slug: "dr-frankshen" },
    update: {},
    create: {
      slug: "dr-frankshen",
      name: "沈耿仲醫師",
      avatarUrl: "/images/avatar-dr-frankshen.jpg",
      category: "short-video",
      title: "耳鼻喉科醫師",
      bio: "在與羅威傳媒合作之前，我的診所主要靠口碑和傳統廣告獲客，新病患成長速度一直很平穩但缺乏突破。\n\n接受羅威傳媒的短影音代操方案後，團隊為我量身打造了醫學科普類的短影音內容策略——用輕鬆有趣的方式拆解鼻塞成因、手術實錄、日常保健知識。我只需要在診間配合拍攝，其他從腳本、剪輯到發布全部交給羅威。\n\n合作半年的成果非常驚人：TikTok 帳號從零成長到 12,800 粉絲，影片總讚數突破 13 萬。更重要的是，每個月透過 TikTok 私訊和官方 LINE 的新患諮詢量增加了 40% 以上，其中不少是從外縣市慕名而來的患者。短影音讓我的專業被更多人看見，也為診所帶來了實實在在的業績成長。",
      stats: {
        followers: "12.8K",
        likes: "132.6K",
        platform: "TikTok",
      },
      order: 1,
      visible: true,
    },
  });

  console.log("Case seeded: dr-frankshen");
  await prisma.$disconnect();
}

main().catch(console.error);
