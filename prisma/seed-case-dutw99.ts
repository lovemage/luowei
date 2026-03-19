import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  await prisma.case.upsert({
    where: { slug: "dutw99" },
    update: {
      name: "雲林馬哥",
      avatarUrl: "/images/avatar-dutw99.jpg",
      category: "short-video",
      title: "社會觀察型創作者",
      bio: "大家好，我是雲林馬哥，大家都叫我老馬。來自雲林的我，骨子裡流著土地的硬頸精神，用鏡頭記錄社會百態，說出很多人想說卻不敢說的話。我相信「社會的黑，是不被理解的白」，每一件事情都有它背後的脈絡與故事，不急著下定論，而是用真誠的態度去理解、去對話。我的內容不走華麗包裝路線，就是最真實的觀點、最直白的表達，聊聊社會現象、人情冷暖，還有那些發生在你我身邊卻常被忽略的日常。從街頭巷尾的小故事到社會議題的大哉問，我都用自己的方式去詮釋，希望能讓更多人停下來思考，而不只是滑過去。\n\n上完羅威傳媒的短影音課程後，我學會了如何把想法精準地濃縮在短短幾十秒內，掌握了節奏感和剪輯技巧，讓每一支影片都更有力量。從零開始經營 TikTok，短時間內就累積了超過一萬五千名粉絲，影片總讚數突破十四萬，也在平台上建立起屬於自己的聲音與影響力。",
      stats: { followers: "15.4K", likes: "140.5K", platform: "TikTok" },
      order: 5,
    },
    create: {
      slug: "dutw99",
      name: "雲林馬哥",
      avatarUrl: "/images/avatar-dutw99.jpg",
      category: "short-video",
      title: "社會觀察型創作者",
      bio: "大家好，我是雲林馬哥，大家都叫我老馬。來自雲林的我，骨子裡流著土地的硬頸精神，用鏡頭記錄社會百態，說出很多人想說卻不敢說的話。我相信「社會的黑，是不被理解的白」，每一件事情都有它背後的脈絡與故事，不急著下定論，而是用真誠的態度去理解、去對話。我的內容不走華麗包裝路線，就是最真實的觀點、最直白的表達，聊聊社會現象、人情冷暖，還有那些發生在你我身邊卻常被忽略的日常。從街頭巷尾的小故事到社會議題的大哉問，我都用自己的方式去詮釋，希望能讓更多人停下來思考，而不只是滑過去。\n\n上完羅威傳媒的短影音課程後，我學會了如何把想法精準地濃縮在短短幾十秒內，掌握了節奏感和剪輯技巧，讓每一支影片都更有力量。從零開始經營 TikTok，短時間內就累積了超過一萬五千名粉絲，影片總讚數突破十四萬，也在平台上建立起屬於自己的聲音與影響力。",
      stats: { followers: "15.4K", likes: "140.5K", platform: "TikTok" },
      order: 5,
      visible: true,
    },
  });

  console.log("Case seeded: dutw99");
  await prisma.$disconnect();
}

main().catch(console.error);
