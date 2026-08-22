# 富婆頁情境圖 Prompt（淺色系版本）

頁面已改為淺色系，原本那組暗調的圖在象牙底上會發灰，**7 張全部要重生**。

## 使用方式

1. 用下列 prompt 產圖。
2. 依「檔名」命名，覆蓋 `public/images/fupo/` 裡的同名舊檔。
3. 重新整理即可。圖片缺席時頁面會退回暖色漸層底，不會破版。

## 頁面配色（讓圖能融進版面）

| 用途 | 色碼 |
| --- | --- |
| 主底（暖象牙） | `#FAF7F2` |
| 交替色帶（沙色） | `#F3ECE1` |
| 標題文字 | `#2B2318` |
| 金色 | `#7E5D28` |

## 共通風格（每張都帶）

> High-key editorial photography, bright natural daylight from large windows,
> warm ivory and champagne palette, soft diffused light, low contrast, airy,
> generous negative space, fine film grain, understated modern luxury.
> Subjects are East Asian (Taiwanese) women. Cream, beige, ivory and blush
> tailoring. Natural skin texture, no heavy retouching.

## 共通負向條件（每張都帶）

> No text, no letters, no logos, no watermark, no captions, no signage.
> No dark or moody lighting, no black background, no night scene, no heavy
> shadows, no harsh contrast. No collage, no split-frame borders, no cartoon,
> no 3D render, no distorted hands or faces.

> [!IMPORTANT]
> `01`、`04`、`07` 這三張會被當成**整段的背景**（壓透明度＋蓋一層象牙色遮罩），
> 所以必須又亮又低對比。畫面偏暗或對比太強，蓋上遮罩後會變成一片灰。

---

## 01 ─ 封面主視覺

- **檔名**：`01-hero.jpg`　**比例**：16:9（1920×1080 以上）
- **關鍵**：標題是深色字壓在左側，**左三分之一必須是明亮的空景**（牆面、窗光、留白），不要有人臉或深色物件。

```
A group of five confident East Asian businesswomen in their 30s–40s standing
together in a bright, airy loft lounge flooded with soft morning daylight from
tall windows. Cream, ivory and camel tailoring, minimal gold jewellery.
Pale plaster walls, light oak floor, white sheer curtains.
Composition: the women grouped on the right two-thirds; the left third is
bright empty wall and window light with no subjects and no dark objects.
High-key editorial photography, low contrast, warm ivory palette, film grain.
No text, no letters, no logos, no watermark, no dark or moody lighting,
no black background, no heavy shadows, no distorted hands or faces.
```

---

## 02 ─ 創會理念

- **檔名**：`02-belief.jpg`　**比例**：4:5 直式
- **用在**：「她們很努力，卻很少有人陪她們一起走」

```
A single East Asian woman entrepreneur in her late 30s sitting alone beside a
large window in a bright minimal studio, soft overcast daylight wrapping her
face. Ivory knit and cream trousers, a notebook and a cup on the pale table.
Quiet and self-possessed — reflective, not sad. Plenty of bright empty space
around her. Vertical portrait, high-key editorial photography, low contrast,
warm ivory palette, shallow depth of field, film grain.
No text, no letters, no logos, no watermark, no dark or moody lighting,
no black background, no heavy shadows, no distorted hands or faces.
```

---

## 03 ─ 為什麼想組建這個團隊

- **檔名**：`03-foundation.jpg`　**比例**：3:4 直式

```
Four East Asian businesswomen sitting around a small round table in a sunlit
room, mid-conversation, one of them laughing. Linen and cream clothing, coffee
cups, notebooks and a small vase of white flowers on a pale wood table.
Warm daylight through sheer curtains, bright walls behind them.
Intimate and relaxed — a real conversation, not a posed stock meeting.
Vertical composition, high-key editorial photography, low contrast, film grain.
No text, no letters, no logos, no watermark, no dark or moody lighting,
no black background, no heavy shadows, no distorted hands or faces.
```

---

## 04 ─ 我們要挖一個魚池（整段背景）

- **檔名**：`04-pond.jpg`　**比例**：16:9
- **關鍵**：整段背景，會壓到 45% 並蓋象牙遮罩。**必須非常淡、幾乎像壓紋**，主體集中在中央，四周留白。

```
A very light, delicate abstract network on a warm ivory background: dozens of
small soft gold nodes joined by fine thin gold threads, spreading outward like
a constellation or a river delta seen from above. Extremely low contrast,
pale and airy, like a faint watermark or embossed pattern on ivory paper.
The densest cluster sits slightly off-centre; the edges fade to plain ivory.
Warm champagne gold on #FAF7F2. Not neon, not sci-fi, not glowing.
No text, no letters, no numbers, no logos, no watermark, no UI elements,
no dark background, no strong contrast.
```

---

> [!NOTE]
> 頁面已於後續改為三段式形象頁，`05-engine` 與 `07-roadmap` 目前沒有版位
> （「天推 × 地推」屬內部手段、「最後的機會」屬招募話術，皆依業主指示移除）。
> 這兩段 prompt 先保留備查，暫時不需要重新生成。

## 05 ─ 地推 × 天推（目前未使用）

- **檔名**：`05-engine.jpg`　**比例**：21:9 寬幅（很扁，主體放中央水平帶）

```
Ultra-wide bright daylight scene: East Asian businesswomen walking together
along a sunlit riverside promenade on the left, grounded and real; toward the
right the scene opens into soft pale haze and bright sky, as if dissolving
into light. One continuous frame — no hard split, no border between halves.
Cream and ivory clothing, warm morning sun, pale washed-out sky.
High-key editorial photography, low contrast, film grain.
No text, no letters, no logos, no watermark, no night scene, no dark or moody
lighting, no collage, no split-frame borders, no distorted hands or faces.
```

---

## 06 ─ 創會領頭羊

- **檔名**：`06-founder.jpg`　**比例**：4:5 直式

```
Studio portrait of a poised East Asian woman leader in her 40s, three-quarter
view, arms relaxed, looking straight into the lens with quiet authority.
Ivory blazer, minimal gold jewellery. Large soft key light against a plain
warm ivory seamless backdrop, gentle falloff, no hard shadow.
Vertical portrait, high-key editorial photography, low contrast, film grain,
natural skin texture.
No text, no letters, no logos, no watermark, no dark or moody lighting,
no black background, no heavy shadows, no distorted hands or faces.
```

---

## 07 ─ 最後的機會（目前未使用）

- **檔名**：`07-roadmap.jpg`　**比例**：16:9
- **關鍵**：整段背景，會壓到 55% 並蓋象牙遮罩。空椅子要看得出來，但整體要亮、要淡。

```
A long pale oak table in a bright sunlit dining room with tall windows and
white sheer curtains. Every chair is occupied by softly blurred seated figures
except one empty cream upholstered chair in the foreground, which is clearly
in focus and catches the daylight. The occupied seats fade into soft bright
haze so only the empty chair reads clearly.
Wide horizontal composition, warm ivory and pale wood palette, high-key
editorial photography, very low contrast, film grain.
No text, no letters, no logos, no watermark, no dark or moody lighting,
no black background, no heavy shadows, no distorted hands or faces.
```

---

## 08 ─ 短影音頁主視覺（不用重做）

`public/images/short-video-hero.jpg` 已經在用，`/short-video` 這次沒有改配色，
所以這張維持原樣，不需要重新生成。
