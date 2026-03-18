import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "羅威傳媒 <no-reply@luowei-media.com>";

function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#050505;font-family:'PingFang TC','Hiragino Sans','Microsoft JhengHei',sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#050505;padding:40px 0">
<tr><td align="center">
<table width="430" cellpadding="0" cellspacing="0" style="background:#0D0D0D;border-radius:12px;border:1px solid #2A2218;overflow:hidden">
  <tr><td style="padding:32px 32px 16px;text-align:center;border-bottom:1px solid #2A2218">
    <img src="https://luowei-media.com/images/logo.png" alt="LUOWEI MEDIA" width="60" height="60" style="border-radius:8px">
    <p style="margin:12px 0 0;font-size:14px;letter-spacing:3px;color:#E2C191">LUOWEI MEDIA</p>
  </td></tr>
  <tr><td style="padding:32px;color:#f5eae6;font-size:14px;line-height:1.8">
    ${content}
  </td></tr>
  <tr><td style="padding:24px 32px;text-align:center;border-top:1px solid #2A2218">
    <p style="margin:0;font-size:12px;color:#cccccc;letter-spacing:2px">無限進步｜個人成長</p>
    <p style="margin:8px 0 0;font-size:11px;color:rgba(204,204,204,0.4);letter-spacing:2px">羅威傳媒 | Louwei Studio</p>
  </td></tr>
</table>
</td></tr></table></body></html>`;
}

type RegistrationData = {
  name: string;
  phone: string;
  lineId?: string;
  email?: string;
  courseName: string;
  message?: string;
};

export async function sendConfirmationEmail(to: string, data: RegistrationData) {
  const content = `
    <h2 style="margin:0 0 20px;font-size:20px;color:#E2C191;font-weight:500">感謝您的報名</h2>
    <p style="color:#cccccc">親愛的 <span style="color:#E2C191">${data.name}</span> 您好，</p>
    <p style="color:#cccccc">我們已收到您的報名，以下是您的報名資訊：</p>
    <table style="width:100%;margin:20px 0;border-collapse:collapse">
      <tr><td style="padding:8px 0;color:#cccccc;border-bottom:1px solid #2A2218;width:80px">姓名</td><td style="padding:8px 0;color:#f5eae6;border-bottom:1px solid #2A2218">${data.name}</td></tr>
      <tr><td style="padding:8px 0;color:#cccccc;border-bottom:1px solid #2A2218">課程方案</td><td style="padding:8px 0;color:#f5eae6;border-bottom:1px solid #2A2218">${data.courseName}</td></tr>
      <tr><td style="padding:8px 0;color:#cccccc;border-bottom:1px solid #2A2218">電話</td><td style="padding:8px 0;color:#f5eae6;border-bottom:1px solid #2A2218">${data.phone}</td></tr>
    </table>
    <p style="color:#cccccc;margin-top:24px">如有任何問題，歡迎透過 LINE 官方帳號聯繫我們：</p>
    <a href="https://lin.ee/htTdJSH" style="display:inline-block;margin-top:8px;padding:10px 24px;background:#E2C191;color:#050505;text-decoration:none;border-radius:6px;font-size:13px;font-weight:600">加入 LINE 官方帳號</a>
  `;

  await resend.emails.send({
    from: FROM,
    to,
    subject: `【羅威傳媒】報名確認 - ${data.courseName}`,
    html: emailWrapper(content),
  });
}

export async function sendAdminNotificationEmail(to: string, data: RegistrationData) {
  const rows = [
    ["姓名", data.name],
    ["電話", data.phone],
    ["LINE ID", data.lineId || "-"],
    ["Email", data.email || "-"],
    ["課程方案", data.courseName],
    ["留言", data.message || "-"],
  ]
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 0;color:#cccccc;border-bottom:1px solid #2A2218;width:80px">${label}</td><td style="padding:8px 0;color:#f5eae6;border-bottom:1px solid #2A2218">${value}</td></tr>`
    )
    .join("");

  const content = `
    <h2 style="margin:0 0 20px;font-size:20px;color:#E2C191;font-weight:500">新報名通知</h2>
    <p style="color:#cccccc">收到一筆新的報名資料：</p>
    <table style="width:100%;margin:20px 0;border-collapse:collapse">${rows}</table>
  `;

  await resend.emails.send({
    from: FROM,
    to,
    subject: `【新報名】${data.name} - ${data.courseName}`,
    html: emailWrapper(content),
  });
}
