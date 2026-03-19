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

      {/* 你可以學到什麼 — production workflow */}
      <section className="animate-fade-up mb-16">
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-2">
          你可以學到什麼
        </h2>
        <p className="text-xs text-text-secondary/50 mb-8">從拍攝到發布，完整的短影音製作流程</p>

        <div className="flex flex-col gap-0">
          {/* Step 1 */}
          <div className="relative pb-6">
            <div className="absolute left-[15px] top-8 bottom-0 border-l border-accent/20" />
            <div className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-bg-primary text-xs font-bold">1</div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-text-primary">拍攝前準備</h3>
                <p className="text-[11px] text-accent/60 mb-3">30–60 min</p>
                <ul className="flex flex-col gap-2">
                  <li className="text-xs text-text-secondary leading-[1.7]">
                    <span className="text-text-primary font-semibold">場景 & 燈光</span> — 自然光窗邊即可，背景乾淨不雜亂
                  </li>
                  <li className="text-xs text-text-secondary leading-[1.7]">
                    <span className="text-text-primary font-semibold">腳本轉提詞卡</span> — 拆成 5-7 個關鍵字，避免背稿感
                  </li>
                  <li className="text-xs text-text-secondary leading-[1.7]">
                    <span className="text-text-primary font-semibold">B-roll 素材清單</span> — 列出輔助鏡頭，先拍好再說人聲
                  </li>
                  <li className="text-xs text-text-secondary leading-[1.7]">
                    <span className="text-text-primary font-semibold">手機設定</span> — 直立 9:16、4K/1080p、飛航模式
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative pb-6">
            <div className="absolute left-[15px] top-8 bottom-0 border-l border-accent/20" />
            <div className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-bg-primary text-xs font-bold">2</div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-text-primary">拍攝執行</h3>
                <p className="text-[11px] text-accent/60 mb-3">30–90 min</p>
                <ul className="flex flex-col gap-2">
                  <li className="text-xs text-text-secondary leading-[1.7]">
                    <span className="text-text-primary font-semibold">主鏡頭 × 3 take</span> — 至少錄 3 次，選最自然的，不追求一條過
                  </li>
                  <li className="text-xs text-text-secondary leading-[1.7]">
                    <span className="text-text-primary font-semibold">B-roll 補拍</span> — 每段素材拍 5-10 秒方便剪輯選用
                  </li>
                  <li className="text-xs text-text-secondary leading-[1.7]">
                    <span className="text-text-primary font-semibold">音訊確認</span> — 監聽確認無雜音、回音
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative pb-6">
            <div className="absolute left-[15px] top-8 bottom-0 border-l border-accent/20" />
            <div className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-bg-primary text-xs font-bold">3</div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-text-primary">剪輯 & 包裝</h3>
                <p className="text-[11px] text-accent/60 mb-3">30–60 min（熟練後更快）</p>
                <ul className="flex flex-col gap-2">
                  <li className="text-xs text-text-secondary leading-[1.7]">
                    <span className="text-text-primary font-semibold">去掉停頓 & 口頭禪</span> — 節奏緊湊觀眾才不會划走
                  </li>
                  <li className="text-xs text-text-secondary leading-[1.7]">
                    <span className="text-text-primary font-semibold">加字幕</span> — 白字黑邊、字體大，80% 用戶靜音看影片
                  </li>
                  <li className="text-xs text-text-secondary leading-[1.7]">
                    <span className="text-text-primary font-semibold">B-roll 切換</span> — 每 2-3 秒換畫面，避免長時間定格
                  </li>
                  <li className="text-xs text-text-secondary leading-[1.7]">
                    <span className="text-text-primary font-semibold">背景音樂</span> — 平台熱門音樂，音量壓到人聲 20% 以下
                  </li>
                </ul>
                <p className="text-[10px] text-text-secondary/40 mt-2">工具：CapCut · 剪映 · Canva</p>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative pb-6">
            <div className="absolute left-[15px] top-8 bottom-0 border-l border-accent/20" />
            <div className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-bg-primary text-xs font-bold">4</div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-text-primary">發布策略</h3>
                <p className="text-[11px] text-accent/60 mb-3">10–15 min</p>
                <ul className="flex flex-col gap-2">
                  <li className="text-xs text-text-secondary leading-[1.7]">
                    <span className="text-text-primary font-semibold">文案鉤子</span> — 第一行直接講重點或問問題，不要「大家好我是⋯」
                  </li>
                  <li className="text-xs text-text-secondary leading-[1.7]">
                    <span className="text-text-primary font-semibold">Hashtag 策略</span> — 大標籤 + 中標籤 + 小標籤，3-5 個精準
                  </li>
                  <li className="text-xs text-text-secondary leading-[1.7]">
                    <span className="text-text-primary font-semibold">發布時段</span> — 午休 12-13 點 或 下班 19-21 點
                  </li>
                  <li className="text-xs text-text-secondary leading-[1.7]">
                    <span className="text-text-primary font-semibold">多平台同步</span> — TikTok + Reels + YouTube Shorts 觸及最大化
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="relative pb-6">
            <div className="absolute left-[15px] top-8 bottom-0 border-l border-accent/20" />
            <div className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-bg-primary text-xs font-bold">5</div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-text-primary">發布後 24 小時互動</h3>
                <p className="text-[11px] text-accent/60 mb-3">15–20 min / 天</p>
                <ul className="flex flex-col gap-2">
                  <li className="text-xs text-text-secondary leading-[1.7]">
                    <span className="text-text-primary font-semibold">回覆每則留言</span> — 前 1 小時回覆速度影響平台推播
                  </li>
                  <li className="text-xs text-text-secondary leading-[1.7]">
                    <span className="text-text-primary font-semibold">置頂引導留言</span> — 用問題拉高留言互動率
                  </li>
                  <li className="text-xs text-text-secondary leading-[1.7]">
                    <span className="text-text-primary font-semibold">留言選題</span> — 觀眾問什麼就拍什麼，最精準的選題系統
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 6 */}
          <div className="relative">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent text-bg-primary text-xs font-bold">6</div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-text-primary">數據復盤 → 下一支</h3>
                <p className="text-[11px] text-accent/60 mb-3">發布後 48–72 小時</p>
                <div className="flex gap-3 mb-3">
                  <div className="flex-1 text-center border border-divider rounded-lg py-2">
                    <p className="text-lg font-black text-accent leading-none">70%</p>
                    <p className="text-[10px] text-text-secondary/60 mt-1">完播率目標</p>
                  </div>
                  <div className="flex-1 text-center border border-divider rounded-lg py-2">
                    <p className="text-lg font-black text-accent leading-none">留言數</p>
                    <p className="text-[10px] text-text-secondary/60 mt-1">互動指標</p>
                  </div>
                  <div className="flex-1 text-center border border-divider rounded-lg py-2">
                    <p className="text-lg font-black text-accent leading-none">收藏</p>
                    <p className="text-[10px] text-text-secondary/60 mt-1">複傳播指標</p>
                  </div>
                </div>
                <ul className="flex flex-col gap-2">
                  <li className="text-xs text-text-secondary leading-[1.7]">
                    <span className="text-text-primary font-semibold">複製成功公式</span> — 完播率高的開頭，複製到下一支
                  </li>
                  <li className="text-xs text-text-secondary leading-[1.7]">
                    <span className="text-text-primary font-semibold">找出流失點</span> — 觀看在哪秒驟降，就是改進的地方
                  </li>
                </ul>
                <p className="text-xs text-accent font-semibold mt-3">→ 寫下一支腳本，回到步驟 1</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Cases — scrollable */}
      <section className="animate-fade-up mb-12">
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-4">
          成功案例
        </h2>
        <p className="text-xs text-text-secondary/60 mb-6 tracking-wide">
          羅威傳媒共同出品
        </p>
        <div className="max-h-[320px] overflow-y-auto rounded-xl border border-divider p-4" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(226,193,145,0.3) transparent" }}>
          {cases.length > 0 ? (
            <CaseLogoWall cases={cases} onSelect={setSelectedCase} />
          ) : (
            <p className="text-sm text-text-secondary">載入中...</p>
          )}
        </div>
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
