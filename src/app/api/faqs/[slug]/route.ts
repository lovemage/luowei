import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const faqs = await prisma.fAQ.findMany({
    where: { pageSlug: slug },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(faqs);
}
