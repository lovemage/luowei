import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const reg = await prisma.registration.findUnique({ where: { id } });
  if (!reg) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(reg);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.registration.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
