import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await prisma.page.findUnique({ where: { slug } });
  if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(page);
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = await request.json();
  const page = await prisma.page.update({
    where: { slug },
    data: {
      title: body.title,
      heroImage: body.heroImage,
      sections: body.sections,
      metaTitle: body.metaTitle,
      metaDesc: body.metaDesc,
    },
  });
  return NextResponse.json(page);
}
