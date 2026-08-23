# fupo 頁材質素材 — 實作記錄

> 2026-08-23：Codex 共產出 41 張，已全部接進頁面並上線。
> 本文記錄**採用了哪些、怎麼配、為什麼**。
> 檢查工具：`node scripts/check-textures.mjs`

---

## 1. 結論

| 項目 | 數量 |
| --- | --- |
| Codex 產出 | 41 張 |
| **實際採用** | **23 張** |
| 太暗、棄用 | 9 張 |
| 輪替用不到 | 9 張 |

品質很好：去背成功（邊緣透明度 97–100%）、手撕邊自然、沒有線條、比例對得上。
唯一的問題是**亮度普遍比規格暗**，所以全部改成半透明疊在既有底色上。

已轉成 WebP，23 張合計 **269 KB**（原始 PNG 約 95 MB）。

---

## 2. 全站統一規則：素材一律 `opacity: 0.55`

素材不是直接當背景，而是**以 55% 不透明度疊在既有的 `#FFFFFF` / `#F3ECE1` 卡片底色上**。

理由：38 張裡沒有任何一張在 100% 不透明度下，能讓內文色 `#6B5F51`（14–15px）
維持 WCAG AA 的 4.5:1。降到 55% 後，下表列為「採用」的 20 張全數通過（4.54–5.46）。

用單一數值而非逐張調整，是為了讓後續換圖不必重算。

### 貼圖方式

```css
/* 容器保留原本的底色，素材疊在上層 */
position: relative;
isolation: isolate;
```
```css
/* ::before 疊素材，順便處理鏡射 */
content: "";
position: absolute;
inset: 0;
background-image: url(...);
background-size: 100% 100%;   /* 不是 cover——cover 會把手撕邊裁掉 */
opacity: 0.55;
pointer-events: none;
z-index: -1;
/* 鏡射變體： transform: scaleX(-1); */
```

例外：小標籤（接觸點、產業鏈項目）高度只有 30 多 px，手撕邊在那個尺寸看不見，
改用 `background-size: cover` 置中裁切。

---

## 3. 採用清單與配置對照表

### 3-0 現行配置（2026-08-23 收斂）※ 以此為準

業主回饋「同一個區塊裡不同背景太多」。原因是初版每張卡都輪替不同素材再加鏡射，
單看每一格都成立，整段捲下來卻像一頁拼貼。改成**同一區塊裡的同一類卡片共用一張**，
每類挑對比度最高的那張：

| 類別 | 數量 | 素材 |
| --- | --- | --- |
| 創會理念．編號條目 | 3 | `belief-02` |
| 理念收尾金句 | 1 | `belief-closing`（`cover`） |
| 系統．編號條目 | 4 | `system-01` |
| 系統．規模數字 | 4 | `stat-04` |
| 客戶接觸點標籤 | 7 | `touch-a`（`cover`） |
| 產業鏈．導覽格 | 15 | `chain-label-12`（`plate` #FAF7F2） |
| 產業鏈．項目標籤 | 全部 | **不鋪素材**，只留細框 |
| 產業鏈．細節卡 | 15 | `chain-bg-01`（`plate` #FAF7F2） |
| 產業鏈．「舉個例」 | 15 | **不鋪素材**，維持既有的淡金底 |

產業鏈細節卡裡的項目標籤（美髮沙龍、頭皮養護⋯）不鋪素材——它們直接疊在細節卡的
紙質上，再加一層材質只會糊成一片。接觸點標籤是躺在素色底上的，材質留著。

頁面實際引用的素材從 20 張降到 7 張（另加 `cta-idle`、`cta-active`、`modal-bg` 共 10 張）。
`Texture` 元件的 `flip` 參數一併移除——沒有任何呼叫端需要鏡射了。

### 3-0-1 `plate` 為什麼從純白換成 `#FAF7F2`

導覽格與細節卡原本墊 `#FFFFFF`。手撕邊的起伏在這兩種尺寸下被拉得很平，
純白襯在米色 `#F3ECE1` 上就成了一塊白方塊，業主看了以為素材沒去背。

導覽格與細節卡都適用。

先試過整個拿掉 `plate`，讓素材直接疊在區塊底色上（理念／系統兩段就是這樣）。
視覺上對了，但對比度不夠——底色從白換成 band，14px 內文掉到 **4.45**，低於 AA：

| 細節卡底色 | body 14px | gold | ink 標題 |
| --- | --- | --- | --- |
| `#FFFFFF` | 4.81 | 4.67 | 12.00 |
| **`#FAF7F2`** | **4.66** | **4.52** | **11.61** |
| `#F7F1E6` | 4.54 | 4.41 | 11.32 |
| `#F3ECE1`（band，無 plate） | 4.45 ✗ | 4.31 ✗ | 11.08 |

`#FAF7F2` 是唯一同時滿足「不像白方塊」與「內文過 AA」的一階。

> 以下 3-1 ~ 3-5 是**初版的輪替配置，已不再使用**，保留作為素材品質與對比度的記錄。


### 3-1 寬幅紙質（7 張・2.56:1）

| 容器 | 位置 | 檔案 | 55% 對比 |
| --- | --- | --- | --- |
| 創會理念 01 | [FupoContent.tsx:305](../../src/app/fupo/FupoContent.tsx#L305) | `belief-01.png` | 4.66 |
| 創會理念 02 | 同上 | `belief-02.png` | 5.00 |
| 創會理念 03 | 同上 | `belief-03.png` | 4.59 |
| 理念收尾金句 | [FupoContent.tsx:331](../../src/app/fupo/FupoContent.tsx#L331) | `belief-closing.png` ※ | 5.19 |
| 系統規則 01 | [FupoContent.tsx:370](../../src/app/fupo/FupoContent.tsx#L370) | `system-01.png` | 5.17 |
| 系統規則 02 | 同上 | `system-03.png` | 5.06 |
| 系統規則 03 | 同上 | `system-04.png` | 4.78 |
| 系統規則 04 | 同上 | `belief-02.png` ⇄ | 5.00 |

※ `belief-closing.png` 產出比例是 2.09:1，但收尾金句區塊約 6.7:1，拉伸會把紋理壓成條紋。
這一格改用 `cover` 置中裁切，犧牲手撕邊——該區塊上緣本來就有 `border-t`，沒有手撕邊不突兀。

系統規則 04 重用 `belief-02` 並水平鏡射：兩處相隔一整個 section（中間還有收尾金句與
規模數字），加上鏡射後看不出重複。`system-02.png` 太暗（55% 只有 4.20），棄用。

### 3-2 牛皮紙・產業鏈細節卡（4 張・2.36:1）

容器：[FupoContent.tsx:492](../../src/app/fupo/FupoContent.tsx#L492)（15 張垂直堆疊）

可用的只有 4 張，但 4 張配 15 卡完全足夠——循環加鏡射，相鄰永遠不同：

| 鏈 | 檔案 | 鏈 | 檔案 | 鏈 | 檔案 |
| --- | --- | --- | --- | --- | --- |
| 01 美業 | `chain-bg-01` | 06 居家生活 | `chain-bg-04` ⇄ | 11 行銷 | `chain-bg-03` |
| 02 頭皮毛髮 | `chain-bg-03` | 07 寵物生活 | `chain-bg-08` ⇄ | 12 財富管理 | `chain-bg-04` |
| 03 健康醫療 | `chain-bg-04` | 08 美食餐飲 | `chain-bg-01` | 13 法律規範 | `chain-bg-08` |
| 04 時尚精品 | `chain-bg-08` | 09 休閒體驗 | `chain-bg-03` ⇄ | 14 資本募資 | `chain-bg-01` ⇄ |
| 05 心理身心 | `chain-bg-01` ⇄ | 10 家庭教育 | `chain-bg-04` | 15 飯店與工程 | `chain-bg-03` ⇄ |

上下相鄰沒有任何一組是同一張同方向。捲動時一次只看得到 1–2 張，看不出循環。

**棄用**：`chain-bg-02`（4.13）、`05`（4.22）、`06`（4.33）、`07`（4.32）、`09`（4.49）。
`chain-bg-10` ~ `15` 沒產出，也不需要補。

### 3-3 毛絨・產業鏈 label 卡（5 張・1.48:1）

容器：[FupoContent.tsx:465](../../src/app/fupo/FupoContent.tsx#L465)

排版是**三個獨立的 5 欄格線**（依 `CHAIN_GROUPS` 分組），桌機一組一列。
每組換起始變體，讓同一欄上下三格都不同：

| 分組 | 第 1 格 | 第 2 格 | 第 3 格 | 第 4 格 | 第 5 格 |
| --- | --- | --- | --- | --- | --- |
| 外在魅力與健康（01–05） | `chain-label-02` | `chain-label-03` | `chain-label-05` | `chain-label-08` | `chain-label-12` |
| 生活與心靈（06–10） | `chain-label-05` | `chain-label-08` | `chain-label-12` | `chain-label-02` | `chain-label-03` |
| 擴張與資本（11–15） | `chain-label-12` | `chain-label-02` | `chain-label-03` | `chain-label-05` | `chain-label-08` |

手機是 `grid-cols-2`，這個順序在兩欄排列下相鄰格也都不同，兩種斷點都驗過。

**棄用**：`chain-label-04`（4.28）、`11`（4.48）。
**用不到**：`01` `06` `07` `09` `10` `13` `14` `15`——這 8 張品質沒問題，只是 5 張輪替已經夠。

### 3-4 金箔・規模數字（2 張・1.91:1）

容器：[FupoContent.tsx:354](../../src/app/fupo/FupoContent.tsx#L354)（四格並排）

| 運作歷史 | 跨國佈局 | 全球會員 | 去年會員生意額 |
| --- | --- | --- | --- |
| `stat-04` | `stat-03` | `stat-04` ⇄ | `stat-03` ⇄ |

**棄用**：`stat-01`（4.45，橫向筆刷的暗紋太重）。**用不到**：`stat-02`。

### 3-5 小標籤（2 張・`cover` 裁切）

| 容器 | 位置 | 套用 |
| --- | --- | --- |
| 客戶接觸點 ×7 | [FupoContent.tsx:433](../../src/app/fupo/FupoContent.tsx#L433) | `touch-a` / `touch-b` 交替 |
| 產業鏈項目標籤 | [FupoContent.tsx:517](../../src/app/fupo/FupoContent.tsx#L517) | `chain-label-12` / `chain-label-03` 交替 |
| 「舉個例」×15 | [FupoContent.tsx:525](../../src/app/fupo/FupoContent.tsx#L525) | `system-01` / `system-03` / `belief-02` 依序循環 |

---

## 4. CTA 與表單背景（後補的 3 張）

### 4-1 CTA 按鈕（2 張）

容器：`CtaButton`，[FupoContent.tsx:144](../../src/app/fupo/FupoContent.tsx#L144)
**尺寸 1024 × 256**（按鈕約 220×56 ≈ 3.9:1）

⚠️ 這兩張**不套用 55% 半透明規則**，是實心背景，因為按鈕文字是象牙白 `#FAF7F2`。
所以明度方向相反——要夠深。

**BASE PROMPT（深色版）**

```
Flat top-down scan of a physical material swatch, shot straight-on with even
diffuse studio light. Transparent background. The swatch has a hand-torn,
organically irregular outline on all four sides — no straight edge, no
rectangle, no frame. Deep warm metal, luminance held between 25% and 38% and
evenly distributed, so ivory text laid on top stays crisp. Colour limited to
deep gold #7E5D28, dark bronze #5E4418, with restrained antique gold #B08D4F
highlights. Pure material surface, nothing else. High detail, 4K.
```

| 檔名 | 狀態 | 個別敘述 |
| --- | --- | --- |
| `cta-idle.png` | 未點擊 | `Hand-hammered antique brass, shallow planished dimples catching a soft even light, warm and inviting, satin finish.` |
| `cta-active.png` | 點擊 | `The same hammered brass but pressed and darkened — the dimples read deeper, the whole surface a shade cooler and more recessed, as if pushed in.` |

**兩張的槌打紋理位置必須完全一致**，只有明暗深淺不同，否則按下去會看到紋理跳動。
請先產 `cta-idle.png`，再**以它為 reference image** 產 active 版，不要各產各的。

### 4-2 表單背景（1 張）

容器：`JoinModal` 卡片，[JoinModal.tsx](../../src/components/fupo/JoinModal.tsx)
**尺寸 960 × 1856**（直式，約 0.52:1）

其他 38 張全是橫式，沒有任何一張能替代——直式長卡拉伸橫式素材會把紋理拉成長條。

套用第 0 節的淺色 BASE PROMPT，加上：

| 檔名 | 個別敘述 |
| --- | --- |
| `modal-bg.png` | `Tall portrait sheet of the finest handmade paper in the set — dense smooth cotton rag with a barely-there vellum bloom, the two long edges torn into a delicate feathered deckle. Cleaner and quieter than every other swatch: this one sits behind an entire form, so keep the surface nearly uniform with only the gentlest cloud-like variation.` |

表單裡的輸入框底線、分隔線都是既有的細線設計，素材**絕對不能有任何線條**，
否則會跟欄位底線打架。

---

## 0. 淺色 BASE / NEGATIVE PROMPT（補產 `modal-bg` 時使用）

### BASE

```
Flat top-down scan of a physical material swatch, shot straight-on with even
diffuse studio light. Transparent background. The swatch has a hand-torn,
organically irregular outline on all four sides — no straight edge, no
rectangle, no frame anywhere. Extremely low contrast, pale and airy: overall
luminance stays between 88% and 96%, the darkest fibre never below 82%, so
dark text laid on top remains perfectly legible. Colour limited to warm ivory
#FAF7F2, oatmeal #F3ECE1, pale sand #F7F1E6, with only the faintest hint of
antique gold #B08D4F. Pure material surface, nothing else. Subtle, refined,
expensive. High detail, 4K.
```

### NEGATIVE

```
straight edge, rectangular border, frame, outline, drop shadow, vignette,
printed line, ruled line, grid, graph paper, notebook line, seam, stitching,
crease line, fold line, text, letters, numbers, watermark, logo, signature,
person, hands, object, prop, high contrast, dark patch, dark corner, saturated
colour, neon, gradient banding, 3D perspective, tilted angle, mockup, curled
paper, glossy reflection, harsh specular
```

### 產出後請跑檢查

```bash
node scripts/check-textures.mjs
```

`modal-bg.png` 要能在 55% 不透明度下達到 4.5 以上。CTA 兩張是深色實心背景，
檢查標準不同（文字是象牙白），我接圖時另外驗。

---

## 5. 可刪除的檔案

留著只是佔空間，`public/` 目錄的檔案會全部進版控與部署。

收斂成一類一張、「舉個例」改為不鋪素材後，下列 13 張已從頁面移除引用，
但檔案仍留著（想換配置時不必重產）：

```
belief-01  belief-03  system-03  system-04  stat-03  touch-b
chain-label-02  chain-label-03  chain-label-05  chain-label-08
chain-bg-03  chain-bg-04  chain-bg-08
```

初版就沒接進頁面的 18 張：

```
太暗棄用（9）：
  chain-bg-02  chain-bg-05  chain-bg-06  chain-bg-07  chain-bg-09
  chain-label-04  chain-label-11  stat-01  system-02

輪替用不到（9）：
  chain-label-01  chain-label-06  chain-label-07  chain-label-09
  chain-label-10  chain-label-13  chain-label-14  chain-label-15
  stat-02
```

---

## 6. 實作記錄

### 素材怎麼貼

`FupoContent.tsx` 的 `<Texture>` 元件負責，配置表都是同檔案頂端的 `TEX_*` 常數。

- `fit="stretch"`（`background-size: 100% 100%`）是預設，讓手撕邊剛好落在容器邊界。
- `fit="cover"` 用在高度只有 30 幾 px 的小標籤與「舉個例」區塊——那個尺寸看不見
  手撕邊，硬拉伸反而把紋理扯糊。
- 鏡射用 `transform: scaleX(-1)`，不另外存檔。
- `plate` 給原本有實心卡片底色的容器（產業鏈 label 卡、細節卡、彈出表單）。
  底色若直接留在容器上，手撕邊外圍會露出一圈白矩形；改成用同一張素材的
  alpha 去 `mask` 一塊純色，底色就跟著裁成手撕形狀。素材仍疊在這塊純色之上，
  所以對比度與 `check-textures.mjs` 量到的（55% 疊白底）完全一致。

彈出表單另外要注意：陰影必須掛在被 mask 那一層的**外面**。CSS 的 `filter`
先於 `mask` 套用，寫在同一層的話陰影會從矩形長出來、再被裁掉，等於沒有陰影。
包一層 `<span style={{ filter: "drop-shadow(...)" }}>` 才會得到跟著手撕輪廓走的陰影。

### section 分隔線改成手撕線

原本每個 section 用 `border-t` 一條 1px 直線收邊。全頁材質都是手撕紙，
接縫是筆直的就露餡了。改成 `TornRule`：一張 `viewBox="0 0 1200 8"` 的 SVG，
`preserveAspectRatio="none"` 橫向拉伸填滿任何寬度。

- path 是離線用固定種子生成後**寫死**的。不能在 render 時隨機——SSR 與
  client 會對不起來。
- `vectorEffect="non-scaling-stroke"`：橫向拉伸 1200 → 1920 時線不會跟著變粗。
- 兩端用 `mask-image` 淡出，線頭不會硬生生頂在視窗邊緣。

用在五個 section 接縫與 footer 上緣，取代原本的 `LINE_SOFT` 邊框（該常數已移除）。

### 理念與系統的編號條目改成 sweep 進場

業主要「文字由左向右慢慢浮現」。既有的 `wipe` 是 `clip-path` 硬邊揭開，
邊界太銳利。新增 `reveal-sweep`：漸層遮罩寬度取元素的 3 倍，靠 `mask-position`
從右端掃到左端。漸層的全黑段（0–33.3%）剛好等於一個可見窗、透明段從 45% 起，
所以起點落在純透明區、終點落在純黑區，兩端都不會殘留半透明。
`prefers-reduced-motion` 下連同 mask 一起解除。

### 收尾區的人物原本看不見

`06-founder.jpg` 是直式人像，放進寬幅容器後 `object-cover` 以寬度為準放大，
預設的 `center` 只留下中段衣服，人臉整個被裁掉；上面再蓋 0.88–0.98 的白色漸層，
等於全白。三處一起調：`SceneImage` 加 `objectPosition` 並設成 `50% 0%`（對到頭頂）、
不透明度 0.35 → 0.75、遮罩改成上淡下濃，另外把上方留白加大到 `sm:pt-64`，
讓臉完整落在標題之上而不是被字橫切過去。

### 拿掉的髮絲分隔線

改鋪素材後，原本的 1px 線會從手撕邊的破口穿出來，看起來像沒對齊的裂縫。
以下四處都改成間距分隔：

| 位置 | 原本 | 改成 |
| --- | --- | --- |
| `NumberedRow` | `borderTop: 1px` | `mt-5` |
| 規模數字四格 | `gap-px` + 底色 | `gap-3` |
| 產業鏈總覽格 | `gap-px` + 底色 | `gap-2` |
| 產業鏈細節卡 | `gap-px` + 底色 | `gap-5` |
| 理念收尾金句 | `border-t` | 純間距 |
| 表單的性別／社群選項 | `gap-px` + 白色未選取態 | `border` + 透明未選取態 |

表單那兩排選項原本未選取是填白色，在紙張材質上會壓出突兀的白方塊，
改成透明讓紙紋透出來，分隔線改用 `border`。

`LINE` 這個顏色常數因此沒有人用了，一併移除。

### CTA 按鈕（`globals.css` 的 `.fp-cta`）

同一張素材用了兩次，各司其職：

- **`mask-image`** 取 alpha，把按鈕本體裁成手撕輪廓。
  少了這層，實心底色會填滿整個矩形、材質只蓋住中間，外圈露出一圈淺金，
  看起來像沒對齊的外框。
- **`::before` + `mix-blend-mode: multiply` + `opacity: 0.35`** 取顏色疊出槌打質感。
  不能用 normal 混色（黃銅高光會把象牙白文字洗掉，對比只剩 2.85:1）；
  但 multiply 全開會把底色壓成 `#422206` 的深褐、質感反而糊掉。
  35% 的平均色是 `#6a4a1c`，貼近全頁深金，對比 7.4:1。

`:active` 同時換 mask 與 `::before` 的圖，並把底色換成 `#5e4418`。

### 壓縮

`alphaQuality` 才是成本大宗——這些素材內部 alpha 幾乎全不透明，只有手撕邊
那一圈是漸變。從預設調到 55–60，單張從 130 KB 掉到 30 KB 上下，肉眼看不出差別。
尺寸則統一收到約 @1.7x：素材只用 55% 疊上去，細節本來就被稀釋一半。

### 未套用素材的地方

- **全頁收尾區**：底下已有 `06-founder.jpg` 疊 35% 透明度，再加紙質只會讓畫面變濁。
- **封面 hero**：整面已是 `01-hero.jpg` 加漸層遮罩。
- **導覽列的「我想加入」**：那是齊平填滿導覽列高度的方塊，手撕邊會破壞導覽列的水平線。
