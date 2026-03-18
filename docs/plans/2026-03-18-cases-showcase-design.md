# 案例展示區設計文件

## 概述

建立案例展示區頁面（`/cases`），以 Logo 牆形式展示學員案例，點擊後彈出 Modal 顯示詳細介紹。資料透過 Prisma + Admin 後台管理。

## 資料結構

新增 Prisma `Case` model：

```prisma
model Case {
  id        Int      @id @default(autoincrement())
  slug      String   @unique
  name      String
  avatarUrl String
  category  String   // "short-video" | "course"
  title     String   // 頭銜/簡介
  bio       String   // 自我介紹長文
  stats     Json     // 數據亮點，如 {"followers": "12.8K", "likes": "132.6K"}
  order     Int      @default(0)
  visible   Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 頁面設計

### `/cases` 案例列表頁

- 頂部返回首頁連結
- 標題：案例展示 / 副標題
- Tab 切換：「短影音案例」vs「課程案例」（沿用 TabSwitcher 元件）
- Logo 牆：**mobile 3 欄**網格排列
  - 每格：圓形頭像 + 金色光暈邊框 + 名字標籤
  - 點擊觸發 Modal

### Modal 詳情彈窗

- 全屏 Modal，背景半透明黑遮罩
- 從底部滑入動畫（mobile 友善）
- 內容可滾動
- 結構：
  1. 關閉按鈕（右上角 ✕）
  2. 圓形大頭照
  3. 名字 + 頭銜
  4. 數據亮點卡片（stats JSON 動態渲染）
  5. 自我介紹（bio 長文）

### 風格

- 延續黑金奢華風格（bg `#050505`、accent `#E2C191`）
- 頭像外圈金色光暈 `rgba(226, 193, 145, 0.12)`
- 字體沿用 Cormorant Garamond + PingFang TC
- 動畫沿用 `animate-fade-up`

## Admin 後台

新增 `/admin/cases` 頁面：

- 案例列表表格（可排序、切換 visible）
- 新增/編輯表單：名稱、slug、分類下拉、頭像上傳（S3）、title、bio、stats
- 刪除功能
- API 路由：`/api/admin/cases` (GET/POST)、`/api/admin/cases/[id]` (GET/PUT/DELETE)

## 初始資料

第一筆案例（沈耿仲醫師）：

```json
{
  "slug": "dr-frankshen",
  "name": "沈耿仲醫師",
  "avatarUrl": "(上傳至 S3)",
  "category": "short-video",
  "title": "耳鼻喉科醫師",
  "bio": "大家好，我是沈耿仲醫師，一位擁有完整耳鼻喉科訓練背景的專科醫師...",
  "stats": {
    "followers": "12.8K",
    "likes": "132.6K",
    "platform": "TikTok"
  },
  "order": 1,
  "visible": true
}
```

## 技術決策

- Modal 模式（非獨立路由），體驗流暢
- 資料庫管理（Prisma），透過 admin 後台 CRUD
- 頭像上傳至 S3 bucket（沿用現有 Media 系統）
- 每個案例單一分類（short-video 或 course）
- Mobile-first 430px，Logo 牆 3 欄
