# Short Video Service Page Design

## Overview

Replace the current "Coming Soon" placeholder at `/short-video-class` with a full service page for LUOWEI MEDIA's short video operation service. Add tab navigation for switching between the service page and an event gallery.

## Scope

1. **Fix typo on homepage**: `page.tsx` line 7 — "短影音帶操" → "短影音代操"
2. **Convert JPG to WebP**: All 10 photos in `public/pics/` → WebP format
3. **Build the full short-video-class page** with tab navigation

## Page Structure

### Tab Navigation

Two tabs at the top of the page:
- **短影音代操** (default active)
- **活動花絮**

Use client-side state (useState) for tab switching. No routing change needed.

### Tab 1: 短影音代操

#### Hero Section
- Title: 打造你的個人 IP，讓短影音為你帶來精準客戶
- Subtitle: 三大方案，從品牌建立到行業壟斷，量身打造你的短影音帝國

#### Three Pricing Plans (card layout)

**品牌啟航方案** (Starter)
- 每月 4 支影片
- 帳號策略規劃
- 腳本撰寫
- 剪輯製作

**流量爆發方案** (Growth)
- 每月 8 支影片
- 帳號策略規劃
- 腳本撰寫
- 拍攝指導
- 剪輯製作
- 月度數據分析報告

**行業壟斷方案** (Domination)
- 每月 12+ 支影片
- 帳號策略規劃
- 腳本撰寫
- 拍攝指導
- 剪輯製作
- 週度數據分析報告
- 廣告投放策略
- 1對1專屬顧問

#### Main Services Section (6 items with icons)
1. 帳號定位與 IP 打造
2. 腳本企劃與內容策略
3. 專業拍攝指導
4. 後製剪輯與字幕特效
5. 數據追蹤與優化
6. 廣告投放與流量佈局

#### FAQ Accordion (6 questions)
1. 短影音代操適合什麼樣的人？
2. 合作流程是怎樣的？
3. 需要自己出鏡嗎？
4. 多久可以看到成效？
5. 可以中途更換方案嗎？
6. 如何開始合作？

#### Contact Form
Fields: 姓名、電話、LINE ID、感興趣的方案 (dropdown)、備註 (textarea)
Submit button styled with gold theme. Form is front-end only (no backend needed yet).

### Tab 2: 活動花絮

- Grid gallery layout (2 columns on mobile)
- 10 photos from `public/pics/` converted to WebP
- Lightbox on click for full-size viewing
- Consistent with ocean/gold theme

## Technical Notes

- Page is a Client Component (`"use client"`) for tab state and accordion toggle
- Reuse `OceanBackground` component
- Follow existing design tokens (ocean-bg, ocean-deep, gold, gold-bright)
- All animations consistent with existing entrance animations
- Mobile-first responsive design
- Photos converted from JPG to WebP for performance
