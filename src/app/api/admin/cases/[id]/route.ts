import { NextResponse } from "next/server";
import { createCasesClient } from "@/lib/prisma-cases";

function normalizeSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

async function generateUniqueSlug(
  db: ReturnType<typeof createCasesClient>,
  rawSlug: string,
  currentId: number
) {
  const base = normalizeSlug(rawSlug) || `case-${Date.now()}`;
  let candidate = base;
  let suffix = 1;

  while (true) {
    const existing = await db.case.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });
    if (!existing || existing.id === currentId) return candidate;
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = createCasesClient();
  const found = await db.case.findUnique({ where: { id: Number(id) } });
  await db.$disconnect();
  if (!found) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(found);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const db = createCasesClient();
  try {
    const { id } = await params;
    const body = await request.json();
    const numericId = Number(id);
    const uniqueSlug = await generateUniqueSlug(db, String(body.name ?? ""), numericId);
    const updated = await db.case.update({
      where: { id: numericId },
      data: {
        slug: uniqueSlug,
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
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2002"
    ) {
      return NextResponse.json({ error: "Slug 已存在，請改用其他 slug" }, { status: 409 });
    }
    console.error("Update case failed:", error);
    return NextResponse.json({ error: "更新案例失敗" }, { status: 500 });
  } finally {
    await db.$disconnect();
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = createCasesClient();
  await db.case.delete({ where: { id: Number(id) } });
  await db.$disconnect();
  return NextResponse.json({ success: true });
}
