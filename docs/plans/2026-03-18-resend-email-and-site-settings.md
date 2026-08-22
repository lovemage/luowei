# Resend Email & Site Settings Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add email notifications on registration (to user + admin) via Resend, and create an admin site settings page for admin email, footer text, and password management.

**Architecture:** New `SiteSettings` singleton model in Prisma. Resend SDK sends two emails per registration. Auth logic checks DB password first, falls back to env var. Footer reads from DB settings.

**Tech Stack:** Resend SDK, Prisma, Next.js API routes, bcryptjs for password hashing

---

### Task 1: Install Dependencies

**Step 1: Install resend and bcryptjs**

```bash
npm install resend bcryptjs
npm install -D @types/bcryptjs
```

**Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add resend and bcryptjs dependencies"
```

---

### Task 2: Add SiteSettings Model to Prisma

**Files:**
- Modify: `prisma/schema.prisma`

**Step 1: Add SiteSettings model**

Add to bottom of `prisma/schema.prisma`:

```prisma
model SiteSettings {
  id                String   @id @default("singleton")
  adminEmail        String?
  footerText        String?
  adminPasswordHash String?
  updatedAt         DateTime @updatedAt
}
```

**Step 2: Generate migration and client**

```bash
npx prisma migrate dev --name add-site-settings
```

**Step 3: Commit**

```bash
git add prisma/
git commit -m "feat: add SiteSettings model"
```

---

### Task 3: Create Site Settings API Routes

**Files:**
- Create: `src/app/api/admin/settings/route.ts`

**Step 1: Create GET and PUT endpoints**

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "singleton" },
  });
  return NextResponse.json({
    adminEmail: settings?.adminEmail || "",
    footerText: settings?.footerText || "",
    hasPassword: !!settings?.adminPasswordHash,
  });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const data: Record<string, string> = {};

  if (body.adminEmail !== undefined) data.adminEmail = body.adminEmail;
  if (body.footerText !== undefined) data.footerText = body.footerText;

  if (body.newPassword) {
    data.adminPasswordHash = await bcrypt.hash(body.newPassword, 10);
  }

  const settings = await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: data,
    create: { id: "singleton", ...data },
  });

  return NextResponse.json({
    adminEmail: settings.adminEmail || "",
    footerText: settings.footerText || "",
    hasPassword: !!settings.adminPasswordHash,
  });
}
```

**Step 2: Commit**

```bash
git add src/app/api/admin/settings/
git commit -m "feat: add site settings API routes"
```

---

### Task 4: Update Auth to Support DB Password

**Files:**
- Modify: `src/lib/auth.ts`

**Step 1: Update validateCredentials to check DB first**

Replace the `validateCredentials` function:

```typescript
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function validateCredentials(user: string, password: string) {
  if (user !== process.env.ADMIN_USER) return false;

  // Check DB password first
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "singleton" },
  });

  if (settings?.adminPasswordHash) {
    return bcrypt.compare(password, settings.adminPasswordHash);
  }

  // Fallback to env var
  return password === process.env.ADMIN_PASSWORD;
}
```

Note: This changes `validateCredentials` from sync to async. Update the login route accordingly.

**Step 2: Update login route**

Modify `src/app/api/admin/login/route.ts` — add `await` to the `validateCredentials` call.

**Step 3: Commit**

```bash
git add src/lib/auth.ts src/app/api/admin/login/
git commit -m "feat: auth checks DB password first, falls back to env var"
```

---

### Task 5: Create Resend Email Utility

**Files:**
- Create: `src/lib/email.ts`

**Step 1: Create email sending functions with black-gold HTML templates**

```typescript
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "羅威傳媒 <no-reply@luowei-media.com>";

// Black-gold themed email wrapper
function emailWrapper(content: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#050505;font-family:'PingFang TC','Hiragino Sans','Microsoft JhengHei',sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#050505;padding:40px 0">
<tr><td align="center">
<table width="430" cellpadding="0" cellspacing="0" style="background:#0D0D0D;border-radius:12px;border:1px solid #2A2218;overflow:hidden">
  <!-- Header -->
  <tr><td style="padding:32px 32px 16px;text-align:center;border-bottom:1px solid #2A2218">
    <img src="https://luowei-media.com/images/logo.png" alt="LUOWEI MEDIA" width="60" height="60" style="border-radius:8px">
    <p style="margin:12px 0 0;font-size:14px;letter-spacing:3px;color:#E2C191">LUOWEI MEDIA</p>
  </td></tr>
  <!-- Content -->
  <tr><td style="padding:32px;color:#f5eae6;font-size:14px;line-height:1.8">
    ${content}
  </td></tr>
  <!-- Footer -->
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
```

**Step 2: Commit**

```bash
git add src/lib/email.ts
git commit -m "feat: add Resend email utility with black-gold templates"
```

---

### Task 6: Integrate Email Into Registration API

**Files:**
- Modify: `src/app/api/registrations/route.ts`

**Step 1: Add email sending after registration**

After `prisma.registration.create`, add:

```typescript
import { sendConfirmationEmail, sendAdminNotificationEmail } from "@/lib/email";
import { prisma } from "@/lib/prisma";

// After creating registration, send emails (non-blocking)
const emailPromises: Promise<void>[] = [];

// Send confirmation to user if they provided email
if (data.email) {
  emailPromises.push(
    sendConfirmationEmail(data.email, data).catch((err) =>
      console.error("Failed to send confirmation email:", err)
    )
  );
}

// Send notification to admin if configured
const settings = await prisma.siteSettings.findUnique({
  where: { id: "singleton" },
});
if (settings?.adminEmail) {
  emailPromises.push(
    sendAdminNotificationEmail(settings.adminEmail, data).catch((err) =>
      console.error("Failed to send admin notification:", err)
    )
  );
}

// Don't block response on email sending
Promise.all(emailPromises);
```

**Step 2: Commit**

```bash
git add src/app/api/registrations/route.ts
git commit -m "feat: send confirmation and admin notification emails on registration"
```

---

### Task 7: Create Admin Settings Page

**Files:**
- Create: `src/app/admin/settings/page.tsx`

**Step 1: Build settings page with three sections**

Admin settings page with:
- Admin email input
- Footer text textarea
- Password change form (old password, new password, confirm)
- Save buttons per section

**Step 2: Commit**

```bash
git add src/app/admin/settings/
git commit -m "feat: add admin site settings page"
```

---

### Task 8: Add Settings to Sidebar Navigation

**Files:**
- Modify: `src/components/admin/Sidebar.tsx`

**Step 1: Add settings nav item**

Add to `navItems` array:

```typescript
{ label: "網站設定", href: "/admin/settings" },
```

**Step 2: Commit**

```bash
git add src/components/admin/Sidebar.tsx
git commit -m "feat: add settings link to admin sidebar"
```

---

### Task 9: Update Footer to Read from DB

**Files:**
- Create: `src/app/api/settings/public/route.ts` (public endpoint, returns only footerText)
- Modify: `src/components/Footer.tsx`

**Step 1: Create public settings API**

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "singleton" },
  });
  return NextResponse.json({
    footerText: settings?.footerText || "",
  });
}
```

**Step 2: Update Footer component**

If `footerText` is set in DB, display it. Otherwise show default text.

**Step 3: Commit**

```bash
git add src/app/api/settings/ src/components/Footer.tsx
git commit -m "feat: footer reads custom text from site settings"
```

---

### Task 10: Add RESEND_API_KEY to Railway

**Step 1: Set env var**

```bash
railway variables --set "RESEND_API_KEY=<key from resend dashboard>"
```

User must:
1. Sign up at resend.com
2. Add and verify domain `luowei-media.com`
3. Create API key
4. Set it in Railway

**Step 2: Final commit and push**

```bash
git push
```
