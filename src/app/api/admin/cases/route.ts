import { NextResponse } from "next/server";
import { createCasesClient } from "@/lib/prisma-cases";

export const dynamic = "force-dynamic";

function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function generateUniqueSlug(db: ReturnType<typeof createCasesClient>, rawSlug: string) {
  const base = normalizeSlug(rawSlug) || `case-${Date.now()}`;
  let candidate = base;
  let suffix = 1;

  while (await db.case.findUnique({ where: { slug: candidate }, select: { id: true } })) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}

export async function GET() {
  const db = createCasesClient();
  try {
    const cases = await db.case.findMany({ orderBy: { order: "asc" } });
    return NextResponse.json(cases);
  } finally {
    await db.$disconnect();
  }
}

export async function POST(request: Request) {
  const db = createCasesClient();
  try {
    const body = await request.json();
    const uniqueSlug = await generateUniqueSlug(db, String(body.name ?? ""));
    const newCase = await db.case.create({
      data: {
        slug: uniqueSlug,
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
  } catch (error) {
    console.error("Create case failed:", error);
    return NextResponse.json({ error: "建立案例失敗" }, { status: 500 });
  } finally {
    await db.$disconnect();
  }
}
