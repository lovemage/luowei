# Cases Showcase Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a case showcase page (`/cases`) with a logo wall of member avatars, tab filtering by category, and a modal detail view. Data managed via Prisma DB + admin CRUD. First case: Dr. Frank Shen.

**Architecture:** New `Case` Prisma model with CRUD API routes following existing FAQ pattern. Frontend `/cases` page with `TabSwitcher` + 3-column avatar grid. Click opens a bottom-slide modal with bio/stats. Admin `/admin/cases` page for management.

**Tech Stack:** Next.js App Router, Prisma (PostgreSQL), Tailwind CSS, existing S3 media upload system, existing TabSwitcher component.

---

### Task 1: Add Case model to Prisma schema

**Files:**
- Modify: `prisma/schema.prisma`

**Step 1: Add Case model**

Append to `prisma/schema.prisma` after the `Media` model:

```prisma
model Case {
  id        Int      @id @default(autoincrement())
  slug      String   @unique
  name      String
  avatarUrl String
  category  String   // "short-video" | "course"
  title     String
  bio       String
  stats     Json     @default("{}")
  order     Int      @default(0)
  visible   Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Step 2: Run migration**

```bash
npx prisma migrate dev --name add-case-model
```

Expected: Migration applied, `src/generated/prisma` updated with `Case` type.

**Step 3: Commit**

```bash
git add prisma/ src/generated/
git commit -m "feat: add Case model to Prisma schema"
```

---

### Task 2: Seed first case (Dr. Frank Shen)

**Files:**
- Create: `prisma/seed-case.ts`

**Step 1: Write seed script**

```typescript
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  await prisma.case.upsert({
    where: { slug: "dr-frankshen" },
    update: {},
    create: {
      slug: "dr-frankshen",
      name: "沈耿仲醫師",
      avatarUrl: "/images/avatar-dr-frankshen.jpg",
      category: "short-video",
      title: "耳鼻喉科醫師",
      bio: "大家好，我是沈耿仲醫師，一位擁有完整耳鼻喉科訓練背景的專科醫師。在臨床工作中，我始終秉持著「效率找到問題，提出精準治療」的理念，致力於為每一位患者提供最適切的醫療方案。\n\n我的專業領域涵蓋耳、鼻、喉三大範疇，其中尤其專精於鼻部疾病的診斷與治療。從常見的鼻塞、過敏性鼻炎，到需要手術介入的鼻中隔彎曲、下鼻甲肥大等問題，我都累積了豐富的臨床經驗。在手術方面，我擅長以微創技術進行鼻塞手術，相較於傳統手術方式，微創手術具有傷口小、恢復快、術後不適感低等優勢，能讓患者以更舒適的方式重新找回順暢的呼吸。\n\n除了功能性的鼻部治療，我也提供鼻整形的專業服務。我相信鼻子不僅關乎呼吸功能，也影響著一個人的外在自信。因此，我強調「從內而外」的全方位調整理念——先確保鼻腔結構的健康與功能，再兼顧外觀上的美感需求，為每位患者量身打造客製化的治療計畫。\n\n在耳科方面，我也處理包括耳朵疼痛、聽力問題、小耳症等各類疾病，同時關注日常生活中容易被忽略的耳部保健知識，例如正確的耳朵清潔方式、搭飛機時的耳壓調節技巧等。在喉部領域，我對於咳嗽診斷、喉結相關問題、胃酸逆流引起的咽喉不適等，也能提供專業的評估與建議。\n\n工作之餘，我積極透過社群媒體進行醫學科普，在 TikTok 上以輕鬆有趣的方式分享耳鼻喉科的專業知識，內容涵蓋鼻塞成因、手術過程實錄、日常保健小知識等，希望讓更多人在娛樂中學習正確的健康觀念。目前已累積超過一萬兩千名粉絲的支持，影片總獲讚數突破十三萬，這些數字背後代表的是每一位觀眾對健康知識的重視，也是驅動我持續創作的動力。\n\n如果您有任何耳鼻喉相關的困擾，歡迎透過官方 Line 預約諮詢，讓我陪您一起找到最適合的解決方案。",
      stats: {
        followers: "12.8K",
        likes: "132.6K",
        platform: "TikTok",
      },
      order: 1,
      visible: true,
    },
  });

  console.log("Case seeded: dr-frankshen");
  await prisma.$disconnect();
}

main().catch(console.error);
```

**Step 2: Run seed**

```bash
npx tsx prisma/seed-case.ts
```

Expected: "Case seeded: dr-frankshen"

**Step 3: Download Dr. Shen's avatar from TikTok screenshot and place at `public/images/avatar-dr-frankshen.jpg`**

Crop the avatar from the TikTok page screenshot, or use a placeholder image for now.

**Step 4: Commit**

```bash
git add prisma/seed-case.ts public/images/avatar-dr-frankshen.jpg
git commit -m "feat: seed first case - Dr. Frank Shen"
```

---

### Task 3: Create Cases API routes

**Files:**
- Create: `src/app/api/admin/cases/route.ts`
- Create: `src/app/api/admin/cases/[id]/route.ts`
- Create: `src/app/api/cases/route.ts` (public, for frontend)

**Step 1: Create public GET route**

`src/app/api/cases/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const cases = await prisma.case.findMany({
    where: {
      visible: true,
      ...(category ? { category } : {}),
    },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(cases);
}
```

**Step 2: Create admin list + create route**

`src/app/api/admin/cases/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const cases = await prisma.case.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(cases);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newCase = await prisma.case.create({
    data: {
      slug: body.slug,
      name: body.name,
      avatarUrl: body.avatarUrl,
      category: body.category,
      title: body.title,
      bio: body.bio,
      stats: body.stats || {},
      order: body.order || 0,
      visible: body.visible ?? true,
    },
  });
  return NextResponse.json(newCase, { status: 201 });
}
```

**Step 3: Create admin single-item route**

`src/app/api/admin/cases/[id]/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const found = await prisma.case.findUnique({ where: { id: Number(id) } });
  if (!found) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(found);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const updated = await prisma.case.update({
    where: { id: Number(id) },
    data: {
      slug: body.slug,
      name: body.name,
      avatarUrl: body.avatarUrl,
      category: body.category,
      title: body.title,
      bio: body.bio,
      stats: body.stats,
      order: body.order,
      visible: body.visible,
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.case.delete({ where: { id: Number(id) } });
  return NextResponse.json({ success: true });
}
```

**Step 4: Verify API works**

```bash
curl http://localhost:3000/api/cases
```

Expected: JSON array with Dr. Frank Shen case.

**Step 5: Commit**

```bash
git add src/app/api/cases/ src/app/api/admin/cases/
git commit -m "feat: add cases API routes (public + admin CRUD)"
```

---

### Task 4: Build /cases frontend page

**Files:**
- Modify: `src/app/cases/page.tsx` (replace coming soon)
- Create: `src/components/CaseLogoWall.tsx`
- Create: `src/components/CaseDetailModal.tsx`

**Step 1: Create CaseLogoWall component**

`src/components/CaseLogoWall.tsx`:

```tsx
"use client";

interface CaseItem {
  id: number;
  slug: string;
  name: string;
  avatarUrl: string;
  category: string;
  title: string;
  bio: string;
  stats: Record<string, string>;
}

interface CaseLogoWallProps {
  cases: CaseItem[];
  onSelect: (c: CaseItem) => void;
}

export default function CaseLogoWall({ cases, onSelect }: CaseLogoWallProps) {
  if (cases.length === 0) {
    return (
      <p className="text-center text-text-secondary text-sm py-12">
        尚無案例資料
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {cases.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c)}
          className="flex flex-col items-center gap-2 group"
        >
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-accent/30 group-hover:border-accent transition-colors shadow-[0_0_12px_rgba(226,193,145,0.12)]">
            <img
              src={c.avatarUrl}
              alt={c.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs text-text-secondary group-hover:text-accent transition-colors text-center leading-tight">
            {c.name}
          </span>
        </button>
      ))}
    </div>
  );
}
```

**Step 2: Create CaseDetailModal component**

`src/components/CaseDetailModal.tsx`:

```tsx
"use client";

import { useEffect } from "react";

interface CaseItem {
  id: number;
  slug: string;
  name: string;
  avatarUrl: string;
  category: string;
  title: string;
  bio: string;
  stats: Record<string, string>;
}

interface CaseDetailModalProps {
  caseData: CaseItem | null;
  onClose: () => void;
}

const STAT_LABELS: Record<string, string> = {
  followers: "粉絲",
  likes: "讚數",
  views: "觀看",
  platform: "平台",
};

export default function CaseDetailModal({ caseData, onClose }: CaseDetailModalProps) {
  useEffect(() => {
    if (caseData) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [caseData]);

  if (!caseData) return null;

  const statsEntries = Object.entries(caseData.stats);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-[430px] max-h-[85dvh] bg-surface-primary rounded-t-2xl overflow-y-auto animate-slide-up">
        {/* Close button */}
        <button
          onClick={onClose}
          className="sticky top-0 right-0 float-right m-4 w-8 h-8 flex items-center justify-center rounded-full bg-surface-secondary text-text-secondary hover:text-text-primary transition-colors z-10"
        >
          ✕
        </button>

        <div className="px-6 pt-10 pb-8 flex flex-col items-center">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent/40 shadow-[0_0_20px_rgba(226,193,145,0.15)] mb-4">
            <img
              src={caseData.avatarUrl}
              alt={caseData.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name & Title */}
          <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-xl font-bold text-text-primary mb-1">
            {caseData.name}
          </h2>
          <p className="text-sm text-accent mb-6">{caseData.title}</p>

          {/* Stats */}
          {statsEntries.length > 0 && (
            <div className="flex gap-3 mb-8 w-full">
              {statsEntries.map(([key, value]) => (
                <div
                  key={key}
                  className="flex-1 bg-surface-secondary rounded-xl py-3 px-2 text-center border border-divider"
                >
                  <p className="text-lg font-bold text-accent">{value}</p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {STAT_LABELS[key] || key}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Divider */}
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-divider to-transparent mb-6" />

          {/* Bio */}
          <div className="w-full">
            <h3 className="text-sm font-medium text-accent tracking-widest mb-3">
              自我介紹
            </h3>
            <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
              {caseData.bio}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step 3: Add slide-up animation to globals.css**

In `src/app/globals.css`, add inside `@theme inline`:

```css
--animate-slide-up: slide-up 0.3s ease-out;
```

And add the keyframes:

```css
@keyframes slide-up {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

**Step 4: Replace /cases page**

`src/app/cases/page.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TabSwitcher from "@/components/TabSwitcher";
import CaseLogoWall from "@/components/CaseLogoWall";
import CaseDetailModal from "@/components/CaseDetailModal";

interface CaseItem {
  id: number;
  slug: string;
  name: string;
  avatarUrl: string;
  category: string;
  title: string;
  bio: string;
  stats: Record<string, string>;
}

const TABS = [
  { key: "short-video", label: "短影音案例" },
  { key: "course", label: "課程案例" },
];

export default function CasesPage() {
  const [activeTab, setActiveTab] = useState("short-video");
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<CaseItem | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/cases?category=${activeTab}`)
      .then((res) => res.json())
      .then((data) => {
        setCases(data);
        setLoading(false);
      });
  }, [activeTab]);

  return (
    <main className="relative z-10 flex min-h-dvh flex-col items-center px-6 pt-12 pb-20">
      <Link
        href="/"
        className="self-start text-sm text-accent hover:text-accent-hover transition-colors mb-8"
      >
        ← 返回首頁
      </Link>

      <h1 className="font-[family-name:var(--font-noto-serif-tc)] text-[22px] font-bold text-gold-shine mb-2">
        案例展示
      </h1>
      <p className="text-sm text-text-secondary mb-8">
        成功學員的真實故事
      </p>

      <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full mb-8" />

      <div className="w-full">
        <TabSwitcher tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {loading ? (
        <p className="text-sm text-text-secondary py-12">載入中...</p>
      ) : (
        <CaseLogoWall cases={cases} onSelect={setSelected} />
      )}

      <CaseDetailModal caseData={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
```

**Step 5: Verify page renders**

```bash
npm run dev
# Open http://localhost:3000/cases
```

Expected: Tab switcher with "短影音案例" active, 3-column grid showing Dr. Shen's avatar. Click opens modal with bio.

**Step 6: Commit**

```bash
git add src/app/cases/page.tsx src/components/CaseLogoWall.tsx src/components/CaseDetailModal.tsx src/app/globals.css
git commit -m "feat: build cases showcase page with logo wall and detail modal"
```

---

### Task 5: Build admin cases management page

**Files:**
- Create: `src/app/admin/cases/page.tsx`
- Create: `src/app/admin/cases/new/page.tsx`
- Create: `src/app/admin/cases/[id]/edit/page.tsx`
- Modify: `src/components/admin/Sidebar.tsx` (add nav item)

**Step 1: Add "案例管理" to admin sidebar**

In `src/components/admin/Sidebar.tsx`, add to `navItems` array:

```typescript
{ label: "案例管理", href: "/admin/cases" },
```

**Step 2: Create admin cases list page**

`src/app/admin/cases/page.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Case {
  id: number;
  slug: string;
  name: string;
  avatarUrl: string;
  category: string;
  title: string;
  order: number;
  visible: boolean;
}

export default function AdminCasesPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCases = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/cases");
    const data = await res.json();
    setCases(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("確定要刪除這個案例嗎？")) return;
    await fetch(`/api/admin/cases/${id}`, { method: "DELETE" });
    fetchCases();
  };

  const toggleVisible = async (c: Case) => {
    await fetch(`/api/admin/cases/${c.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...c, visible: !c.visible }),
    });
    fetchCases();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">案例管理</h1>
        <Link
          href="/admin/cases/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          新增案例
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500 text-sm">載入中...</div>
        ) : cases.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">尚無案例資料</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left px-4 py-3 font-medium text-gray-600">頭像</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">名稱</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">分類</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">排序</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">顯示</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((c) => (
                <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <img src={c.avatarUrl} alt={c.name} className="w-10 h-10 rounded-full object-cover" />
                  </td>
                  <td className="px-4 py-3 text-gray-900">{c.name}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {c.category === "short-video" ? "短影音" : "課程"}
                  </td>
                  <td className="px-4 py-3 text-gray-500">{c.order}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleVisible(c)}
                      className={`text-xs px-2 py-1 rounded ${
                        c.visible
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {c.visible ? "顯示" : "隱藏"}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <Link href={`/admin/cases/${c.id}/edit`} className="text-blue-600 hover:text-blue-800">
                      編輯
                    </Link>
                    <button onClick={() => handleDelete(c.id)} className="text-red-500 hover:text-red-700">
                      刪除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
```

**Step 3: Create new case form page**

`src/app/admin/cases/new/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewCasePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    slug: "",
    name: "",
    avatarUrl: "",
    category: "short-video",
    title: "",
    bio: "",
    stats: "{}",
    order: 0,
    visible: true,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          stats: JSON.parse(form.stats),
        }),
      });
      if (res.ok) router.push("/admin/cases");
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/cases" className="text-gray-500 hover:text-gray-700">← 返回</Link>
        <h1 className="text-2xl font-bold text-gray-900">新增案例</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL 識別碼)</label>
          <input
            type="text" required value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            placeholder="dr-frankshen"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">名稱</label>
          <input
            type="text" required value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">頭像圖片 URL</label>
          <input
            type="text" required value={form.avatarUrl}
            onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            placeholder="/images/avatar.jpg 或 S3 URL"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">分類</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
          >
            <option value="short-video">短影音案例</option>
            <option value="course">課程案例</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">頭銜</label>
          <input
            type="text" required value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">自我介紹</label>
          <textarea
            required value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm h-40"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">數據亮點 (JSON)</label>
          <textarea
            value={form.stats}
            onChange={(e) => setForm({ ...form, stats: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono h-20"
            placeholder='{"followers": "12.8K", "likes": "132.6K"}'
          />
        </div>
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">排序</label>
            <input
              type="number" value={form.order}
              onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox" checked={form.visible}
                onChange={(e) => setForm({ ...form, visible: e.target.checked })}
              />
              顯示
            </label>
          </div>
        </div>
        <button
          type="submit" disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {saving ? "儲存中..." : "儲存"}
        </button>
      </form>
    </div>
  );
}
```

**Step 4: Create edit case page**

`src/app/admin/cases/[id]/edit/page.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditCasePage() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState({
    slug: "",
    name: "",
    avatarUrl: "",
    category: "short-video",
    title: "",
    bio: "",
    stats: "{}",
    order: 0,
    visible: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/cases/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          slug: data.slug,
          name: data.name,
          avatarUrl: data.avatarUrl,
          category: data.category,
          title: data.title,
          bio: data.bio,
          stats: JSON.stringify(data.stats, null, 2),
          order: data.order,
          visible: data.visible,
        });
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/cases/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          stats: JSON.parse(form.stats),
        }),
      });
      if (res.ok) router.push("/admin/cases");
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  if (loading) return <div className="p-8 text-gray-500">載入中...</div>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/cases" className="text-gray-500 hover:text-gray-700">← 返回</Link>
        <h1 className="text-2xl font-bold text-gray-900">編輯案例</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
          <input type="text" required value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">名稱</label>
          <input type="text" required value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">頭像圖片 URL</label>
          <input type="text" required value={form.avatarUrl}
            onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">分類</label>
          <select value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
            <option value="short-video">短影音案例</option>
            <option value="course">課程案例</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">頭銜</label>
          <input type="text" required value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">自我介紹</label>
          <textarea required value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm h-40" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">數據亮點 (JSON)</label>
          <textarea value={form.stats}
            onChange={(e) => setForm({ ...form, stats: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono h-20" />
        </div>
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">排序</label>
            <input type="number" value={form.order}
              onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={form.visible}
                onChange={(e) => setForm({ ...form, visible: e.target.checked })} />
              顯示
            </label>
          </div>
        </div>
        <button type="submit" disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50">
          {saving ? "儲存中..." : "更新"}
        </button>
      </form>
    </div>
  );
}
```

**Step 5: Verify admin page works**

```bash
# Open http://localhost:3000/admin/cases
```

Expected: Table with Dr. Shen case, links to new/edit work.

**Step 6: Commit**

```bash
git add src/app/admin/cases/ src/components/admin/Sidebar.tsx
git commit -m "feat: add admin cases management pages"
```

---

### Task 6: Final verification

**Step 1: Run build**

```bash
npm run build
```

Expected: No build errors.

**Step 2: Manual test checklist**

- [ ] `/cases` shows tab switcher, "短影音案例" tab active
- [ ] Dr. Shen avatar appears in 3-column grid
- [ ] Click avatar opens modal with bio, stats, close button
- [ ] "課程案例" tab shows empty state
- [ ] `/admin/cases` shows case list
- [ ] Edit/delete/visibility toggle works
- [ ] New case form works

**Step 3: Commit all remaining changes**

```bash
git add .
git commit -m "feat: complete cases showcase feature"
```
