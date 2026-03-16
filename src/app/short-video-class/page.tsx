"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import OceanBackground from "@/components/OceanBackground";

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
  { icon: "\u{1F3AF}", title: "帳號定位與 IP 打造", desc: "分析你的優勢，打造獨特個人品牌定位" },
  { icon: "\u{1F4DD}", title: "腳本企劃與內容策略", desc: "規劃吸睛內容，讓每支影片都有明確目標" },
  { icon: "\u{1F3AC}", title: "專業拍攝指導", desc: "手把手教你拍出專業感，不需昂貴設備" },
  { icon: "\u2702\uFE0F", title: "後製剪輯與字幕特效", desc: "節奏、字幕、特效一次搞定" },
  { icon: "\u{1F4CA}", title: "數據追蹤與優化", desc: "用數據說話，持續優化內容方向" },
  { icon: "\u{1F4E3}", title: "廣告投放與流量佈局", desc: "精準投放，讓每一分預算都花在刀口上" },
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
    <main className="relative z-10 flex min-h-dvh flex-col items-center px-6 pt-10 pb-12">
      <OceanBackground />

      {/* Back link top */}
      <Link
        href="/"
        className="animate-fade-in self-start text-sm text-gold/60 hover:text-gold-bright transition-colors mb-6"
      >
        ← 返回首頁
      </Link>

      {/* Tab bar */}
      <div className="animate-fade-up flex w-full border-b border-gold/20 mb-8">
        <button
          onClick={() => setActiveTab("service")}
          className={`flex-1 py-3 text-center text-sm font-semibold tracking-widest transition-colors ${
            activeTab === "service"
              ? "text-gold border-b-2 border-gold"
              : "text-gold/50 hover:text-gold/70"
          }`}
        >
          短影音代操
        </button>
        <button
          onClick={() => setActiveTab("gallery")}
          className={`flex-1 py-3 text-center text-sm font-semibold tracking-widest transition-colors ${
            activeTab === "gallery"
              ? "text-gold border-b-2 border-gold"
              : "text-gold/50 hover:text-gold/70"
          }`}
        >
          活動花絮
        </button>
      </div>

      {/* Tab 1: 短影音代操 */}
      {activeTab === "service" && (
        <div className="w-full max-w-lg flex flex-col gap-12">
          {/* Hero */}
          <section className="animate-fade-up text-center">
            <h1 className="text-xl font-bold tracking-wide text-gold mb-4">
              打造你的個人 IP，讓短影音為你帶來精準客戶
            </h1>
            <p className="text-sm text-gold/60 leading-relaxed">
              三大方案，從品牌建立到行業壟斷，量身打造你的短影音帝國
            </p>
          </section>

          {/* Plan Cards */}
          <section className="flex flex-col gap-5">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`animate-fade-up relative rounded-xl p-6 backdrop-blur-sm ${
                  plan.recommended
                    ? "border border-gold/50 bg-ocean-deep/50"
                    : "border border-gold/20 bg-ocean-deep/50"
                }`}
                style={{ animationDelay: `${200 + i * 120}ms` }}
              >
                {plan.recommended && (
                  <span className="absolute -top-3 left-6 rounded-full bg-gold px-3 py-0.5 text-xs font-bold text-ocean-bg">
                    推薦
                  </span>
                )}
                <h3 className="text-lg font-bold text-gold mb-4">
                  {plan.name}
                </h3>
                <ul className="flex flex-col gap-2">
                  {plan.features.map((f) => (
                    <li
                      key={f.label}
                      className="flex items-center gap-2 text-sm"
                    >
                      <span
                        className={
                          f.included ? "text-gold" : "text-gold/30"
                        }
                      >
                        {f.included ? "✓" : "—"}
                      </span>
                      <span
                        className={
                          f.included ? "text-gold/90" : "text-gold/40"
                        }
                      >
                        {f.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Services Section */}
          <section className="animate-fade-up" style={{ animationDelay: "600ms" }}>
            <h2 className="text-lg font-bold text-gold mb-5 text-center">
              主要服務
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {services.map((s, i) => (
                <div
                  key={s.title}
                  className="animate-fade-up rounded-lg border border-gold/20 bg-ocean-deep/50 p-4 backdrop-blur-sm"
                  style={{ animationDelay: `${700 + i * 100}ms` }}
                >
                  <span className="text-lg mb-1 block">{s.icon}</span>
                  <h3 className="text-sm font-semibold text-gold mb-1">
                    {s.title}
                  </h3>
                  <p className="text-xs text-gold/50 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Accordion */}
          <section className="animate-fade-up" style={{ animationDelay: "800ms" }}>
            <h2 className="text-lg font-bold text-gold mb-5 text-center">
              常見問題
            </h2>
            <div className="flex flex-col gap-3">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-gold/20 bg-ocean-deep/50 backdrop-blur-sm overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenIndex(openIndex === i ? null : i)
                    }
                    className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-gold hover:text-gold-bright transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`ml-2 transition-transform duration-300 ${
                        openIndex === i ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {openIndex === i && (
                    <div className="px-4 pb-4 text-sm text-gold/60 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Contact Form */}
          <section className="animate-fade-up" style={{ animationDelay: "900ms" }}>
            <h2 className="text-lg font-bold text-gold mb-5 text-center">
              立即諮詢
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("感謝您的諮詢！我們會盡快與您聯繫。");
              }}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                name="name"
                placeholder="姓名"
                required
                className="bg-ocean-deep/60 border border-gold/20 text-gold rounded-lg px-4 py-3 focus:border-gold-bright focus:outline-none placeholder:text-gold/30"
              />
              <input
                type="tel"
                name="phone"
                placeholder="電話"
                required
                className="bg-ocean-deep/60 border border-gold/20 text-gold rounded-lg px-4 py-3 focus:border-gold-bright focus:outline-none placeholder:text-gold/30"
              />
              <input
                type="text"
                name="lineId"
                placeholder="LINE ID"
                className="bg-ocean-deep/60 border border-gold/20 text-gold rounded-lg px-4 py-3 focus:border-gold-bright focus:outline-none placeholder:text-gold/30"
              />
              <select name="plan" className="bg-ocean-deep/60 border border-gold/20 text-gold rounded-lg px-4 py-3 focus:border-gold-bright focus:outline-none">
                <option value="">感興趣的方案</option>
                <option value="品牌啟航方案">品牌啟航方案</option>
                <option value="流量爆發方案">流量爆發方案</option>
                <option value="行業壟斷方案">行業壟斷方案</option>
                <option value="還不確定">還不確定</option>
              </select>
              <textarea
                name="notes"
                placeholder="備註"
                rows={4}
                className="bg-ocean-deep/60 border border-gold/20 text-gold rounded-lg px-4 py-3 focus:border-gold-bright focus:outline-none placeholder:text-gold/30 resize-none"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-gold py-3 text-center font-bold text-ocean-bg transition-all duration-300 hover:bg-gold-bright active:scale-[0.97]"
              >
                送出諮詢
              </button>
            </form>
          </section>
        </div>
      )}

      {/* Tab 2: 活動花絮 */}
      {activeTab === "gallery" && (
        <div className="w-full max-w-lg">
          <div className="grid grid-cols-2 gap-3">
            {galleryImages.map((img, i) => (
              <div
                key={img}
                className="animate-fade-up rounded-lg overflow-hidden cursor-pointer"
                style={{ animationDelay: `${i * 80}ms` }}
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-gold text-2xl hover:text-gold-bright transition-colors"
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
        className="mt-12 text-sm text-gold/60 hover:text-gold-bright transition-colors"
      >
        ← 返回首頁
      </Link>
    </main>
  );
}
