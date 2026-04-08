"use client";

import { useState } from "react";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import PainPointHook from "@/components/PainPointHook";
import ComparisonTable from "@/components/ComparisonTable";
import FAQAccordion from "@/components/FAQAccordion";
import RegistrationForm from "@/components/RegistrationForm";
import TabSwitcher from "@/components/TabSwitcher";

/* ── Video tab data ── */

const phases = [
  {
    number: "01",
    title: "基礎紮根",
    subtitle: "數據驅動的品牌成長系統",
    details: [
      "深度拆解平台演算法，掌握流量密碼",
      "建立高頻內容產出機制，持續累積品牌聲量",
      "透過數據回饋，快速迭代內容方向",
    ],
  },
  {
    number: "02",
    title: "靈魂定位",
    subtitle: "打造不可取代的品牌人格",
    details: [
      "視覺符號 — 一眼可辨識的品牌視覺體系",
      "語言風格 — 獨特的表達方式與口頭禪",
      "專家權威 — 透過專業內容建立行業話語權",
    ],
  },
  {
    number: "03",
    title: "模組化執行",
    subtitle: "4 步驟高效產出",
    details: [
      "策略會議 → 腳本開發 → 高效拍攝 → 後製精修",
      "一次拍攝多支素材，最大化效率",
    ],
  },
  {
    number: "04",
    title: "目標產值",
    subtitle: "用數字衡量成果",
    details: [],
    metrics: [
      { value: "100K+", label: "單月曝光" },
      { value: "200%", label: "互動率提升" },
    ],
  },
];

const videoWhyChooseUs = [
  {
    title: "一條龍代操",
    points: ["不用剪輯", "不用想腳本", "不用懂演算法"],
    cta: "你專心做老闆",
    highlight: false,
  },
  {
    title: "業界唯一",
    points: ["保證流量未達標全額退費"],
    cta: "我們承擔風險",
    highlight: true,
  },
  {
    title: "拒絕素人接案｜實體傳媒公司操盤",
    points: ["數百位學員驗證", "多案例可複製"],
    cta: "",
    highlight: false,
  },
];

const videoComparisonItems = [
  { label: "內容品質", left: "缺乏專業，品質不穩定", right: "專業團隊，品質保證" },
  { label: "時間成本", left: "每天花 3-5 小時", right: "只需 1 次策略會議/月" },
  { label: "演算法", left: "靠感覺猜測", right: "數據驅動，精準破解" },
  { label: "產出量", left: "一個月 2-4 支", right: "一個月 12-20 支" },
  { label: "變現能力", left: "不知如何導流", right: "完整流量變現閉環" },
];

/* ── Ad tab data ── */

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

/* ── 短影音代操 FAQ ── */
const videoBuiltInFAQs = [
  {
    id: "v-faq-1",
    question: "短影音代操包含哪些服務？",
    answer: "我們提供一條龍服務：策略規劃、腳本撰寫、專業拍攝、後製剪輯、字幕音效、發布排程、數據追蹤。老闆不用剪輯、不用想腳本、不用懂演算法，只需要出席拍攝即可。",
  },
  {
    id: "v-faq-2",
    question: "每月可以產出多少支影片？",
    answer: "菁英 IP 啟航版可依預算選擇 8 萬、12 萬、24 萬三種月費，對應每月 8 支、12 支、24 支短影音（每支 1 萬元）。所有影片皆由專業團隊拍攝製作，品質穩定且符合演算法邏輯。",
  },
  {
    id: "v-faq-3",
    question: "保證流量是怎麼計算的？沒達標怎麼辦？",
    answer: "流量以全網年度總觀看次數計算（含 TikTok、Reels、YouTube Shorts 等平台）。菁英 IP 啟航版依月費方案對應保底觀看量：8 萬方案保底 800 萬、12 萬方案保底 1,200 萬、24 萬方案保底 2,400 萬。若年度結算未達標，全額退費，業界唯一。",
  },
  {
    id: "v-faq-4",
    question: "我需要自己出鏡嗎？",
    answer: "建議老闆出鏡建立個人 IP，這是打造品牌信任最有效的方式。我們會提供完整的腳本提詞卡、表情引導、現場指導，即使完全沒有拍攝經驗也能自然表現。如果真的無法出鏡，我們也能規劃純產品/素材類的內容方向。",
  },
  {
    id: "v-faq-5",
    question: "多久可以看到成效？",
    answer: "通常第一個月即可看到流量數據的明顯提升。2-3 個月開始建立穩定的品牌認知與粉絲基礎。6 個月後進入流量變現階段，開始將觀看轉化為實際營收。我們每月提供完整數據報表追蹤進度。",
  },
  {
    id: "v-faq-6",
    question: "跟自己請一個剪輯師比，哪個划算？",
    answer: "請一個全職剪輯師月薪約 3-5 萬，但你還需要企劃、攝影、營運人員，加起來每月人事成本超過 10 萬，還不含設備與場地。我們的菁英 IP 啟航版可依預算選擇 8 萬、12 萬、24 萬（每支 1 萬元）並涵蓋完整團隊執行，且保證流量成效，風險更低、效率更高。",
  },
  {
    id: "v-faq-7",
    question: "合約期間是多長？可以中途終止嗎？",
    answer: "保證流量方案為年度合約（12 個月），因為品牌 IP 的建立需要時間累積。合約明確列出雙方權利義務，若因不可抗力因素需提前終止，可依合約條款協商處理。",
  },
  {
    id: "v-faq-8",
    question: "PTT 對賭企業方案和一般代操方案有什麼不同？",
    answer: "一般代操方案是固定月費、保證流量。PTT 對賭方案則是羅威與企業各出 50% 預算，共同經營、共擔風險，依淨利 20-30% 分潤。適合想要深度合作、利益綁定的企業主。詳情可點擊方案卡片的「了解詳情」查看。",
  },
];

/* ── TikTok 廣告投放 FAQ ── */
const adFAQs = [
  {
    id: "ad-faq-1",
    question: "什麼是 TikTok 官方二級代理商？跟一般投放有什麼差別？",
    answer: "羅威傳媒為 TikTok 官方認證的二級代理商，直接對接平台資源與數據後台。相比一般自行投放，代理商能獲得更精準的受眾數據、更優惠的廣告費率，以及官方技術支援，讓每一分預算都發揮最大效益。",
  },
  {
    id: "ad-faq-2",
    question: "「流量禮包」是什麼？跟一般廣告投放有什麼不同？",
    answer: "流量禮包是我們獨家推出的保證流量方案，台灣唯一。我們承諾達到約定的觀看量目標，若未達標全額退費。一般廣告投放只收費不保證成效，我們則是用自己的信譽承擔風險。",
  },
  {
    id: "ad-faq-3",
    question: "可投放的數據類型有哪些？",
    answer: "我們可針對四大數據類型精準投放：點讚評論（累積社交證明）、覆蓋式廣告（大面積品牌曝光）、精準粉絲（鎖定目標受眾獲取高質量追蹤者）、播放量（保證影片觸及效果）。根據您的行銷目標，量身規劃最佳組合。",
  },
  {
    id: "ad-faq-4",
    question: "廣告預算大概要準備多少？",
    answer: "廣告預算依據您的產業、目標受眾和行銷目標而定。我們會在合作前進行深度診斷，分析帳號體質與競爭對手，制定最適合的投放策略與預算分配，確保每分錢都花在刀口上。歡迎透過 LINE 諮詢，我們提供免費廣告診斷。",
  },
  {
    id: "ad-faq-5",
    question: "你們跟一般的廣告代操公司有什麼不同？",
    answer: "我們是正規經營的實體傳媒公司，不是個人工作室或素人接案。擁有 TikTok 官方認證、數百位成功案例可驗證，並且是台灣唯一提供保證流量方案的團隊。每日監控數據動態調整，提供透明化報表，讓您清楚每一分錢的去向。",
  },
  {
    id: "ad-faq-6",
    question: "投放廣告多久可以看到效果？",
    answer: "通常廣告上線後 24-48 小時即可看到初步數據反饋。我們會在第一週內快速測試不同受眾與素材組合，找到最佳投放策略。持續優化 2-4 週後，ROAS（廣告投資報酬率）會趨於穩定並持續提升。每月提供完整數據報告與下階段建議。",
  },
];

const adFeatures = [
  { label: "點讚評論", desc: "快速累積社交證明" },
  { label: "覆蓋式廣告", desc: "大面積品牌曝光" },
  { label: "精準粉絲", desc: "鎖定目標受眾" },
  { label: "播放量", desc: "保證影片觸及" },
];

/* ── Component ── */

interface FAQ {
  id: string;
  pageSlug: string;
  question: string;
  answer: string;
  order: number;
}

interface ShortVideoContentProps {
  videoFaqs: FAQ[];
  adFaqs: FAQ[];
  heroImageUrl: string;
  heroImageUrls?: string[];
}

const tabs = [
  { key: "video", label: "短影音代操" },
  { key: "ad", label: "TikTok 廣告投放" },
];

const elitePricingOptions = [
  {
    id: "80000",
    label: "8 萬",
    monthlyPrice: 80000,
    videosPerMonth: 8,
    yearlyPrice: 960000,
    trafficGuarantee: "保底 800 萬次觀看/年",
  },
  {
    id: "120000",
    label: "12 萬",
    monthlyPrice: 120000,
    videosPerMonth: 12,
    yearlyPrice: 1440000,
    trafficGuarantee: "保底 1,200 萬次觀看/年",
  },
  {
    id: "240000",
    label: "24 萬",
    monthlyPrice: 240000,
    videosPerMonth: 24,
    yearlyPrice: 2880000,
    trafficGuarantee: "保底 2,400 萬次觀看/年",
  },
];

export default function ShortVideoContent({
  videoFaqs,
  adFaqs,
  heroImageUrl,
  heroImageUrls,
}: ShortVideoContentProps) {
  const [activeTab, setActiveTab] = useState("video");
  const [showPttModal, setShowPttModal] = useState(false);
  const [selectedEliteOptionId, setSelectedEliteOptionId] = useState("120000");
  const selectedEliteOption =
    elitePricingOptions.find((option) => option.id === selectedEliteOptionId) ?? elitePricingOptions[1];

  return (
    <main className="relative z-10 flex min-h-dvh flex-col px-6 pt-10 pb-12">
      {/* Back link */}
      <Link
        href="/"
        className="animate-fade-in self-start text-sm text-text-secondary hover:text-accent transition-colors mb-6"
      >
        &larr; 返回
      </Link>

      {/* Hero */}
      <HeroSection
        title="短影音代操與廣告投放"
        subtitle="全方位短影音品牌代操 + 精準廣告投放"
        imageUrl={heroImageUrl}
        imageUrls={heroImageUrls}
      />

      {/* Tab Switcher */}
      <TabSwitcher tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* ── Video Tab ── */}
      {activeTab === "video" && (
        <>
          {/* Pain Points */}
          <PainPointHook
            title="你是否也面臨這些困境？"
            points={[
              "空有產品卻沒流量 -- 廣告費越來越貴，投報率卻直線下滑",
              "想做影音卻沒方向 -- 拍了幾支片卻沒人看，完全不知道演算法要什麼",
              "團隊人力成本太高 -- 找企劃、攝影、剪輯、營運，每月薪資支出驚人",
              "有流量卻無法變現 -- 讚數很多，但私訊詢問度卻是零",
            ]}
          />

          {/* Four Service Phases — bold numbered layout */}
          <section className="animate-fade-up mb-16">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-8">
              四大執行階段
            </h2>
            <div className="flex flex-col gap-10">
              {phases.map((phase) => (
                <div key={phase.number} className="relative">
                  {/* Giant number */}
                  <span className="text-5xl font-black text-accent/15 absolute -top-2 -left-1 leading-none select-none">
                    {phase.number}
                  </span>
                  <div className="pl-12">
                    <h3 className="text-base font-bold text-text-primary mb-1">
                      {phase.title}
                    </h3>
                    <p className="text-xs text-text-secondary/70 mb-3">
                      {phase.subtitle}
                    </p>
                    {phase.details.length > 0 && (
                      <ul className="flex flex-col gap-1.5">
                        {phase.details.map((detail) => (
                          <li
                            key={detail}
                            className="text-xs text-text-secondary leading-[1.8] pl-3 relative before:content-['—'] before:absolute before:left-0 before:text-accent/40"
                          >
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                    {/* Metrics for phase 04 */}
                    {"metrics" in phase && phase.metrics && (
                      <div className="flex gap-6 mt-3">
                        {phase.metrics.map((m) => (
                          <div key={m.label}>
                            <p className="text-3xl font-black text-accent leading-none">{m.value}</p>
                            <p className="text-[11px] text-text-secondary/60 mt-1">{m.label}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Comparison Table */}
          <ComparisonTable
            title="為什麼選擇專業代操？"
            leftLabel="自己做"
            rightLabel="交給我們"
            items={videoComparisonItems}
          />

          {/* Why Choose Us — highlight the key one */}
          <section className="animate-fade-up mb-12">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
              為什麼選擇我們
            </h2>
            <div className="flex flex-col gap-4">
              {videoWhyChooseUs.map((item) => (
                <div
                  key={item.title}
                  className={
                    item.highlight
                      ? "bg-accent/10 border border-accent/30 rounded-xl p-5"
                      : "border-l-2 border-divider pl-5 py-3"
                  }
                >
                  <h3 className={`font-[family-name:var(--font-noto-serif-tc)] font-bold mb-2 ${
                    item.highlight ? "text-base text-accent" : "text-sm text-text-primary"
                  }`}>
                    {item.title}
                  </h3>
                  <ul className="flex flex-col gap-1 mb-2">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="text-xs text-text-secondary leading-[1.8] pl-3 relative before:content-['✓'] before:absolute before:left-0 before:text-accent"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                  {item.cta && (
                    <p className={`font-semibold ${item.highlight ? "text-base text-accent" : "text-sm text-accent"}`}>
                      👉 {item.cta}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── Pricing Plans — horizontal swipe ── */}
          <section className="animate-fade-up mb-16">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-2">
              方案選擇
            </h2>
            <p className="text-xs text-text-secondary/60 mb-2">選擇最適合您的短影音代操方案</p>
            <p className="text-[10px] text-accent/40 mb-4">← 左右滑動查看 →</p>

            <div className="flex gap-4 overflow-x-auto pt-4 pb-4 px-1 -mx-1 snap-x snap-mandatory" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(226,193,145,0.3) transparent" }}>

              {/* 菁英 IP 啟航版（可選三種價位） */}
              <div className="flex-shrink-0 w-[280px] snap-start bg-accent/10 border border-accent/30 rounded-xl p-5">
                <p className="text-[10px] tracking-widest text-accent/60 uppercase mb-2">保證流量方案</p>
                <h3 className="text-base font-bold text-accent mb-1">菁英 IP 啟航版</h3>
                <p className="text-xs text-text-secondary/60 mb-3">一版整合三種價位自由選擇</p>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {elitePricingOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedEliteOptionId(option.id)}
                      className={`rounded-md border px-2 py-1.5 text-xs font-semibold transition-colors ${
                        selectedEliteOptionId === option.id
                          ? "bg-sky-500/20 border-sky-400 text-sky-300"
                          : "border-divider text-text-secondary hover:border-sky-400/40 hover:text-sky-300"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                <p className="mb-2">
                  <span className="text-3xl font-black text-accent">
                    ${selectedEliteOption.monthlyPrice.toLocaleString()}
                  </span>
                  <span className="text-xs text-text-secondary/60 ml-1">/ 月</span>
                </p>
                <p className="text-[11px] text-text-secondary/50 mb-3">
                  年度：${selectedEliteOption.yearlyPrice.toLocaleString()}（含稅）
                </p>
                <ul className="flex flex-col gap-1">
                  {[
                    selectedEliteOption.trafficGuarantee,
                    `每月 ${selectedEliteOption.videosPerMonth} 支短影音（每支 1 萬元）`,
                    "IP 定位 + 爆款腳本",
                    "精準廣告投放操盤",
                    "未達標全額退費",
                  ].map((p) => (
                    <li key={p} className="text-[11px] text-text-secondary leading-[1.7] pl-3 relative before:content-['◆'] before:absolute before:left-0 before:text-accent/40 before:text-[10px]">{p}</li>
                  ))}
                </ul>
              </div>

              {/* 對賭企業方案 PTT */}
              <div className="flex-shrink-0 w-[280px] snap-start bg-bg-surface border border-divider rounded-xl p-5 relative">
                <span className="absolute -top-3 left-4 bg-bg-surface text-accent text-[10px] font-bold px-3 py-1 rounded-full border border-accent/30 tracking-wider">與羅威創造雙贏</span>
                <p className="text-[10px] tracking-widest text-accent/60 uppercase mb-2 mt-1">對賭企業方案</p>
                <h3 className="text-base font-bold text-text-primary mb-1">PTT 共擔合作模式</h3>
                <p className="text-xs text-text-secondary/60 mb-3">同一條船，共同經營</p>
                <p className="text-sm text-text-secondary leading-[1.7] mb-3">
                  總預算雙方各出 50%，一年內打造 IP，淨利 20-30% 分潤，一年後自動續約。
                </p>
                <ul className="flex flex-col gap-1 mb-4">
                  {["審核 → 試拍 → 簽約", "價格為總預算 50%", "律師客製化合約保障"].map((p) => (
                    <li key={p} className="text-[11px] text-text-secondary leading-[1.7] pl-3 relative before:content-['◆'] before:absolute before:left-0 before:text-accent/40 before:text-[10px]">{p}</li>
                  ))}
                </ul>
                <button
                  onClick={() => setShowPttModal(true)}
                  className="w-full rounded-full border border-accent text-accent text-xs font-semibold py-2 hover:bg-accent hover:text-bg-primary transition-colors"
                >
                  了解詳情
                </button>
              </div>

              {/* 體驗版 */}
              <div className="flex-shrink-0 w-[280px] snap-start bg-bg-surface border border-divider rounded-xl p-5">
                <p className="text-[10px] tracking-widest text-accent/60 uppercase mb-2">體驗版</p>
                <h3 className="text-sm font-bold text-text-primary mb-1">六六大順方案</h3>
                <p className="text-xs text-text-secondary/60 mb-3">先體驗，再決定</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-black text-accent">6</span>
                  <span className="text-sm text-text-secondary">支影片</span>
                </div>
                <p className="mb-3">
                  <span className="text-lg font-bold text-accent">$12,000</span>
                  <span className="text-xs text-text-secondary/60 ml-1">/ 支</span>
                </p>
                <p className="text-[11px] text-text-secondary/50">
                  總計 $72,000 · 適合先試水溫
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <FAQAccordion title="常見問題" items={[...videoBuiltInFAQs, ...videoFaqs]} />

          {/* Registration Form */}
          <RegistrationForm
            courseOptions={[
              "菁英 IP 啟航版（8 支 / $80,000/月）",
              "菁英 IP 啟航版（12 支 / $120,000/月）",
              "菁英 IP 啟航版（24 支 / $240,000/月）",
              "對賭企業方案（PTT）",
              "六六大順體驗版（$72,000）",
            ]}
          />

          {/* CTA Section */}
          <section className="animate-fade-up mb-12 rounded-xl bg-accent/10 border border-accent/30 p-6 text-center">
            <p className="text-xs text-text-secondary/60 mb-1 tracking-wide">名額有限</p>
            <p className="mb-3">
              <span className="text-5xl font-black text-accent leading-none">3</span>
              <span className="text-sm text-text-primary ml-2">位/月 深度合作客戶</span>
            </p>
            <Link
              href="https://lin.ee/htTdJSH"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full rounded-full bg-accent py-3.5 text-center text-sm font-semibold text-bg-primary tracking-wider transition-opacity duration-200 hover:opacity-90"
            >
              立即透過 LINE 諮詢
            </Link>
          </section>
        </>
      )}

      {/* ── Ad Tab ── */}
      {activeTab === "ad" && (
        <>
          {/* Pain Points */}
          <PainPointHook
            title="你也正在為了這些數字頭痛嗎？"
            points={[
              "廣告費越來越貴 -- 點擊次數不少，但真正下單的沒幾個",
              "後台數據看不懂 -- ROAS、像素、轉換率，一堆術語讓人頭大",
              "受眾抓不準 -- 廣告總是投給不對的人，白白燒掉血汗錢",
            ]}
          />

          {/* Identity — who we are */}
          <section className="animate-fade-up mb-12">
            <div className="bg-accent/10 border border-accent/30 rounded-xl p-6">
              <p className="text-[10px] tracking-widest text-accent/60 uppercase mb-2">TikTok 官方認證</p>
              <h2 className="text-lg font-bold text-accent mb-3">
                官方認證二級代理商
              </h2>
              <p className="text-sm text-text-secondary leading-[1.8] mb-4">
                我們不是個人工作室、不是素人接案。羅威傳媒是正規經營的實體傳媒公司，直接對接 TikTok 官方 ADS 系統，擁有平台第一手資源與數據優勢。
              </p>
              <div className="flex gap-4">
                <div className="border-l-2 border-accent/40 pl-3">
                  <p className="text-xs text-text-secondary/60">身份</p>
                  <p className="text-sm font-semibold text-text-primary">實體傳媒公司</p>
                </div>
                <div className="border-l-2 border-accent/40 pl-3">
                  <p className="text-xs text-text-secondary/60">認證</p>
                  <p className="text-sm font-semibold text-text-primary">TikTok 二級代理</p>
                </div>
              </div>
            </div>
          </section>

          {/* Core Value — guaranteed traffic */}
          <section className="animate-fade-up mb-16">
            <div className="border-l-2 border-accent pl-6 mb-10">
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
            <div className="grid grid-cols-2 gap-3 mb-8">
              {adFeatures.map((feature) => (
                <div
                  key={feature.label}
                  className="bg-bg-surface border border-divider rounded-xl p-4 text-center"
                >
                  <p className="text-sm font-bold text-accent mb-1">
                    {feature.label}
                  </p>
                  <p className="text-[11px] text-text-secondary leading-[1.6]">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline / Steps */}
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
                    <h3 className="text-sm font-bold text-text-primary mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-[1.8] mb-1">
                      {step.desc}
                    </p>
                    <p className="text-xs text-accent leading-[1.6]">
                      → {step.result}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Comparison Table */}
          <ComparisonTable
            title="專業代操的差異"
            leftLabel="自己投廣告"
            rightLabel="專業代操"
            items={adComparisonItems}
          />

          {/* FAQ */}
          <FAQAccordion title="常見問題" items={[...adFAQs, ...adFaqs]} />

          {/* Registration Form */}
          <RegistrationForm courseOptions={["TikTok 廣告投放"]} />

          {/* CTA Section */}
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
        </>
      )}

      {/* Back link bottom */}
      <Link
        href="/"
        className="self-start text-sm text-text-secondary hover:text-accent transition-colors"
      >
        &larr; 返回首頁
      </Link>

      <Footer />

      {/* PTT Modal */}
      {showPttModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setShowPttModal(false)}>
          <div className="absolute inset-0 bg-black/70" />
          <div
            className="relative bg-bg-surface border border-divider rounded-xl w-full max-w-md max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(226,193,145,0.3) transparent" }}
          >
            {/* Close button */}
            <button
              onClick={() => setShowPttModal(false)}
              className="sticky top-0 float-right m-3 flex h-8 w-8 items-center justify-center rounded-full bg-bg-surface border border-divider text-text-secondary hover:text-accent transition-colors z-10"
              aria-label="關閉"
            >
              ✕
            </button>

            <div className="p-6 pt-4">
              <p className="text-[10px] tracking-widest text-accent/60 uppercase mb-2">企業對賭自媒體</p>
              <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
                什麼是 PTT 模式？
              </h2>

              {/* 核心理念 */}
              <div className="border-l-2 border-accent pl-4 mb-6">
                <h3 className="text-sm font-bold text-text-primary mb-2">核心理念</h3>
                <p className="text-xs text-text-secondary leading-[1.8] mb-2">
                  打破傳統行銷公司「收錢後做不好是產品問題，做好是公司厲害」的不對等關係。
                </p>
                <p className="text-xs text-text-secondary leading-[1.8] mb-2">
                  乙方（羅威傳媒）不再只是領薪水的員工，而是轉化為<span className="text-accent font-semibold">「領分紅的股東」</span>，將雙方利益綁定，追求雙贏。
                </p>
                <p className="text-xs text-text-secondary leading-[1.8]">
                  拒絕「收錢了事」的過客心態，羅威傳媒投入資源與時間，賭的是共同的勝局。
                </p>
              </div>

              {/* 出資模式 */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-text-primary mb-3">出資模式</h3>
                <p className="text-xs text-text-secondary leading-[1.8] mb-3">總專案估值 <span className="text-accent font-bold">140 萬</span></p>
                <div className="flex gap-3 mb-3">
                  <div className="flex-1 text-center border border-divider rounded-lg py-3">
                    <p className="text-lg font-black text-accent leading-none">50%</p>
                    <p className="text-[10px] text-text-secondary/60 mt-1">甲方（業主）</p>
                    <p className="text-[10px] text-text-secondary/40">70 萬現金</p>
                  </div>
                  <div className="flex-1 text-center border border-accent/30 rounded-lg py-3 bg-accent/5">
                    <p className="text-lg font-black text-accent leading-none">50%</p>
                    <p className="text-[10px] text-text-secondary/60 mt-1">乙方（羅威）</p>
                    <p className="text-[10px] text-text-secondary/40">70 萬技術折抵</p>
                  </div>
                </div>
                <p className="text-xs text-text-secondary/70 leading-[1.8]">
                  與律師訂製客製化合約，保障雙方權益。流量未達標則合約不生效。
                </p>
              </div>

              {/* 預期目標 */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-text-primary mb-3">預期目標與分潤</h3>
                <div className="flex gap-3 mb-3">
                  <div className="flex-1 border-l-2 border-accent/40 pl-3">
                    <p className="text-lg font-black text-accent leading-none">100萬+</p>
                    <p className="text-[10px] text-text-secondary/60 mt-1">年度曝光量目標</p>
                  </div>
                  <div className="flex-1 border-l-2 border-accent/40 pl-3">
                    <p className="text-lg font-black text-accent leading-none">20%</p>
                    <p className="text-[10px] text-text-secondary/60 mt-1">淨利分潤比例</p>
                  </div>
                </div>
                <p className="text-xs text-text-secondary/70 leading-[1.8]">
                  舉例：甲方賺取 1,000 萬，乙方分潤 200 萬，以此激勵團隊拚命創造業績。
                </p>
              </div>

              {/* 期滿處理 */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-text-primary mb-3">期滿退場機制</h3>
                <p className="text-xs text-text-secondary leading-[1.8] mb-2">合約期滿一年後，甲方擁有優先選擇權：</p>
                <ul className="flex flex-col gap-2">
                  <li className="text-xs text-text-secondary leading-[1.7] pl-3 relative before:content-['1.'] before:absolute before:left-0 before:text-accent before:font-bold">
                    <span className="text-text-primary font-semibold">繼續合作</span> — 維持原有 20% 分潤模式
                  </li>
                  <li className="text-xs text-text-secondary leading-[1.7] pl-3 relative before:content-['2.'] before:absolute before:left-0 before:text-accent before:font-bold">
                    <span className="text-text-primary font-semibold">一次性買斷</span> — 支付 NT$ 70 萬買斷項目，乙方停止一切分潤與權利
                  </li>
                </ul>
              </div>

              {/* 適合對象 */}
              <div className="mb-4">
                <h3 className="text-sm font-bold text-text-primary mb-3">適合加入的對象</h3>
                <ul className="flex flex-col gap-1.5">
                  {[
                    "擁有品牌與預算，但缺乏流量",
                    "認同「先賣人再賣產品」觀念",
                    "想要衝刺曝光並要求有保底成果",
                    "尋求長期利益綁定，而非單次合作",
                  ].map((p) => (
                    <li key={p} className="text-xs text-text-secondary leading-[1.7] pl-3 relative before:content-['✓'] before:absolute before:left-0 before:text-accent">{p}</li>
                  ))}
                </ul>
              </div>

              <Link
                href="https://lin.ee/htTdJSH"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full mt-4 rounded-full bg-accent py-3 text-center text-sm font-semibold text-bg-primary tracking-wider transition-opacity duration-200 hover:opacity-90"
              >
                立即諮詢 PTT 方案
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
