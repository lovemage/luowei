# 情境圖 Prompt（給 image2 生成）

## 使用方式

1. 用下列 prompt 產圖。
2. 依「檔名」欄位命名，放進 `public/images/fupo/`（第 8 張放 `public/images/`）。
3. 重新整理頁面即可看到。圖片還沒放進去之前，頁面會自動退回金色漸層裝飾底，不會破版。

## 共通風格（建議每次都帶）

> Cinematic editorial photography, near-black warm background (#090807),
> champagne-gold key light (#E2C191), soft rim light, shallow depth of field,
> film grain, elegant and restrained, luxury brand campaign aesthetic.
> Subjects are East Asian (Taiwanese) women. Natural skin texture, no plastic retouching.

**共通負向條件（每張都要加）**

> No text, no letters, no logos, no watermark, no captions, no signage.
> No collage, no split frame borders, no cartoon, no 3D render, no distorted hands or faces.

---

## 01 ─ 封面主視覺

- **檔名**：`public/images/fupo/01-hero.jpg`
- **比例**：16:9（建議 1920×1080 以上，會被當全螢幕背景，臉部請靠右或靠中，左側留空給標題）
- **用在**：頁面最上方「富婆組建籌備會」全螢幕背景

```
A group of five confident East Asian businesswomen in their 30s–40s standing together
in a dark, elegant private lounge at night. Tailored blazers, silk, understated jewellery.
Warm champagne-gold key light from the right, deep shadow on the left third of the frame
so the left side stays almost black and empty. Cinematic editorial photography,
shallow depth of field, subtle film grain, luxury brand campaign aesthetic.
Composition: subjects grouped on the right two-thirds, negative space on the left.
No text, no letters, no logos, no watermark, no signage, no distorted hands or faces.
```

---

## 02 ─ 創會理念

- **檔名**：`public/images/fupo/02-belief.jpg`
- **比例**：4:5 直式
- **用在**：「創會理念 ─ 她們很努力，卻很少有人陪她們一起走」

```
A single East Asian woman entrepreneur in her late 30s sitting alone at night in her
own studio or office, one warm desk lamp lighting her face, the rest of the room in
deep shadow. Quiet, thoughtful, self-possessed — not sad, not defeated.
Vertical portrait composition, champagne-gold light, near-black surroundings,
shallow depth of field, cinematic editorial photography, film grain.
No text, no letters, no logos, no watermark, no distorted hands or faces.
```

---

## 03 ─ 為什麼想組建這個團隊

- **檔名**：`public/images/fupo/03-foundation.jpg`
- **比例**：3:4 直式
- **用在**：「為什麼我想組建這個團隊？」四點論述旁

```
Four East Asian businesswomen sitting around a small round table in a warm, dimly lit
private room, mid-conversation, one of them laughing, coffee cups and notebooks on the table.
Intimate and relaxed rather than formal — a real conversation, not a stock meeting photo.
Vertical composition, champagne-gold warm light, near-black background,
cinematic editorial photography, shallow depth of field, film grain.
No text, no letters, no logos, no watermark, no distorted hands or faces.
```

---

## 04 ─ 我們要挖一個魚池

- **檔名**：`public/images/fupo/04-pond.jpg`
- **比例**：16:9（會被壓到 45% 不透明度當背景，主體請簡單、對比別太強）
- **用在**：「我們要挖一個魚池 / 產業鏈倍增」整段背景

```
Abstract conceptual image of an interconnected network: dozens of small glowing
champagne-gold nodes joined by thin light threads, spreading outward across a
near-black background, like a constellation or a river delta seen from above.
Soft bloom, depth of field falloff at the edges, elegant and quiet, not sci-fi, not neon.
Wide horizontal composition with the densest cluster slightly off-centre.
No text, no letters, no numbers, no logos, no watermark, no UI elements.
```

---

## 05 ─ 地推 × 天推

- **檔名**：`public/images/fupo/05-engine.jpg`
- **比例**：21:9 寬幅（很扁，主體請放中間水平帶）
- **用在**：「富婆成會兩條線｜地推 × 天推」

```
Ultra-wide cinematic image: on the left, East Asian businesswomen walking together
through a city street at dusk, grounded and real; on the right, the same warm light
opening upward into a soft glowing haze, as if the scene dissolves into light.
One continuous frame, no hard split, no border between the two halves.
Champagne-gold light, near-black shadows, film grain, editorial photography.
No text, no letters, no logos, no watermark, no collage, no split frame borders.
```

---

## 06 ─ 創會領頭羊

- **檔名**：`public/images/fupo/06-founder.jpg`
- **比例**：4:5 直式
- **用在**：「我要找的，是創會領頭羊」

```
Portrait of a poised East Asian woman leader in her 40s, three-quarter view,
arms relaxed, looking straight into the lens with quiet authority.
Tailored dark blazer, minimal gold jewellery. Single champagne-gold key light,
deep black background, strong rim light along the jaw and shoulder.
Vertical portrait, cinematic editorial photography, shallow depth of field, film grain.
No text, no letters, no logos, no watermark, no distorted hands or faces.
```

---

## 07 ─ 最後的機會

- **檔名**：`public/images/fupo/07-roadmap.jpg`
- **比例**：16:9（會被壓到 55% 不透明度當背景）
- **用在**：頁尾「最後的機會 / 位子只有一個」

```
A long elegant dark wood table in a dimly lit private dining room, every chair occupied
except one empty chair in the foreground, lit by a single warm champagne-gold spotlight.
The occupied seats fade into shadow so only the empty chair is clearly readable.
Wide horizontal composition, near-black room, cinematic editorial photography, film grain.
No text, no letters, no logos, no watermark, no distorted hands or faces.
```

---

## 08 ─（另外一張）短影音頁主視覺替換

舊的 `/short-video` 主視覺是「短影音變現課」，已依業主指示從程式端移除。
若要放新的主視覺，用這張，然後從 **後台 → 頁面管理 → short-video → 主視覺** 上傳。

- **檔名**：`public/images/short-video-hero.jpg`（或直接用後台上傳）
- **比例**：16:9

```
A professional short-video shoot in progress: an East Asian woman business owner in her
30s–40s speaking to a camera on a gimbal, softbox lighting, a small crew silhouetted
in the foreground. Warm, clean, modern studio in a bright blue-grey palette
(the page background is #EFF6FC), amber accent light on the subject.
Editorial commercial photography, shallow depth of field.
No text, no letters, no logos, no watermark, no distorted hands or faces.
```
