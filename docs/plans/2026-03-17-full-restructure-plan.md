# LUOWEI MEDIA 全站重構 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild LUOWEI MEDIA from ceramic light theme to dark theme with video background, expand to 4 content pages with shared components, and add an admin CMS backend with SQLite + Cloudinary.

**Architecture:** Single Next.js 16 App Router monolith. Frontend pages read content from SQLite via Prisma. Admin panel at `/admin` with simple JWT auth. Cloudinary for image hosting. All pages mobile-first (430px max-width).

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, Prisma + SQLite, Cloudinary SDK, jose (JWT), zod (validation)

**Design Doc:** `docs/plans/2026-03-17-full-restructure-design.md`

---

## Phase 1: Foundation (Deps, DB, Auth, Design System)

### Task 1: Install dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install production dependencies**

Run:
```bash
npm install prisma @prisma/client cloudinary jose zod
```

**Step 2: Initialize Prisma with SQLite**

Run:
```bash
npx prisma init --datasource-provider sqlite
```

This creates `prisma/schema.prisma` and `.env`.

**Step 3: Create `.env.local` with secrets**

Create: `.env.local`

```env
ADMIN_USER=admin
ADMIN_PASSWORD=luowei123
JWT_SECRET=luowei-media-jwt-secret-2026
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
DATABASE_URL="file:./dev.db"
```

**Step 4: Add `.env.local` and `prisma/dev.db` to `.gitignore`**

Append to `.gitignore`:
```
.env.local
prisma/dev.db
prisma/dev.db-journal
```

**Step 5: Commit**

```bash
git add package.json package-lock.json prisma/schema.prisma .env .gitignore
git commit -m "chore: add prisma, cloudinary, jose, zod dependencies"
```

---

### Task 2: Define Prisma schema and seed data

**Files:**
- Modify: `prisma/schema.prisma`
- Create: `prisma/seed.ts`
- Modify: `package.json` (add seed script)

**Step 1: Write Prisma schema**

Replace content of `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Page {
  id        String   @id @default(cuid())
  slug      String   @unique
  title     String
  heroImage String?
  sections  String   @default("[]")
  metaTitle String?
  metaDesc  String?
  updatedAt DateTime @updatedAt
  createdAt DateTime @default(now())
  faqs      FAQ[]
}

model FAQ {
  id       String @id @default(cuid())
  pageSlug String
  question String
  answer   String
  order    Int    @default(0)
  page     Page   @relation(fields: [pageSlug], references: [slug])
}

model Registration {
  id         String   @id @default(cuid())
  name       String
  phone      String
  lineId     String?
  email      String?
  courseName String
  message    String?
  createdAt  DateTime @default(now())
}

model Media {
  id        String   @id @default(cuid())
  url       String
  publicId  String   @unique
  alt       String?
  folder    String?
  createdAt DateTime @default(now())
}
```

**Step 2: Write seed script**

Create `prisma/seed.ts` — seeds the 5 page records (short-video, short-video-ad, course, cases, home) with initial content from the markdown files. Each page gets its sections JSON and FAQs.

The seed should create pages with empty sections (to be filled via admin) and placeholder FAQs for each page.

```ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Upsert pages
  const pages = [
    { slug: "home", title: "LUOWEI MEDIA" },
    { slug: "short-video", title: "短影音代操" },
    { slug: "short-video-ad", title: "廣告投放代操" },
    { slug: "course", title: "影響力變現課程" },
    { slug: "cases", title: "案例展示" },
  ];

  for (const page of pages) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {},
      create: { slug: page.slug, title: page.title, sections: "[]" },
    });
  }

  // Seed FAQs for short-video
  const shortVideoFaqs = [
    { q: "短影音代操適合什麼樣的人？", a: "適合想要透過短影音建立個人品牌、吸引精準客戶的創業者、自由工作者、中小企業主。無論你是剛起步還是想要突破流量瓶頸，我們都有適合你的方案。" },
    { q: "合作流程是怎樣的？", a: "填寫諮詢表單 → 免費策略諮詢 → 確認方案 → 開始執行。我們會先深入了解你的產業與目標，再量身打造內容策略。" },
    { q: "需要自己出鏡嗎？", a: "建議出鏡以建立個人 IP，但我們也提供不露臉的內容方案。拍攝時會有專業指導，讓你自然又有魅力。" },
    { q: "多久可以看到成效？", a: "一般而言，持續經營 1-3 個月會開始看到明顯的流量成長與粉絲互動提升。短影音是長期投資，越早開始越有優勢。" },
    { q: "可以中途更換方案嗎？", a: "可以！我們的方案設計靈活，可以根據你的成長狀況隨時升級或調整。" },
    { q: "如何開始合作？", a: "直接填寫下方的諮詢表單，或透過 LINE 聯繫我們的小幫手，我們會在 24 小時內回覆你。" },
  ];

  for (let i = 0; i < shortVideoFaqs.length; i++) {
    await prisma.fAQ.upsert({
      where: { id: `sv-faq-${i}` },
      update: {},
      create: {
        id: `sv-faq-${i}`,
        pageSlug: "short-video",
        question: shortVideoFaqs[i].q,
        answer: shortVideoFaqs[i].a,
        order: i,
      },
    });
  }

  // Seed FAQs for short-video-ad
  const adFaqs = [
    { q: "廣告投放需要多少預算才能開始？", a: "我們建議月投放預算至少 NT$10,000 起，搭配我們的策略優化，才能有效看到數據回饋。但具體數字會依產業與目標而定。" },
    { q: "多久可以看到廣告成效？", a: "一般測試期需 1-2 週來找到最佳受眾組合，之後 ROAS 會持續優化。我們每日監控數據，確保預算最大化利用。" },
    { q: "你們支援哪些廣告平台？", a: "我們支援 Meta (Facebook/Instagram)、Google Ads、TikTok Ads 三大平台，會根據你的產品特性選擇最適合的投放組合。" },
    { q: "合約期限是多長？", a: "最低合作期為 3 個月，因為廣告需要時間優化與累積數據。後續可按月續約。" },
  ];

  for (let i = 0; i < adFaqs.length; i++) {
    await prisma.fAQ.upsert({
      where: { id: `ad-faq-${i}` },
      update: {},
      create: {
        id: `ad-faq-${i}`,
        pageSlug: "short-video-ad",
        question: adFaqs[i].q,
        answer: adFaqs[i].a,
        order: i,
      },
    });
  }

  // Seed FAQs for course
  const courseFaqs = [
    { q: "完全沒有拍片經驗可以報名嗎？", a: "當然可以！初階實戰班就是為零基礎設計的，從拿起手機到發布影片，全程手把手帶你。" },
    { q: "初階跟進階差在哪裡？", a: "初階教你「會做」，進階保證你「做完」。進階班包含 21 天實作陪跑、小班制指導、保證起號，適合想認真經營的人。" },
    { q: "上課地點在哪裡？", a: "我們在雲林、台中、台南、高雄四地有據點。線下集訓在最近的據點進行，線上陪跑不限地點。" },
    { q: "學完之後還有後續支援嗎？", a: "有！結業學員可加入專屬社群，持續獲得產業資源對接與最新趨勢更新。" },
    { q: "可以開發票嗎？", a: "可以，報名確認後我們會提供電子發票。" },
  ];

  for (let i = 0; i < courseFaqs.length; i++) {
    await prisma.fAQ.upsert({
      where: { id: `course-faq-${i}` },
      update: {},
      create: {
        id: `course-faq-${i}`,
        pageSlug: "course",
        question: courseFaqs[i].q,
        answer: courseFaqs[i].a,
        order: i,
      },
    });
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

**Step 3: Add seed config to `package.json`**

Add to `package.json`:
```json
"prisma": {
  "seed": "npx tsx prisma/seed.ts"
}
```

**Step 4: Run migration and seed**

```bash
npx prisma migrate dev --name init
npx prisma db seed
```

**Step 5: Create Prisma client singleton**

Create: `src/lib/prisma.ts`

```ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

**Step 6: Commit**

```bash
git add prisma/ src/lib/prisma.ts package.json
git commit -m "feat: add prisma schema, seed data, and client singleton"
```

---

### Task 3: Replace design system — dark theme + video background CSS

**Files:**
- Modify: `src/app/globals.css`

**Step 1: Replace globals.css with dark theme tokens**

Replace the entire `@theme` block and base styles. Keep animations.

New `globals.css`:

```css
@import "tailwindcss";

@theme {
  /* Dark theme palette */
  --color-bg-primary: #0A0A0F;
  --color-bg-surface: #14141F;
  --color-bg-surface-light: #1E1E2E;
  --color-text-primary: #F0F0F5;
  --color-text-secondary: #9090A0;
  --color-accent: #7C5CFC;
  --color-accent-hover: #9B7FFF;
  --color-accent-warm: #FF6B35;
  --color-divider: #2A2A3A;
  --color-glow: rgba(124, 92, 252, 0.15);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);

  --font-serif: "Noto Serif TC", "PingFang TC", "Hiragino Sans", serif;
  --font-display: "Cormorant Garamond", "Noto Serif TC", serif;
  --font-body: "PingFang TC", "Hiragino Sans", "Microsoft JhengHei", sans-serif;
}

html,
body {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  font-family: var(--font-body);
  word-break: keep-all;
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

**Step 2: Commit**

```bash
git add src/app/globals.css
git commit -m "refactor: replace ceramic theme with dark theme design tokens"
```

---

### Task 4: Create VideoBackground component

**Files:**
- Create: `src/components/VideoBackground.tsx`

**Step 1: Write VideoBackground component**

```tsx
export default function VideoBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
        poster="/images/video-poster.jpg"
      >
        <source src="/videos/background_.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-bg-primary/85" />
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/VideoBackground.tsx
git commit -m "feat: add VideoBackground component with dark overlay"
```

---

### Task 5: Create FloatingButtons component

**Files:**
- Create: `src/components/FloatingButtons.tsx`

**Step 1: Write FloatingButtons**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";

const socials = [
  { label: "LINE 課程", href: "https://lin.ee/L8iPk8a", icon: "L1" },
  { label: "LINE 企業", href: "https://lin.ee/htTdJSH", icon: "L2" },
  { label: "TikTok", href: "https://www.tiktok.com/@luoweimedia", icon: "TT" },
  { label: "Instagram", href: "https://www.instagram.com/lowemedia_", icon: "IG" },
];

export default function FloatingButtons() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col-reverse items-end gap-3">
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform duration-200 active:scale-95"
        aria-label="社群連結"
      >
        <span
          className="text-lg transition-transform duration-200"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0)" }}
        >
          +
        </span>
      </button>

      {/* Social buttons */}
      {open &&
        socials.map((s, i) => (
          <Link
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="animate-fade-up flex h-10 items-center gap-2 rounded-full bg-bg-surface px-4 text-xs font-medium text-text-primary shadow-lg border border-divider transition-colors hover:bg-bg-surface-light"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <span className="text-accent font-bold">{s.icon}</span>
            <span>{s.label}</span>
          </Link>
        ))}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/FloatingButtons.tsx
git commit -m "feat: add FloatingButtons component with social links"
```

---

### Task 6: Create shared page components (HeroSection, PainPointHook, ComparisonTable, FAQAccordion, RegistrationForm, TabSwitcher)

**Files:**
- Create: `src/components/HeroSection.tsx`
- Create: `src/components/PainPointHook.tsx`
- Create: `src/components/ComparisonTable.tsx`
- Create: `src/components/FAQAccordion.tsx`
- Create: `src/components/RegistrationForm.tsx`
- Create: `src/components/TabSwitcher.tsx`

**Step 1: Write HeroSection**

```tsx
import Image from "next/image";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

export default function HeroSection({ title, subtitle, imageUrl }: HeroSectionProps) {
  return (
    <section className="animate-fade-up relative mb-12 overflow-hidden rounded-2xl">
      {imageUrl && (
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent" />
        </div>
      )}
      <div className={imageUrl ? "absolute bottom-0 left-0 right-0 p-6" : "py-8"}>
        <h1 className="font-[family-name:var(--font-noto-serif-tc)] text-[22px] font-bold leading-[1.6] text-text-primary mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-text-secondary leading-[1.8]">{subtitle}</p>
        )}
        <div className="mt-4 h-[2px] w-12 bg-accent rounded-full" />
      </div>
    </section>
  );
}
```

**Step 2: Write PainPointHook**

```tsx
interface PainPointHookProps {
  title?: string;
  points: string[];
}

export default function PainPointHook({ title, points }: PainPointHookProps) {
  return (
    <section className="animate-fade-up mb-12">
      {title && (
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-text-primary mb-6">
          {title}
        </h2>
      )}
      <div className="flex flex-col gap-3">
        {points.map((point, i) => (
          <div
            key={i}
            className="rounded-lg bg-bg-surface border-l-[3px] border-l-accent-warm p-4"
          >
            <p className="text-sm text-text-primary leading-[1.8]">{point}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

**Step 3: Write ComparisonTable**

```tsx
interface ComparisonItem {
  label: string;
  left: string;
  right: string;
}

interface ComparisonTableProps {
  title?: string;
  leftLabel: string;
  rightLabel: string;
  items: ComparisonItem[];
}

export default function ComparisonTable({ title, leftLabel, rightLabel, items }: ComparisonTableProps) {
  return (
    <section className="animate-fade-up mb-12">
      {title && (
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-text-primary mb-6">
          {title}
        </h2>
      )}
      <div className="overflow-hidden rounded-lg border border-divider">
        {/* Header */}
        <div className="grid grid-cols-[1fr_1fr] bg-bg-surface">
          <div className="px-4 py-3 text-center text-xs font-semibold text-text-secondary border-r border-divider">
            {leftLabel}
          </div>
          <div className="px-4 py-3 text-center text-xs font-semibold text-accent">
            {rightLabel}
          </div>
        </div>
        {/* Rows */}
        {items.map((item, i) => (
          <div
            key={i}
            className={`grid grid-cols-[1fr_1fr] ${i < items.length - 1 ? "border-b border-divider" : ""}`}
          >
            <div className="px-4 py-3 text-xs text-text-secondary/70 border-r border-divider leading-[1.6]">
              {item.left}
            </div>
            <div className="px-4 py-3 text-xs text-text-primary leading-[1.6]">
              {item.right}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

**Step 4: Write FAQAccordion**

```tsx
"use client";

import { useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  title?: string;
  items: FAQItem[];
}

export default function FAQAccordion({ title, items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="animate-fade-up mb-12">
      {title && (
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-text-primary mb-6">
          {title}
        </h2>
      )}
      <div className="flex flex-col">
        {items.map((item, i) => (
          <div key={item.id} className="border-b border-divider">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between py-4 text-left transition-colors"
            >
              <span className="text-sm font-medium text-text-primary pr-4">
                {item.question}
              </span>
              <span
                className="text-text-secondary text-lg flex-shrink-0 transition-transform duration-300"
                style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}
              >
                +
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: openIndex === i ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="pb-4 text-sm text-text-secondary leading-[1.8]">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

**Step 5: Write RegistrationForm**

```tsx
"use client";

import { useState } from "react";

interface RegistrationFormProps {
  courseOptions: string[];
  defaultCourse?: string;
}

export default function RegistrationForm({ courseOptions, defaultCourse }: RegistrationFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      lineId: (form.elements.namedItem("lineId") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      courseName: (form.elements.namedItem("courseName") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
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
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section className="animate-fade-up mb-12 rounded-lg bg-bg-surface p-8 text-center">
        <p className="text-lg font-bold text-accent mb-2">感謝您的報名</p>
        <p className="text-sm text-text-secondary">我們會盡快與您聯繫</p>
      </section>
    );
  }

  const inputClass =
    "w-full bg-transparent border-b border-divider text-text-primary py-3 text-sm focus:border-accent focus:outline-none placeholder:text-text-secondary/50 transition-colors";

  return (
    <section className="animate-fade-up mb-12">
      <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-text-primary mb-6">
        立即報名
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input type="text" name="name" placeholder="姓名" required className={inputClass} />
        <input type="tel" name="phone" placeholder="電話" required className={inputClass} />
        <input type="text" name="lineId" placeholder="LINE ID" className={inputClass} />
        <input type="email" name="email" placeholder="Email" className={inputClass} />
        <select
          name="courseName"
          defaultValue={defaultCourse || ""}
          className={`${inputClass} appearance-none`}
        >
          <option value="">選擇感興趣的課程/方案</option>
          {courseOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <textarea
          name="message"
          placeholder="留言"
          rows={3}
          className={`${inputClass} resize-none`}
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-accent py-3.5 text-center text-sm font-semibold text-white tracking-wider transition-colors duration-200 hover:bg-accent-hover disabled:opacity-50"
        >
          {submitting ? "提交中..." : "送出報名"}
        </button>
      </form>
    </section>
  );
}
```

**Step 6: Write TabSwitcher**

```tsx
"use client";

interface TabSwitcherProps {
  tabs: { key: string; label: string }[];
  activeTab: string;
  onChange: (key: string) => void;
}

export default function TabSwitcher({ tabs, activeTab, onChange }: TabSwitcherProps) {
  return (
    <div className="flex w-full border-b border-divider mb-10">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex-1 py-3 text-center text-sm font-medium tracking-widest transition-colors ${
            activeTab === tab.key
              ? "text-text-primary border-b-2 border-accent"
              : "text-text-secondary"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
```

**Step 7: Commit**

```bash
git add src/components/HeroSection.tsx src/components/PainPointHook.tsx src/components/ComparisonTable.tsx src/components/FAQAccordion.tsx src/components/RegistrationForm.tsx src/components/TabSwitcher.tsx
git commit -m "feat: add shared page components (Hero, PainPoint, Comparison, FAQ, Form, Tab)"
```

---

### Task 7: Update layout.tsx for dark theme + VideoBackground + FloatingButtons

**Files:**
- Modify: `src/app/layout.tsx`

**Step 1: Update root layout**

Replace `src/app/layout.tsx` to include VideoBackground and FloatingButtons, and add conditional logic for admin routes:

```tsx
import type { Metadata, Viewport } from "next";
import { Noto_Serif_TC, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import VideoBackground from "@/components/VideoBackground";
import FloatingButtons from "@/components/FloatingButtons";

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
        <VideoBackground />
        <div className="relative z-10 mx-auto max-w-[430px] min-h-dvh">
          {children}
        </div>
        <FloatingButtons />
      </body>
    </html>
  );
}
```

Note: Admin layout will use its own layout.tsx that hides VideoBackground and FloatingButtons by using a separate root layout group `(admin)` vs `(frontend)`. This will be handled in Task 12.

**Step 2: Commit**

```bash
git add src/app/layout.tsx
git commit -m "refactor: update root layout with VideoBackground and FloatingButtons"
```

---

### Task 8: Create registration API route

**Files:**
- Create: `src/app/api/registrations/route.ts`
- Create: `src/lib/validations.ts`

**Step 1: Write Zod validation schemas**

```ts
// src/lib/validations.ts
import { z } from "zod";

export const registrationSchema = z.object({
  name: z.string().min(1, "姓名為必填"),
  phone: z.string().min(1, "電話為必填"),
  lineId: z.string().optional().default(""),
  email: z.string().email("Email 格式不正確").optional().or(z.literal("")),
  courseName: z.string().min(1, "請選擇課程"),
  message: z.string().optional().default(""),
});
```

**Step 2: Write registration API route**

```ts
// src/app/api/registrations/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { registrationSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = registrationSchema.parse(body);

    const registration = await prisma.registration.create({ data });

    return NextResponse.json({ id: registration.id }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "驗證失敗" }, { status: 400 });
    }
    return NextResponse.json({ error: "伺服器錯誤" }, { status: 500 });
  }
}
```

**Step 3: Commit**

```bash
git add src/lib/validations.ts src/app/api/registrations/route.ts
git commit -m "feat: add registration API route with Zod validation"
```

---

## Phase 2: Frontend Pages

### Task 9: Rebuild homepage with dark theme

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/AvatarMarquee.tsx`
- Modify: `src/components/SocialLinks.tsx`

**Step 1: Update AvatarMarquee for dark theme**

Change gradient colors from `from-cream` to `from-bg-primary`:

- `from-cream to-transparent` → `from-bg-primary to-transparent`
- `border-divider` stays (now maps to dark divider)

**Step 2: Update SocialLinks for dark theme**

Change `text-terracotta` → `text-accent`, `text-warm-gray` → `text-text-secondary`.

**Step 3: Rebuild homepage**

Replace `src/app/page.tsx` with dark theme version featuring:
- Logo (light on dark)
- Brand tagline
- 4 navigation cards (glass-morphism style: `bg-bg-surface/60 backdrop-blur-sm border border-divider`)
  - 短影音代操 → /short-video
  - 廣告投放代操 → /short-video-ad
  - 影響力變現課程 → /course
  - 案例展示 → /cases (with "即將推出" badge)
- AvatarMarquee
- SocialLinks

Replace all ceramic color references: `text-charcoal` → `text-text-primary`, `text-warm-gray` → `text-text-secondary`, `bg-cream-dark` → `bg-bg-surface`, `border-terracotta` → `border-accent`, `text-terracotta` → `text-accent`.

**Step 4: Commit**

```bash
git add src/app/page.tsx src/components/AvatarMarquee.tsx src/components/SocialLinks.tsx
git commit -m "refactor: rebuild homepage with dark theme and navigation cards"
```

---

### Task 10: Build short-video page (`/short-video`)

**Files:**
- Create: `src/app/short-video/page.tsx`
- Delete: `src/app/short-video-class/page.tsx` (old route)

**Step 1: Build the short-video page**

Content sourced from `docs/plans/短影音代操.md`, structured as:

1. Header with back link
2. HeroSection (title: "全方位短影音品牌代操計畫", subtitle: "從 0 到 1，將點擊轉化為真實的品牌影響力")
3. PainPointHook (4 pain points from the markdown)
4. Four service phases as cards (基礎紮根, 靈魂定位, 模組化執行, 目標產值)
5. 人設設定 table (dark card style)
6. ComparisonTable (自己做 vs 交給我們)
7. Why choose us — 3 feature cards (AI 技術賦能, 轉換思維, 生態整合)
8. FAQAccordion (fetch from API or pass server data)
9. RegistrationForm (courseOptions: ["品牌啟航方案", "流量爆發方案", "行業壟斷方案"])
10. CTA section

No emoji anywhere — use numbered markers, dash bullets, or SVG icons.

This is a server component that fetches FAQ data, wrapping client subcomponents.

**Step 2: Remove old short-video-class directory**

```bash
rm -rf src/app/short-video-class
rm -rf src/app/short-video-course
```

**Step 3: Commit**

```bash
git add src/app/short-video/ -A
git rm -r src/app/short-video-class src/app/short-video-course
git commit -m "feat: build short-video page with dark theme, replace old routes"
```

---

### Task 11: Build short-video-ad page (`/short-video-ad`)

**Files:**
- Modify: `src/app/short-video-ad/page.tsx` (replace existing coming-soon page)

**Step 1: Build the ad service page**

Content sourced from `docs/plans/短影音廣告代操.md`, structured as:

1. Header with back link
2. HeroSection (title: "精準投流，讓每一分預算都成為品牌成長的燃料")
3. PainPointHook (3 pain points)
4. Three service highlights as cards (全平台策略佈局, AI 受眾定位, 文案素材夾擊)
5. Timeline/Steps — 合作三部曲 (深度診斷, 動態優化, 定期彙報)
6. ComparisonTable (自己投廣告 vs 專業代操)
7. Dashboard-style data transparency section (simulated metrics cards)
8. FAQAccordion
9. RegistrationForm (courseOptions: ["廣告投放代操"])
10. CTA: 預約免費廣告診斷

No emoji.

**Step 2: Commit**

```bash
git add src/app/short-video-ad/page.tsx
git commit -m "feat: build short-video-ad page with dark theme"
```

---

### Task 12: Build course page (`/course`)

**Files:**
- Create: `src/app/course/page.tsx`

**Step 1: Build the course page with tab switching**

This is a client component with TabSwitcher for 初階/進階.

Content sourced from `docs/plans/影響力變現課程.md`:

**Initial Tab (初階實戰班):**
1. PainPointHook (腦袋空白, 沒人看, 想放棄)
2. Concept correction cards (核心公式)
3. 4 core modules (accordion or cards)
4. ComparisonTable (自學 vs 加入實戰班)
5. Success stories (4 student cards with metrics)
6. Pricing block (原價 NT$6,000 → NT$1,000)
7. FAQAccordion
8. RegistrationForm

**Advanced Tab (進階陪跑班):**
1. PainPointHook (做不出來, 撐不下去)
2. 21-day timeline (3 days offline + 18 days online)
3. Graduation results cards
4. Professional endorsement (4 companies)
5. ComparisonTable (初階 vs 進階)
6. Pricing block (原價 NT$19,800 → NT$6,000)
7. FAQAccordion
8. RegistrationForm

No emoji.

**Step 2: Commit**

```bash
git add src/app/course/page.tsx
git commit -m "feat: build course page with beginner/advanced tabs"
```

---

### Task 13: Build cases placeholder page (`/cases`)

**Files:**
- Create: `src/app/cases/page.tsx`

**Step 1: Write coming-soon page**

Dark theme version with centered "即將推出" + back link.

**Step 2: Commit**

```bash
git add src/app/cases/page.tsx
git commit -m "feat: add cases coming-soon placeholder page"
```

---

## Phase 3: Admin Backend

### Task 14: Set up admin authentication (JWT + middleware)

**Files:**
- Create: `src/lib/auth.ts`
- Create: `src/app/api/admin/login/route.ts`
- Create: `src/app/api/admin/logout/route.ts`
- Create: `src/middleware.ts`

**Step 1: Write auth utility**

```ts
// src/lib/auth.ts
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const COOKIE_NAME = "admin_token";

export async function createToken() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function getAuthCookie() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export function validateCredentials(user: string, password: string) {
  return user === process.env.ADMIN_USER && password === process.env.ADMIN_PASSWORD;
}

export { COOKIE_NAME };
```

**Step 2: Write login API**

```ts
// src/app/api/admin/login/route.ts
import { NextResponse } from "next/server";
import { createToken, validateCredentials, COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  const { user, password } = await request.json();

  if (!validateCredentials(user, password)) {
    return NextResponse.json({ error: "帳號或密碼錯誤" }, { status: 401 });
  }

  const token = await createToken();
  const response = NextResponse.json({ success: true });
  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24hr
    path: "/",
  });

  return response;
}
```

**Step 3: Write logout API**

```ts
// src/app/api/admin/logout/route.ts
import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(COOKIE_NAME);
  return response;
}
```

**Step 4: Write middleware**

```ts
// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (except /admin/login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Protect /api/admin routes (except login)
  if (pathname.startsWith("/api/admin") && !pathname.endsWith("/login")) {
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "未授權" }, { status: 401 });
    }

    try {
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      return NextResponse.json({ error: "Token 過期" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
```

**Step 5: Commit**

```bash
git add src/lib/auth.ts src/app/api/admin/login/route.ts src/app/api/admin/logout/route.ts src/middleware.ts
git commit -m "feat: add admin JWT authentication and middleware"
```

---

### Task 15: Build admin layout and login page

**Files:**
- Create: `src/app/admin/layout.tsx`
- Create: `src/app/admin/login/page.tsx`
- Create: `src/app/admin/page.tsx` (dashboard)
- Create: `src/components/admin/Sidebar.tsx`

**Step 1: Write admin layout (white theme, sidebar)**

The admin layout should NOT inherit the dark theme. Override with white background. Include sidebar navigation.

```tsx
// src/app/admin/layout.tsx
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh bg-white text-gray-900" style={{ maxWidth: "100%", margin: 0 }}>
      <Sidebar />
      <main className="flex-1 p-6 ml-56">{children}</main>
    </div>
  );
}
```

Note: The admin layout sits inside the root layout but overrides visual styles. VideoBackground and FloatingButtons from root layout will be visible but covered by admin's opaque white background. Alternatively, restructure using Route Groups — create `(frontend)` and `(admin)` groups with separate layouts. Decide during implementation.

**Step 2: Write Sidebar**

```tsx
// src/components/admin/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "頁面管理", href: "/admin/pages" },
  { label: "FAQ 管理", href: "/admin/faqs" },
  { label: "報名資料", href: "/admin/registrations" },
  { label: "圖片庫", href: "/admin/media" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-full w-56 bg-gray-50 border-r border-gray-200 p-4 flex flex-col">
      <h1 className="text-lg font-bold mb-8 px-3">LUOWEI Admin</h1>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-2 rounded-lg text-sm transition-colors ${
              pathname === item.href
                ? "bg-blue-50 text-blue-700 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <form action="/api/admin/logout" method="POST">
          <button
            type="submit"
            className="px-3 py-2 text-sm text-gray-500 hover:text-red-600 transition-colors"
          >
            登出
          </button>
        </form>
      </div>
    </aside>
  );
}
```

**Step 3: Write login page**

```tsx
// src/app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const user = (form.elements.namedItem("user") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("帳號或密碼錯誤");
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="w-80 rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-xl font-bold mb-6 text-center">Admin 登入</h1>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <input
          name="user"
          placeholder="帳號"
          required
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 mb-4 text-sm focus:outline-none focus:border-blue-500"
        />
        <input
          name="password"
          type="password"
          placeholder="密碼"
          required
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 mb-6 text-sm focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          登入
        </button>
      </form>
    </div>
  );
}
```

Note: Login page should NOT show the sidebar. Use a separate layout for `/admin/login` or conditionally hide sidebar.

**Step 4: Write dashboard page**

```tsx
// src/app/admin/page.tsx
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [pageCount, faqCount, registrationCount] = await Promise.all([
    prisma.page.count(),
    prisma.fAQ.count(),
    prisma.registration.count(),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-gray-50 p-6">
          <p className="text-3xl font-bold">{pageCount}</p>
          <p className="text-sm text-gray-500 mt-1">頁面</p>
        </div>
        <div className="rounded-xl bg-gray-50 p-6">
          <p className="text-3xl font-bold">{faqCount}</p>
          <p className="text-sm text-gray-500 mt-1">FAQ</p>
        </div>
        <div className="rounded-xl bg-gray-50 p-6">
          <p className="text-3xl font-bold">{registrationCount}</p>
          <p className="text-sm text-gray-500 mt-1">報名</p>
        </div>
      </div>
    </div>
  );
}
```

**Step 5: Commit**

```bash
git add src/app/admin/ src/components/admin/
git commit -m "feat: add admin layout, login page, sidebar, and dashboard"
```

---

### Task 16: Build admin pages management (CRUD)

**Files:**
- Create: `src/app/api/admin/pages/route.ts`
- Create: `src/app/api/admin/pages/[slug]/route.ts`
- Create: `src/app/admin/pages/page.tsx`
- Create: `src/app/admin/pages/[slug]/edit/page.tsx`

**Step 1: Write pages API routes**

GET `/api/admin/pages` — list all pages
GET `/api/admin/pages/[slug]` — get single page
PUT `/api/admin/pages/[slug]` — update page (title, heroImage, sections, metaTitle, metaDesc)

**Step 2: Write pages list UI**

Table with: slug, title, last updated, edit link.

**Step 3: Write page editor UI**

Form with:
- Title input
- Hero image picker (text input for Cloudinary URL, later integrate media picker)
- Sections JSON editor (initially a structured form per section type, or a JSON textarea for MVP)
- Meta title / meta description
- Save button → PUT API → revalidate

**Step 4: Commit**

```bash
git add src/app/api/admin/pages/ src/app/admin/pages/
git commit -m "feat: add admin pages CRUD"
```

---

### Task 17: Build admin FAQ management

**Files:**
- Create: `src/app/api/admin/faqs/route.ts`
- Create: `src/app/api/admin/faqs/[id]/route.ts`
- Create: `src/app/admin/faqs/page.tsx`
- Create: `src/app/admin/faqs/new/page.tsx`
- Create: `src/app/admin/faqs/[id]/edit/page.tsx`

**Step 1: Write FAQ API routes**

GET `/api/admin/faqs?pageSlug=xxx` — list FAQs filtered by page
POST `/api/admin/faqs` — create FAQ
PUT `/api/admin/faqs/[id]` — update FAQ
DELETE `/api/admin/faqs/[id]` — delete FAQ

**Step 2: Write FAQ list page**

- Dropdown to filter by page
- Table: question (truncated), page, order, actions (edit/delete)
- Add new button

**Step 3: Write FAQ create/edit forms**

- Page selector (dropdown)
- Question textarea
- Answer textarea
- Order number input
- Save/cancel buttons

**Step 4: Commit**

```bash
git add src/app/api/admin/faqs/ src/app/admin/faqs/
git commit -m "feat: add admin FAQ management"
```

---

### Task 18: Build admin registration management

**Files:**
- Create: `src/app/api/admin/registrations/route.ts`
- Create: `src/app/api/admin/registrations/[id]/route.ts`
- Create: `src/app/api/admin/registrations/export/route.ts`
- Create: `src/app/admin/registrations/page.tsx`
- Create: `src/app/admin/registrations/[id]/page.tsx`

**Step 1: Write registration API routes**

GET `/api/admin/registrations?page=1&search=xxx&course=xxx` — paginated list with search/filter
GET `/api/admin/registrations/[id]` — single registration detail
DELETE `/api/admin/registrations/[id]` — delete (with confirmation on frontend)
GET `/api/admin/registrations/export` — CSV export

**Step 2: Write registrations list page**

- Search bar (name, phone, LINE ID)
- Course filter dropdown
- Table: name, phone, course, date, actions
- Pagination
- Export CSV button
- Click row → detail page

**Step 3: Write registration detail page**

- All fields displayed
- Delete button with confirmation dialog

**Step 4: Commit**

```bash
git add src/app/api/admin/registrations/ src/app/admin/registrations/
git commit -m "feat: add admin registration management with CSV export"
```

---

### Task 19: Build admin media management (Cloudinary)

**Files:**
- Create: `src/lib/cloudinary.ts`
- Create: `src/app/api/admin/media/route.ts`
- Create: `src/app/api/admin/media/upload/route.ts`
- Create: `src/app/api/admin/media/[id]/route.ts`
- Create: `src/app/admin/media/page.tsx`

**Step 1: Write Cloudinary utility**

```ts
// src/lib/cloudinary.ts
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
```

**Step 2: Write media API routes**

POST `/api/admin/media/upload` — accepts FormData, uploads to Cloudinary, saves record to DB
GET `/api/admin/media` — list from DB
DELETE `/api/admin/media/[id]` — delete from Cloudinary + DB

**Step 3: Write media gallery page**

- Grid of uploaded images with thumbnails
- Drag-and-drop upload zone
- Click to copy URL
- Delete button per image

**Step 4: Commit**

```bash
git add src/lib/cloudinary.ts src/app/api/admin/media/ src/app/admin/media/
git commit -m "feat: add admin media management with Cloudinary integration"
```

---

## Phase 4: Integration & Polish

### Task 20: Route groups — separate frontend and admin layouts

**Files:**
- Restructure: Move frontend pages into `src/app/(frontend)/` route group
- Restructure: Move admin pages into `src/app/(admin)/admin/` route group
- Create separate layout files for each group

**Step 1: Create route groups**

```
src/app/
├── (frontend)/
│   ├── layout.tsx          (dark theme + VideoBackground + FloatingButtons)
│   ├── page.tsx            (homepage)
│   ├── short-video/
│   ├── short-video-ad/
│   ├── course/
│   └── cases/
├── (admin)/
│   └── admin/
│       ├── layout.tsx      (white theme + sidebar)
│       ├── login/
│       ├── page.tsx
│       ├── pages/
│       ├── faqs/
│       ├── registrations/
│       └── media/
├── api/                    (stays at root)
├── layout.tsx              (minimal root: html + body + fonts only)
└── globals.css
```

The root `layout.tsx` only sets up `<html>`, `<body>`, and fonts. Each group layout handles its own visual context.

**Step 2: Commit**

```bash
git add -A
git commit -m "refactor: restructure into route groups for frontend/admin separation"
```

---

### Task 21: Connect frontend pages to database content

**Files:**
- Modify: Frontend page files to fetch FAQ from Prisma
- Create: `src/app/api/faqs/[slug]/route.ts` (public FAQ API)

**Step 1: Write public FAQ API**

```ts
// src/app/api/faqs/[slug]/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const faqs = await prisma.fAQ.findMany({
    where: { pageSlug: params.slug },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(faqs);
}
```

**Step 2: Update each frontend page to fetch FAQs server-side**

In each page server component, fetch FAQs from Prisma directly (no API needed for SSR):

```ts
const faqs = await prisma.fAQ.findMany({
  where: { pageSlug: "short-video" },
  orderBy: { order: "asc" },
});
```

Pass to `<FAQAccordion items={faqs} />`.

**Step 3: Commit**

```bash
git add -A
git commit -m "feat: connect frontend pages to database FAQ content"
```

---

### Task 22: Delete deprecated files and clean up

**Files:**
- Delete: `src/components/OceanBackground.tsx`
- Clean up any unused CSS, imports, or references to old ceramic theme

**Step 1: Remove deprecated files**

```bash
git rm src/components/OceanBackground.tsx
```

**Step 2: Run lint and build**

```bash
npm run lint
npm run build
```

Fix any errors.

**Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove deprecated OceanBackground and clean up unused code"
```

---

### Task 23: Final build verification

**Step 1: Run full build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

**Step 2: Run dev server and manual test**

```bash
npm run dev
```

Test checklist:
- [ ] Homepage loads with video background and dark theme
- [ ] All 4 navigation cards link correctly
- [ ] /short-video page loads with all sections, no emoji
- [ ] /short-video-ad page loads with all sections, no emoji
- [ ] /course page tab switching works (初階/進階)
- [ ] /cases shows coming-soon page
- [ ] FloatingButtons expand/collapse
- [ ] Registration form submits and saves to DB
- [ ] FAQ accordion opens/closes
- [ ] /admin/login works with admin/luowei123
- [ ] Admin dashboard shows correct counts
- [ ] Admin pages list shows all 5 pages
- [ ] Admin FAQ management CRUD works
- [ ] Admin registrations list shows submitted data
- [ ] Admin media upload to Cloudinary works
- [ ] Mobile viewport (430px) renders correctly

**Step 3: Final commit**

```bash
git add -A
git commit -m "chore: final build verification and cleanup"
```

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 | Tasks 1-8 | Foundation: deps, DB, auth, design system, shared components, API |
| 2 | Tasks 9-13 | Frontend: rebuild homepage + 4 content pages |
| 3 | Tasks 14-19 | Admin: auth, layout, pages/FAQ/registration/media CRUD |
| 4 | Tasks 20-23 | Integration: route groups, DB connection, cleanup, verification |

Total: 23 tasks across 4 phases.
