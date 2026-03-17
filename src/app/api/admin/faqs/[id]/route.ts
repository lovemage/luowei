import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const faq = await prisma.fAQ.findUnique({ where: { id } });
  if (!faq) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(faq);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  const faq = await prisma.fAQ.update({
    where: { id },
    data: {
      pageSlug: body.pageSlug,
      question: body.question,
      answer: body.answer,
      order: body.order,
    },
  });
  return NextResponse.json(faq);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.fAQ.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
