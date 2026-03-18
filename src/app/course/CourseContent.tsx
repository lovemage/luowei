"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import PainPointHook from "@/components/PainPointHook";
import ComparisonTable from "@/components/ComparisonTable";
import FAQAccordion from "@/components/FAQAccordion";
import RegistrationForm from "@/components/RegistrationForm";
import TabSwitcher from "@/components/TabSwitcher";
import CaseLogoWall from "@/components/CaseLogoWall";
import CaseDetailModal from "@/components/CaseDetailModal";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface CaseItem {
  id: number;
  slug: string;
  name: string;
  avatarUrl: string;
  category: string;
  title: string;
  bio: string;
  stats: Record<string, string>;
}

interface CourseContentProps {
  faqs: FAQItem[];
}

const tabs = [
  { key: "course", label: "短影音影響力變現課程" },
  { key: "vip", label: "VIP 課程" },
];

const painPoints = [
  "腦袋空白 -- 看了幾百部教學，拿起手機腦袋依然一片空白",
  "流量黑洞 -- 影片發了幾十支都沒人看，不知道問題在哪",
  "放棄邊緣 -- 覺得剪輯好難、想腳本好累，最後說「我不適合」",
  "學完就忘 -- 沒有持續練習，技能無法內化",
  "撐不下去 -- 人性惰性讓你三天打魚兩天曬網",
];

const coreModules = [
  {
    number: "核心一",
    title: "底層邏輯與演算法真相",
    points: [
      "不用精確到每一秒每一幀，掌握關鍵節奏就好",
      "黃金前 3 秒法則 — 讓觀眾停下手指",
      "MVP 測試法 — 用最小成本驗證爆款方向",
    ],
  },
  {
    number: "核心二",
    title: "流量密碼與腳本工程",
    points: [
      "成本思維 — 用最少資源產出最大效益",
      "HVA 結構 (Hook + Value + Action)",
      "每個素人都能做 IP，不需要複雜工具",
    ],
  },
  {
    number: "核心三",
    title: "基礎拍攝 · 剪輯 · 運營全方位實戰",
    points: [
      "一支手機就能打天下",
      "CapCut 高效 SOP + AI 輔助剪輯",
      "學完就能獨立運作，出去不會被割韭菜",
    ],
  },
  {
    number: "核心四",
    title: "多元變現與終極護城河",
    points: [
      "直播信任變現、電商團購、業配代言",
      "從觀看轉化為實際營收的完整閉環",
    ],
  },
];

const comparisonItems = [
  { label: "學習方式", left: "YouTube 拼湊", right: "系統化實戰教學" },
  { label: "執行力", left: "三分鐘熱度", right: "團隊督促，保證產出" },
  { label: "變現", left: "不知道怎麼賺錢", right: "提供驗證過的變現項目" },
  { label: "人脈", left: "獨自奮鬥", right: "加入創業者社群" },
  { label: "時長", left: "單日課程", right: "21 天完整訓練" },
  { label: "形式", left: "知識傳授", right: "實作 + 老師全程陪跑" },
  { label: "產出", left: "學會概念", right: "保證起號 + 影片庫存" },
];

const trainingTimeline = [
  {
    number: "01",
    title: "線下 3 天集訓",
    desc: "專業場域 + 老師面對面指導，解決「不敢拍」「不會拍」的執行障礙",
  },
  {
    number: "02",
    title: "線上 18 天陪跑",
    desc: "專業團隊全程盯進度，每天有老師陪、有場域練、有夥伴互督",
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
    desc: "選題到發布皆能獨立完成，不再依賴任何人",
  },
  {
    title: "吸睛鉤子技術",
    desc: "精通「前 3 秒不被滑掉」的開場技術",
  },
];

const courseFAQs = [
  {
    id: "faq-1",
    question: "沒有人陪跑怎麼辦？",
    answer: "我們的課程包含 21 天完整訓練，其中 18 天線上陪跑期間，每天都有專業老師在線指導、批改作業、解答問題，絕不是上完課就丟給你自己摸索。",
  },
  {
    id: "faq-2",
    question: "沒有場域可以練習？",
    answer: "線下 3 天集訓提供專業拍攝場域與設備，線上期間只需要一支手機就能完成所有練習，我們會教你如何在任何地方都能產出好內容。",
  },
  {
    id: "faq-3",
    question: "沒有老師陪怎麼辦？",
    answer: "全程都有老師陪！3 天線下面對面指導 + 18 天線上每日追蹤，老師會主動關心你的進度，不是你找老師，是老師找你。",
  },
];

export default function CourseContent({ faqs }: CourseContentProps) {
  const [activeTab, setActiveTab] = useState("course");
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);

  useEffect(() => {
    fetch("/api/cases")
      .then((res) => res.json())
      .then((data) => setCases(data))
      .catch(() => {});
  }, []);

  const allFaqs = [...courseFAQs, ...faqs];

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
        title="短影音影響力變現課程"
        subtitle="每個素人都能做 IP，只需要肯學習"
      />

      {/* Tab Switcher */}
      <TabSwitcher tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      {/* Main Course Tab */}
      {activeTab === "course" && (
        <div>
          {/* Why this course exists */}
          <section className="animate-fade-up mb-12">
            <div className="bg-bg-surface border border-divider rounded-xl p-6">
              <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-base font-bold text-gold-shine mb-4">
                為什麼我們開這堂課？
              </h2>
              <div className="flex flex-col gap-3 text-sm text-text-secondary leading-[1.8]">
                <p>
                  不是每個人都有預算請專業團隊代操自媒體。許多人想找我們服務，但我們心有餘而力不足，沒辦法服務到每一個人。
                </p>
                <p>
                  所以我們決定把<span className="text-accent">數百位素人成功的經歷與案例</span>，系統化地教會每一位參加者。不需要複雜的工具、不需要專業背景，只需要一支手機和一顆肯學習的心。
                </p>
                <p className="text-accent font-semibold">
                  學完之後，你就能獨立運作 — 基礎剪輯、拍攝、運營，全方位搞定。
                </p>
              </div>
            </div>
          </section>

          {/* Pain Points */}
          <PainPointHook
            title="為什麼你很努力，卻還是做不起來？"
            points={painPoints}
          />

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
                        className="text-sm text-text-secondary leading-[1.8] pl-3 relative before:content-['✓'] before:absolute before:left-0 before:text-accent"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

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
                  {i < trainingTimeline.length - 1 && (
                    <div className="absolute left-4 top-8 bottom-0 border-l-2 border-accent/30" />
                  )}
                  <div className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-bg-primary text-xs font-bold">
                    {step.number}
                  </div>
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

          {/* Comparison Table */}
          <ComparisonTable
            leftLabel="自學"
            rightLabel="加入課程"
            items={comparisonItems}
          />

          {/* Success Cases */}
          <section className="animate-fade-up mb-12">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-4">
              成功案例
            </h2>
            <p className="text-xs text-text-secondary/60 mb-6 tracking-wide">
              羅威傳媒共同出品
            </p>
            {cases.length > 0 ? (
              <CaseLogoWall cases={cases} onSelect={setSelectedCase} />
            ) : (
              <p className="text-sm text-text-secondary">載入中...</p>
            )}
          </section>

          {/* Pricing */}
          <section className="animate-fade-up mb-12">
            <div className="bg-bg-surface border border-divider rounded-xl p-6 text-center">
              <p className="text-sm text-text-secondary mb-2">
                快閃體驗票價
              </p>
              <p className="text-accent text-2xl font-bold">
                NT$ 1,000
              </p>
            </div>
          </section>

          {/* FAQ */}
          <FAQAccordion title="常見問題" items={allFaqs} />

          {/* Registration Form */}
          <RegistrationForm courseOptions={["短影音影響力變現課程"]} />
        </div>
      )}

      {/* VIP Tab */}
      {activeTab === "vip" && (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="bg-bg-surface border border-divider rounded-xl p-8 text-center max-w-sm">
            <p className="text-2xl mb-4">🚧</p>
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-3">
              VIP 課程
            </h2>
            <p className="text-sm text-text-secondary leading-[1.8]">
              內容建置中，敬請期待
            </p>
          </div>
        </div>
      )}

      <CaseDetailModal caseData={selectedCase} onClose={() => setSelectedCase(null)} />

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
