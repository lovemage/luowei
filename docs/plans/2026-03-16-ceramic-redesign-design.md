# LUOWEI MEDIA 全站重新設計 — 陶瓷工藝風格

## Overview

將現有「深海藍 + 金色 + 波浪動畫」風格，全面重新設計為「極簡 + 乳白 + 陶瓷橘」風格。範圍涵蓋所有四個頁面。移除 OceanBackground 波浪動畫，保留所有內容和功能。僅限行動端設計。

## Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `cream` | `#F5F0EB` | 頁面背景 |
| `cream-dark` | `#EDE7DF` | 卡片/表面 |
| `charcoal` | `#2C2520` | 主文字 |
| `warm-gray` | `#8A7E74` | 次文字/說明 |
| `terracotta` | `#C2613A` | 陶瓷橘，CTA/徽章/活躍態 |
| `terracotta-light` | `#D4845F` | 橘色 hover 態 |
| `divider` | `#DDD5CB` | 分隔線 |

### Typography

- **標題**: `Noto Serif TC` (Google Fonts, weight 600/700)
- **正文**: 系統字體堆疊 `"PingFang TC", "Hiragino Sans", "Microsoft JhengHei", sans-serif`
- **英文 Logo**: `Cormorant Garamond` (Google Fonts, weight 500/600)
- **中文斷行**: `word-break: keep-all`，關鍵標題手動 `<br>` 控制

### Spacing

- 區塊間距: `48px` ~ `64px`
- 元素間距: `16px` ~ `24px`
- 頁面水平內距: `24px`

### Background

- 移除 OceanBackground（SVG 波浪 + 光線 + 微粒）
- 改為純乳白底 + CSS 內聯 SVG noise 紋理（極淡，opacity ~0.03）

### Animation

- 頁面載入: `opacity 0→1, translateY(12px)→0`, duration `0.5s`, ease-out-quart
- FAQ 手風琴: `grid-template-rows: 0fr → 1fr` 過渡
- 無持續動畫、無脈衝、無浮動效果
- 頭像跑馬燈保留（唯一的持續動畫）

### Chinese Text Line Breaking

- 所有容器: `word-break: keep-all` 防止詞中斷裂
- 標題: 手動 `<br>` 控制斷行位置
- 正文: `line-height: 1.8` / `leading-relaxed` 以上

---

## Page Designs

### 1. 首頁 (`/`)

**結構（由上到下）：**

1. **Logo 區** — 居中
   - Logo 圖片 80px
   - `LUOWEI MEDIA`（Cormorant Garamond, charcoal）
   - 細分隔線（40px 寬，居中）
   - `無限進步｜個人成長`（Noto Serif TC, warm-gray, 14px）

2. **導航列表** — 48px 間距後
   - 三個文字行，非按鈕：左對齊標籤 + 右側 `→` 箭頭
   - 底部 1px divider 分隔每行
   - 點擊態：文字變 terracotta

3. **學員頭像跑馬燈** — 48px 間距後
   - 保留現有 AvatarMarquee 組件
   - 邊緣漸層從 ocean-bg 改為 cream

4. **社群連結** — 48px 間距後
   - 水平排列：LINE 課程 / LINE 企業 / IG
   - 圖標用 terracotta 色，標籤用 warm-gray

### 2. 短影音代操 (`/short-video-class`)

**結構（由上到下）：**

1. **頂部導航** — `← 返回`，左對齊，warm-gray

2. **Tab 列** — 兩個 tab
   - 活躍態：charcoal 文字 + 底部 2px terracotta 線
   - 非活躍態：warm-gray 文字

3. **Tab 1: 短影音代操**

   a. **Hero** — 標題 Noto Serif TC 22px，手動斷行；副標 warm-gray 14px

   b. **方案卡片** — 三張垂直堆疊
   - 背景 cream-dark，無陰影，圓角 8px
   - 推薦方案：左邊框 3px terracotta
   - 功能列表：✓ charcoal / — warm-gray

   c. **主要服務** — 標題 + 分隔線
   - 單欄列表，每項：emoji + 標題 + 說明
   - 項目之間用 1px divider 分隔

   d. **常見問題** — 手風琴
   - 無邊框無背景色
   - 問題行：charcoal 文字 + 右側 `+`/`−`
   - 展開用 grid-template-rows 過渡
   - 項目之間用 1px divider

   e. **聯絡表單**
   - Input: border-bottom only 風格，focus 態底線變 terracotta
   - Select: 同樣底線風格
   - Submit: 唯一實心按鈕，terracotta 背景 + cream 文字，圓角 8px

4. **Tab 2: 活動花絮** — 2 欄網格，圓角 8px，lightbox 保留

5. **底部** — `← 返回首頁`

### 3. 短影音課程 (`/short-video-course`)

垂直居中佈局：
- 標題 `短影音課程`（Noto Serif TC, 24px）
- `即將推出`（warm-gray, 14px）
- 短橘色裝飾線（40px 寬, 2px 高, terracotta, 居中）
- `返回首頁`（terracotta 文字連結）

### 4. 短影音廣告 (`/short-video-ad`)

同上結構，標題改為 `短影音廣告`。

---

## Technical Notes

- 移除 `OceanBackground` 組件的使用（檔案可保留但不 import）
- `globals.css`：移除所有 wave/ocean 相關動畫，替換色彩 token
- `layout.tsx`：加入 Google Fonts（Noto Serif TC, Cormorant Garamond）
- `AvatarMarquee`：邊緣漸層色改為 cream
- `SocialLinks`：色彩從 gold 改為 terracotta/warm-gray
- 所有頁面移除 `OceanBackground` import
- 保留 `max-w-[430px]` 行動端限寬
