# LUOWEI MEDIA 全站重構設計文件

> 日期：2026-03-17
> 狀態：已核准

---

## 1. 專案概述

將現有 LUOWEI MEDIA 網站從陶瓷淺色系主題全面重構為深色系 + 影片背景風格，同時擴充功能模組並新增 admin 後台管理系統。

### 核心決策

- **方案：** 單體架構（前台 + 後台同一 Next.js 專案）
- **優先順序：** 功能優先，先建構內容結構與後台，再統一深色系視覺
- **資料庫：** SQLite + Prisma ORM（本地）
- **圖片管理：** Cloudinary
- **認證：** 簡單密碼保護（admin / luowei123）
- **案例展示區：** 待開發，先建立佔位頁面

### 技術棧

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- Prisma + SQLite
- Cloudinary SDK
- JWT（HttpOnly cookie）

---

## 2. 路由結構

```
前台：
/                        → 首頁（深色系 + 影片背景 + 導航）
/short-video             → 短影音代操
/short-video-ad          → 短影音廣告代操
/course                  → 影響力變現課程（Tab：初階/進階）
/cases                   → 案例展示區（待開發，顯示即將推出）

後台：
/admin/login             → 登入頁
/admin                   → Dashboard
/admin/pages             → 頁面列表
/admin/pages/[slug]/edit → 編輯頁面內容
/admin/faqs              → FAQ 管理
/admin/faqs/new          → 新增 FAQ
/admin/faqs/[id]/edit    → 編輯 FAQ
/admin/registrations     → 報名資料列表
/admin/registrations/[id]→ 報名詳情
/admin/media             → 圖片庫管理
```

---

## 3. 視覺設計系統（深色系）

### 色彩

| Token | 色值 | 用途 |
|-------|------|------|
| `--bg-primary` | `#0A0A0F` | 頁面主背景 |
| `--bg-surface` | `#14141F` | 卡片/區塊背景 |
| `--bg-surface-light` | `#1E1E2E` | hover/高亮區塊 |
| `--text-primary` | `#F0F0F5` | 主要文字 |
| `--text-secondary` | `#9090A0` | 次要說明文字 |
| `--accent` | `#7C5CFC` | CTA 按鈕/重點標記（電光紫） |
| `--accent-hover` | `#9B7FFF` | accent hover |
| `--accent-warm` | `#FF6B35` | 價格/限時優惠強調色 |
| `--divider` | `#2A2A3A` | 分隔線 |
| `--glow` | `rgba(124,92,252,0.15)` | 光暈效果 |

### 影片背景

- `public/videos/background_.mp4` 固定定位全站背景
- `<video autoplay muted loop playsinline>` + `object-fit: cover`
- 上層疊加半透明遮罩 `bg-primary/85`
- 低效能裝置 fallback 為靜態深色背景

### 字體

| 用途 | 字體 | 粗細 |
|------|------|------|
| 英文標題/Logo | Cormorant Garamond | 500/600 |
| 中文標題 | Noto Serif TC | 600/700 |
| 內文 | PingFang TC 系統字體 | 400/500 |

### 全站規則

- 不使用 emoji，用簡潔圖示或符號代替
- 所有頁面手機端優先（max-width: 430px）
- 每頁必須包含：Hero 圖片、痛點 Hook、比較表、FAQ、報名表單
- `prefers-reduced-motion` 尊重使用者偏好

---

## 4. 共用元件

### VideoBackground

- 全站固定影片背景 + 半透明遮罩
- Props: `overlayOpacity`

### FloatingButtons

- 右側固定懸浮社群按鈕
- LINE 1、LINE 2、TikTok、IG
- 預設收合為小圖示列，點擊展開

### HeroSection

- 頁面專屬 Hero 圖片（Cloudinary URL）
- 標題 + 副標題 + 光暈效果
- Props: `title`, `subtitle`, `imageUrl`

### PainPointHook

- 深色卡片 + 左側紅色邊線
- 列表式痛點描述
- Props: `title`, `points[]`

### ComparisonTable

- 雙欄對比：左欄灰暗（傳統做法）、右欄 accent 高亮（我們的方案）
- Props: `title`, `leftLabel`, `rightLabel`, `items[]`

### FAQAccordion

- 點擊展開/收合，從後台讀取
- Props: `pageSlug`（自動載入該頁 FAQ）

### RegistrationForm

- 欄位：姓名、電話、LINE ID、Email、課程（下拉）、留言
- 底線輸入框風格，accent 色提交按鈕
- 提交至 `POST /api/registrations`

### TabSwitcher

- 底線標記當前分頁，切換動畫
- Props: `tabs[]`, `activeTab`, `onChange`

---

## 5. 頁面內容設計

### 5.1 首頁 `/`

```
VideoBackground
├── Logo（透明背景 + 淺色，居中）
├── 品牌標語：「無限進步 | 個人成長」
├── 四大模組導航卡片（深色玻璃質感 + hover 光暈）
│   ├── 短影音代操 → /short-video
│   ├── 廣告投放代操 → /short-video-ad
│   ├── 影響力變現課程 → /course
│   └── 案例展示 → /cases（標示「即將推出」）
├── AvatarMarquee（學員頭像輪播）
├── SocialLinks
└── FloatingButtons
```

### 5.2 短影音代操 `/short-video`

內容來源：docs/plans/短影音代操.md

```
HeroSection
├── PainPointHook
│   ├── 空有產品卻沒流量
│   ├── 想做影音卻沒方向
│   ├── 團隊人力成本太高
│   └── 有流量卻無法變現
├── 四階段服務流程（卡片式）
│   ├── 第一階段：基礎紮根
│   ├── 第二階段：靈魂定位（人設設定表格）
│   ├── 第三階段：模組化執行流程
│   └── 第四階段：目標產值（數據指標卡片）
├── ComparisonTable（自己做 vs 交給我們）
├── 為什麼選擇我們（3 張特色卡片）
├── FAQAccordion
├── RegistrationForm
└── CTA：立即聯繫專人諮詢
```

### 5.3 廣告投放代操 `/short-video-ad`

內容來源：docs/plans/短影音廣告代操.md

```
HeroSection
├── PainPointHook
│   ├── 廣告費越來越貴
│   ├── 後台數據看不懂
│   └── 受眾抓不準
├── 三大服務亮點（卡片式）
│   ├── 全平台策略佈局
│   ├── AI 驅動受眾精準定位
│   └── 文案與素材雙重夾擊
├── 合作三部曲（水平時間軸）
│   ├── 01 深度診斷
│   ├── 02 動態優化
│   └── 03 定期彙報
├── ComparisonTable（自己投廣告 vs 專業代操）
├── 數據透明化（模擬儀表板視覺）
├── FAQAccordion
├── RegistrationForm
└── CTA：預約免費廣告診斷
```

### 5.4 影響力變現課程 `/course`

內容來源：docs/plans/影響力變現課程.md

```
HeroSection
├── TabSwitcher：「初階實戰班」/「進階陪跑班」
│
├── 【初階 Tab】
│   ├── PainPointHook（腦袋空白、沒人看、想放棄）
│   ├── 觀念導正區（核心公式卡片）
│   ├── 四大核心模組（卡片展開）
│   │   ├── 底層邏輯與演算法真相
│   │   ├── 流量密碼與腳本工程
│   │   ├── 工業化產出與 AI 賦能
│   │   └── 多元變現與終極護城河
│   ├── ComparisonTable（自學 vs 加入實戰班）
│   ├── 成功案例（4 位學員卡片）
│   ├── 價格：原價 NT$6,000 → 快閃價 NT$1,000
│   ├── FAQAccordion
│   └── RegistrationForm
│
├── 【進階 Tab】
│   ├── PainPointHook（學了做不出來、撐不下去）
│   ├── 21 天訓練結構（時間軸）
│   ├── 結營產值（成果清單卡片）
│   ├── 變現加速 + 專業背書（四間公司）
│   ├── ComparisonTable（初階 vs 進階差異）
│   ├── 價格：原價 NT$19,800 → 體驗價 NT$6,000
│   ├── FAQAccordion
│   └── RegistrationForm
```

### 5.5 案例展示 `/cases`

- 待開發
- 顯示「即將推出」+ 返回首頁連結
- 保留深色系風格一致

---

## 6. Admin 後台設計

### 整體風格

- 簡潔白色背景，獨立 layout
- 左側固定側邊欄導航
- 以桌面端為主

### 認證

- 帳號密碼存於 `.env.local`：`ADMIN_USER=admin`, `ADMIN_PASSWORD=luowei123`
- 登入後設定 HttpOnly cookie（JWT, 24hr 過期）
- Middleware 檢查 `/admin/*`（排除 `/admin/login`）

### 資料模型（Prisma Schema）

```prisma
model Page {
  id        String   @id @default(cuid())
  slug      String   @unique
  title     String
  heroImage String?
  sections  String   // JSON 字串
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

### 頁面內容區塊類型（sections JSON）

| 區塊類型 | 可編輯欄位 |
|----------|-----------|
| hero | 標題、副標題、Hero 圖片 |
| painPoints | 標題、痛點列表 |
| cards | 標題、卡片陣列（標題、描述、圖示） |
| timeline | 標題、步驟陣列（編號、標題、描述、成果） |
| comparison | 標題、左欄標題、右欄標題、比較項目陣列 |
| testimonials | 標題、案例陣列（姓名、成果、描述） |
| pricing | 原價、特惠價、說明文字 |
| cta | CTA 文字、連結目標 |

### 後台功能

**頁面管理 `/admin/pages`**
- 頁面列表（slug、標題、最後更新時間）
- 編輯頁面：Hero 圖、各區塊表單編輯、區塊排序
- 儲存後觸發前台 revalidate

**FAQ 管理 `/admin/faqs`**
- 依頁面分類顯示
- 新增、編輯、刪除、拖拽排序

**報名管理 `/admin/registrations`**
- 表格顯示，按報名時間倒序
- 篩選：課程名稱、日期範圍
- 搜尋：姓名、電話、LINE ID
- 匯出 CSV
- 單筆刪除（需確認）

**圖片管理 `/admin/media`**
- 瀏覽已上傳圖片（依資料夾）
- 拖拽上傳
- 複製 URL、刪除
- 頁面編輯時可直接選取圖片

---

## 7. API Routes

```
POST   /api/admin/login          → 登入
POST   /api/admin/logout         → 登出

GET    /api/admin/pages          → 頁面列表
GET    /api/admin/pages/[slug]   → 單一頁面
PUT    /api/admin/pages/[slug]   → 更新頁面
POST   /api/admin/pages/[slug]/revalidate → 觸發 ISR 重新驗證

GET    /api/admin/faqs           → FAQ 列表（可依 pageSlug 篩選）
POST   /api/admin/faqs           → 新增 FAQ
PUT    /api/admin/faqs/[id]      → 更新 FAQ
DELETE /api/admin/faqs/[id]      → 刪除 FAQ
PUT    /api/admin/faqs/reorder   → FAQ 排序

GET    /api/admin/registrations  → 報名列表（分頁、篩選、搜尋）
GET    /api/admin/registrations/[id] → 報名詳情
DELETE /api/admin/registrations/[id] → 刪除報名
GET    /api/admin/registrations/export → 匯出 CSV

POST   /api/admin/media/upload   → 上傳至 Cloudinary
GET    /api/admin/media          → 圖片列表
DELETE /api/admin/media/[id]     → 刪除圖片

POST   /api/registrations        → 前台報名提交（公開）
GET    /api/pages/[slug]         → 前台取得頁面內容（公開）
GET    /api/faqs/[slug]          → 前台取得頁面 FAQ（公開）
```

---

## 8. 安全注意事項

- Admin 密碼僅存於 `.env.local`，不進 git
- JWT secret 存於 `.env.local`
- Cloudinary credentials 存於 `.env.local`
- 所有 `/api/admin/*` 路由需驗證 JWT
- 前台報名表單加入基礎防刷（rate limiting）
- 輸入驗證：所有 API 輸入用 Zod schema 驗證
