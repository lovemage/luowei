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

export default function ShortVideoContent({
  videoFaqs,
  adFaqs,
  heroImageUrl,
  heroImageUrls,
}: ShortVideoContentProps) {
  const [activeTab, setActiveTab] = useState("video");

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
        title="短影音與廣告服務"
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

          {/* ── Pricing Plans ── */}
          <section className="animate-fade-up mb-16">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-2">
              方案選擇
            </h2>
            <p className="text-xs text-text-secondary/60 mb-8">選擇最適合您的短影音代操方案</p>

            {/* Plan 1: IP 保證流量方案 */}
            <div className="mb-6">
              <p className="text-[10px] tracking-widest text-accent/60 uppercase mb-4">保證流量 · 老闆 IP 方案</p>

              {/* 菁英版 */}
              <div className="border-l-2 border-divider pl-5 py-4 mb-6">
                <h3 className="text-sm font-bold text-text-primary mb-1">菁英 IP 啟航版</h3>
                <p className="text-xs text-text-secondary/60 mb-3">建立品牌權威門面</p>
                <p className="mb-3">
                  <span className="text-2xl font-black text-accent">$60,000</span>
                  <span className="text-xs text-text-secondary/60 ml-1">/ 月</span>
                </p>
                <p className="text-[11px] text-text-secondary/50 mb-3">年度總價：$720,000（含稅）</p>
                <ul className="flex flex-col gap-1">
                  {["全網年度保底 600 萬次觀看", "每月 8 支短影音", "建立品牌權威門面", "精準打擊潛在受眾"].map((p) => (
                    <li key={p} className="text-xs text-text-secondary leading-[1.8] pl-3 relative before:content-['◆'] before:absolute before:left-0 before:text-accent/40 before:text-[10px]">{p}</li>
                  ))}
                </ul>
              </div>

              {/* 霸主版 — MOST POPULAR */}
              <div className="bg-accent/10 border border-accent/30 rounded-xl p-5 mb-6 relative">
                <span className="absolute -top-3 left-4 bg-accent text-bg-primary text-[10px] font-bold px-3 py-1 rounded-full tracking-wider">MOST POPULAR</span>
                <h3 className="text-base font-bold text-accent mt-2 mb-1">霸主 IP 領航版</h3>
                <p className="text-xs text-text-secondary/60 mb-3">聲量全面覆蓋，壟斷市場視線</p>
                <p className="mb-3">
                  <span className="text-3xl font-black text-accent">$90,000</span>
                  <span className="text-xs text-text-secondary/60 ml-1">/ 月</span>
                </p>
                <p className="text-[11px] text-text-secondary/50 mb-3">年度總價：$1,080,000（含稅）</p>
                <ul className="flex flex-col gap-1">
                  {[
                    "年度保底 1,200 萬次觀看",
                    "每月 12 支短影音",
                    "精準廣告投放操盤",
                    "爆款話題製造",
                    "人設深度刻畫",
                    "聲量全面覆蓋目標市場",
                    "專業投流策略，流量轉化為詢問單",
                  ].map((p) => (
                    <li key={p} className="text-xs text-text-secondary leading-[1.8] pl-3 relative before:content-['◆'] before:absolute before:left-0 before:text-accent/40 before:text-[10px]">{p}</li>
                  ))}
                </ul>
              </div>

              {/* 集團版 */}
              <div className="border-l-2 border-accent pl-5 py-4 mb-6">
                <h3 className="text-base font-bold text-text-primary mb-1">行業頂峰 集團版</h3>
                <p className="text-xs text-text-secondary/60 mb-3">打造行業天花板級曝光量</p>
                <p className="mb-3">
                  <span className="text-3xl font-black text-accent">$216,000</span>
                  <span className="text-xs text-text-secondary/60 ml-1">/ 月</span>
                </p>
                <p className="text-[11px] text-text-secondary/50 mb-3">年度總價：$2,600,000（含稅）</p>
                <ul className="flex flex-col gap-1">
                  {[
                    "年度保底 3,000 萬次觀看",
                    "每月 20 支短影音",
                    "專業 IP 定位、爆款腳本建模",
                    "每月三日專業拍攝",
                    "矩陣式鋪量策略",
                    "全網熱點捕捉、最高規格流量監控",
                    "商業閉環變現建議",
                    "行業領袖地位打造",
                    "未達標全額退費保證",
                  ].map((p) => (
                    <li key={p} className="text-xs text-text-secondary leading-[1.8] pl-3 relative before:content-['◆'] before:absolute before:left-0 before:text-accent/40 before:text-[10px]">{p}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Plan 2: 對賭企業方案 */}
            <div className="bg-bg-surface border border-divider rounded-xl p-5 mb-6">
              <p className="text-[10px] tracking-widest text-accent/60 uppercase mb-2">對賭企業方案</p>
              <h3 className="text-base font-bold text-text-primary mb-2">PTT 共擔合作模式</h3>
              <p className="text-sm text-text-secondary leading-[1.8] mb-4">
                總預算由羅威與企業各出一半（成本價計算），同一條船上共同經營。一年內打造 IP，依據財務報表淨利 20-30% 分潤，一年後自動續約。
              </p>
              <div className="border-t border-divider pt-4">
                <p className="text-xs text-text-secondary/70 leading-[1.8]">
                  需先審核後試拍 → 簽約 → 價格為總預算的 50%（依本公司評估所有成本細項後雙方討論）
                </p>
              </div>
            </div>

            {/* Plan 3: 體驗版 */}
            <div className="border-l-2 border-divider pl-5 py-4">
              <p className="text-[10px] tracking-widest text-accent/60 uppercase mb-2">體驗版</p>
              <h3 className="text-sm font-bold text-text-primary mb-1">六六大順方案</h3>
              <p className="text-xs text-text-secondary/60 mb-3">先體驗，再決定</p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-2xl font-black text-accent">6</span>
                <span className="text-sm text-text-secondary">支影片</span>
                <span className="text-text-secondary/30 mx-1">·</span>
                <span className="text-lg font-bold text-accent">$12,000</span>
                <span className="text-xs text-text-secondary/60">/ 支</span>
              </div>
              <p className="text-[11px] text-text-secondary/50">
                總計 $72,000 · 適合想先試水溫的企業主
              </p>
            </div>
          </section>

          {/* FAQ */}
          <FAQAccordion title="常見問題" items={videoFaqs} />

          {/* Registration Form */}
          <RegistrationForm
            courseOptions={[
              "菁英 IP 啟航版（$60,000/月）",
              "霸主 IP 領航版（$90,000/月）",
              "行業頂峰 集團版（$216,000/月）",
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
          <FAQAccordion title="常見問題" items={adFaqs} />

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
    </main>
  );
}
