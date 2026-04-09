"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

const COURSE_OPTIONS = [
  "AI 影像力應用軟體課程",
  "短影音影響力變現課程",
  "兩者皆要",
];

const HEADCOUNT_OPTIONS = ["1-10 人", "11-20 人", "21-30 人"];

const INDUSTRY_OPTIONS = ["餐飲", "房產", "美容", "傳產", "科技", "教育", "其他"];

export default function CourseContent() {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleCourseSelect(course: string) {
    setSelectedCourse(course);
    const el = document.getElementById("registration");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const companyName = (form.elements.namedItem("companyName") as HTMLInputElement).value;
    const contactPerson = (form.elements.namedItem("contactPerson") as HTMLInputElement).value;
    const headcount = (form.elements.namedItem("headcount") as HTMLSelectElement).value;
    const courseName = (form.elements.namedItem("courseName") as HTMLSelectElement).value;
    const industry = (form.elements.namedItem("industry") as HTMLSelectElement).value;

    const data = {
      name: contactPerson,
      phone: "",
      courseName,
      message: `【企業名稱】${companyName}\n【預計培訓人數】${headcount}\n【產業類別】${industry}`,
    };

    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
        setSelectedCourse("");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative z-10 flex min-h-dvh flex-col bg-[#EFF6FC] text-[#1A2744]">

      {/* ── Hero ── */}
      <section className="px-6 pt-10 pb-12 max-w-2xl mx-auto w-full">
        <Link
          href="/"
          className="self-start text-sm text-[#7B91A5] hover:text-[#D4870E] transition-colors mb-8 inline-block"
        >
          &larr; 返回
        </Link>

        <p className="text-xs font-semibold tracking-[0.25em] text-[#D4870E] uppercase mb-4">
          Corporate Training Package · 2026
        </p>

        <h1 className="font-[family-name:var(--font-noto-serif-tc)] text-2xl font-black text-[#1A2744] leading-snug mb-5">
          2026 企業品牌影響力
          <br />
          客製化包班實戰課
        </h1>

        <p className="text-sm text-[#4A6178] leading-relaxed mb-8">
          讓 AI 成為你的員工，讓短影音成為你的業務。
          <br />
          拒絕空談理論，現場保證學會，直接產出成果。
        </p>

        {/* Key tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#C8D8E8] px-4 py-2 text-sm font-semibold text-[#1A2744] shadow-sm">
            💰 單場包班 <span className="text-[#D4870E]">$36,000</span> <span className="font-normal text-[#7B91A5] text-xs">(含稅)</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#C8D8E8] px-4 py-2 text-sm font-semibold text-[#1A2744] shadow-sm">
            👥 上限 30 人 <span className="text-[#D4870E] font-normal text-xs ml-1">平均每人僅 $1,200</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#C8D8E8] px-4 py-2 text-sm font-semibold text-[#1A2744] shadow-sm">
            ✅ 現場保證實作產出
          </span>
        </div>

        <a
          href="#registration"
          className="inline-block w-full rounded-full bg-[#1A2744] py-4 text-center text-sm font-bold text-white tracking-wider transition-opacity hover:opacity-85"
        >
          立即預約企業包班方案
        </a>
      </section>

      {/* ── Two Course Cards ── */}
      <section className="px-6 pb-16 max-w-2xl mx-auto w-full">
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-[#1A2744] mb-2">
          選擇適合貴公司的課程方向
        </h2>
        <p className="text-xs text-[#7B91A5] mb-8">兩種方案皆可同日排課，或分批進行</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Card A: AI 節流 */}
          <div className="flex flex-col rounded-2xl bg-white border border-[#C8D8E8] overflow-hidden shadow-sm">
            <div className="bg-[#1A2744] px-5 py-4">
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#D4870E] uppercase mb-1">Option A · 節流</p>
              <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-base font-black text-white leading-snug">
                AI 影像力應用
                <br />
                軟體課程
              </h3>
            </div>
            <div className="flex-1 px-5 py-5 flex flex-col">
              <p className="text-xs font-bold tracking-wider text-[#D4870E] mb-1">【極限效率 · 成本粉碎】</p>
              <p className="text-sm text-[#4A6178] leading-relaxed mb-5">
                用科技取代傳統大片製作，將產能提升 10 倍。
              </p>

              <ul className="flex flex-col gap-3 mb-5 flex-1">
                {[
                  { title: "AI 數位人分身技術", desc: "只需錄製一段素材，即可生成無限支多國語言講稿影片" },
                  { title: "企業級 AI 動畫製作", desc: "將枯燥產品介紹轉化為好萊塢級特效動畫" },
                  { title: "商業攝影 / 形象照", desc: "無需進棚，AI 生成專業質感個人形象照與產品情境圖" },
                  { title: "AI 腳本深度餵養", desc: "建立企業專屬知識庫，產出具備品牌靈魂的文案與分鏡" },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#1A2744]" />
                    <div>
                      <p className="text-xs font-semibold text-[#1A2744]">{item.title}</p>
                      <p className="text-xs text-[#7B91A5] leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="rounded-xl bg-[#F0F4F8] border border-[#C8D8E8] px-4 py-3 mb-5">
                <p className="text-[11px] font-bold text-[#D4870E] mb-1">節流亮點</p>
                <p className="text-xs text-[#4A6178] leading-relaxed">
                  省下美編、攝影與文案企劃 3 人份薪資。將以往動輒數十萬的大片製作成本降至趨近於零。
                </p>
              </div>

              <button
                onClick={() => handleCourseSelect("AI 影像力應用軟體課程")}
                className="w-full rounded-full bg-[#1A2744] py-3 text-center text-xs font-bold text-white tracking-wider transition-opacity hover:opacity-85"
              >
                選擇此方案：節省 80% 製作成本
              </button>
            </div>
          </div>

          {/* Card B: 影音開源 */}
          <div className="flex flex-col rounded-2xl bg-white border border-[#C8D8E8] overflow-hidden shadow-sm">
            <div className="bg-[#2E6BC6] px-5 py-4">
              <p className="text-[10px] font-bold tracking-[0.2em] text-white/70 uppercase mb-1">Option B · 開源</p>
              <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-base font-black text-white leading-snug">
                短影音影響力
                <br />
                變現課程
              </h3>
            </div>
            <div className="flex-1 px-5 py-5 flex flex-col">
              <p className="text-xs font-bold tracking-wider text-[#2E6BC6] mb-1">【業績增長 · 信任變現】</p>
              <p className="text-sm text-[#4A6178] leading-relaxed mb-5">
                最省錢且最有溫度的廣告，建立企業 IP 信任感。
              </p>

              <ul className="flex flex-col gap-3 mb-5 flex-1">
                {[
                  { title: "爆款標題與鉤子技術", desc: "掌握 0.1 秒吸睛心理學，讓觀眾在滑掉前被勾住" },
                  { title: "高轉化剪輯 SOP", desc: "用爆款公式，快速剪出會導購、會留人的影片" },
                  { title: "演算法流量密碼", desc: "拆解帳號權重，讓系統主動把影片推給精準潛在客戶" },
                  { title: "信任變現閉環", desc: "設計影片中的「行動呼籲」，直接將流量轉化為訂單" },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#2E6BC6]" />
                    <div>
                      <p className="text-xs font-semibold text-[#1A2744]">{item.title}</p>
                      <p className="text-xs text-[#7B91A5] leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="rounded-xl bg-[#EDF3FC] border border-[#C0D4F0] px-4 py-3 mb-5">
                <p className="text-[11px] font-bold text-[#2E6BC6] mb-1">開源亮點</p>
                <p className="text-xs text-[#4A6178] leading-relaxed">
                  讓 30 位員工成為移動業務。用「人的溫度」取代冰冷廣告，大幅降低開發精準客源的成本。
                </p>
              </div>

              <button
                onClick={() => handleCourseSelect("短影音影響力變現課程")}
                className="w-full rounded-full bg-[#2E6BC6] py-3 text-center text-xs font-bold text-white tracking-wider transition-opacity hover:opacity-85"
              >
                選擇此方案：開啟 24hr 業務系統
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── Value Proposition ── */}
      <section className="px-6 pb-16 max-w-2xl mx-auto w-full">
        <div className="rounded-2xl bg-white border border-[#C8D8E8] shadow-sm px-6 py-8">
          <p className="text-[10px] font-bold tracking-[0.2em] text-[#D4870E] uppercase mb-2">企業主必看</p>
          <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-base font-black text-[#1A2744] mb-7">
            為什麼選擇包班而非廣告投放？
          </h2>

          <div className="flex flex-col gap-6">
            {/* Point 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1A2744] flex items-center justify-center">
                <span className="text-xs font-black text-[#D4870E]">01</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1A2744] mb-1">團隊共識</h3>
                <p className="text-xs text-[#4A6178] leading-relaxed">
                  統一企業對外宣傳調性，建立標準化製作流程。讓每位員工都能按 SOP 獨立產出高品質內容。
                </p>
              </div>
            </div>

            <div className="h-px bg-[#D0DBE6]" />

            {/* Point 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1A2744] flex items-center justify-center">
                <span className="text-xs font-black text-[#D4870E]">02</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1A2744] mb-1">高性價比</h3>
                <p className="text-xs text-[#4A6178] leading-relaxed">
                  一次包班，全員升級，遠低於單人報名或廣告投放成本。30 人平均每人僅 $1,200，低於一頓商業午餐。
                </p>
              </div>
            </div>

            <div className="h-px bg-[#D0DBE6]" />

            {/* Point 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1A2744] flex items-center justify-center">
                <span className="text-xs font-black text-[#D4870E]">03</span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#1A2744] mb-2">售後保障</h3>
                <ul className="flex flex-col gap-2">
                  <li className="flex gap-2 text-xs text-[#4A6178] leading-relaxed">
                    <span className="text-[#D4870E] font-bold flex-shrink-0">1.</span>
                    提供 14 天線上諮詢，解決回廠操作疑問。
                  </li>
                  <li className="flex gap-2 text-xs text-[#4A6178] leading-relaxed">
                    <span className="text-[#D4870E] font-bold flex-shrink-0">2.</span>
                    贈送《雲居 AI 實戰操作手冊》，員工隨查隨用。
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA + Form ── */}
      <section id="registration" className="px-6 pb-16 max-w-2xl mx-auto w-full">

        <div className="text-center mb-10">
          <p className="text-[10px] font-bold tracking-[0.2em] text-[#D4870E] uppercase mb-3">立即預約</p>
          <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-xl font-black text-[#1A2744] leading-snug">
            2026 年，企業最貴的成本，
            <br />
            是拒絕進化。
          </h2>
        </div>

        {submitted ? (
          <div className="rounded-2xl bg-white border border-[#C8D8E8] p-8 text-center shadow-sm">
            <p className="text-2xl mb-3">✅</p>
            <p className="font-bold text-[#1A2744] mb-2">感謝您的諮詢需求</p>
            <p className="text-sm text-[#4A6178]">我們的專業團隊將在 24 小時內與您聯繫，為貴公司量身規劃課程方案。</p>
          </div>
        ) : (
          <div className="rounded-2xl bg-white border border-[#C8D8E8] shadow-sm px-6 py-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* 企業名稱 */}
              <div>
                <label className="block text-xs font-semibold text-[#1A2744] mb-1.5">
                  企業名稱 <span className="text-[#D4870E]">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  placeholder="請輸入公司全名"
                  required
                  className="w-full rounded-lg border border-[#C8D8E8] bg-[#F5F9FD] px-4 py-3 text-sm text-[#1A2744] placeholder:text-[#7B91A5]/60 focus:border-[#2E6BC6] focus:outline-none transition-colors"
                />
              </div>

              {/* 聯絡人/職稱 */}
              <div>
                <label className="block text-xs font-semibold text-[#1A2744] mb-1.5">
                  聯絡人 / 職稱 <span className="text-[#D4870E]">*</span>
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  placeholder="例：王小明 / 人資主任"
                  required
                  className="w-full rounded-lg border border-[#C8D8E8] bg-[#F5F9FD] px-4 py-3 text-sm text-[#1A2744] placeholder:text-[#7B91A5]/60 focus:border-[#2E6BC6] focus:outline-none transition-colors"
                />
              </div>

              {/* 預計培訓人數 */}
              <div>
                <label className="block text-xs font-semibold text-[#1A2744] mb-1.5">
                  預計培訓人數
                </label>
                <select
                  name="headcount"
                  className="w-full rounded-lg border border-[#C8D8E8] bg-[#F5F9FD] px-4 py-3 text-sm text-[#1A2744] focus:border-[#2E6BC6] focus:outline-none transition-colors appearance-none"
                >
                  <option value="">請選擇人數範圍</option>
                  {HEADCOUNT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* 感興趣的課程 */}
              <div>
                <label className="block text-xs font-semibold text-[#1A2744] mb-1.5">
                  感興趣的課程 <span className="text-[#D4870E]">*</span>
                </label>
                <select
                  name="courseName"
                  required
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full rounded-lg border border-[#C8D8E8] bg-[#F5F9FD] px-4 py-3 text-sm text-[#1A2744] focus:border-[#2E6BC6] focus:outline-none transition-colors appearance-none"
                >
                  <option value="">請選擇課程方向</option>
                  {COURSE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* 產業類別 */}
              <div>
                <label className="block text-xs font-semibold text-[#1A2744] mb-1.5">
                  產業類別
                </label>
                <select
                  name="industry"
                  className="w-full rounded-lg border border-[#C8D8E8] bg-[#F5F9FD] px-4 py-3 text-sm text-[#1A2744] focus:border-[#2E6BC6] focus:outline-none transition-colors appearance-none"
                >
                  <option value="">請選擇產業</option>
                  {INDUSTRY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-[#1A2744] py-4 text-center text-sm font-bold text-white tracking-wider transition-opacity hover:opacity-85 disabled:opacity-50 mt-2"
              >
                {submitting ? "提交中..." : "提交需求，由專業團隊為您規劃"}
              </button>

            </form>
          </div>
        )}
      </section>

      {/* Back link bottom */}
      <div className="px-6 pb-8 max-w-2xl mx-auto w-full">
        <Link
          href="/"
          className="text-sm text-[#7B91A5] hover:text-[#2E6BC6] transition-colors"
        >
          &larr; 返回首頁
        </Link>
      </div>

      <Footer />
    </main>
  );
}
