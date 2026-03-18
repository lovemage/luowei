import { NextResponse } from "next/server";
import { createCasesClient } from "@/lib/prisma-cases";

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
  const { id } = await params;
  const body = await request.json();
  const db = createCasesClient();
  const updated = await db.case.update({
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
  await db.$disconnect();
  return NextResponse.json(updated);
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
