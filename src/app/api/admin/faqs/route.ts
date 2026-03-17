import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageSlug = searchParams.get("pageSlug");

  const faqs = await prisma.fAQ.findMany({
    where: pageSlug ? { pageSlug } : undefined,
    orderBy: [{ pageSlug: "asc" }, { order: "asc" }],
  });
  return NextResponse.json(faqs);
}

export async function POST(request: Request) {
  const body = await request.json();
  const faq = await prisma.fAQ.create({
    data: {
      pageSlug: body.pageSlug,
      question: body.question,
      answer: body.answer,
      order: body.order || 0,
    },
  });
  return NextResponse.json(faq, { status: 201 });
}
