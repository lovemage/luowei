# Short Video Service Page — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the full 短影音代操 service page with pricing plans, services, FAQ, contact form, event gallery tab, and fix homepage typo.

**Architecture:** Single Client Component page with useState tab switching (短影音代操 / 活動花絮). All sections (hero, plans, services, FAQ accordion, form) rendered conditionally by tab. Photos pre-converted to WebP. Reuses existing OceanBackground component and design tokens.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, sharp (for image conversion)

---

### Task 1: Fix homepage typo

**Files:**
- Modify: `src/app/page.tsx:7`

**Step 1: Fix the typo**

In `src/app/page.tsx` line 7, change:
```ts
{ label: "短影音帶操", href: "/short-video-class" },
```
to:
```ts
{ label: "短影音代操", href: "/short-video-class" },
```

**Step 2: Verify build**

Run: `npx next build`
Expected: Build succeeds

**Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "fix: 修正首頁「短影音帶操」→「短影音代操」錯字"
```

---

### Task 2: Convert JPG images to WebP

**Files:**
- Input: `public/pics/S__4505716_0.jpg` through `S__4505725_0.jpg` (10 files)
- Output: `public/pics/S__4505716_0.webp` through `S__4505725_0.webp` (10 files)
- Delete: Original `.jpg` files after conversion

**Step 1: Install sharp and convert**

```bash
npx sharp-cli --input "public/pics/*.jpg" --output "public/pics/" --format webp --quality 80
```

If sharp-cli is not available, use a one-off Node script:

```bash
node -e "
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const dir = 'public/pics';
fs.readdirSync(dir)
  .filter(f => f.endsWith('.jpg'))
  .forEach(async f => {
    const input = path.join(dir, f);
    const output = path.join(dir, f.replace('.jpg', '.webp'));
    await sharp(input).webp({ quality: 80 }).toFile(output);
    fs.unlinkSync(input);
    console.log('Converted:', f);
  });
"
```

**Step 2: Verify files exist**

```bash
ls public/pics/*.webp
```
Expected: 10 `.webp` files, 0 `.jpg` files

**Step 3: Commit**

```bash
git add public/pics/
git commit -m "chore: convert event photos from JPG to WebP"
```

---

### Task 3: Build the short-video-class page

**Files:**
- Rewrite: `src/app/short-video-class/page.tsx`

This is the main task. The page is a `"use client"` component with these sections:

**Step 1: Create the full page component**

Write `src/app/short-video-class/page.tsx` with:

1. **Tab bar** at top — two buttons: "短影音代操" (default) and "活動花絮"
   - Active tab: `border-b-2 border-gold text-gold`
   - Inactive tab: `text-gold/50`

2. **Hero section** (tab 1):
   - `<h1>` 打造你的個人 IP，讓短影音為你帶來精準客戶
   - `<p>` 三大方案，從品牌建立到行業壟斷，量身打造你的短影音帝國

3. **Three plan cards** (tab 1):
   - Vertical stack on mobile (full-width cards)
   - Each card: `border border-gold/20 bg-ocean-deep/50 backdrop-blur-sm rounded-xl p-6`
   - Middle card (流量爆發) gets a "推薦" badge and slightly brighter border
   - Plan name, feature list with checkmarks (✓) and dashes (—)
   - Plans data:

   **品牌啟航方案:**
   - 每月 4 支影片 ✓
   - 帳號策略規劃 ✓
   - 腳本撰寫 ✓
   - 剪輯製作 ✓
   - 拍攝指導 —
   - 數據分析報告 —
   - 廣告投放策略 —
   - 1對1專屬顧問 —

   **流量爆發方案:**
   - 每月 8 支影片 ✓
   - 帳號策略規劃 ✓
   - 腳本撰寫 ✓
   - 剪輯製作 ✓
   - 拍攝指導 ✓
   - 數據分析報告（月報）✓
   - 廣告投放策略 —
   - 1對1專屬顧問 —

   **行業壟斷方案:**
   - 每月 12+ 支影片 ✓
   - 帳號策略規劃 ✓
   - 腳本撰寫 ✓
   - 剪輯製作 ✓
   - 拍攝指導 ✓
   - 數據分析報告（週報）✓
   - 廣告投放策略 ✓
   - 1對1專屬顧問 ✓

4. **Services section** (tab 1):
   - Title: "主要服務"
   - 2-column grid of 6 service items
   - Each item: icon/emoji + title + one-line description
   - Services:
     1. 帳號定位與 IP 打造 — 分析你的優勢，打造獨特個人品牌定位
     2. 腳本企劃與內容策略 — 規劃吸睛內容，讓每支影片都有明確目標
     3. 專業拍攝指導 — 手把手教你拍出專業感，不需昂貴設備
     4. 後製剪輯與字幕特效 — 節奏、字幕、特效一次搞定
     5. 數據追蹤與優化 — 用數據說話，持續優化內容方向
     6. 廣告投放與流量佈局 — 精準投放，讓每一分預算都花在刀口上

5. **FAQ accordion** (tab 1):
   - Title: "常見問題"
   - useState for open index (one at a time)
   - Click to expand/collapse with rotation arrow
   - Q&A pairs:
     1. Q: 短影音代操適合什麼樣的人？ A: 適合想要透過短影音建立個人品牌、吸引精準客戶的創業者、自由工作者、中小企業主。無論你是剛起步還是想要突破流量瓶頸，我們都有適合你的方案。
     2. Q: 合作流程是怎樣的？ A: 填寫諮詢表單 → 免費策略諮詢 → 確認方案 → 開始執行。我們會先深入了解你的產業與目標，再量身打造內容策略。
     3. Q: 需要自己出鏡嗎？ A: 建議出鏡以建立個人 IP，但我們也提供不露臉的內容方案。拍攝時會有專業指導，讓你自然又有魅力。
     4. Q: 多久可以看到成效？ A: 一般而言，持續經營 1-3 個月會開始看到明顯的流量成長與粉絲互動提升。短影音是長期投資，越早開始越有優勢。
     5. Q: 可以中途更換方案嗎？ A: 可以！我們的方案設計靈活，可以根據你的成長狀況隨時升級或調整。
     6. Q: 如何開始合作？ A: 直接填寫下方的諮詢表單，或透過 LINE 聯繫我們的小幫手，我們會在 24 小時內回覆你。

6. **Contact form** (tab 1):
   - Title: "立即諮詢"
   - Fields:
     - 姓名 (text, required)
     - 電話 (tel, required)
     - LINE ID (text)
     - 感興趣的方案 (select: 品牌啟航方案 / 流量爆發方案 / 行業壟斷方案 / 還不確定)
     - 備註 (textarea)
   - Submit button: gold background, dark text
   - Input styles: `bg-ocean-deep/60 border border-gold/20 text-gold rounded-lg px-4 py-3 focus:border-gold-bright focus:outline-none`
   - On submit: `alert("感謝您的諮詢！我們會盡快與您聯繫。")` (no backend yet)

7. **Gallery tab** (tab 2):
   - 2-column grid layout
   - 10 WebP images using Next.js `<Image>` component
   - `rounded-lg overflow-hidden` on each image container
   - Click to open lightbox (full-screen overlay with close button)
   - Lightbox: fixed overlay, `bg-black/90`, centered image, click outside or X to close

8. **Back link** at bottom: "← 返回首頁" linking to `/`

**Step 2: Add necessary CSS animations to globals.css**

If needed, add a `slide-down` animation for FAQ accordion expand. Check if existing animations suffice first.

**Step 3: Verify**

Run: `npm run build`
Expected: Build succeeds with no errors

**Step 4: Visual check**

Run: `npm run dev`
Check in browser:
- Tab switching works
- All 3 plan cards render correctly
- FAQ accordion opens/closes
- Form fields work and submit shows alert
- Gallery images load and lightbox works
- Back link navigates home
- Mobile responsive

**Step 5: Commit**

```bash
git add src/app/short-video-class/page.tsx src/app/globals.css
git commit -m "feat: build complete 短影音代操 service page with plans, FAQ, form, and gallery"
```

---

### Task 4: Final build verification

**Step 1: Full build**

```bash
npm run build
```
Expected: Build succeeds, no warnings

**Step 2: Lint**

```bash
npm run lint
```
Expected: No errors
