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
    title: "基礎紮根 -- 數據驅動的品牌成長系統",
    desc: "演算法破解 + 高頻產出",
    details: [
      "深度拆解平台演算法，掌握流量密碼",
      "建立高頻內容產出機制，持續累積品牌聲量",
      "透過數據回饋，快速迭代內容方向",
    ],
  },
  {
    number: "02",
    title: "靈魂定位 -- 人設設定",
    desc: "打造不可取代的品牌人格",
    details: [
      "視覺符號 -- 建立一眼可辨識的品牌視覺體系",
      "語言風格 -- 形成獨特的表達方式與口頭禪",
      "專家權威 -- 透過專業內容建立行業話語權",
      "價值觀輸出 -- 讓受眾認同你的理念，產生深度連結",
    ],
  },
  {
    number: "03",
    title: "模組化執行 -- 4 步驟高效產出",
    desc: "從策略到成品，全流程標準化",
    details: [
      "策略會議 -- 確認月度主題與內容方向",
      "腳本開發 -- 撰寫符合演算法邏輯的爆款腳本",
      "高效拍攝 -- 一次拍攝多支素材，最大化效率",
      "後製精修 -- 節奏、字幕、音效全方位打磨",
    ],
  },
  {
    number: "04",
    title: "目標產值 -- 數據指標",
    desc: "用數字衡量成果",
    details: [
      "流量 100k+ -- 單月曝光突破十萬",
      "互動率 200% -- 留言、分享、收藏全面提升",
      "品牌聯想 -- 讓受眾提到品類就想到你",
      "流量變現 -- 將觀看轉化為實際營收",
    ],
  },
];

const videoWhyChooseUs = [
  {
    title: "一條龍代操",
    points: ["不用剪輯", "不用想腳本", "不用懂演算法"],
    cta: "你專心做老闆",
  },
  {
    title: "業界唯一",
    points: ["保證流量未達標全額退費"],
    cta: "我們承擔風險",
  },
  {
    title: "拒絕素人接案｜實體傳媒公司操盤",
    points: ["數百位學員驗證", "多案例可複製"],
    cta: "",
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

const serviceHighlights = [
  {
    number: "01",
    title: "TikTok 官方 ADS 系統",
    desc: "官方認證二級代理商，直接對接平台資源，廣告效益最大化",
  },
  {
    number: "02",
    title: "流量禮包 — 保證流量（台灣唯一）",
    desc: "業界唯一保證流量方案，未達標全額退費，我們承擔風險",
  },
  {
    number: "03",
    title: "實體傳媒公司操盤",
    desc: "拒絕素人接案，由專業傳媒團隊全程操盤，數百位成功案例可驗證",
  },
];

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
  { label: "點讚評論", desc: "快速累積社交證明，提升內容可信度" },
  { label: "覆蓋式廣告", desc: "大面積曝光，讓品牌訊息無處不在" },
  { label: "精準粉絲", desc: "鎖定目標受眾，獲取高質量追蹤者" },
  { label: "播放量", desc: "可投放數據，保證影片觸及效果" },
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

          {/* Four Service Phases */}
          <section className="animate-fade-up mb-12">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
              四大執行階段
            </h2>
            {phases.map((phase) => (
              <div
                key={phase.number}
                className="bg-bg-surface border border-divider rounded-xl p-5 mb-4"
              >
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-2xl font-bold text-accent tracking-wider">
                    {phase.number}
                  </span>
                  <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-sm font-bold text-text-primary">
                    {phase.title}
                  </h3>
                </div>
                <p className="text-xs text-text-secondary mb-3 leading-[1.8]">
                  {phase.desc}
                </p>
                <ul className="flex flex-col gap-1.5">
                  {phase.details.map((detail) => (
                    <li
                      key={detail}
                      className="text-xs text-text-secondary leading-[1.8] pl-3 relative before:content-['-'] before:absolute before:left-0 before:text-text-secondary/50"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Comparison Table */}
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
                  className="bg-bg-surface border border-divider rounded-xl p-5"
                >
                  <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-sm font-bold text-text-primary mb-3">
                    {item.title}
                  </h3>
                  <ul className="flex flex-col gap-1.5 mb-3">
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
                    <p className="text-sm font-semibold text-accent">
                      👉 {item.cta}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <FAQAccordion title="常見問題" items={videoFaqs} />

          {/* Registration Form */}
          <RegistrationForm
            courseOptions={["品牌啟航方案", "流量爆發方案", "行業壟斷方案"]}
          />

          {/* CTA Section */}
          <section className="animate-fade-up mb-12 rounded-xl bg-bg-surface border border-divider p-6 text-center">
            <p className="font-[family-name:var(--font-noto-serif-tc)] text-sm font-bold text-text-primary mb-3 leading-[1.8]">
              名額有限，每月僅接 3 位深度合作客戶
            </p>
            <Link
              href="https://lin.ee/htTdJSH"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full rounded-full border-2 border-accent bg-transparent py-3.5 text-center text-sm font-semibold text-accent tracking-wider transition-colors duration-200 hover:bg-accent hover:text-bg-primary"
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

          {/* Service Highlights */}
          <section className="animate-fade-up mb-12">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
              核心優勢
            </h2>
            <div className="flex flex-col gap-4">
              {serviceHighlights.map((item) => (
                <div
                  key={item.number}
                  className="bg-bg-surface border border-divider rounded-xl p-5"
                >
                  <span className="text-2xl font-bold text-accent tracking-wider">
                    {item.number}
                  </span>
                  <h3 className="text-sm font-bold text-text-primary mt-2 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-[1.8]">
                    {item.desc}
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
                  {/* Vertical line */}
                  {i < timelineSteps.length - 1 && (
                    <div className="absolute left-4 top-8 bottom-0 border-l-2 border-accent/30" />
                  )}
                  {/* Number circle */}
                  <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-bg-primary text-xs font-bold">
                    {step.number}
                  </div>
                  {/* Content card */}
                  <div className="flex-1 bg-bg-surface border border-divider rounded-xl p-4">
                    <h3 className="text-sm font-bold text-text-primary mb-1">
                      {step.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-[1.8] mb-2">
                      {step.desc}
                    </p>
                    <p className="text-xs text-accent leading-[1.6]">
                      &rarr; {step.result}
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

          {/* Ad Features - 可投放數據 */}
          <section className="animate-fade-up mb-12">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
              可投放數據
            </h2>
            <div className="grid grid-cols-2 gap-3">
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

          {/* FAQ */}
          <FAQAccordion title="常見問題" items={adFaqs} />

          {/* Registration Form */}
          <RegistrationForm courseOptions={["TikTok 廣告投放"]} />

          {/* CTA Section */}
          <section className="animate-fade-up mb-12 text-center">
            <p className="font-[family-name:var(--font-noto-serif-tc)] text-base font-bold text-text-primary leading-[1.8] mb-6">
              廣告投放不需要豪賭，只需要專業的引路人
            </p>
            <a
              href="https://line.me/ti/p/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full rounded-full border-2 border-accent bg-transparent py-3.5 text-center text-sm font-semibold text-accent tracking-wider transition-colors duration-200 hover:bg-accent hover:text-bg-primary"
            >
              預約免費廣告診斷
            </a>
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
