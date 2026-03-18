"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import PainPointHook from "@/components/PainPointHook";
import ComparisonTable from "@/components/ComparisonTable";
import FAQAccordion from "@/components/FAQAccordion";
import RegistrationForm from "@/components/RegistrationForm";
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

const painPoints = [
  "腦袋空白 -- 看了幾百部教學，拿起手機腦袋依然一片空白",
  "流量黑洞 -- 影片發了幾十支都沒人看，不知道問題在哪",
  "放棄邊緣 -- 覺得剪輯好難、想腳本好累，最後說「我不適合」",
  "學完就忘 -- 沒有持續練習，技能無法內化",
  "撐不下去 -- 人性惰性讓你三天打魚兩天曬網",
];

const coreModules = [
  {
    num: "01",
    label: "核心一",
    title: "底層邏輯與演算法真相",
    points: [
      "不用精確到每一秒每一幀，掌握關鍵節奏就好",
      "黃金前 3 秒法則 — 讓觀眾停下手指",
      "MVP 測試法 — 用最小成本驗證爆款方向",
    ],
  },
  {
    num: "02",
    label: "核心二",
    title: "流量密碼與腳本工程",
    points: [
      "成本思維 — 用最少資源產出最大效益",
      "HVA 結構 (Hook + Value + Action)",
      "每個素人都能做 IP，不需要複雜工具",
    ],
  },
  {
    num: "03",
    label: "核心三",
    title: "基礎拍攝 · 剪輯 · 運營全方位實戰",
    points: [
      "一支手機就能打天下",
      "CapCut 高效 SOP + AI 輔助剪輯",
      "學完就能獨立運作，出去不會被割韭菜",
    ],
  },
  {
    num: "04",
    label: "核心四",
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

const graduationResults = [
  { value: "1", unit: "個", title: "運作中的帳號", desc: "具備人設定位、正常營運" },
  { value: "12-24", unit: "支", title: "影片庫存", desc: "可直接發布的高品質影片" },
  { value: "100%", unit: "", title: "全流程獨立", desc: "選題到發布皆能獨立完成" },
  { value: "3秒", unit: "", title: "吸睛鉤子技術", desc: "精通「前 3 秒不被滑掉」" },
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
        imageUrls={[
          "/pics/S__4505725_0.webp",
          "/pics/S__4505720_0.webp",
          "/pics/S__4505717_0.webp",
        ]}
        borderless
      />

      {/* Why this course exists */}
      <section className="animate-fade-up mb-12">
        <div className="border-l-2 border-accent pl-6">
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

      {/* Core Modules — bold giant numbers */}
      <section className="animate-fade-up mb-16">
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-8">
          四大核心模組
        </h2>
        <div className="flex flex-col gap-10">
          {coreModules.map((mod) => (
            <div key={mod.num} className="relative">
              <span className="text-5xl font-black text-accent/15 absolute -top-2 -left-1 leading-none select-none">
                {mod.num}
              </span>
              <div className="pl-12">
                <p className="text-[10px] font-semibold text-accent/60 tracking-widest uppercase mb-1">
                  {mod.label}
                </p>
                <h3 className="text-base font-bold text-text-primary mb-3">
                  {mod.title}
                </h3>
                <ul className="flex flex-col gap-1.5">
                  {mod.points.map((point) => (
                    <li
                      key={point}
                      className="text-sm text-text-secondary leading-[1.8] pl-3 relative before:content-['—'] before:absolute before:left-0 before:text-accent/40"
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 21-Day Training — big numbers, no cards */}
      <section className="animate-fade-up mb-16">
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-2">
          21 天訓練結構
        </h2>
        <p className="text-xs text-text-secondary/50 mb-8">線下集訓 + 線上陪跑</p>

        <div className="flex gap-4 mb-8">
          {/* Day count blocks */}
          <div className="flex-1 text-center">
            <p className="text-4xl font-black text-accent leading-none">3</p>
            <p className="text-xs text-text-secondary mt-2">天線下集訓</p>
            <p className="text-[11px] text-text-secondary/50 mt-1 leading-[1.6]">
              專業場域 + 面對面指導
            </p>
          </div>
          <div className="w-px bg-divider" />
          <div className="flex-1 text-center">
            <p className="text-4xl font-black text-accent leading-none">18</p>
            <p className="text-xs text-text-secondary mt-2">天線上陪跑</p>
            <p className="text-[11px] text-text-secondary/50 mt-1 leading-[1.6]">
              每天有老師 · 有場域 · 有夥伴
            </p>
          </div>
        </div>
      </section>

      {/* Graduation Results — metric style */}
      <section className="animate-fade-up mb-12">
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
          結營產值
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {graduationResults.map((r) => (
            <div key={r.title} className="border-l-2 border-accent/40 pl-4 py-1">
              <p className="leading-none mb-1">
                <span className="text-2xl font-black text-accent">{r.value}</span>
                {r.unit && <span className="text-sm text-accent/60 ml-0.5">{r.unit}</span>}
              </p>
              <p className="text-xs font-semibold text-text-primary">{r.title}</p>
              <p className="text-[11px] text-text-secondary/60 mt-0.5">{r.desc}</p>
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

      {/* Pricing — bold */}
      <section className="animate-fade-up mb-12">
        <div className="bg-accent/10 border border-accent/30 rounded-xl p-8 text-center">
          <p className="text-xs text-text-secondary/60 tracking-wide mb-1">快閃體驗票價</p>
          <p className="text-5xl font-black text-accent leading-none mb-2">
            NT$ 1,000
          </p>
          <p className="text-xs text-text-secondary/40 line-through">原價 NT$ 6,000</p>
          <Link
            href="#registration"
            className="inline-block w-full mt-6 rounded-full bg-accent py-3.5 text-center text-sm font-semibold text-bg-primary tracking-wider transition-opacity duration-200 hover:opacity-90"
          >
            立即報名
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion title="常見問題" items={allFaqs} />

      {/* Registration Form */}
      <div id="registration">
        <RegistrationForm courseOptions={["短影音影響力變現課程"]} />
      </div>

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
