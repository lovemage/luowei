# LUOWEI MEDIA 陶瓷工藝風格全站重新設計 — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** 將全站從「深海藍+金色+波浪動畫」風格重新設計為「極簡+乳白+陶瓷橘」風格，涵蓋所有四個頁面。

**Architecture:** 替換色彩系統（globals.css theme tokens）、加入 Google Fonts（Noto Serif TC, Cormorant Garamond）、移除 OceanBackground 使用、重寫所有四個頁面組件及共用組件（AvatarMarquee, SocialLinks）以匹配新設計語言。

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Google Fonts

---

### Task 1: 重建設計系統 — globals.css + layout.tsx

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Step 1: 替換 globals.css 色彩 token 和動畫**

將整個 `globals.css` 替換為新的設計系統。移除所有 wave/ocean/gold 相關 token 和動畫，替換為陶瓷風格 token。保留 marquee 動畫（頭像跑馬燈用），保留 reduced-motion media query。

```css
@import "tailwindcss";

@theme {
  --color-cream: #F5F0EB;
  --color-cream-dark: #EDE7DF;
  --color-charcoal: #2C2520;
  --color-warm-gray: #8A7E74;
  --color-terracotta: #C2613A;
  --color-terracotta-light: #D4845F;
  --color-divider: #DDD5CB;
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);

  --font-serif: "Noto Serif TC", "PingFang TC", "Hiragino Sans", serif;
  --font-display: "Cormorant Garamond", "Noto Serif TC", serif;
  --font-body: "PingFang TC", "Hiragino Sans", "Microsoft JhengHei", sans-serif;
}

html,
body {
  background-color: var(--color-cream);
  color: var(--color-charcoal);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  font-family: var(--font-body);
  word-break: keep-all;
}

/* Subtle paper texture */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}

/* ===== Entrance Animation ===== */

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ===== Marquee Animation (avatar carousel) ===== */

@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* ===== Utility Classes ===== */

@utility animate-fade-up {
  animation: fade-up 0.5s var(--ease-out-quart) both;
}

@utility animate-fade-in {
  animation: fade-in 0.4s var(--ease-out-quart) both;
}

@utility animate-marquee {
  animation: marquee 20s linear infinite;
}

/* ===== Reduced Motion ===== */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Step 2: 更新 layout.tsx 加入 Google Fonts**

```tsx
import type { Metadata, Viewport } from "next";
import { Noto_Serif_TC, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const notoSerifTC = Noto_Serif_TC({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-noto-serif-tc",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LUOWEI MEDIA",
  description: "無限進步 | 個人成長",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant" className={`${notoSerifTC.variable} ${cormorantGaramond.variable}`}>
      <body>
        <div className="mx-auto max-w-[430px] min-h-dvh relative">
          {children}
        </div>
      </body>
    </html>
  );
}
```

**Step 3: 驗證 build**

Run: `npm run build`
Expected: Build 成功，無錯誤

**Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "refactor: replace ocean/gold design system with ceramic cream/terracotta theme"
```

---

### Task 2: 更新共用組件 — AvatarMarquee + SocialLinks

**Files:**
- Modify: `src/components/AvatarMarquee.tsx`
- Modify: `src/components/SocialLinks.tsx`

**Step 1: 更新 AvatarMarquee 漸層色**

將邊緣漸層從 `from-ocean-bg` 改為 `from-cream`，頭像邊框從 `border-gold/30` 改為 `border-divider`。

```tsx
import Image from "next/image";

const avatars = [
  "S__4505733_0.webp",
  "S__4505734_0.webp",
  "S__4505735_0.webp",
  "S__4505736_0.webp",
  "S__4505737_0.webp",
  "S__4505738_0.webp",
  "S__4505739_0.webp",
  "S__4505740_0.webp",
  "S__4505741_0.webp",
];

export default function AvatarMarquee() {
  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream to-transparent" />

      {/* Scrolling track */}
      <div className="animate-marquee flex w-max gap-5">
        {[...avatars, ...avatars].map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-divider"
          >
            <Image
              src={`/avator/${src}`}
              alt={`學員 ${(i % avatars.length) + 1}`}
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Step 2: 重寫 SocialLinks 使用新色彩**

```tsx
import Link from "next/link";

const links = [
  {
    label: "課程小幫手",
    href: "https://lin.ee/L8iPk8a",
    icon: "LINE",
  },
  {
    label: "企業小幫手",
    href: "https://lin.ee/htTdJSH",
    icon: "LINE",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/lowemedia_?igsh=MWppb2V2cWdwMTE2MQ==",
    icon: "IG",
  },
];

export default function SocialLinks() {
  return (
    <div className="flex items-center justify-center gap-8 pt-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1.5 transition-colors duration-200 active:scale-95"
        >
          <span className="text-xs font-semibold tracking-wide text-terracotta">
            {link.icon}
          </span>
          <span className="text-[10px] text-warm-gray">{link.label}</span>
        </Link>
      ))}
    </div>
  );
}
```

**Step 3: 驗證 build**

Run: `npm run build`
Expected: Build 成功

**Step 4: Commit**

```bash
git add src/components/AvatarMarquee.tsx src/components/SocialLinks.tsx
git commit -m "refactor: update AvatarMarquee and SocialLinks to ceramic theme"
```

---

### Task 3: 重新設計首頁

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: 重寫首頁**

移除 OceanBackground import，改用新設計語言：居中 Logo、襯線標語、列表式導航、跑馬燈、社群連結。

```tsx
import Image from "next/image";
import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";
import AvatarMarquee from "@/components/AvatarMarquee";

const navItems = [
  { label: "短影音代操", href: "/short-video-class" },
  { label: "短影音課程", href: "/short-video-course" },
  { label: "短影音廣告", href: "/short-video-ad" },
];

export default function Home() {
  return (
    <main className="relative z-10 flex min-h-dvh flex-col items-center px-6 pt-16 pb-10">
      {/* Logo & Brand */}
      <div className="animate-fade-up flex flex-col items-center gap-5 mb-16">
        <Image
          src="/images/logo.png"
          alt="LUOWEI MEDIA"
          width={80}
          height={80}
          priority
        />
        <h1 className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold tracking-[0.15em] text-charcoal">
          LUOWEI MEDIA
        </h1>
        <div className="h-px w-10 bg-divider" />
        <p className="font-[family-name:var(--font-noto-serif-tc)] text-sm text-warm-gray tracking-[0.2em]">
          無限進步｜個人成長
        </p>
      </div>

      {/* Navigation List */}
      <nav
        className="animate-fade-up w-full mb-16"
        style={{ animationDelay: "150ms" }}
      >
        {navItems.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-between py-4 border-b border-divider text-charcoal transition-colors duration-200 active:text-terracotta"
          >
            <span className="text-base tracking-widest">{item.label}</span>
            <span className="text-warm-gray text-sm">→</span>
          </Link>
        ))}
      </nav>

      {/* Avatar Marquee */}
      <div
        className="animate-fade-in w-[100vw] -mx-6 mb-12"
        style={{ animationDelay: "300ms" }}
      >
        <AvatarMarquee />
      </div>

      {/* Social Links */}
      <div
        className="animate-fade-up"
        style={{ animationDelay: "450ms" }}
      >
        <SocialLinks />
      </div>
    </main>
  );
}
```

**Step 2: 驗證 build**

Run: `npm run build`
Expected: Build 成功

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "redesign: rebuild homepage with ceramic cream/terracotta theme"
```

---

### Task 4: 重新設計短影音代操頁面

**Files:**
- Modify: `src/app/short-video-class/page.tsx`

**Step 1: 重寫短影音代操頁面**

移除 OceanBackground，使用新設計語言。方案卡片用 cream-dark 背景、推薦方案左邊框 terracotta。服務項目改為單欄列表。FAQ 去掉邊框背景，用純文字+分隔線。表單用底線風格 input。

```tsx
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
```

**Step 2: 驗證 build**

Run: `npm run build`
Expected: Build 成功

**Step 3: Commit**

```bash
git add src/app/short-video-class/page.tsx
git commit -m "redesign: rebuild short-video-class page with ceramic theme"
```

---

### Task 5: 重新設計 Coming Soon 頁面

**Files:**
- Modify: `src/app/short-video-course/page.tsx`
- Modify: `src/app/short-video-ad/page.tsx`

**Step 1: 重寫短影音課程頁面**

```tsx
import Link from "next/link";

export default function ShortVideoCourse() {
  return (
    <main className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-6">
      <h1 className="animate-fade-up font-[family-name:var(--font-noto-serif-tc)] text-2xl font-bold text-charcoal mb-3">
        短影音課程
      </h1>
      <p className="animate-fade-up text-sm text-warm-gray tracking-widest mb-6" style={{ animationDelay: "100ms" }}>
        即將推出
      </p>
      <div className="animate-fade-in h-0.5 w-10 bg-terracotta mb-8" style={{ animationDelay: "200ms" }} />
      <Link
        href="/"
        className="animate-fade-up text-sm text-terracotta transition-colors active:text-terracotta-light"
        style={{ animationDelay: "300ms" }}
      >
        返回首頁
      </Link>
    </main>
  );
}
```

**Step 2: 重寫短影音廣告頁面**

```tsx
import Link from "next/link";

export default function ShortVideoAd() {
  return (
    <main className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-6">
      <h1 className="animate-fade-up font-[family-name:var(--font-noto-serif-tc)] text-2xl font-bold text-charcoal mb-3">
        短影音廣告
      </h1>
      <p className="animate-fade-up text-sm text-warm-gray tracking-widest mb-6" style={{ animationDelay: "100ms" }}>
        即將推出
      </p>
      <div className="animate-fade-in h-0.5 w-10 bg-terracotta mb-8" style={{ animationDelay: "200ms" }} />
      <Link
        href="/"
        className="animate-fade-up text-sm text-terracotta transition-colors active:text-terracotta-light"
        style={{ animationDelay: "300ms" }}
      >
        返回首頁
      </Link>
    </main>
  );
}
```

**Step 3: 驗證 build**

Run: `npm run build`
Expected: Build 成功

**Step 4: Commit**

```bash
git add src/app/short-video-course/page.tsx src/app/short-video-ad/page.tsx
git commit -m "redesign: rebuild coming-soon pages with ceramic theme"
```

---

### Task 6: 最終驗證

**Step 1: Full build**

Run: `npm run build`
Expected: Build 成功，無 warning

**Step 2: Lint**

Run: `npm run lint`
Expected: 無錯誤

**Step 3: Dev server 視覺檢查**

Run: `npm run dev`
檢查清單：
- [ ] 首頁：乳白底色、陶瓷橘強調色、Logo 居中、列表式導航、跑馬燈正常、社群連結
- [ ] 短影音代操：Tab 切換正常、方案卡片（推薦方案有橘色左邊框）、服務單欄列表、FAQ 手風琴展開/收合、表單底線風格、送出按鈕
- [ ] 活動花絮：2 欄網格、lightbox 開關正常
- [ ] 短影音課程：居中佈局、橘色裝飾線
- [ ] 短影音廣告：同上
- [ ] 中文斷行：標題不會在詞中間斷裂
- [ ] 動畫：載入淡入正常、無持續動畫（除跑馬燈）
