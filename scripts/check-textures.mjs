/**
 * fupo 材質素材檢查：把每張素材以指定不透明度疊在白底上，
 * 換算內文色 #6B5F51 在最暗處的 WCAG 對比度，判斷可用的最低不透明度。
 *
 *   node scripts/check-textures.mjs
 *
 * blur(1.6) 是刻意的：文字筆畫約 2px 寬，比筆畫更細的纖維斑點
 * 在視覺上會被平均掉，用單一最暗像素判定會過嚴。
 */
import sharp from "sharp";
import { readdirSync } from "node:fs";

const dir = "public/images/fupo/tex";
const DISPLAY = {
  "belief-closing": [1072, 160], "belief-": [564, 220], "system-": [564, 220],
  "chain-bg-": [944, 380], "chain-label-": [214, 145], "stat-": [268, 140],
  "touch-": [96, 40], "modal-bg": [452, 880],
};
// CTA 是深色實心底＋象牙白文字，判準相反，不走這支腳本
const SKIP = ["cta-idle.webp", "cta-active.webp"];
const displaySize = (f) => Object.entries(DISPLAY).find(([k]) => f.startsWith(k))?.[1] ?? [400, 200];

const lin = (c) => { const s = c / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
const relLum = (r, g, b) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const TEXT = relLum(0x6b, 0x5f, 0x51);
const contrast = (bg) => (bg + 0.05) / (TEXT + 0.05);

async function worst(path, w, h, opacity) {
  // blur 1.6 ≈ 15px 字的筆畫寬度，讓細小纖維斑點被平均掉
  const { data, info } = await sharp(path).resize(w, h, { fit: "fill" })
    .ensureAlpha().blur(1.6).raw().toBuffer({ resolveWithObject: true });
  let lo = Infinity;
  for (let i = 0; i < info.width * info.height; i++) {
    const o = i * 4, a = (data[o + 3] / 255) * opacity;
    const c = contrast(relLum(
      data[o] * a + 255 * (1 - a), data[o + 1] * a + 255 * (1 - a), data[o + 2] * a + 255 * (1 - a)));
    if (c < lo) lo = c;
  }
  return lo;
}

const files = readdirSync(dir).filter((f) => f.endsWith(".webp")).sort();
console.log("檔名                  100%   85%    70%    55%   → 最低可用不透明度");
console.log("─".repeat(70));
const OPS = [1, 0.85, 0.7, 0.55];
const verdict = {};
for (const f of files) {
  if (SKIP.includes(f)) continue;
  const [w, h] = displaySize(f);
  const cs = [];
  for (const op of OPS) cs.push(await worst(`${dir}/${f}`, w, h, op));
  const ok = OPS.find((op, i) => cs[i] >= 4.5);
  verdict[f] = ok;
  console.log(f.padEnd(21), ...cs.map((c) => (c >= 4.5 ? " " : "!") + c.toFixed(2).padStart(5)),
    "   ", ok ? `${Math.round(ok * 100)}%` : "★ 不可用");
}
const bad = Object.entries(verdict).filter(([, v]) => !v).map(([k]) => k);
console.log("\n55% 仍不過（建議重產）：", bad.length ? bad.join(", ") : "無");
