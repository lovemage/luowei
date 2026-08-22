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

/* ── 代操：四大執行階段 ── */

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
    details: ["策略會議 → 腳本開發 → 高效拍攝 → 後製精修", "一次拍攝多支素材，最大化效率"],
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

/* 適合代操的產業 */
const agencyIndustries = [
  "醫美診所",
  "牙醫、植牙",
  "美容 SPA、美睫美甲",
  "餐飲連鎖",
  "健身、瑜伽教室",
  "婚紗、攝影",
  "高端旅遊",
  "實體零售、門市",
];

/* ── 孵化：三種適合共同孵化的生意 ── */

const incubationTypes = [
  {
    key: "賣貨型",
    desc: "有產品、有毛利，缺的是把貨推出去的流量",
    items: ["保健食品", "保養品自有品牌", "輕奢珠寶、精品", "選品電商"],
  },
  {
    key: "人傳人型",
    desc: "靠信任成交，個人聲量直接等於組織規模",
    items: ["直銷體系領導人", "保險、房仲團隊主管", "社群團購主"],
  },
  {
    key: "數位型",
    desc: "交付不受場地限制，多賣一份幾乎沒有邊際成本",
    items: ["線上課程", "知識付費、講師", "線上諮詢", "命理、身心靈"],
  },
];

/* 我們與同行的決定性差異 */
const partnerDifferences = [
  { left: "接案外包廠商", right: "自媒體 IP 孵化公司", emphasis: false },
  { left: "收錢交案，結案走人", right: "共同投資 IP，一起扛一起分", emphasis: false },
  { left: "只有媒體拍攝經驗", right: "具備多產業實體落地投資經驗", emphasis: false },
  { left: "客戶承擔所有風險", right: "流量未達標，全額退費", emphasis: true },
];

const incubationSteps = [
  { number: "01", title: "審核", desc: "確認產業、產能與數字，判斷放大後接不接得住。" },
  { number: "02", title: "試拍", desc: "先拍一輪測水溫，雙方確認鏡頭感與內容方向。" },
  { number: "03", title: "簽約", desc: "由律師擬定客製化合約，把出資、分潤、退場全部寫清楚。" },
];

/* ── 代操 FAQ ── */
const videoBuiltInFAQs = [
  {
    id: "v-faq-1",
    question: "短影音代操包含哪些服務？",
    answer:
      "我們提供一條龍服務：策略規劃、腳本撰寫、專業拍攝、後製剪輯、字幕音效、發布排程、數據追蹤。老闆不用剪輯、不用想腳本、不用懂演算法，只需要出席拍攝即可。",
  },
  {
    id: "v-faq-2",
    question: "每月可以產出多少支影片？",
    answer:
      "菁英 IP 啟航版可依預算選擇 8 萬、12 萬、24 萬三種月費，對應每月 8 支、12 支、24 支短影音（每支 1 萬元）。所有影片皆由專業團隊拍攝製作，品質穩定且符合演算法邏輯。",
  },
  {
    id: "v-faq-3",
    question: "保證流量是怎麼計算的？沒達標怎麼辦？",
    answer:
      "流量以全網年度總觀看次數計算（含 TikTok、Reels、YouTube Shorts 等平台）。菁英 IP 啟航版依月費方案對應保底觀看量：8 萬方案保底 300 萬、12 萬方案保底 600 萬、24 萬方案保底 800 萬。若年度結算未達標，全額退費，業界唯一。",
  },
  {
    id: "v-faq-4",
    question: "我需要自己出鏡嗎？",
    answer:
      "建議老闆娘出鏡建立個人 IP，這是打造品牌信任最有效的方式。我們會提供完整的腳本提詞卡、表情引導、現場指導，即使完全沒有拍攝經驗也能自然表現。如果真的無法出鏡，我們也能規劃純產品/素材類的內容方向。",
  },
  {
    id: "v-faq-5",
    question: "多久可以看到成效？",
    answer:
      "通常第一個月即可看到流量數據的明顯提升。2-3 個月開始建立穩定的品牌認知與粉絲基礎。6 個月後進入流量變現階段，開始將觀看轉化為實際營收。我們每月提供完整數據報表追蹤進度。",
  },
  {
    id: "v-faq-6",
    question: "跟自己請一個剪輯師比，哪個划算？",
    answer:
      "請一個全職剪輯師月薪約 3-5 萬，但你還需要企劃、攝影、營運人員，加起來每月人事成本超過 10 萬，還不含設備與場地。我們的菁英 IP 啟航版可依預算選擇 8 萬、12 萬、24 萬（每支 1 萬元）並涵蓋完整團隊執行，且保證流量成效，風險更低、效率更高。",
  },
  {
    id: "v-faq-7",
    question: "合約期間是多長？可以中途終止嗎？",
    answer:
      "保證流量方案為年度合約（12 個月），因為品牌 IP 的建立需要時間累積。合約明確列出雙方權利義務，若因不可抗力因素需提前終止，可依合約條款協商處理。",
  },
  {
    id: "v-faq-8",
    question: "為什麼只服務女性企業主？",
    answer:
      "我們把資源集中在真正擅長的族群。羅威的內容方法論、鏡頭語言、選題角度與合作的產業鏈，都是圍繞女性客群與女性經營者長出來的，做熟悉的題目才能穩定產出成果。因此短影音製作（代操與孵化）目前只承接女性企業主的案子。",
  },
];

/* ── 孵化 FAQ ── */
const incubationFAQs = [
  {
    id: "i-faq-1",
    question: "短影音孵化跟一般代操差在哪？",
    answer:
      "代操是你付月費、我們交付影片與流量，成效由合約的保底條款保障。孵化則是我們各出 50% 預算一起投資這個 IP，我們從延伸出來的淨利潤分潤 30%。做不起來，我們拿不到錢——利益直接綁在一起。",
  },
  {
    id: "i-faq-2",
    question: "各出 50% 預算，我的公司會被干涉嗎？",
    answer:
      "不會。你保留 100% 公司股權（一毛不動）與 100% 經營決策權（絕不干涉）。我們投入的是預算與製作能量，不是股權，也不進你的公司治理。",
  },
  {
    id: "i-faq-3",
    question: "什麼樣的生意適合孵化？",
    answer:
      "只做三種：賣貨型（保健食品、保養品自有品牌、輕奢珠寶精品、選品電商）、人傳人型（直銷體系領導人、保險與房仲團隊主管、社群團購主）、數位型（線上課程、知識付費講師、線上諮詢、命理身心靈）。共通點是產能不被場地與人力綁住，流量放大時收入才跟得上，這樣分潤對雙方才有意義。",
  },
  {
    id: "i-faq-4",
    question: "我是實體服務業，為什麼不適合孵化？",
    answer:
      "實體服務的產能有天花板——一天能看幾個客人、一間店能坐幾桌，是固定的。流量再大，接不住就是浪費。這種生意用代操把人帶進來，比分潤划算得多，我們會直接建議你走代操方案。",
  },
  {
    id: "i-faq-5",
    question: "分潤怎麼算？要分多久？",
    answer:
      "從這個 IP 延伸出來的淨利潤，我方抽成 30%。合約為一年期，期滿後你有優先選擇權：繼續合作維持原分潤，或一次性買斷結束分潤與所有權利。細節會在律師擬定的客製化合約中逐條寫明。",
  },
  {
    id: "i-faq-6",
    question: "流程要走多久？",
    answer:
      "審核 → 試拍 → 簽約。審核通常一週內完成，試拍安排在兩週內，雙方確認方向後才進簽約。整個前置流程大約一個月，正式啟動後以年度為單位執行。",
  },
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
  incubationFaqs: FAQ[];
  heroImageUrl: string;
  heroImageUrls?: string[];
}

const tabs = [
  { key: "video", label: "短影音代操" },
  { key: "incubation", label: "短影音孵化" },
];

const elitePricingOptions = [
  {
    id: "80000",
    label: "8 萬",
    monthlyPrice: 80000,
    videosPerMonth: 8,
    yearlyPrice: 960000,
    trafficGuarantee: "保底 300 萬次觀看/年",
  },
  {
    id: "120000",
    label: "12 萬",
    monthlyPrice: 120000,
    videosPerMonth: 12,
    yearlyPrice: 1440000,
    trafficGuarantee: "保底 600 萬次觀看/年",
  },
  {
    id: "240000",
    label: "24 萬",
    monthlyPrice: 240000,
    videosPerMonth: 24,
    yearlyPrice: 2880000,
    trafficGuarantee: "保底 800 萬次觀看/年",
  },
];

export default function ShortVideoContent({
  videoFaqs,
  incubationFaqs,
  heroImageUrl,
  heroImageUrls,
}: ShortVideoContentProps) {
  const [activeTab, setActiveTab] = useState("video");
  const [selectedEliteOptionId, setSelectedEliteOptionId] = useState("120000");
  const selectedEliteOption =
    elitePricingOptions.find((option) => option.id === selectedEliteOptionId) ?? elitePricingOptions[1];

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
      {/* Back link */}
      <Link
        href="/"
        className="animate-fade-in self-start text-sm text-text-secondary hover:text-accent transition-colors mb-6"
      >
        &larr; 返回
      </Link>

      {/* Hero */}
      <HeroSection
        title="短影音代操與短影音孵化"
        subtitle="兩種合作模式：付月費交給我們做，或各出一半預算一起投資一個 IP。"
        imageUrl={heroImageUrl}
        imageUrls={heroImageUrls}
      />

      {/* 服務對象宣告 */}
      <section className="animate-fade-up mb-10 rounded-xl bg-accent/10 border border-accent/30 p-5">
        <p className="text-[10px] tracking-widest text-accent/60 uppercase mb-2">服務對象</p>
        <h2 className="text-base font-bold text-accent mb-2">只做女性企業主的短影音</h2>
        <p className="text-xs text-text-secondary leading-[1.9]">
          羅威的內容方法論、鏡頭語言與合作的產業鏈，都是圍繞女性客群長出來的。
          短影音製作（代操與孵化）目前只承接女性企業主的案子，男性客戶的製作需求暫不受理；
          若您需要的是廣告投放，仍歡迎透過
          <Link href="/short-video-ad" className="text-accent underline decoration-accent/40 mx-1">
            廣告投放
          </Link>
          頁面與我們聯繫。
        </p>
      </section>

      {/* Tab Switcher */}
      <TabSwitcher tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* ══════════ 短影音代操 ══════════ */}
      {activeTab === "video" && (
        <>
          <PainPointHook
            title="你是否也面臨這些困境？"
            points={[
              "空有產品卻沒流量 -- 廣告費越來越貴，投報率卻直線下滑",
              "想做影音卻沒方向 -- 拍了幾支片卻沒人看，完全不知道演算法要什麼",
              "團隊人力成本太高 -- 找企劃、攝影、剪輯、營運，每月薪資支出驚人",
              "有流量卻無法變現 -- 讚數很多，但私訊詢問度卻是零",
            ]}
          />

          {/* Four Service Phases */}
          <section className="animate-fade-up mb-16">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-8">
              四大執行階段
            </h2>
            <div className="flex flex-col gap-10">
              {phases.map((phase) => (
                <div key={phase.number} className="relative">
                  <span className="text-5xl font-black text-accent/15 absolute -top-2 -left-1 leading-none select-none">
                    {phase.number}
                  </span>
                  <div className="pl-12">
                    <h3 className="text-base font-bold text-text-primary mb-1">{phase.title}</h3>
                    <p className="text-xs text-text-secondary/70 mb-3">{phase.subtitle}</p>
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

          {/* 適合代操的產業 */}
          <section className="animate-fade-up mb-16">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-2">
              適合代操的產業
            </h2>
            <p className="text-xs text-text-secondary/60 mb-5">
              以實體服務為主、產能有上限的生意
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {agencyIndustries.map((industry) => (
                <div
                  key={industry}
                  className="bg-bg-surface border border-divider rounded-lg px-3 py-3 text-center text-xs font-medium text-text-primary"
                >
                  {industry}
                </div>
              ))}
            </div>
            <p className="mt-4 text-[11px] text-text-secondary/60 leading-[1.9]">
              產能有天花板的生意，用代操把人帶進來，比分潤划算。想走利益綁定的合作，請看
              <button
                type="button"
                onClick={() => setActiveTab("incubation")}
                className="text-accent underline decoration-accent/40 mx-1"
              >
                短影音孵化
              </button>
              。
            </p>
          </section>

          <ComparisonTable
            title="為什麼選擇專業代操？"
            leftLabel="自己做"
            rightLabel="交給我們"
            items={videoComparisonItems}
          />

          {/* Why Choose Us */}
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
                      : "bg-bg-surface border border-divider rounded-xl p-5"
                  }
                >
                  <h3
                    className={`font-[family-name:var(--font-noto-serif-tc)] font-bold mb-2 ${
                      item.highlight ? "text-base text-accent" : "text-sm text-text-primary"
                    }`}
                  >
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

          {/* 方案 */}
          <section className="animate-fade-up mb-16">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-2">
              方案選擇
            </h2>
            <p className="text-xs text-text-secondary/60 mb-5">選擇最適合您的短影音代操方案</p>

            <div className="bg-accent/10 border border-accent/30 rounded-xl p-5">
              <p className="text-[10px] tracking-widest text-accent/60 uppercase mb-2">保證流量方案</p>
              <h3 className="text-base font-bold text-accent mb-1">菁英 IP 啟航版</h3>
              <p className="text-xs text-text-secondary/60 mb-4">一版整合三種價位自由選擇</p>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {elitePricingOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedEliteOptionId(option.id)}
                    className={`rounded-md border px-2 py-1.5 text-xs font-semibold transition-colors ${
                      selectedEliteOptionId === option.id
                        ? "bg-accent border-accent text-bg-primary"
                        : "border-divider text-text-secondary hover:border-accent/40 hover:text-accent"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <p className="mb-1">
                <span className="text-3xl font-black text-accent">
                  ${selectedEliteOption.monthlyPrice.toLocaleString()}
                </span>
                <span className="text-xs text-text-secondary/60 ml-1">/ 月</span>
              </p>
              <p className="text-[11px] text-text-secondary/50 mb-4">
                年度：${selectedEliteOption.yearlyPrice.toLocaleString()}（含稅）
              </p>

              <ul className="flex flex-col gap-1.5">
                {[
                  selectedEliteOption.trafficGuarantee,
                  `每月 ${selectedEliteOption.videosPerMonth} 支短影音（每支 1 萬元）`,
                  "IP 定位 + 爆款腳本",
                  "精準廣告投放操盤",
                  "未達標全額退費",
                ].map((p) => (
                  <li
                    key={p}
                    className="text-[11px] text-text-secondary leading-[1.7] pl-3 relative before:content-['◆'] before:absolute before:left-0 before:text-accent/40 before:text-[10px]"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* 保底流量對照 */}
            <div className="mt-4 grid grid-cols-3 gap-2.5">
              {elitePricingOptions.map((option) => (
                <div
                  key={option.id}
                  className="bg-bg-surface border border-divider rounded-lg px-2 py-3 text-center"
                >
                  <p className="text-[11px] text-text-secondary/60 mb-1">{option.label}／月</p>
                  <p className="text-base font-black text-accent leading-none">
                    {option.trafficGuarantee.replace("保底 ", "").replace("次觀看/年", "")}
                  </p>
                  <p className="text-[10px] text-text-secondary/50 mt-1">保底觀看/年</p>
                </div>
              ))}
            </div>
          </section>

          <FAQAccordion title="常見問題" items={[...videoBuiltInFAQs, ...videoFaqs]} />

          <RegistrationForm
            pageSlug="short-video"
            courseOptions={[
              "菁英 IP 啟航版（8 支 / $80,000/月）",
              "菁英 IP 啟航版（12 支 / $120,000/月）",
              "菁英 IP 啟航版（24 支 / $240,000/月）",
            ]}
          />

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

      {/* ══════════ 短影音孵化 ══════════ */}
      {activeTab === "incubation" && (
        <>
          <PainPointHook
            title="為什麼會有孵化這個模式？"
            points={[
              "收錢了事的過客心態 -- 行銷公司收完錢就結案，做不好說是產品問題，做好了說是自己厲害",
              "風險全部壓在你身上 -- 預算你出、時間你花、賣不動也是你自己扛",
              "找不到真的懂生意的人 -- 只會拍片的團隊，不知道你的毛利、庫存與客單怎麼算",
            ]}
          />

          {/* 核心理念 */}
          <section className="animate-fade-up mb-12">
            <div className="bg-accent/10 border border-accent/30 rounded-xl p-6">
              <p className="text-[10px] tracking-widest text-accent/60 uppercase mb-2">合夥人模式</p>
              <h2 className="text-lg font-bold text-accent mb-3">什麼是短影音孵化？</h2>
              <p className="text-sm text-text-secondary leading-[1.9] mb-3">
                我們不再只是領薪水的乙方，而是轉成
                <span className="text-accent font-semibold">領分紅的合夥人</span>
                ：總預算雙方各出 50%，一年之內把你的 IP 做起來，
                我方從延伸出來的淨利潤抽成 30%。
              </p>
              <p className="text-sm text-text-primary font-semibold leading-[1.9]">
                「我沒做起來，我也拿不到錢。」
              </p>
            </div>
          </section>

          {/* 各出 50% */}
          <section className="animate-fade-up mb-16">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-2">
              真正的利益共同體
            </h2>
            <p className="text-xs text-text-secondary/60 mb-6">各出 50% 預算，一起扛一起分</p>

            {/* 50/50 視覺 */}
            <div className="flex h-3 w-full overflow-hidden rounded-full mb-6">
              <div className="w-1/2 bg-bg-surface border border-divider border-r-0" />
              <div className="w-1/2 bg-accent" />
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="bg-bg-surface border border-divider rounded-xl p-5">
                <p className="text-[10px] tracking-widest text-text-secondary/50 uppercase mb-2">
                  你保留的
                </p>
                <ul className="flex flex-col gap-1.5">
                  {["100% 公司股權（一毛不動）", "100% 經營決策權（絕不干涉）"].map((p) => (
                    <li
                      key={p}
                      className="text-sm text-text-primary font-medium leading-[1.8] pl-4 relative before:content-['●'] before:absolute before:left-0 before:text-text-secondary/40 before:text-[8px] before:top-[7px]"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-accent/10 border border-accent/30 rounded-xl p-5">
                <p className="text-[10px] tracking-widest text-accent/60 uppercase mb-2">我投入的</p>
                <ul className="flex flex-col gap-1.5">
                  {[
                    "50% 真金白銀預算支援",
                    "頂級企劃、腳本、拍攝、剪輯全到位",
                    "多產業實體落地經驗，一起看數字做決策",
                  ].map((p) => (
                    <li
                      key={p}
                      className="text-sm text-text-primary font-medium leading-[1.8] pl-4 relative before:content-['●'] before:absolute before:left-0 before:text-accent before:text-[8px] before:top-[7px]"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-bg-surface border border-divider p-5 text-center">
              <p className="text-sm font-bold text-text-primary leading-[1.9]">
                「延伸出的淨利潤我方抽成
                <span className="text-accent"> 30%</span>。
                <br />
                我沒做起來，我也拿不到錢。」
              </p>
            </div>
          </section>

          {/* 與同行的決定性差異 */}
          <section className="animate-fade-up mb-16">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
              我們與同行的決定性差異
            </h2>
            <div className="overflow-hidden rounded-lg border border-divider">
              <div className="grid grid-cols-[1fr_1fr] bg-bg-surface">
                <div className="px-3 py-3 text-center text-xs font-semibold text-text-secondary/60 border-r border-divider">
                  傳統行銷公司
                </div>
                <div className="px-3 py-3 text-center text-xs font-semibold text-accent">
                  羅威傳媒（合夥人模式）
                </div>
              </div>
              {partnerDifferences.map((row, i) => (
                <div
                  key={row.left}
                  className={`grid grid-cols-[1fr_1fr] ${
                    i < partnerDifferences.length - 1 ? "border-b border-divider" : ""
                  }`}
                >
                  <div className="px-3 py-3.5 text-xs text-text-secondary/60 border-r border-divider leading-[1.6]">
                    {row.left}
                  </div>
                  <div
                    className={`px-3 py-3.5 text-xs leading-[1.6] ${
                      row.emphasis ? "text-accent font-bold" : "text-text-primary font-medium"
                    }`}
                  >
                    {row.right}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 適合共同孵化的三種生意 */}
          <section className="animate-fade-up mb-16">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-2">
              適合共同孵化的三種生意
            </h2>
            <p className="text-xs text-text-secondary/60 mb-6">孵化只做這三類，其餘一律建議走代操</p>

            <div className="flex flex-col gap-4">
              {incubationTypes.map((type) => (
                <div key={type.key} className="bg-bg-surface border border-divider rounded-xl p-5">
                  <h3 className="text-base font-bold text-accent mb-1">{type.key}</h3>
                  <p className="text-xs text-text-secondary/70 leading-[1.8] mb-4">{type.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {type.items.map((item) => (
                      <span
                        key={item}
                        className="border border-divider rounded-md px-2.5 py-1.5 text-[11px] text-text-primary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl bg-accent/10 border border-accent/30 p-5">
              <p className="text-[10px] tracking-widest text-accent/60 uppercase mb-2">共通點</p>
              <p className="text-xs text-text-secondary leading-[1.9]">
                產能不被場地與人力綁住。流量放大，收入才跟得上——這樣分潤對雙方才有意義。
              </p>
            </div>
          </section>

          {/* 合作流程 */}
          <section className="animate-fade-up mb-16">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
              合作流程
            </h2>
            <div className="relative flex flex-col">
              {incubationSteps.map((step, i) => (
                <div key={step.number} className="relative flex gap-4 pb-8 last:pb-0">
                  {i < incubationSteps.length - 1 && (
                    <div className="absolute left-4 top-8 bottom-0 border-l-2 border-accent/30" />
                  )}
                  <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-bg-primary text-xs font-bold">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-text-primary mb-1">{step.title}</h3>
                    <p className="text-sm text-text-secondary leading-[1.8]">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-text-secondary/60 leading-[1.9]">
              與律師訂製客製化合約，保障雙方權益。流量未達標則合約不生效。
            </p>
          </section>

          {/* 期滿退場 */}
          <section className="animate-fade-up mb-16">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
              期滿退場機制
            </h2>
            <p className="text-xs text-text-secondary leading-[1.9] mb-4">
              合約期滿一年後，甲方擁有優先選擇權：
            </p>
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-bg-surface border border-divider rounded-xl p-5">
                <p className="text-sm font-bold text-text-primary mb-1">1. 繼續合作</p>
                <p className="text-xs text-text-secondary leading-[1.8]">維持原有淨利潤分潤模式。</p>
              </div>
              <div className="bg-bg-surface border border-divider rounded-xl p-5">
                <p className="text-sm font-bold text-text-primary mb-1">2. 一次性買斷</p>
                <p className="text-xs text-text-secondary leading-[1.8]">
                  依合約約定的買斷金額結清，乙方停止一切分潤與權利。
                </p>
              </div>
            </div>
          </section>

          {/* 適合對象 */}
          <section className="animate-fade-up mb-16">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
              適合加入的對象
            </h2>
            <ul className="flex flex-col gap-2">
              {[
                "女性企業主，且生意屬於賣貨型、人傳人型或數位型",
                "擁有品牌與預算，但缺乏流量",
                "認同「先賣人再賣產品」觀念",
                "想要衝刺曝光並要求有保底成果",
                "尋求長期利益綁定，而非單次合作",
              ].map((p) => (
                <li
                  key={p}
                  className="text-sm text-text-secondary leading-[1.9] pl-4 relative before:content-['✓'] before:absolute before:left-0 before:text-accent"
                >
                  {p}
                </li>
              ))}
            </ul>
          </section>

          <FAQAccordion title="常見問題" items={[...incubationFAQs, ...incubationFaqs]} />

          <RegistrationForm
            pageSlug="short-video-incubation"
            courseOptions={["短影音孵化 — 賣貨型", "短影音孵化 — 人傳人型", "短影音孵化 — 數位型"]}
          />

          <section className="animate-fade-up mb-12 rounded-xl bg-accent/10 border border-accent/30 p-6 text-center">
            <p className="text-xs text-text-secondary/60 mb-3 tracking-wide">
              孵化名額需經審核，每季僅開放少數合作
            </p>
            <Link
              href="https://lin.ee/htTdJSH"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full rounded-full bg-accent py-3.5 text-center text-sm font-semibold text-bg-primary tracking-wider transition-opacity duration-200 hover:opacity-90"
            >
              申請孵化資格審核
            </Link>
          </section>
        </>
      )}

      {/* Back link bottom */}
      <Link href="/" className="self-start text-sm text-text-secondary hover:text-accent transition-colors">
        &larr; 返回首頁
      </Link>

      <Footer />
    </main>
  );
}
