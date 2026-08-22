"use client";

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
    desc: "分析帳號體質與競爭對手",
    result: "一份清晰的流量獲取策略",
  },
  {
    number: "02",
    title: "動態優化",
    desc: "每日監控數據，調整出價與受眾",
    result: "預算最大化利用",
  },
  {
    number: "03",
    title: "定期彙報",
    desc: "每月數據回顧與下階段建議",
    result: "掌控全局，規模化成長",
  },
];

const adComparisonItems = [
  { label: "策略", left: "按加強推廣碰運氣", right: "全平台策略佈局" },
  { label: "受眾", left: "廣泛投放，浪費預算", right: "AI 精準定位準客戶" },
  { label: "優化", left: "投完就放著", right: "每日監控動態調整" },
  { label: "數據", left: "看不懂後台", right: "透明化報表，清楚每分錢" },
  { label: "成效", left: "不確定 ROAS", right: "目標導向，持續提升" },
];

const adFeatures = [
  { label: "點讚評論", desc: "快速累積社交證明" },
  { label: "覆蓋式廣告", desc: "大面積品牌曝光" },
  { label: "精準粉絲", desc: "鎖定目標受眾" },
  { label: "播放量", desc: "保證影片觸及" },
];

/* ── 廣告投放方案：每月 3 萬 / 6 萬 / 8 萬 / 客製化 ──
   金額定義＝每月投放總預算（含代操服務）。
   三個級距都是每日監控，差異在素材迭代深度與回報頻率，
   與下方比較表「每日監控動態調整」的承諾一致。 */
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
    summary: "同時放大曝光與轉換",
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
      "羅威傳媒為 TikTok 官方認證的二級代理商，直接對接平台資源與數據後台。相比一般自行投放，代理商能獲得更精準的受眾數據、更優惠的廣告費率，以及官方技術支援，讓每一分預算都發揮最大效益。",
  },
  {
    id: "ad-faq-2",
    question: "「流量禮包」是什麼？跟一般廣告投放有什麼不同？",
    answer:
      "流量禮包是我們獨家推出的保證流量方案，台灣唯一。我們承諾達到約定的觀看量目標，若未達標全額退費。一般廣告投放只收費不保證成效，我們則是用自己的信譽承擔風險。",
  },
  {
    id: "ad-faq-3",
    question: "可投放的數據類型有哪些？",
    answer:
      "我們可針對四大數據類型精準投放：點讚評論（累積社交證明）、覆蓋式廣告（大面積品牌曝光）、精準粉絲（鎖定目標受眾獲取高質量追蹤者）、播放量（保證影片觸及效果）。根據您的行銷目標，量身規劃最佳組合。",
  },
  {
    id: "ad-faq-4",
    question: "每月 3 萬、6 萬、8 萬，這個金額是廣告費還是服務費？",
    answer:
      "方案金額為「每月投放總預算」，已包含代操服務。實際投入媒體的比例會在診斷後於提案中明列，不會有隱藏費用。若您已有既定的媒體預算，也可以直接告訴我們，由我們反推最適合的操作規格。",
  },
  {
    id: "ad-faq-5",
    question: "廣告預算大概要準備多少？",
    answer:
      "多數品牌從每月 3 萬起跑就能跑出可判讀的數據，6 萬以上才有足夠的測試樣本同時做受眾與素材優化。若您有特殊檔期或跨國需求，建議走客製化方案。歡迎透過 LINE 諮詢，我們提供免費廣告診斷。",
  },
  {
    id: "ad-faq-6",
    question: "你們跟一般的廣告代操公司有什麼不同？",
    answer:
      "我們是正規經營的實體傳媒公司，不是個人工作室或素人接案。擁有 TikTok 官方認證、數百位成功案例可驗證，並且是台灣唯一提供保證流量方案的團隊。每日監控數據動態調整，提供透明化報表，讓您清楚每一分錢的去向。",
  },
  {
    id: "ad-faq-7",
    question: "投放廣告多久可以看到效果？",
    answer:
      "通常廣告上線後 24-48 小時即可看到初步數據反饋。我們會在第一週內快速測試不同受眾與素材組合，找到最佳投放策略。持續優化 2-4 週後，ROAS（廣告投資報酬率）會趨於穩定並持續提升。每月提供完整數據報告與下階段建議。",
  },
];

export default function AdContent({ faqs }: { faqs: FAQ[] }) {
  return (
    <main
      className="relative z-10 flex min-h-dvh flex-col px-6 pt-10 pb-12"
      style={{
        background: "#EFF6FC",
        ["--color-bg-primary" as string]: "#EFF6FC",
        ["--color-bg-surface" as string]: "#FFFFFF",
        ["--color-bg-surface-light" as string]: "#F5F9FD",
        ["--color-text-primary" as string]: "#1A2744",
        ["--color-text-secondary" as string]: "#4A6178",
        ["--color-text-white" as string]: "#1A2744",
        ["--color-accent" as string]: "#D4870E",
        ["--color-accent-hover" as string]: "#C07A0A",
        ["--color-accent-warm" as string]: "#D4870E",
        ["--color-divider" as string]: "#C8D8E8",
        ["--color-glow" as string]: "rgba(46, 107, 198, 0.1)",
        ["--color-gold-gradient-start" as string]: "#1A2744",
        ["--color-gold-gradient-mid" as string]: "#2E6BC6",
        ["--color-gold-gradient-end" as string]: "#1A2744",
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
        <p className="text-[10px] tracking-widest text-accent/60 uppercase mb-2">
          TikTok 官方認證二級代理商
        </p>
        <h1 className="font-[family-name:var(--font-noto-serif-tc)] text-[22px] font-bold leading-[1.6] text-gold-shine mb-2">
          廣告投放
        </h1>
        <p className="text-sm text-text-secondary leading-[1.8]">
          精準受眾、每日優化、透明報表。用數據把預算花在會下單的人身上。
        </p>
        <div className="mt-4 h-[2px] w-12 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full" />
      </section>

      <PainPointHook
        title="你也正在為了這些數字頭痛嗎？"
        points={[
          "廣告費越來越貴 -- 點擊次數不少，但真正下單的沒幾個",
          "後台數據看不懂 -- ROAS、像素、轉換率，一堆術語讓人頭大",
          "受眾抓不準 -- 廣告總是投給不對的人，白白燒掉血汗錢",
        ]}
      />

      {/* Identity */}
      <section className="animate-fade-up mb-12">
        <div className="bg-accent/10 border border-accent/30 rounded-xl p-6">
          <p className="text-[10px] tracking-widest text-accent/60 uppercase mb-2">TikTok 官方認證</p>
          <h2 className="text-lg font-bold text-accent mb-3">官方認證二級代理商</h2>
          <p className="text-sm text-text-secondary leading-[1.8] mb-4">
            我們不是個人工作室、不是素人接案。羅威傳媒是正規經營的實體傳媒公司，直接對接 TikTok 官方 ADS
            系統，擁有平台第一手資源與數據優勢。
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-bg-surface rounded-lg px-3 py-2.5">
              <p className="text-xs text-text-secondary/60">身份</p>
              <p className="text-sm font-semibold text-text-primary">實體傳媒公司</p>
            </div>
            <div className="bg-bg-surface rounded-lg px-3 py-2.5">
              <p className="text-xs text-text-secondary/60">認證</p>
              <p className="text-sm font-semibold text-text-primary">TikTok 二級代理</p>
            </div>
          </div>
        </div>
      </section>

      {/* 流量禮包 */}
      <section className="animate-fade-up mb-16">
        <div className="rounded-xl bg-bg-surface border border-divider p-6 mb-10">
          <p className="text-[10px] tracking-widest text-accent/60 uppercase mb-1">台灣唯一</p>
          <h2 className="text-lg font-bold text-text-primary mb-2">
            流量禮包 — <span className="text-accent">保證流量</span>
          </h2>
          <p className="text-sm text-text-secondary leading-[1.8]">
            業界唯一保證流量方案。未達標？全額退費。我們用自己的信譽承擔風險，因為我們對數據有絕對的信心。
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
        <p className="text-xs text-text-secondary/60 mb-3">
          方案金額為<span className="text-accent font-semibold">每月投放總預算（含代操服務）</span>，依預算級距選擇操作規格。
        </p>
        <p className="text-[10px] text-accent/40 mb-4">← 左右滑動查看 →</p>

        <div
          className="flex gap-4 overflow-x-auto pt-4 pb-4 px-1 -mx-1 snap-x snap-mandatory"
          style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(212,135,14,0.3) transparent" }}
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
              <p className="text-[10px] tracking-widest text-accent/60 uppercase mb-2">{plan.tier}</p>
              <p className="mb-1">
                <span className="text-2xl font-black text-accent">{plan.price}</span>
                {plan.unit && <span className="text-xs text-text-secondary/60 ml-1">{plan.unit}</span>}
              </p>
              <p className="text-xs text-text-secondary/60 mb-4">{plan.summary}</p>
              <ul className="flex flex-col gap-1.5">
                {plan.points.map((p) => (
                  <li
                    key={p}
                    className="text-[11px] text-text-secondary leading-[1.7] pl-3 relative before:content-['◆'] before:absolute before:left-0 before:text-accent/40 before:text-[10px]"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[11px] text-text-secondary/50 leading-[1.8]">
          實際投入媒體的金額與操作細節，會在免費診斷後於提案中逐項明列，不另收隱藏費用。
          若您已有既定的媒體預算，也可以直接告訴我們，由我們反推最適合的操作規格。
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
                <div className="absolute left-4 top-8 bottom-0 border-l-2 border-accent/30" />
              )}
              <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-bg-primary text-xs font-bold">
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
          廣告投放不需要豪賭，只需要專業的引路人
        </p>
        <Link
          href="https://lin.ee/htTdJSH"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full rounded-full bg-accent py-3.5 text-center text-sm font-semibold text-bg-primary tracking-wider transition-opacity duration-200 hover:opacity-90"
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
