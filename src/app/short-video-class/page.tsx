"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const plans = [
  {
    name: "品牌啟航方案",
    recommended: false,
    features: [
      { label: "每月 4 支影片", included: true },
      { label: "帳號策略規劃", included: true },
      { label: "腳本撰寫", included: true },
      { label: "剪輯製作", included: true },
      { label: "拍攝指導", included: false },
      { label: "數據分析報告", included: false },
      { label: "廣告投放策略", included: false },
      { label: "1對1專屬顧問", included: false },
    ],
  },
  {
    name: "流量爆發方案",
    recommended: true,
    features: [
      { label: "每月 8 支影片", included: true },
      { label: "帳號策略規劃", included: true },
      { label: "腳本撰寫", included: true },
      { label: "剪輯製作", included: true },
      { label: "拍攝指導", included: true },
      { label: "數據分析報告（月報）", included: true },
      { label: "廣告投放策略", included: false },
      { label: "1對1專屬顧問", included: false },
    ],
  },
  {
    name: "行業壟斷方案",
    recommended: false,
    features: [
      { label: "每月 12+ 支影片", included: true },
      { label: "帳號策略規劃", included: true },
      { label: "腳本撰寫", included: true },
      { label: "剪輯製作", included: true },
      { label: "拍攝指導", included: true },
      { label: "數據分析報告（週報）", included: true },
      { label: "廣告投放策略", included: true },
      { label: "1對1專屬顧問", included: true },
    ],
  },
];

const services = [
  { icon: "🎯", title: "帳號定位與\u00A0IP\u00A0打造", desc: "分析你的優勢，打造獨特個人品牌定位" },
  { icon: "📝", title: "腳本企劃與內容策略", desc: "規劃吸睛內容，讓每支影片都有明確目標" },
  { icon: "🎬", title: "專業拍攝指導", desc: "手把手教你拍出專業感，不需昂貴設備" },
  { icon: "✂️", title: "後製剪輯與字幕特效", desc: "節奏、字幕、特效一次搞定" },
  { icon: "📊", title: "數據追蹤與優化", desc: "用數據說話，持續優化內容方向" },
  { icon: "📣", title: "廣告投放與流量佈局", desc: "精準投放，讓每一分預算都花在刀口上" },
];

const faqs = [
  {
    q: "短影音代操適合什麼樣的人？",
    a: "適合想要透過短影音建立個人品牌、吸引精準客戶的創業者、自由工作者、中小企業主。無論你是剛起步還是想要突破流量瓶頸，我們都有適合你的方案。",
  },
  {
    q: "合作流程是怎樣的？",
    a: "填寫諮詢表單 → 免費策略諮詢 → 確認方案 → 開始執行。我們會先深入了解你的產業與目標，再量身打造內容策略。",
  },
  {
    q: "需要自己出鏡嗎？",
    a: "建議出鏡以建立個人 IP，但我們也提供不露臉的內容方案。拍攝時會有專業指導，讓你自然又有魅力。",
  },
  {
    q: "多久可以看到成效？",
    a: "一般而言，持續經營 1-3 個月會開始看到明顯的流量成長與粉絲互動提升。短影音是長期投資，越早開始越有優勢。",
  },
  {
    q: "可以中途更換方案嗎？",
    a: "可以！我們的方案設計靈活，可以根據你的成長狀況隨時升級或調整。",
  },
  {
    q: "如何開始合作？",
    a: "直接填寫下方的諮詢表單，或透過 LINE 聯繫我們的小幫手，我們會在 24 小時內回覆你。",
  },
];

const galleryImages = [
  "S__4505716_0.webp",
  "S__4505717_0.webp",
  "S__4505718_0.webp",
  "S__4505719_0.webp",
  "S__4505720_0.webp",
  "S__4505721_0.webp",
  "S__4505722_0.webp",
  "S__4505723_0.webp",
  "S__4505724_0.webp",
  "S__4505725_0.webp",
];

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-divider">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left transition-colors"
      >
        <span className="text-sm font-medium text-charcoal pr-4">{q}</span>
        <span className="text-warm-gray text-lg flex-shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="pb-4 text-sm text-warm-gray leading-[1.8]">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function ShortVideoClass() {
  const [activeTab, setActiveTab] = useState<"service" | "gallery">("service");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="relative z-10 flex min-h-dvh flex-col px-6 pt-10 pb-12">
      {/* Back link */}
      <Link
        href="/"
        className="animate-fade-in self-start text-sm text-warm-gray transition-colors active:text-terracotta mb-6"
      >
        ← 返回
      </Link>

      {/* Tab bar */}
      <div className="animate-fade-up flex w-full border-b border-divider mb-10">
        <button
          onClick={() => setActiveTab("service")}
          className={`flex-1 py-3 text-center text-sm font-medium tracking-widest transition-colors ${
            activeTab === "service"
              ? "text-charcoal border-b-2 border-terracotta"
              : "text-warm-gray"
          }`}
        >
          短影音代操
        </button>
        <button
          onClick={() => setActiveTab("gallery")}
          className={`flex-1 py-3 text-center text-sm font-medium tracking-widest transition-colors ${
            activeTab === "gallery"
              ? "text-charcoal border-b-2 border-terracotta"
              : "text-warm-gray"
          }`}
        >
          活動花絮
        </button>
      </div>

      {/* Tab 1: Service */}
      {activeTab === "service" && (
        <div className="w-full flex flex-col">
          {/* Hero */}
          <section className="animate-fade-up mb-12">
            <h1 className="font-[family-name:var(--font-noto-serif-tc)] text-[22px] font-bold leading-[1.6] text-charcoal mb-3">
              打造你的個人&nbsp;IP，
              <br />
              讓短影音為你
              <br />
              帶來精準客戶
            </h1>
            <p className="text-sm text-warm-gray leading-[1.8]">
              三大方案，從品牌建立到行業壟斷，
              <br />
              量身打造你的短影音帝國
            </p>
          </section>

          {/* Plan Cards */}
          <section className="flex flex-col gap-4 mb-16">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`animate-fade-up rounded-lg p-5 bg-cream-dark ${
                  plan.recommended
                    ? "border-l-[3px] border-l-terracotta"
                    : ""
                }`}
                style={{ animationDelay: `${100 + i * 80}ms` }}
              >
                {plan.recommended && (
                  <span className="inline-block text-[11px] font-semibold text-terracotta tracking-wider mb-2">
                    推薦
                  </span>
                )}
                <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-base font-bold text-charcoal mb-3">
                  {plan.name}
                </h3>
                <ul className="flex flex-col gap-1.5">
                  {plan.features.map((f) => (
                    <li key={f.label} className="flex items-center gap-2 text-sm">
                      <span className={f.included ? "text-terracotta" : "text-warm-gray/40"}>
                        {f.included ? "✓" : "—"}
                      </span>
                      <span className={f.included ? "text-charcoal" : "text-warm-gray/50"}>
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Services */}
          <section className="animate-fade-up mb-16" style={{ animationDelay: "400ms" }}>
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-charcoal mb-6">
              主要服務
            </h2>
            <div className="flex flex-col">
              {services.map((s, i) => (
                <div
                  key={s.title}
                  className={`py-4 ${i < services.length - 1 ? "border-b border-divider" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-lg mt-0.5">{s.icon}</span>
                    <div>
                      <h3 className="text-sm font-semibold text-charcoal mb-1">
                        {s.title}
                      </h3>
                      <p className="text-sm text-warm-gray leading-[1.8]">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="animate-fade-up mb-16" style={{ animationDelay: "500ms" }}>
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-charcoal mb-6">
              常見問題
            </h2>
            <div className="flex flex-col">
              {faqs.map((faq, i) => (
                <FaqItem
                  key={i}
                  q={faq.q}
                  a={faq.a}
                  open={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>
          </section>

          {/* Contact Form */}
          <section className="animate-fade-up mb-12" style={{ animationDelay: "600ms" }}>
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-charcoal mb-6">
              立即諮詢
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("感謝您的諮詢！我們會盡快與您聯繫。");
              }}
              className="flex flex-col gap-6"
            >
              <input
                type="text"
                name="name"
                placeholder="姓名"
                required
                className="bg-transparent border-b border-divider text-charcoal py-3 text-sm focus:border-terracotta focus:outline-none placeholder:text-warm-gray/50 transition-colors"
              />
              <input
                type="tel"
                name="phone"
                placeholder="電話"
                required
                className="bg-transparent border-b border-divider text-charcoal py-3 text-sm focus:border-terracotta focus:outline-none placeholder:text-warm-gray/50 transition-colors"
              />
              <input
                type="text"
                name="lineId"
                placeholder="LINE ID"
                className="bg-transparent border-b border-divider text-charcoal py-3 text-sm focus:border-terracotta focus:outline-none placeholder:text-warm-gray/50 transition-colors"
              />
              <select
                name="plan"
                className="bg-transparent border-b border-divider text-charcoal py-3 text-sm focus:border-terracotta focus:outline-none appearance-none"
              >
                <option value="">感興趣的方案</option>
                <option value="品牌啟航方案">品牌啟航方案</option>
                <option value="流量爆發方案">流量爆發方案</option>
                <option value="行業壟斷方案">行業壟斷方案</option>
                <option value="還不確定">還不確定</option>
              </select>
              <textarea
                name="notes"
                placeholder="備註"
                rows={3}
                className="bg-transparent border-b border-divider text-charcoal py-3 text-sm focus:border-terracotta focus:outline-none placeholder:text-warm-gray/50 transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-terracotta py-3.5 text-center text-sm font-semibold text-cream tracking-wider transition-colors duration-200 active:bg-terracotta-light"
              >
                送出諮詢
              </button>
            </form>
          </section>
        </div>
      )}

      {/* Tab 2: Gallery */}
      {activeTab === "gallery" && (
        <div className="w-full">
          <div className="grid grid-cols-2 gap-3">
            {galleryImages.map((img, i) => (
              <div
                key={img}
                className="animate-fade-up rounded-lg overflow-hidden cursor-pointer"
                style={{ animationDelay: `${i * 60}ms` }}
                onClick={() => setSelectedImage(`/pics/${img}`)}
              >
                <Image
                  src={`/pics/${img}`}
                  alt={`活動花絮 ${i + 1}`}
                  width={600}
                  height={400}
                  className="object-cover w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-cream text-2xl transition-colors"
          >
            ✕
          </button>
          <Image
            src={selectedImage}
            alt="花絮大圖"
            width={1200}
            height={800}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Back link bottom */}
      <Link
        href="/"
        className="mt-12 self-start text-sm text-warm-gray transition-colors active:text-terracotta"
      >
        ← 返回首頁
      </Link>
    </main>
  );
}
