/** 富婆分會的 LINE 官方帳號短網址；basic ID 也解不出來時的退路。 */
export const FUPO_LINE_FALLBACK_URL = "https://lin.ee/PQzIWDd";

/**
 * 官方帳號的 basic ID，上面那組短網址導向的目標（line.me/R/ti/p/@711qixeq）。
 * 預填訊息只認 basic ID，所以寫成預設值而不是只讀環境變數——部署時漏設
 * FUPO_LINE_OA_ID 就會整條掉回「請自行複製訊息」，那是使用者最不該踩到的路。
 * 換帳號時設 FUPO_LINE_OA_ID 即可覆寫。
 */
export const FUPO_LINE_OA_ID = "@711qixeq";

/** 這頁的報名都掛在同一個「課程方案」名稱下，後台才好篩。 */
export const FUPO_COURSE_NAME = "BNI - 富婆分會";

export interface FupoJoinData {
  name: string;
  gender: string;
  phone: string;
  lineId: string;
  socialPlatform: string;
  socialLink: string;
}

/** 送出後直接帶進 LINE 對話框的訊息，使用者只要按送出。 */
export function buildLineMessage(data: FupoJoinData): string {
  const lines = [
    "我想加入 BNI - 富婆分會，以下是我的資料：",
    "",
    `姓名：${data.name}`,
    `性別：${data.gender}`,
    `手機：${data.phone}`,
    `LINE ID：${data.lineId}`,
  ];

  if (data.socialLink) lines.push(`${data.socialPlatform}：${data.socialLink}`);

  lines.push("", "（此訊息由官網表單自動帶入，直接按送出即可）");
  return lines.join("\n");
}

/**
 * 產生 LINE 深層連結。
 *
 * 要把訊息預先打進對話框，網址必須用官方帳號的 basic ID（@ 開頭），
 * lin.ee 短網址做不到——它只會開啟聊天室，訊息是空的。兩者都拿不到時
 * 才退回短網址，並讓前端改走「複製訊息」。
 */
export function buildLineUrl(message: string): { url: string; prefilled: boolean } {
  const raw = process.env.FUPO_LINE_OA_ID?.trim() || FUPO_LINE_OA_ID;
  if (!raw) return { url: FUPO_LINE_FALLBACK_URL, prefilled: false };

  const id = raw.startsWith("@") ? raw : `@${raw}`;
  return {
    url: `https://line.me/R/oaMessage/${encodeURIComponent(id)}/?${encodeURIComponent(message)}`,
    prefilled: true,
  };
}
