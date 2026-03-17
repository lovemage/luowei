import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Seed pages
  const pages = [
    { slug: "home", title: "首頁" },
    { slug: "short-video", title: "短影音代操" },
    { slug: "short-video-ad", title: "短影音廣告投放" },
    { slug: "course", title: "短影音課程" },
    { slug: "cases", title: "成功案例" },
  ];

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: { title: page.title },
      create: {
        slug: page.slug,
        title: page.title,
        sections: "[]",
      },
    });
  }

  // Seed FAQs for short-video
  const shortVideoFaqs = [
    {
      id: "sv-faq-0",
      question: "短影音代操適合什麼樣的人？",
      answer:
        "適合想要透過短影音建立個人品牌、吸引精準客戶的創業者、自由工作者、中小企業主。無論你是剛起步還是想要突破流量瓶頸，我們都有適合你的方案。",
    },
    {
      id: "sv-faq-1",
      question: "合作流程是怎樣的？",
      answer:
        "填寫諮詢表單 → 免費策略諮詢 → 確認方案 → 開始執行。我們會先深入了解你的產業與目標，再量身打造內容策略。",
    },
    {
      id: "sv-faq-2",
      question: "需要自己出鏡嗎？",
      answer:
        "建議出鏡以建立個人 IP，但我們也提供不露臉的內容方案。拍攝時會有專業指導，讓你自然又有魅力。",
    },
    {
      id: "sv-faq-3",
      question: "多久可以看到成效？",
      answer:
        "一般而言，持續經營 1-3 個月會開始看到明顯的流量成長與粉絲互動提升。短影音是長期投資，越早開始越有優勢。",
    },
    {
      id: "sv-faq-4",
      question: "可以中途更換方案嗎？",
      answer:
        "可以！我們的方案設計靈活，可以根據你的成長狀況隨時升級或調整。",
    },
    {
      id: "sv-faq-5",
      question: "如何開始合作？",
      answer:
        "直接填寫下方的諮詢表單，或透過 LINE 聯繫我們的小幫手，我們會在 24 小時內回覆你。",
    },
  ];

  for (let i = 0; i < shortVideoFaqs.length; i++) {
    const faq = shortVideoFaqs[i];
    await prisma.fAQ.upsert({
      where: { id: faq.id },
      update: { question: faq.question, answer: faq.answer, order: i },
      create: {
        id: faq.id,
        pageSlug: "short-video",
        question: faq.question,
        answer: faq.answer,
        order: i,
      },
    });
  }

  // Seed FAQs for short-video-ad
  const adFaqs = [
    {
      id: "ad-faq-0",
      question: "廣告投放需要多少預算才能開始？",
      answer:
        "我們建議月投放預算至少 NT$10,000 起，搭配我們的策略優化，才能有效看到數據回饋。但具體數字會依產業與目標而定。",
    },
    {
      id: "ad-faq-1",
      question: "多久可以看到廣告成效？",
      answer:
        "一般測試期需 1-2 週來找到最佳受眾組合，之後 ROAS 會持續優化。我們每日監控數據，確保預算最大化利用。",
    },
    {
      id: "ad-faq-2",
      question: "你們支援哪些廣告平台？",
      answer:
        "我們支援 Meta (Facebook/Instagram)、Google Ads、TikTok Ads 三大平台，會根據你的產品特性選擇最適合的投放組合。",
    },
    {
      id: "ad-faq-3",
      question: "合約期限是多長？",
      answer:
        "最低合作期為 3 個月，因為廣告需要時間優化與累積數據。後續可按月續約。",
    },
  ];

  for (let i = 0; i < adFaqs.length; i++) {
    const faq = adFaqs[i];
    await prisma.fAQ.upsert({
      where: { id: faq.id },
      update: { question: faq.question, answer: faq.answer, order: i },
      create: {
        id: faq.id,
        pageSlug: "short-video-ad",
        question: faq.question,
        answer: faq.answer,
        order: i,
      },
    });
  }

  // Seed FAQs for course
  const courseFaqs = [
    {
      id: "course-faq-0",
      question: "完全沒有拍片經驗可以報名嗎？",
      answer:
        "當然可以！初階實戰班就是為零基礎設計的，從拿起手機到發布影片，全程手把手帶你。",
    },
    {
      id: "course-faq-1",
      question: "初階跟進階差在哪裡？",
      answer:
        "初階教你「會做」，進階保證你「做完」。進階班包含 21 天實作陪跑、小班制指導、保證起號，適合想認真經營的人。",
    },
    {
      id: "course-faq-2",
      question: "上課地點在哪裡？",
      answer:
        "我們在雲林、台中、台南、高雄四地有據點。線下集訓在最近的據點進行，線上陪跑不限地點。",
    },
    {
      id: "course-faq-3",
      question: "學完之後還有後續支援嗎？",
      answer:
        "有！結業學員可加入專屬社群，持續獲得產業資源對接與最新趨勢更新。",
    },
    {
      id: "course-faq-4",
      question: "可以開發票嗎？",
      answer: "可以，報名確認後我們會提供電子發票。",
    },
  ];

  for (let i = 0; i < courseFaqs.length; i++) {
    const faq = courseFaqs[i];
    await prisma.fAQ.upsert({
      where: { id: faq.id },
      update: { question: faq.question, answer: faq.answer, order: i },
      create: {
        id: faq.id,
        pageSlug: "course",
        question: faq.question,
        answer: faq.answer,
        order: i,
      },
    });
  }

  console.log("Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
