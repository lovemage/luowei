# LUOWEI MEDIA Website Design

## Overview

Mobile-only landing page for LUOWEI MEDIA, built with Next.js 16 App Router + Tailwind CSS. Dark ocean-themed background with gold typography and deep blue accents.

## Architecture

- **Framework**: Next.js 16, App Router
- **Styling**: Tailwind CSS with custom color tokens
- **Animation**: Pure CSS SVG ocean waves + light refraction
- **Viewport**: Mobile-only, max-width 430px centered

## File Structure

```
luowei/
├── src/app/
│   ├── layout.tsx                    # Global layout (dark bg, fonts)
│   ├── page.tsx                      # Homepage
│   ├── short-video-class/page.tsx    # 短影音帶操 - Coming Soon
│   ├── short-video-course/page.tsx   # 短影音課程 - Coming Soon
│   └── short-video-ad/page.tsx       # 短影音廣告 - Coming Soon
├── src/components/
│   ├── OceanBackground.tsx           # SVG ocean waves + light refraction
│   └── SocialLinks.tsx               # Footer social links
├── public/images/logo.png            # Logo asset
├── tailwind.config.ts
└── package.json
```

## Homepage Layout (top to bottom)

1. **Ocean SVG animated background** — full screen, waves + light refraction
2. **Logo** — `images/logo.png` + "LUOWEI MEDIA" text
3. **3 navigation buttons** — gold border/gradient style
   - 短影音帶操 → `/short-video-class`
   - 短影音課程 → `/short-video-course`
   - 短影音廣告 → `/short-video-ad`
4. **Slogan** — 無限進步 | 個人成長 (gold text)
5. **Social links**
   - LINE 課程小幫手: https://lin.ee/L8iPk8a
   - LINE 企業小幫手: https://lin.ee/htTdJSH
   - IG: https://www.instagram.com/lowemedia_?igsh=MWppb2V2cWdwMTE2MQ==

## Color System

| Usage        | Value                          |
|------------- |--------------------------------|
| Background   | `#0a0e1a` (dark navy)          |
| Text/Buttons | `#d4a853` (gold)               |
| Button hover | `#e8c06a` (bright gold)        |
| Accent       | `#1a2744` (deep blue)          |
| Waves/Light  | `#162040` ~ `#1e3a6e` (gradient) |
| Light rays   | `rgba(212,168,83,0.15)` (gold glow) |

## Ocean SVG Animation

- 2-3 layered SVG wave paths at different speeds and opacity for depth
- Light rays from top-left angled into water, simulated with linear-gradient + CSS animation
- Pure `@keyframes`, no JS animation library

## Sub-pages

All three sub-pages share the same dark theme with a centered "Coming Soon" message, back-to-home link, and ocean background.

## Technical Constraints

- No PC/desktop layout — mobile only
- No animation library dependencies (pure CSS)
- Next.js 16 App Router only
