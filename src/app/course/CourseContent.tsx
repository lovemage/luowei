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

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface CourseContentProps {
  faqs: FAQItem[];
}

const tabs = [
  { key: "beginner", label: "初階實戰班" },
  { key: "advanced", label: "進階陪跑班" },
];

const beginnerPainPoints = [
  "腦袋空白 -- 看了幾百部教學，拿起手機腦袋依然一片空白",
  "流量黑洞 -- 影片發了幾十支都沒人看，不知道問題在哪",
  "放棄邊緣 -- 覺得剪輯好難、想腳本好累，最後說「我不適合」",
];

const beginnerConcepts = [
  {
    title: "信任 = 資產",
    desc: "流量不等於現金，建立信任才是真正的資產",
  },
  {
    title: "追求精準客戶",
    desc: "不要盲目追求百萬觀看，你要的是精準客戶",
  },
  {
    title: "工業化流程",
    desc: "做自媒體不是藝術創作，是一套標準化流程",
  },
];

const coreModules = [
  {
    number: "核心一",
    title: "底層邏輯與演算法真相",
    points: [
      "影片 50 秒維持 40% 續存率即可破百萬",
      "黃金前 3 秒法則",
      "MVP 測試法",
    ],
  },
  {
    number: "核心二",
    title: "流量密碼與腳本工程",
    points: ["成本思維", "HVA 結構 (Hook + Value + Action)"],
  },
  {
    number: "核心三",
    title: "工業化產出與 AI 賦能",
    points: ["一支手機打天下", "CapCut 高效 SOP + AI 剪輯"],
  },
  {
    number: "核心四",
    title: "多元變現與終極護城河",
    points: ["直播信任變現、電商團購、業配代言"],
  },
];

const beginnerComparisonItems = [
  { label: "學習方式", left: "YouTube 拼湊", right: "系統化實戰教學" },
  { label: "執行力", left: "三分鐘熱度", right: "團隊督促，保證產出" },
  { label: "變現", left: "不知道怎麼賺錢", right: "提供驗證過的變現項目" },
  { label: "人脈", left: "獨自奮鬥", right: "加入創業者社群" },
];

const successCases = [
  {
    name: "沈耿仲醫師",
    result: "17.3 萬觀看",
    desc: "門診排滿半年",
  },
  {
    name: "Vivian",
    result: "179 萬流量",
    desc: "轉化超過 200 位客戶",
  },
  {
    name: "雲林馬哥",
    result: "半年破千萬",
    desc: "銷售成長 80%",
  },
  {
    name: "車業吳彥祖",
    result: "月成交 100+",
    desc: "",
  },
];

const advancedPainPoints = [
  "學完回家就忘了 -- 沒有持續練習，技能無法內化",
  "撐不下去 -- 人性惰性讓你三天打魚兩天曬網",
];

const trainingTimeline = [
  {
    number: "01",
    title: "線下 3 天集訓",
    desc: "解決「不敢拍」「不會拍」的執行障礙",
  },
  {
    number: "02",
    title: "線上 18 天陪跑",
    desc: "專業團隊全程盯進度，解決「撐不下去」的惰性",
  },
];

const graduationResults = [
  {
    title: "運作中的帳號",
    desc: "具備人設定位、正常營運的自媒體帳號",
  },
  {
    title: "12-24 支影片庫存",
    desc: "可直接發布的高品質影片",
  },
  {
    title: "全流程獨立能力",
    desc: "選題到發布皆能獨立完成",
  },
  {
    title: "吸睛鉤子技術",
    desc: "精通「前 3 秒不被滑掉」的開場技術",
  },
];

const advancedComparisonItems = [
  { label: "時長", left: "單日課程", right: "21 天完整訓練" },
  { label: "形式", left: "知識傳授", right: "實作 + 陪跑" },
  { label: "產出", left: "學會概念", right: "保證起號 + 影片庫存" },
  { label: "價格", left: "NT$ 1,000", right: "NT$ 6,000" },
];

export default function CourseContent({ faqs }: CourseContentProps) {
  const [activeTab, setActiveTab] = useState("beginner");

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
        title="影響力變現課程"
        subtitle="用短影音翻轉人生，從零基礎到商業變現"
      />

      {/* Tab Switcher */}
      <TabSwitcher tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Beginner Tab */}
      {activeTab === "beginner" && (
        <div>
          {/* Pain Points */}
          <PainPointHook
            title="為什麼你很努力，卻還是做不起來？"
            points={beginnerPainPoints}
          />

          {/* Concept Cards */}
          <section className="animate-fade-up mb-12">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
              觀念導正
            </h2>
            <div className="flex flex-col gap-4">
              {beginnerConcepts.map((concept) => (
                <div
                  key={concept.title}
                  className="bg-bg-surface border border-divider rounded-xl p-5"
                >
                  <h3 className="text-sm font-bold text-text-primary mb-1">
                    {concept.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-[1.8]">
                    {concept.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Core Modules */}
          <section className="animate-fade-up mb-12">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
              四大核心模組
            </h2>
            <div className="flex flex-col gap-4">
              {coreModules.map((mod) => (
                <div
                  key={mod.number}
                  className="bg-bg-surface border border-divider rounded-xl p-5"
                >
                  <span className="text-xs font-semibold text-accent tracking-wider">
                    {mod.number}
                  </span>
                  <h3 className="text-sm font-bold text-text-primary mt-2 mb-2">
                    {mod.title}
                  </h3>
                  <ul className="flex flex-col gap-1">
                    {mod.points.map((point) => (
                      <li
                        key={point}
                        className="text-sm text-text-secondary leading-[1.8]"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Comparison Table */}
          <ComparisonTable
            leftLabel="自學"
            rightLabel="加入實戰班"
            items={beginnerComparisonItems}
          />

          {/* Success Cases */}
          <section className="animate-fade-up mb-12">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
              成功案例
            </h2>
            <div className="flex flex-col gap-4">
              {successCases.map((c) => (
                <div key={c.name} className="bg-bg-surface border border-divider rounded-xl p-5">
                  <p className="text-sm font-bold text-text-primary">
                    {c.name}
                  </p>
                  <p className="text-xl font-bold text-accent mt-1">{c.result}</p>
                  {c.desc && (
                    <p className="text-sm text-text-secondary leading-[1.8] mt-1">
                      {c.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Pricing */}
          <section className="animate-fade-up mb-12">
            <div className="bg-bg-surface border border-divider rounded-xl p-6 text-center">
              <p className="text-sm text-text-secondary line-through mb-2">
                原價: NT$ 6,000
              </p>
              <p className="text-accent text-2xl font-bold">
                快閃體驗價: NT$ 1,000
              </p>
            </div>
          </section>

          {/* FAQ */}
          <FAQAccordion title="常見問題" items={faqs} />

          {/* Registration Form */}
          <RegistrationForm courseOptions={["初階實戰班", "進階陪跑班"]} />
        </div>
      )}

      {/* Advanced Tab */}
      {activeTab === "advanced" && (
        <div>
          {/* Pain Points */}
          <PainPointHook
            title="學了，但做不出來？"
            points={advancedPainPoints}
          />

          {/* 21-Day Training Timeline */}
          <section className="animate-fade-up mb-12">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
              21 天訓練結構
            </h2>
            <div className="relative flex flex-col">
              {trainingTimeline.map((step, i) => (
                <div
                  key={step.number}
                  className="relative flex gap-4 pb-8 last:pb-0"
                >
                  {/* Vertical line */}
                  {i < trainingTimeline.length - 1 && (
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
                    <p className="text-sm text-text-secondary leading-[1.8]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Graduation Results */}
          <section className="animate-fade-up mb-12">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
              結營產值
            </h2>
            <div className="flex flex-col gap-4">
              {graduationResults.map((r) => (
                <div key={r.title} className="bg-bg-surface border border-divider rounded-xl p-5">
                  <h3 className="text-sm font-bold text-text-primary mb-1">
                    {r.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-[1.8]">
                    {r.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Monetization + Endorsement */}
          <section className="animate-fade-up mb-12">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
              變現加速 + 專業背書
            </h2>
            <div className="bg-bg-surface border border-divider rounded-xl p-5">
              <p className="text-sm text-text-secondary leading-[1.8]">
                結業學員可獲得由四大合作公司提供的專業背書與變現資源：<span className="text-text-primary">雲林「羅威傳播」</span>、<span className="text-text-primary">台南「共好新創」</span>、<span className="text-text-primary">高雄「非常有趣新媒體」</span>、<span className="text-text-primary">台中「光言工作室」</span>。
              </p>
            </div>
          </section>

          {/* Comparison Table */}
          <ComparisonTable
            leftLabel="初階班"
            rightLabel="進階陪跑班"
            items={advancedComparisonItems}
          />

          {/* Pricing */}
          <section className="animate-fade-up mb-12">
            <div className="bg-bg-surface border border-divider rounded-xl p-6 text-center">
              <p className="text-sm text-text-secondary line-through mb-2">
                原價: NT$ 19,800
              </p>
              <p className="text-accent text-2xl font-bold">
                體驗價: NT$ 6,000
              </p>
            </div>
          </section>

          {/* FAQ */}
          <FAQAccordion title="常見問題" items={faqs} />

          {/* Registration Form */}
          <RegistrationForm
            courseOptions={["初階實戰班", "進階陪跑班"]}
            defaultCourse="進階陪跑班"
          />
        </div>
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
