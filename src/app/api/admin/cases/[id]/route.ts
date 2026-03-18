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
