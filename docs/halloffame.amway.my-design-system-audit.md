# halloffame.amway.my 設計元素整合

- 目標站點: https://halloffame.amway.my/
- 擷取時間: 2026-03-17 12:48:25 CST
- 擷取方式: `agent-browser`（首頁 DOM + `style.css` + `circle-menu.css` + `screensaver.css`）

## 1. 視覺方向

- 風格定位: 黑金高對比、典禮感/榮耀感
- 首頁結構: 極簡 Hero Landing（Logo + 主標 + 語系 + CTA）
- 裝置策略: 行動優先，並含大尺寸螢幕/TV 特化

## 2. 設計 Token（實際樣式值）

### 2.1 色彩

- `#000000`: 全站主背景
- `#E2C191` / `#e2c291`: 主要文字、連結、按鈕外框
- `#ddbd8d`: hover 文字色（語系連結）
- `#f5eae6`: 主標漸層高光色
- `#17375a`: 次要功能按鈕底色（例如地區按鈕）
- `#ffffff`: hover/反白字色、某些 UI 文字
- `#cccccc`: 次要敘述字色（`h3`, `.descTxt`）

### 2.2 字體與排版

- 主字體族: system sans（Bootstrap 預設系統字體串）
- 外部字體來源: `Open Sans`（Google Fonts 已載入）
- 中文字型: `NotoSansSC`（出現在語系連結 inline style）
- 代表字級:
  - `h1` 首頁標題: 48px（桌機更大）
  - 內文常用: 12px / 14px / 16px
  - 次級標題: 20px / 26px

### 2.3 圓角與邊框語言

- CTA 圓角: `25px`、`50px`（大螢幕）
- Pin/卡片按鈕: `10px`、`15px`
- 圓形頭像/按鈕: `border-radius: 50%` 或固定圓角（24px/48px）
- 主 CTA 邊框: `2px solid #E2C191`

## 3. 首頁資訊架構（IA）

1. 品牌 Logo（上方）
2. 主視覺標題 `Hall of Fame`
3. 語系切換（English / 华语 / B. Malaysia）
4. 主行動按鈕 `Explore Now`
5. 裝置提示文案 `Best viewed on mobile devices.`

## 4. 核心元件清單

### 4.1 Hero 模組

- 背景容器: `#bg`
- 內容容器: `.container_wrapper > .content`
- 主標: `.bigText h1`
- CTA: `.explore .homebtn > button`
- 語系: `.select_lang ul > li > a`

### 4.2 按鈕系統

- `explore button`: 透明底 + 金色框 + 圓角
- `view button`: 透明底 + 細框
- `pin_select button`: 滿寬按鈕，hover 反轉（底金字白）
- `achieverbtn`: 成就項目按鈕
- `location_button`: 藍底白字功能按鈕

### 4.3 導航與快捷元件

- 漢堡/選單圖示: `.burger`, `.menuburger`
- 個人頭像快捷: `.profilemenu img`（左下 fixed）
- 圓形浮動選單: `.c-circle-menu*`
  - Toggle: `.c-circle-menu__toggle`
  - Item: `.c-circle-menu__item`
  - Link: `.c-circle-menu__link`
  - Overlay Mask: `.c-circle-menu__mask`

### 4.4 搜尋與輸入元件

- 搜尋列: `.searchbar`, `.searchBarTV`
- 鍵盤切換: `.keyboardToggle`, `.keyboardIcon`
- 虛擬鍵盤: `.ui-keyboard*`
- 過濾/提交: `#filtersubmit`, `.btn-group`

### 4.5 清單、輪播與內容顯示

- 清單區: `.list_result`, `.listTxt_container`
- 分頁: `.paginationContainer`
- 圖片輪播: `.carousel-item`, `.profile-gallery-slider`, `.slick-*`
- 頭像/徽章: `.profilepic`, `.avatarImg`, `.country-icon`

### 4.6 對話框

- Modal 容器: `.modal-dialog`
- 標題: `.modal-title`

### 4.7 螢幕保護（Idle）

- Overlay: `.screensaver-overlay`
- Badge: `#saver-badge`
- 動畫: `fadeBadge 6s`

## 5. 動效與互動規格

### 5.1 主標動畫

- 動畫名稱: `textShine`
- 週期: `7s`
- 緩動: `ease-in-out`
- 模式: `infinite alternate`
- 效果: 漸層背景位移，形成金屬流光

### 5.2 Hover 行為

- 語系連結 hover: `#E2C191 -> #ddbd8d`
- `homebtn/pin_select` hover: 由透明反轉為金底白字

### 5.3 圓形選單展開邏輯

- 基礎狀態: item `opacity:0`，定位疊在 toggle
- Active 狀態: 各 nth-child 依序延遲 + translate 扇形展開
- transition: `0.3s`，自訂 cubic-bezier（收合/展開不同曲線）

### 5.4 螢幕保護交互

- 非手機裝置閒置時啟動 overlay
- Badge 淡入停留淡出（6s）
- 深色遮罩提高焦點

## 6. 版面與響應式策略

### 6.1 容器與背景

- `container_wrapper`: `max-width: 1080px`
- 多場景背景 ID: `#bg` ~ `#bg7`
- 背景策略: 固定背景圖 + 視窗比例鋪滿（或高螢幕條件下改為 `auto 100%`）

### 6.2 主要斷點

- `700px`: 語系區塊間距調整
- `961px`: 多項字體、元件尺寸調整
- `min-height: 1920px`: TV/大型看板模式（大幅放大字體與控制項）
- `min-height: 900px`: 部分間距微調

### 6.3 TV 模式特徵

- 虛擬鍵盤顯示與控制
- 按鈕、字級、圓形選單、箭頭、分頁全面放大
- 更強烈的遠距離可讀性

## 7. 技術與資源依賴

### 7.1 CSS

- `/css/bootstrap.min.css`
- `/css/fontawesome/css/all.min.css`
- `/css/circle-menu.css`
- `/css/style.css`
- `/css/screensaver.css`
- `/css/keyboard.min.css`
- `/css/jquery-ui.css`

### 7.2 JS

- `/js/jquery-3.5.1.min.js`
- `/js/bootstrap.min.js`
- `/js/popper.min.js`
- `/js/circleMenu.js`
- `/js/screensaver.js`
- `/js/jquery-ui.min.js`
- `/js/jquery.keyboard.min.js`
- `/js/jquery.keyboard.extension-all.min.js`

### 7.3 追蹤

- Google Analytics (`analytics.js`, `gtag.js`, UA + GA4)

## 8. 代表性 selector 索引（可用於重建）

- 排版容器: `#bg`, `.container_wrapper`, `.content`
- 首頁主標: `.bigText`, `.bigText h1`
- 語系: `.select_lang`, `.select_lang ul`, `.select_lang li a`
- CTA: `.explore`, `.homebtn`, `.homebtn > button`
- 按鈕組: `.view button`, `.pin_select button`, `.achiever_select button`, `.location_button`
- 搜尋: `.searchbar`, `.searchBarTV`, `.keyboardToggle`, `.ui-keyboard`
- 導航: `.profilemenu img`, `.c-circle-menu`, `.c-circle-menu__toggle`, `.c-circle-menu__item`
- 對話框: `.modal-dialog`, `.modal-title`
- 列表/分頁: `.list_result`, `.paginationContainer`
- 輪播: `.carousel-item`, `.slick-dots`, `.slick-next`, `.slick-prev`

## 9. 首頁 DOM 實測重點

- `#bg` 包住整個首頁
- Logo: `/images/amway_logo.png`
- `h1` 文字為 `Hall of Fame`（uppercase）
- 語系三選一，其中 English 為當前狀態
- 主連結 `Explore Now` 導向 `/choose`

## 10. 設計結論（可用於後續設計/重刻）

- 視覺語言以黑金為主，透過漸層與流光動畫建立「榮耀舞台」氛圍
- 元件形狀語言明確：膠囊按鈕 + 圓形快捷入口
- 響應式策略不是單純 RWD，而是含「TV/看板模式」的多場景輸出
- 若要重建，先固定以下三層 token：
  1. 色彩層（黑/金/藍）
  2. 元件層（膠囊按鈕、圓形 menu、搜尋鍵盤）
  3. 場景層（首頁、選擇頁、搜尋頁、列表頁背景）
