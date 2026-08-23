"use client";

import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import PainPointHook from "@/components/PainPointHook";
import ComparisonTable from "@/components/ComparisonTable";
import FAQAccordion from "@/components/FAQAccordion";
import RegistrationForm from "@/components/RegistrationForm";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const timelineSteps = [
  {
    number: "01",
    title: "深度診斷",
    desc: "先看帳號目前的體質，再把同業正在投的東西拆開來看。",
    result: "知道錢該投在哪個平台、哪一種受眾",
  },
  {
    number: "02",
    title: "動態優化",
    desc: "每天看數據調出價與受眾，跑不動的組合當天就砍掉。",
    result: "預算不會卡在沒有反應的組合上",
  },
  {
    number: "03",
    title: "定期彙報",
    desc: "每月把數據攤開來看一次，順便講下個月要往哪裡走。",
    result: "知道下個月該加碼還是先收手",
  },
];

const adComparisonItems = [
  { label: "策略", left: "按加強推廣碰運氣", right: "先排平台順序再投" },
  { label: "受眾", left: "廣泛投放，預算散掉", right: "用平台數據縮小受眾範圍" },
  { label: "優化", left: "投完就放著", right: "每日監控，隨數據調整" },
  { label: "數據", left: "後台打開看不懂", right: "報表逐項列出錢花去哪" },
  { label: "成效", left: "不確定 ROAS", right: "以 ROAS 為目標持續調整" },
];

const adFeatures = [
  { label: "點讚評論", desc: "先把互動數字撐起來" },
  { label: "覆蓋式廣告", desc: "大範圍讓人看見品牌" },
  { label: "精準粉絲", desc: "把追蹤者鎖在目標受眾" },
  { label: "播放量", desc: "確保影片被播出去" },
];

/* ── 廣告投放方案：每月 3 萬 / 6 萬 / 8 萬 / 客製化 ──
   金額定義＝每月投放總預算（含代操服務）。
   三個級距都是每日監控，差異在素材迭代深度與回報頻率，
   與下方比較表「每日監控，隨數據調整」的承諾一致。 */
const adPlans = [
  {
    id: "30000",
    tier: "入門啟動",
    price: "$30,000",
    unit: "/ 月",
    summary: "先把準客戶找出來",
    points: [
      "單一平台投放（TikTok 或 Meta 擇一）",
      "每日監控數據，調整出價與受眾",
      "2-3 組受眾測試，找出有效輪廓",
      "每月完整成效報表",
    ],
    highlight: false,
  },
  {
    id: "60000",
    tier: "成長加速",
    price: "$60,000",
    unit: "/ 月",
    summary: "曝光和轉換一起往上推",
    points: [
      "雙平台同步投放，流量互相導流",
      "每日監控 + 每週素材 A/B 迭代",
      "5 組以上受眾測試，動態調整預算配比",
      "雙週回報 + 每月策略會議",
    ],
    highlight: true,
  },
  {
    id: "80000",
    tier: "規模擴張",
    price: "$80,000",
    unit: "/ 月",
    summary: "把跑得動的模型放到最大",
    points: [
      "全平台佈局，受眾組數不設限",
      "每日監控，隨數據即時調整出價與配比",
      "素材持續迭代，汰弱留強",
      "專屬顧問窗口 + 每週回報",
    ],
    highlight: false,
  },
  {
    id: "custom",
    tier: "客製化",
    price: "依需求報價",
    unit: "",
    summary: "有特殊檔期或目標再談",
    points: [
      "大檔期、新品上市、跨國投放",
      "依產業競價環境重新估算預算",
      "可搭配短影音代操一起規劃",
      "先做免費診斷再出方案",
    ],
    highlight: false,
  },
];

const builtInAdFAQs = [
  {
    id: "ad-faq-1",
    question: "什麼是 TikTok 官方二級代理商？跟一般投放有什麼差別？",
    answer:
      "羅威傳媒是 TikTok 官方認證的二級代理商，直接對接平台資源與數據後台。自己投放拿到的是公開版介面，代理商這邊能看到更細的受眾數據，也有官方的技術窗口可以問，廣告費率同樣談得比較好。",
  },
  {
    id: "ad-faq-2",
    question: "「流量禮包」是什麼？跟一般廣告投放有什麼不同？",
    answer:
      "流量禮包是我們的保證流量方案，台灣唯一。投放前先把觀看量目標講定，沒有達到就全額退費。一般廣告投放只收服務費，成效由客戶自己承擔，這個方案是我們陪著一起扛。",
  },
  {
    id: "ad-faq-3",
    question: "可投放的數據類型有哪些？",
    answer:
      "四種都能投。點讚評論用來把互動數字撐起來，覆蓋式廣告大範圍讓人看見品牌，精準粉絲把追蹤者鎖在目標受眾，播放量確保影片被播出去。實際怎麼組合，看你這一檔想達成什麼，診斷時會一起排。",
  },
  {
    id: "ad-faq-4",
    question: "每月 3 萬、6 萬、8 萬，這個金額是廣告費還是服務費？",
    answer:
      "方案金額是「每月投放總預算」，代操服務已經含在裡面。實際投進媒體的比例會在診斷後於提案裡逐項列出，不另外收費。你如果已經有既定的媒體預算，也可以直接告訴我們，由我們反推適合的操作規格。",
  },
  {
    id: "ad-faq-5",
    question: "廣告預算大概要準備多少？",
    answer:
      "多數品牌從每月 3 萬起跑就能跑出可判讀的數據。6 萬以上樣本才夠，受眾和素材可以同時測。有特殊檔期或跨國需求，建議走客製化方案。歡迎透過 LINE 諮詢，我們提供免費廣告診斷。",
  },
  {
    id: "ad-faq-6",
    question: "你們跟一般的廣告代操公司有什麼不同？",
    answer:
      "羅威傳媒是有登記的實體傳媒公司，有 TikTok 官方認證，數百位成功案例可以驗證，也是台灣唯一提供保證流量方案的團隊。操作上每天看數據調整，報表把每一分錢的去向列清楚。",
  },
  {
    id: "ad-faq-7",
    question: "投放廣告多久可以看到效果？",
    answer:
      "廣告上線後 24-48 小時就會有初步數據回來。第一週我們會快速測不同的受眾與素材組合，把有效的那組找出來。持續調整 2-4 週後 ROAS 會趨於穩定並繼續往上。每月提供完整數據報告與下階段建議。",
  },
];

export default function AdContent({ faqs }: { faqs: FAQ[] }) {
  return (
    <main
      className="relative z-10 flex min-h-dvh flex-col px-6 pt-10 pb-12"
      style={{
        /* 配色沿用富婆分會那套暖米白／金褐，讓兩邊看起來是同一家公司的頁面。
           色票與對比度出處見 src/app/fupo/FupoContent.tsx 的 C。 */
        background: "#FAF7F2",
        ["--color-bg-primary" as string]: "#FAF7F2",
        ["--color-bg-surface" as string]: "#FFFFFF",
        ["--color-bg-surface-light" as string]: "#F3ECE1",
        ["--color-text-primary" as string]: "#2B2318",
        ["--color-text-secondary" as string]: "#6B5F51",
        ["--color-text-white" as string]: "#2B2318",
        ["--color-accent" as string]: "#7E5D28",
        ["--color-accent-hover" as string]: "#6B4F22",
        ["--color-accent-warm" as string]: "#B08D4F",
        ["--color-divider" as string]: "rgba(126,93,40,0.22)",
        ["--color-glow" as string]: "rgba(126,93,40,0.06)",
        /* 富婆頁的標題是實心墨色，這裡把漸層三段收成同一個深色，
           text-gold-shine 就等同純色標題，不必逐處改 class。 */
        ["--color-gold-gradient-start" as string]: "#2B2318",
        ["--color-gold-gradient-mid" as string]: "#4C4236",
        ["--color-gold-gradient-end" as string]: "#2B2318",
      }}
    >
      <Link
        href="/"
        className="animate-fade-in self-start text-sm text-text-secondary hover:text-accent transition-colors mb-6"
      >
        &larr; 返回
      </Link>

      {/* Hero */}
      <section className="animate-fade-up mb-12">
        <p className="mb-2 text-[10px] font-semibold tracking-[0.32em] text-accent">
          TikTok 官方認證二級代理商
        </p>
        <h1 className="font-[family-name:var(--font-noto-serif-tc)] text-[22px] font-bold leading-[1.6] text-gold-shine mb-2">
          廣告投放
        </h1>
        <p className="text-sm text-text-secondary leading-[1.8]">
          每天看數據調整出價與受眾，每月給你一份看得懂的報表。錢花在哪裡、帶回多少，都攤開來看。
        </p>
        <div className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-accent-warm to-transparent" />

        <div className="relative mt-6 aspect-[16/9] w-full overflow-hidden border border-divider bg-bg-surface">
          <Image
            src="/images/short-video-ad/hero-ads.webp"
            alt="廣告投放服務主視覺，跨平台廣告版位與成效數據"
            fill
            sizes="(max-width: 430px) 100vw, 430px"
            className="object-cover"
            priority
          />
        </div>
      </section>

      <PainPointHook
        title="你也正在為了這些數字頭痛嗎？"
        points={[
          "廣告費一年比一年貴，點擊數字很漂亮，實際下單的沒幾個",
          "後台打開全是 ROAS、像素、轉換率，看不出來該調什麼",
          "受眾設定憑感覺，廣告一直投給不會買的人",
        ]}
      />

      {/* Identity */}
      <section className="animate-fade-up mb-12">
        <div className="bg-accent/10 border border-accent/30 rounded-xl p-6">
          <p className="mb-2 text-[10px] font-semibold tracking-[0.32em] text-accent">TikTok 官方認證</p>
          <h2 className="text-lg font-bold text-accent mb-3">官方認證二級代理商</h2>
          <p className="text-sm text-text-secondary leading-[1.8] mb-4">
            羅威傳媒是有登記的實體傳媒公司，直接對接 TikTok 官方 ADS
            系統，拿得到平台第一手的投放資源與數據後台。
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-bg-surface border border-divider rounded-lg px-3 py-2.5">
              <p className="text-xs text-text-secondary/70">身份</p>
              <p className="text-sm font-semibold text-text-primary">實體傳媒公司</p>
            </div>
            <div className="bg-bg-surface border border-divider rounded-lg px-3 py-2.5">
              <p className="text-xs text-text-secondary/70">認證</p>
              <p className="text-sm font-semibold text-text-primary">TikTok 二級代理</p>
            </div>
          </div>
        </div>
      </section>

      {/* 流量禮包 */}
      <section className="animate-fade-up mb-16">
        <div className="rounded-xl bg-bg-surface border border-divider p-6 mb-10">
          <p className="mb-1 text-[10px] font-semibold tracking-[0.32em] text-accent">台灣唯一</p>
          <h2 className="text-lg font-bold text-text-primary mb-2">
            流量禮包．<span className="text-accent">保證流量</span>
          </h2>
          <p className="text-sm text-text-secondary leading-[1.8]">
            投放前先把觀看量目標講定，沒有達到就全額退費。台灣目前只有我們這樣做，成效的風險由我們陪著一起扛。
          </p>
        </div>

        <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-base font-bold text-gold-shine mb-6">
          可投放數據
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {adFeatures.map((feature) => (
            <div key={feature.label} className="bg-bg-surface border border-divider rounded-xl p-4 text-center">
              <p className="text-sm font-bold text-accent mb-1">{feature.label}</p>
              <p className="text-[11px] text-text-secondary leading-[1.6]">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 方案 */}
      <section className="animate-fade-up mb-16">
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-2">
          投放方案
        </h2>
        <p className="text-xs text-text-secondary/70 mb-3">
          方案金額為<span className="text-accent font-semibold">每月投放總預算（含代操服務）</span>，依預算級距選擇操作規格。
        </p>
        <p className="text-[10px] tracking-[0.2em] text-accent/50 mb-4">← 左右滑動查看 →</p>

        <div
          className="flex gap-4 overflow-x-auto pt-4 pb-4 px-1 -mx-1 snap-x snap-mandatory"
          style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(126,93,40,0.3) transparent" }}
        >
          {adPlans.map((plan) => (
            <div
              key={plan.id}
              className={`flex-shrink-0 w-[260px] snap-start rounded-xl p-5 ${
                plan.highlight
                  ? "bg-accent/10 border border-accent/30"
                  : "bg-bg-surface border border-divider"
              }`}
            >
              <p className="mb-2 text-[10px] font-semibold tracking-[0.28em] text-accent">{plan.tier}</p>
              <p className="mb-1">
                <span className="font-[family-name:var(--font-cormorant)] text-3xl font-bold text-accent">
                  {plan.price}
                </span>
                {plan.unit && <span className="text-xs text-text-secondary/70 ml-1">{plan.unit}</span>}
              </p>
              <p className="text-xs text-text-secondary/70 mb-4">{plan.summary}</p>
              <ul className="flex flex-col gap-1.5">
                {plan.points.map((p) => (
                  <li
                    key={p}
                    className="text-[11px] text-text-secondary leading-[1.7] pl-3 relative before:content-['◆'] before:absolute before:left-0 before:text-accent-warm before:text-[10px]"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[11px] text-text-secondary/60 leading-[1.8]">
          實際投進媒體的金額與操作細節，會在免費診斷後於提案裡逐項列出，不另外收費。
          你如果已經有既定的媒體預算，也可以直接告訴我們，由我們反推適合的操作規格。
        </p>
      </section>

      {/* 合作三部曲 */}
      <section className="animate-fade-up mb-12">
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
          合作三部曲
        </h2>
        <div className="relative flex flex-col">
          {timelineSteps.map((step, i) => (
            <div key={step.number} className="relative flex gap-4 pb-8 last:pb-0">
              {i < timelineSteps.length - 1 && (
                <div className="absolute left-4 top-8 bottom-0 border-l border-accent/25" />
              )}
              <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent font-[family-name:var(--font-cormorant)] text-sm font-bold text-bg-primary">
                {step.number}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-text-primary mb-1">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-[1.8] mb-1">{step.desc}</p>
                <p className="text-xs text-accent leading-[1.6]">→ {step.result}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ComparisonTable
        title="專業代操的差異"
        leftLabel="自己投廣告"
        rightLabel="專業代操"
        items={adComparisonItems}
      />

      <FAQAccordion title="常見問題" items={[...builtInAdFAQs, ...faqs]} />

      <RegistrationForm
        pageSlug="short-video-ad"
        courseOptions={[
          "廣告投放 — 入門啟動（$30,000/月）",
          "廣告投放 — 成長加速（$60,000/月）",
          "廣告投放 — 規模擴張（$80,000/月）",
          "廣告投放 — 客製化方案",
        ]}
      />

      <section className="animate-fade-up mb-12 text-center">
        <p className="font-[family-name:var(--font-noto-serif-tc)] text-base font-bold text-text-primary leading-[1.8] mb-6">
          先做一次免費診斷，看看你現在的預算能買到什麼
        </p>
        <Link
          href="https://lin.ee/htTdJSH"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full rounded-full bg-accent py-3.5 text-center text-sm font-semibold text-bg-primary tracking-[0.16em] transition-opacity duration-200 hover:opacity-90"
        >
          預約免費廣告診斷
        </Link>
      </section>

      <Link href="/" className="self-start text-sm text-text-secondary hover:text-accent transition-colors">
        &larr; 返回首頁
      </Link>

      <Footer />
    </main>
  );
}
