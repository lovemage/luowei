import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const pages = [
  {
    slug: "short-video",
    title: "短影音與廣告服務",
    sections: JSON.stringify([
      // ── Hero ──
      { key: "heroTitle", label: "頁面主標題", content: "短影音與廣告服務" },
      { key: "heroSubtitle", label: "頁面副標題", content: "全方位短影音品牌代操 + 精準廣告投放" },

      // ── Video Tab ──
      { key: "videoTabLabel", label: "短影音 Tab 名稱", content: "短影音代操" },
      {
        key: "videoPainPointsTitle",
        label: "短影音 - 痛點標題",
        content: "你是否也面臨這些困境？",
      },
      {
        key: "videoPainPoints",
        label: "短影音 - 痛點列表（每行一項）",
        content:
          "空有產品卻沒流量 -- 廣告費越來越貴，投報率卻直線下滑\n想做影音卻沒方向 -- 拍了幾支片卻沒人看，完全不知道演算法要什麼\n團隊人力成本太高 -- 找企劃、攝影、剪輯、營運，每月薪資支出驚人\n有流量卻無法變現 -- 讚數很多，但私訊詢問度卻是零",
      },
      {
        key: "videoPhases",
        label: "短影音 - 四大執行階段（編號|標題|說明|細節用;分隔，每階段一行）",
        content:
          "01|基礎紮根 -- 數據驅動的品牌成長系統|演算法破解 + 高頻產出|深度拆解平台演算法，掌握流量密碼;建立高頻內容產出機制，持續累積品牌聲量;透過數據回饋，快速迭代內容方向\n02|靈魂定位 -- 人設設定|打造不可取代的品牌人格|視覺符號 -- 建立一眼可辨識的品牌視覺體系;語言風格 -- 形成獨特的表達方式與口頭禪;專家權威 -- 透過專業內容建立行業話語權;價值觀輸出 -- 讓受眾認同你的理念，產生深度連結\n03|模組化執行 -- 4 步驟高效產出|從策略到成品，全流程標準化|策略會議 -- 確認月度主題與內容方向;腳本開發 -- 撰寫符合演算法邏輯的爆款腳本;高效拍攝 -- 一次拍攝多支素材，最大化效率;後製精修 -- 節奏、字幕、音效全方位打磨\n04|目標產值 -- 數據指標|用數字衡量成果|流量 100k+ -- 單月曝光突破十萬;互動率 200% -- 留言、分享、收藏全面提升;品牌聯想 -- 讓受眾提到品類就想到你;流量變現 -- 將觀看轉化為實際營收",
      },
      {
        key: "videoComparisonTitle",
        label: "短影音 - 比較表標題",
        content: "為什麼選擇專業代操？",
      },
      {
        key: "videoComparison",
        label: "短影音 - 比較表（項目|自己做|交給我們，每行一項）",
        content:
          "內容品質|缺乏專業，品質不穩定|專業團隊，品質保證\n時間成本|每天花 3-5 小時|只需 1 次策略會議/月\n演算法|靠感覺猜測|數據驅動，精準破解\n產出量|一個月 2-4 支|一個月 12-20 支\n變現能力|不知如何導流|完整流量變現閉環",
      },
      {
        key: "videoWhyChooseUs",
        label: "短影音 - 為什麼選擇我們（編號|標題|說明，每行一項）",
        content:
          "01|AI 技術賦能|使用最新 AI 工具優化文案與素材處理，效率翻倍\n02|轉換思維導向|每支影片的目標都是「轉換」，不只是好看\n03|生態整合服務|影片 + Landing Page + 自動化客服，一站式整合",
      },
      {
        key: "videoCourseOptions",
        label: "短影音 - 報名方案選項（每行一項）",
        content: "品牌啟航方案\n流量爆發方案\n行業壟斷方案",
      },
      {
        key: "videoCtaText",
        label: "短影音 - CTA 文字",
        content: "名額有限，每月僅接 3 位深度合作客戶",
      },
      {
        key: "videoCtaButton",
        label: "短影音 - CTA 按鈕文字",
        content: "立即透過 LINE 諮詢",
      },

      // ── Ad Tab ──
      { key: "adTabLabel", label: "廣告投放 Tab 名稱", content: "廣告投放代操" },
      {
        key: "adPainPointsTitle",
        label: "廣告 - 痛點標題",
        content: "你也正在為了這些數字頭痛嗎？",
      },
      {
        key: "adPainPoints",
        label: "廣告 - 痛點列表（每行一項）",
        content:
          "廣告費越來越貴 -- 點擊次數不少，但真正下單的沒幾個\n後台數據看不懂 -- ROAS、像素、轉換率，一堆術語讓人頭大\n受眾抓不準 -- 廣告總是投給不對的人，白白燒掉血汗錢",
      },
      {
        key: "adServiceHighlights",
        label: "廣告 - 核心優勢（編號|標題|說明，每行一項）",
        content:
          "01|全平台策略佈局|Meta (FB/IG)、Google、TikTok 之間建立最強流量閉環\n02|AI 驅動受眾精準定位|比競爭對手更早挖掘高潛力「準客戶」\n03|文案與素材雙重夾擊|前 3 秒留住用戶，直擊痛點引導轉換",
      },
      {
        key: "adTimeline",
        label: "廣告 - 合作三部曲（編號|標題|說明|成果，每行一項）",
        content:
          "01|深度診斷|分析帳號體質與競爭對手|一份清晰的流量獲取策略\n02|動態優化|每日監控數據，調整出價與受眾|預算最大化利用\n03|定期彙報|每月數據回顧與下階段建議|掌控全局，規模化成長",
      },
      {
        key: "adComparisonTitle",
        label: "廣告 - 比較表標題",
        content: "專業代操的差異",
      },
      {
        key: "adComparison",
        label: "廣告 - 比較表（項目|自己投廣告|專業代操，每行一項）",
        content:
          "策略|按加強推廣碰運氣|全平台策略佈局\n受眾|廣泛投放，浪費預算|AI 精準定位準客戶\n優化|投完就放著|每日監控動態調整\n數據|看不懂後台|透明化報表，清楚每分錢\n成效|不確定 ROAS|目標導向，持續提升",
      },
      {
        key: "adDashboardMetrics",
        label: "廣告 - 數據指標（標籤|數值，每行一項）",
        content: "ROAS 目標|5x+\n月觸及人數|100K+\n轉換成本降低|40%",
      },
      {
        key: "adCtaText",
        label: "廣告 - CTA 文字",
        content: "廣告投放不需要豪賭，只需要專業的引路人",
      },
      {
        key: "adCtaButton",
        label: "廣告 - CTA 按鈕文字",
        content: "預約免費廣告診斷",
      },
    ]),
  },
  {
    slug: "course",
    title: "影響力變現課程",
    sections: JSON.stringify([
      // ── Hero ──
      { key: "heroTitle", label: "頁面主標題", content: "影響力變現課程" },
      { key: "heroSubtitle", label: "頁面副標題", content: "用短影音翻轉人生，從零基礎到商業變現" },

      // ── Beginner Tab ──
      { key: "beginnerTabLabel", label: "初階 Tab 名稱", content: "初階實戰班" },
      {
        key: "beginnerPainPointsTitle",
        label: "初階 - 痛點標題",
        content: "為什麼你很努力，卻還是做不起來？",
      },
      {
        key: "beginnerPainPoints",
        label: "初階 - 痛點列表（每行一項）",
        content:
          "腦袋空白 -- 看了幾百部教學，拿起手機腦袋依然一片空白\n流量黑洞 -- 影片發了幾十支都沒人看，不知道問題在哪\n放棄邊緣 -- 覺得剪輯好難、想腳本好累，最後說「我不適合」",
      },
      {
        key: "beginnerConcepts",
        label: "初階 - 觀念導正（標題|說明，每行一項）",
        content:
          "信任 = 資產|流量不等於現金，建立信任才是真正的資產\n追求精準客戶|不要盲目追求百萬觀看，你要的是精準客戶\n工業化流程|做自媒體不是藝術創作，是一套標準化流程",
      },
      {
        key: "beginnerCoreModules",
        label: "初階 - 四大核心模組（模組名|標題|要點用;分隔，每模組一行）",
        content:
          "核心一|底層邏輯與演算法真相|影片 50 秒維持 40% 續存率即可破百萬;黃金前 3 秒法則;MVP 測試法\n核心二|流量密碼與腳本工程|成本思維;HVA 結構 (Hook + Value + Action)\n核心三|工業化產出與 AI 賦能|一支手機打天下;CapCut 高效 SOP + AI 剪輯\n核心四|多元變現與終極護城河|直播信任變現、電商團購、業配代言",
      },
      {
        key: "beginnerComparison",
        label: "初階 - 比較表（項目|自學|加入實戰班，每行一項）",
        content:
          "學習方式|YouTube 拼湊|系統化實戰教學\n執行力|三分鐘熱度|團隊督促，保證產出\n變現|不知道怎麼賺錢|提供驗證過的變現項目\n人脈|獨自奮鬥|加入創業者社群",
      },
      {
        key: "beginnerSuccessCases",
        label: "初階 - 成功案例（姓名|成果|說明，每行一項）",
        content:
          "沈耿仲醫師|17.3 萬觀看|門診排滿半年\nVivian|179 萬流量|轉化超過 200 位客戶\n雲林馬哥|半年破千萬|銷售成長 80%\n車業吳彥祖|月成交 100+|",
      },
      {
        key: "beginnerPricing",
        label: "初階 - 價格資訊",
        content: "原價: NT$ 6,000\n快閃體驗價: NT$ 1,000",
      },

      // ── Advanced Tab ──
      { key: "advancedTabLabel", label: "進階 Tab 名稱", content: "進階陪跑班" },
      {
        key: "advancedPainPointsTitle",
        label: "進階 - 痛點標題",
        content: "學了，但做不出來？",
      },
      {
        key: "advancedPainPoints",
        label: "進階 - 痛點列表（每行一項）",
        content:
          "學完回家就忘了 -- 沒有持續練習，技能無法內化\n撐不下去 -- 人性惰性讓你三天打魚兩天曬網",
      },
      {
        key: "advancedTrainingTimeline",
        label: "進階 - 21天訓練結構（編號|標題|說明，每行一項）",
        content:
          "01|線下 3 天集訓|解決「不敢拍」「不會拍」的執行障礙\n02|線上 18 天陪跑|專業團隊全程盯進度，解決「撐不下去」的惰性",
      },
      {
        key: "advancedGraduationResults",
        label: "進階 - 結營產值（標題|說明，每行一項）",
        content:
          "運作中的帳號|具備人設定位、正常營運的自媒體帳號\n12-24 支影片庫存|可直接發布的高品質影片\n全流程獨立能力|選題到發布皆能獨立完成\n吸睛鉤子技術|精通「前 3 秒不被滑掉」的開場技術",
      },
      {
        key: "advancedMonetization",
        label: "進階 - 變現加速與專業背書",
        content:
          "結業學員可獲得由四大合作公司提供的專業背書與變現資源：雲林「羅威傳播」、台南「共好新創」、高雄「非常有趣新媒體」、台中「光言工作室」。",
      },
      {
        key: "advancedComparison",
        label: "進階 - 比較表（項目|初階班|進階陪跑班，每行一項）",
        content:
          "時長|單日課程|21 天完整訓練\n形式|知識傳授|實作 + 陪跑\n產出|學會概念|保證起號 + 影片庫存\n價格|NT$ 1,000|NT$ 6,000",
      },
      {
        key: "advancedPricing",
        label: "進階 - 價格資訊",
        content: "原價: NT$ 19,800\n體驗價: NT$ 6,000",
      },

      // ── Shared ──
      {
        key: "courseOptions",
        label: "報名表課程選項（每行一項）",
        content: "初階實戰班\n進階陪跑班",
      },
    ]),
  },
  {
    slug: "ai-course",
    title: "AI 影像力變現課程",
    sections: JSON.stringify([
      // ── Hero ──
      { key: "heroTitle", label: "頁面主標題", content: "商業級影視 AI\n技術公開 × 變現拆解" },
      { key: "heroSubtitle", label: "頁面副標題", content: "AI 影像力變現" },
      { key: "heroExtra", label: "Hero 附加文字", content: "活動報名申請" },

      // ── Introduction ──
      {
        key: "introTitle",
        label: "介紹區標題",
        content: "為什麼你現在必須了解這件事",
      },
      {
        key: "introSellingPoints",
        label: "介紹 - 核心觀點（每行一項）",
        content:
          "這不是一堂普通課程，而是未來幾年你一定會遇到的現實。\n現在真正拉開差距的，不是 AI 會不會取代你，而是：誰先學會用 AI 放大自己。\n有人還在研究工具，有人已經開始用 AI：接案、賺錢、打造品牌。\n透過 AI × 短影音 × 自媒體，打造個人影響力，把影響力轉換成收入。",
      },
      {
        key: "introGoal",
        label: "介紹 - 目標",
        content: "在 2027 年前，幫助 100 個人透過 AI 與自媒體實現變現。",
      },

      // ── Course Topics ──
      {
        key: "topicsTitle",
        label: "課程主題標題",
        content: "課程主題",
      },
      {
        key: "topics",
        label: "課程主題（每行一項）",
        content:
          "AI 怎麼做出商業級影像\nAI 怎麼降低成本、提升效率\n怎麼打造虛擬角色與內容 IP\n怎麼把創作變成可複製的收入模式",
      },
      {
        key: "topicsFootnote",
        label: "課程主題備註",
        content: "不需要 AI 基礎，現場示範，看得懂就能用",
      },

      // ── Event Info ──
      {
        key: "schedule",
        label: "活動時間",
        content: "每月固定兩場（週四、週六）\n時間：14:00–17:30",
      },
      {
        key: "location",
        label: "活動地點",
        content: "台中市西區法院前街 17 號 4 樓",
      },
      {
        key: "price",
        label: "票價",
        content: "NT$ 1,000",
      },
      {
        key: "capacity",
        label: "名額限制",
        content: "單場限量 30 人",
      },

      // ── Registration ──
      {
        key: "dates",
        label: "可報名場次（每行一個）",
        content: "5/7 週四\n5/23 週六\n6/11 週四\n6/27 週六\n7/9 週四\n7/25 週六",
      },

      // ── Payment ──
      {
        key: "bankCode",
        label: "銀行代碼",
        content: "006（合作金庫銀行｜雲林分行）",
      },
      {
        key: "bankAccount",
        label: "匯款帳號",
        content: "5665717273711",
      },
      {
        key: "bankName",
        label: "匯款戶名",
        content: "羅威傳媒數位行銷股份有限公司",
      },
      {
        key: "lineId",
        label: "官方 LINE",
        content: "@021xhxhx",
      },
      {
        key: "paymentInstructions",
        label: "匯款後須知",
        content:
          "將匯款紀錄私訊官方 LINE\n提供：姓名、聯絡電話、匯款帳號後五碼\n確認對帳後將邀請加入活動專屬群組",
      },

      // ── Case Studies ──
      {
        key: "caseStudies",
        label: "實戰案例（名稱|連結|說明，每行一項）",
        content:
          "AI 實驗室 KOKORO|https://www.youtube.com/@AimeeLucky777|YouTube 頻道實戰案例\nCEO 楊|https://www.youtube.com/watch?v=N3einxG6Zvg&t=1s|AI 影像商業應用示範",
      },
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
