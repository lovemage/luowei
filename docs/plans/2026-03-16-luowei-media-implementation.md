# LUOWEI MEDIA Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a mobile-only landing page for LUOWEI MEDIA with ocean-themed animated background, gold/dark-blue color scheme, and three navigation buttons leading to Coming Soon sub-pages.

**Architecture:** Next.js 16 App Router with Tailwind CSS v4. Pure CSS SVG animations for ocean background. Mobile-only viewport (max-width 430px centered). No external animation libraries.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, TypeScript

---

## Task 1: Scaffold Next.js 16 Project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`
- Move: `images/logo.png` → `public/images/logo.png`

**Step 1: Initialize Next.js 16 project**

Run from `/home/aistorm/projects/luowei`:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --yes
```

Note: If prompted about existing files, allow overwrite. The `images/` folder needs to be moved to `public/`.

**Step 2: Move logo to public directory**

```bash
mkdir -p public/images
cp images/logo.png public/images/logo.png
rm -rf images
```

**Step 3: Verify project runs**

```bash
npm run dev
```

Expected: Dev server starts on localhost:3000 without errors.

**Step 4: Configure Tailwind custom colors**

Edit `tailwind.config.ts` to add custom color tokens:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          bg: "#0a0e1a",
          deep: "#1a2744",
          wave1: "#162040",
          wave2: "#1e3a6e",
        },
        gold: {
          DEFAULT: "#d4a853",
          bright: "#e8c06a",
          glow: "rgba(212,168,83,0.15)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 5: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Next.js 16 project with Tailwind custom colors"
```

---

## Task 2: Global Layout + Mobile Viewport

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/app/globals.css` (modify existing)

**Step 1: Set up global styles**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";

@theme {
  --color-ocean-bg: #0a0e1a;
  --color-ocean-deep: #1a2744;
  --color-ocean-wave1: #162040;
  --color-ocean-wave2: #1e3a6e;
  --color-gold: #d4a853;
  --color-gold-bright: #e8c06a;
  --color-gold-glow: rgba(212, 168, 83, 0.15);
}

html,
body {
  background-color: var(--color-ocean-bg);
  color: var(--color-gold);
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
```

**Step 2: Set up layout.tsx**

Replace `src/app/layout.tsx` with:

```tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";

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
    <html lang="zh-Hant">
      <body>
        <div className="mx-auto max-w-[430px] min-h-dvh relative overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
```

**Step 3: Verify layout renders**

```bash
npm run dev
```

Visit localhost:3000. Expected: dark background, centered 430px container.

**Step 4: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat: add global layout with mobile viewport and custom color tokens"
```

---

## Task 3: Ocean Background Component

**Files:**
- Create: `src/components/OceanBackground.tsx`

**Step 1: Create the ocean background component**

Create `src/components/OceanBackground.tsx`:

```tsx
export default function OceanBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Light rays */}
      <div className="absolute inset-0 animate-light-rays opacity-20"
        style={{
          background:
            "repeating-linear-gradient(115deg, transparent, transparent 40px, rgba(212,168,83,0.08) 40px, rgba(212,168,83,0.08) 80px)",
        }}
      />
      <div className="absolute inset-0 animate-light-rays-slow opacity-10"
        style={{
          background:
            "repeating-linear-gradient(125deg, transparent, transparent 60px, rgba(30,58,110,0.15) 60px, rgba(30,58,110,0.15) 100px)",
        }}
      />

      {/* SVG Waves */}
      <svg
        className="absolute bottom-0 w-full"
        style={{ height: "40%" }}
        viewBox="0 0 430 300"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Wave layer 1 - back */}
        <path className="animate-wave-1" opacity="0.3" fill="#162040"
          d="M0,120 C60,80 120,160 200,120 C280,80 360,140 430,100 L430,300 L0,300 Z"
        />
        {/* Wave layer 2 - middle */}
        <path className="animate-wave-2" opacity="0.5" fill="#1a2744"
          d="M0,160 C80,120 160,200 240,150 C320,100 380,170 430,140 L430,300 L0,300 Z"
        />
        {/* Wave layer 3 - front */}
        <path className="animate-wave-3" opacity="0.7" fill="#1e3a6e"
          d="M0,200 C70,170 140,220 220,190 C300,160 370,210 430,180 L430,300 L0,300 Z"
        />
      </svg>

      {/* Gold shimmer on water surface */}
      <div
        className="absolute bottom-[25%] left-0 right-0 h-[2px] animate-shimmer opacity-30"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #d4a853 30%, #e8c06a 50%, #d4a853 70%, transparent 100%)",
        }}
      />
    </div>
  );
}
```

**Step 2: Add animation keyframes to globals.css**

Append to `src/app/globals.css`:

```css
@keyframes wave-1 {
  0%, 100% {
    d: path("M0,120 C60,80 120,160 200,120 C280,80 360,140 430,100 L430,300 L0,300 Z");
  }
  50% {
    d: path("M0,100 C80,140 140,80 220,130 C300,100 380,150 430,110 L430,300 L0,300 Z");
  }
}

@keyframes wave-2 {
  0%, 100% {
    d: path("M0,160 C80,120 160,200 240,150 C320,100 380,170 430,140 L430,300 L0,300 Z");
  }
  50% {
    d: path("M0,150 C60,180 140,120 220,170 C300,130 360,180 430,150 L430,300 L0,300 Z");
  }
}

@keyframes wave-3 {
  0%, 100% {
    d: path("M0,200 C70,170 140,220 220,190 C300,160 370,210 430,180 L430,300 L0,300 Z");
  }
  50% {
    d: path("M0,190 C90,210 160,170 240,200 C320,170 390,200 430,190 L430,300 L0,300 Z");
  }
}

@keyframes light-rays {
  0% { transform: translateX(-20px) rotate(0deg); }
  50% { transform: translateX(20px) rotate(1deg); }
  100% { transform: translateX(-20px) rotate(0deg); }
}

@keyframes light-rays-slow {
  0% { transform: translateX(10px); }
  50% { transform: translateX(-10px); }
  100% { transform: translateX(10px); }
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

@utility animate-wave-1 {
  animation: wave-1 8s ease-in-out infinite;
}

@utility animate-wave-2 {
  animation: wave-2 6s ease-in-out infinite;
}

@utility animate-wave-3 {
  animation: wave-3 7s ease-in-out infinite;
}

@utility animate-light-rays {
  animation: light-rays 10s ease-in-out infinite;
}

@utility animate-light-rays-slow {
  animation: light-rays-slow 14s ease-in-out infinite;
}

@utility animate-shimmer {
  animation: shimmer 4s ease-in-out infinite;
}
```

**Step 3: Verify animation renders**

Temporarily import OceanBackground in `src/app/page.tsx` and check visually at localhost:3000.

**Step 4: Commit**

```bash
git add src/components/OceanBackground.tsx src/app/globals.css
git commit -m "feat: add ocean background with SVG waves and light refraction animation"
```

---

## Task 4: Social Links Component

**Files:**
- Create: `src/components/SocialLinks.tsx`

**Step 1: Create the SocialLinks component**

Create `src/components/SocialLinks.tsx`:

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
    <div className="flex flex-col items-center gap-3 pt-6">
      <div className="flex items-center gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 text-gold/70 hover:text-gold-bright transition-colors"
          >
            <span className="text-xs font-medium tracking-wide">{link.icon}</span>
            <span className="text-[10px] opacity-70">{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/SocialLinks.tsx
git commit -m "feat: add social links component with LINE and IG links"
```

---

## Task 5: Homepage

**Files:**
- Modify: `src/app/page.tsx`

**Step 1: Build the homepage**

Replace `src/app/page.tsx` with:

```tsx
import Image from "next/image";
import Link from "next/link";
import OceanBackground from "@/components/OceanBackground";
import SocialLinks from "@/components/SocialLinks";

const navButtons = [
  { label: "短影音帶操", href: "/short-video-class" },
  { label: "短影音課程", href: "/short-video-course" },
  { label: "短影音廣告", href: "/short-video-ad" },
];

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center px-8 py-12">
      <OceanBackground />

      {/* Logo */}
      <div className="flex flex-col items-center gap-4 mb-12">
        <Image
          src="/images/logo.png"
          alt="LUOWEI MEDIA"
          width={120}
          height={120}
          priority
        />
        <h1 className="text-2xl font-bold tracking-[0.2em] text-gold">
          LUOWEI MEDIA
        </h1>
      </div>

      {/* Navigation Buttons */}
      <div className="flex w-full flex-col gap-4 mb-12">
        {navButtons.map((btn) => (
          <Link
            key={btn.href}
            href={btn.href}
            className="block w-full rounded-lg border border-gold/40 bg-ocean-deep/60 py-4 text-center text-lg font-semibold tracking-widest text-gold backdrop-blur-sm transition-all hover:border-gold-bright hover:bg-ocean-deep/80 hover:text-gold-bright hover:shadow-[0_0_20px_rgba(212,168,83,0.15)]"
          >
            {btn.label}
          </Link>
        ))}
      </div>

      {/* Slogan */}
      <p className="text-sm tracking-[0.3em] text-gold/80 mb-8">
        無限進步 | 個人成長
      </p>

      {/* Social Links */}
      <SocialLinks />
    </main>
  );
}
```

**Step 2: Verify homepage renders correctly**

```bash
npm run dev
```

Visit localhost:3000. Expected: dark background, logo, 3 gold buttons, slogan, social links. Ocean waves animating at bottom.

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: build homepage with logo, navigation buttons, slogan, and social links"
```

---

## Task 6: Coming Soon Sub-pages

**Files:**
- Create: `src/app/short-video-class/page.tsx`
- Create: `src/app/short-video-course/page.tsx`
- Create: `src/app/short-video-ad/page.tsx`

**Step 1: Create shared Coming Soon pages**

All three pages follow the same pattern. Create each file:

`src/app/short-video-class/page.tsx`:
```tsx
import Link from "next/link";
import OceanBackground from "@/components/OceanBackground";

export default function ShortVideoClass() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center px-8">
      <OceanBackground />
      <h1 className="text-xl font-bold tracking-[0.2em] text-gold mb-4">
        短影音帶操
      </h1>
      <p className="text-gold/50 tracking-widest text-sm mb-8">COMING SOON</p>
      <Link
        href="/"
        className="text-gold/60 text-sm underline underline-offset-4 hover:text-gold-bright transition-colors"
      >
        返回首頁
      </Link>
    </main>
  );
}
```

`src/app/short-video-course/page.tsx`:
```tsx
import Link from "next/link";
import OceanBackground from "@/components/OceanBackground";

export default function ShortVideoCourse() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center px-8">
      <OceanBackground />
      <h1 className="text-xl font-bold tracking-[0.2em] text-gold mb-4">
        短影音課程
      </h1>
      <p className="text-gold/50 tracking-widest text-sm mb-8">COMING SOON</p>
      <Link
        href="/"
        className="text-gold/60 text-sm underline underline-offset-4 hover:text-gold-bright transition-colors"
      >
        返回首頁
      </Link>
    </main>
  );
}
```

`src/app/short-video-ad/page.tsx`:
```tsx
import Link from "next/link";
import OceanBackground from "@/components/OceanBackground";

export default function ShortVideoAd() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center px-8">
      <OceanBackground />
      <h1 className="text-xl font-bold tracking-[0.2em] text-gold mb-4">
        短影音廣告
      </h1>
      <p className="text-gold/50 tracking-widest text-sm mb-8">COMING SOON</p>
      <Link
        href="/"
        className="text-gold/60 text-sm underline underline-offset-4 hover:text-gold-bright transition-colors"
      >
        返回首頁
      </Link>
    </main>
  );
}
```

**Step 2: Verify all three sub-pages**

Visit each route and confirm they render with dark theme + Coming Soon + back link:
- localhost:3000/short-video-class
- localhost:3000/short-video-course
- localhost:3000/short-video-ad

**Step 3: Commit**

```bash
git add src/app/short-video-class/ src/app/short-video-course/ src/app/short-video-ad/
git commit -m "feat: add Coming Soon sub-pages for all three services"
```

---

## Task 7: Build Verification

**Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds with no errors.

**Step 2: Test production server**

```bash
npm run start
```

Visit localhost:3000 and verify all pages render correctly.

**Step 3: Final commit (if any fixes needed)**

```bash
git add -A
git commit -m "fix: address build issues"
```
