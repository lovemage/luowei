import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  await prisma.case.upsert({
    where: { slug: "dutw99" },
    update: {
      name: "雲林馬哥",
      avatarUrl: "/avator/cf3ad9295073bb0727d400ea8e6409c2~tplv-tiktokx-cropcenter_1080_1080.jpeg",
      category: "short-video",
      title: "社會觀察型創作者",
      bio: "我是雲林在地的社會觀察型創作者，一直想透過短影音傳遞自己的觀點，但不知道怎麼把想法變成有人看的內容。\n\n交給羅威傳媒代操後，團隊幫我找到了「社會觀察」這個精準定位，從腳本架構到剪輯節奏都經過專業規劃。每一支影片都能在短短幾十秒內精準傳遞觀點，讓觀眾停下來思考而不只是滑過去。\n\n合作成果：從零開始的 TikTok 帳號，短時間內累積 15,400 粉絲，影片總讚數突破 14 萬。更重要的是，透過短影音建立起來的個人影響力，開始有品牌主動找上門洽談合作，也為我在地方上建立了更強的話語權和知名度。",
      stats: { followers: "15.4K", likes: "140.5K", platform: "TikTok" },
      order: 5,
    },
    create: {
      slug: "dutw99",
      name: "雲林馬哥",
      avatarUrl: "/avator/cf3ad9295073bb0727d400ea8e6409c2~tplv-tiktokx-cropcenter_1080_1080.jpeg",
      category: "short-video",
      title: "社會觀察型創作者",
      bio: "我是雲林在地的社會觀察型創作者，一直想透過短影音傳遞自己的觀點，但不知道怎麼把想法變成有人看的內容。\n\n交給羅威傳媒代操後，團隊幫我找到了「社會觀察」這個精準定位，從腳本架構到剪輯節奏都經過專業規劃。每一支影片都能在短短幾十秒內精準傳遞觀點，讓觀眾停下來思考而不只是滑過去。\n\n合作成果：從零開始的 TikTok 帳號，短時間內累積 15,400 粉絲，影片總讚數突破 14 萬。更重要的是，透過短影音建立起來的個人影響力，開始有品牌主動找上門洽談合作，也為我在地方上建立了更強的話語權和知名度。",
      stats: { followers: "15.4K", likes: "140.5K", platform: "TikTok" },
      order: 5,
      visible: true,
    },
  });

  console.log("Case seeded: dutw99");
  await prisma.$disconnect();
}

main().catch(console.error);
