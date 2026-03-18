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
      bio: "大家好，我是沈耿仲醫師，一位擁有完整耳鼻喉科訓練背景的專科醫師。在臨床工作中，我始終秉持著「效率找到問題，提出精準治療」的理念，致力於為每一位患者提供最適切的醫療方案。\n\n我的專業領域涵蓋耳、鼻、喉三大範疇，其中尤其專精於鼻部疾病的診斷與治療。從常見的鼻塞、過敏性鼻炎，到需要手術介入的鼻中隔彎曲、下鼻甲肥大等問題，我都累積了豐富的臨床經驗。在手術方面，我擅長以微創技術進行鼻塞手術，相較於傳統手術方式，微創手術具有傷口小、恢復快、術後不適感低等優勢，能讓患者以更舒適的方式重新找回順暢的呼吸。\n\n除了功能性的鼻部治療，我也提供鼻整形的專業服務。我相信鼻子不僅關乎呼吸功能，也影響著一個人的外在自信。因此，我強調「從內而外」的全方位調整理念——先確保鼻腔結構的健康與功能，再兼顧外觀上的美感需求，為每位患者量身打造客製化的治療計畫。\n\n在耳科方面，我也處理包括耳朵疼痛、聽力問題、小耳症等各類疾病，同時關注日常生活中容易被忽略的耳部保健知識，例如正確的耳朵清潔方式、搭飛機時的耳壓調節技巧等。在喉部領域，我對於咳嗽診斷、喉結相關問題、胃酸逆流引起的咽喉不適等，也能提供專業的評估與建議。\n\n工作之餘，我積極透過社群媒體進行醫學科普，在 TikTok 上以輕鬆有趣的方式分享耳鼻喉科的專業知識，內容涵蓋鼻塞成因、手術過程實錄、日常保健小知識等，希望讓更多人在娛樂中學習正確的健康觀念。目前已累積超過一萬兩千名粉絲的支持，影片總獲讚數突破十三萬，這些數字背後代表的是每一位觀眾對健康知識的重視，也是驅動我持續創作的動力。\n\n如果您有任何耳鼻喉相關的困擾，歡迎透過官方 Line 預約諮詢，讓我陪您一起找到最適合的解決方案。",
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
