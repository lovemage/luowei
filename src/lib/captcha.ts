import { randomInt } from "node:crypto";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

/* 拿掉 0/O/1/I/L/2/Z 這類肉眼容易混淆的字元，避免使用者「打對了卻說錯」。 */
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXY3456789";
const LENGTH = 4;
/** 驗證碼有效期。過短會讓慢慢填表的人白填一次。 */
const TTL = "10m";
/** 發碼到送出至少要經過的秒數；比這更快的一律當機器人。 */
const MIN_FILL_SECONDS = 2;

const W = 132;
const H = 48;
const INK = ["#5E4418", "#7E5D28", "#8F6B2E", "#B08D4F"];

export type CaptchaVerdict = "ok" | "mismatch" | "expired" | "too-fast";

function pick<T>(list: readonly T[]): T {
  return list[randomInt(0, list.length)];
}

function createCode(): string {
  let code = "";
  for (let i = 0; i < LENGTH; i++) code += ALPHABET[randomInt(0, ALPHABET.length)];
  return code;
}

/**
 * 直接輸出 SVG 而非點陣圖：不必額外依賴影像函式庫，
 * 檔案又小到可以整張塞進 data URI 隨 JSON 一起回傳。
 */
function renderSvg(code: string): string {
  const parts: string[] = [`<rect width="${W}" height="${H}" fill="#F7F1E6"/>`];

  // 干擾曲線
  for (let i = 0; i < 4; i++) {
    const y1 = randomInt(0, H);
    const y2 = randomInt(0, H);
    const cx = randomInt(24, W - 24);
    const cy = randomInt(-10, H + 10);
    parts.push(
      `<path d="M0 ${y1} Q${cx} ${cy} ${W} ${y2}" fill="none" stroke="${pick(INK)}" stroke-opacity="0.26" stroke-width="${randomInt(1, 3)}"/>`
    );
  }

  // 干擾點
  for (let i = 0; i < 28; i++) {
    parts.push(
      `<circle cx="${randomInt(0, W)}" cy="${randomInt(0, H)}" r="${randomInt(1, 3)}" fill="${pick(INK)}" fill-opacity="0.2"/>`
    );
  }

  // 字元：各自隨機旋轉、位移、字級，讓 OCR 難一點
  const step = (W - 28) / code.length;
  code.split("").forEach((ch, i) => {
    const x = 16 + step * i + randomInt(-2, 3);
    const y = Math.round(H / 2) + randomInt(6, 11);
    const angle = randomInt(-22, 23);
    const size = randomInt(25, 31);
    parts.push(
      `<text x="${x}" y="${y}" font-family="Georgia,'Times New Roman',serif" font-size="${size}" font-weight="700" fill="${pick(INK)}" transform="rotate(${angle} ${x} ${y})">${ch}</text>`
    );
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${parts.join("")}</svg>`;
}

/**
 * 發一張新驗證碼。答案本身不會離開伺服器——回傳的 token 裡只有 bcrypt 雜湊，
 * 就算被拆開看也沒辦法反推出圖上的字。
 */
export async function issueCaptcha(): Promise<{ token: string; image: string }> {
  const code = createCode();
  const hash = await bcrypt.hash(code.toLowerCase(), 8);

  const token = await new SignJWT({ h: hash })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(TTL)
    .sign(secret);

  const image = `data:image/svg+xml;base64,${Buffer.from(renderSvg(code), "utf8").toString("base64")}`;
  return { token, image };
}

export async function verifyCaptcha(token: string, input: string): Promise<CaptchaVerdict> {
  let hash: string;
  let issuedAt: number;

  try {
    const { payload } = await jwtVerify(token, secret);
    if (typeof payload.h !== "string" || typeof payload.iat !== "number") return "expired";
    hash = payload.h;
    issuedAt = payload.iat;
  } catch {
    // 簽章不符或已過期，兩者對使用者的處置一樣：重新換一張
    return "expired";
  }

  if (Math.floor(Date.now() / 1000) - issuedAt < MIN_FILL_SECONDS) return "too-fast";

  const ok = await bcrypt.compare(input.trim().toLowerCase(), hash);
  return ok ? "ok" : "mismatch";
}
