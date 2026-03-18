import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const page = await prisma.page.findUnique({ where: { slug: "floating-buttons" } });
  if (!page) return NextResponse.json([]);
  try {
    const buttons = typeof page.sections === "string" ? JSON.parse(page.sections) : page.sections;
    return NextResponse.json(buttons);
  } catch {
    return NextResponse.json([]);
  }
}

export async function PUT(request: Request) {
  const body = await request.json();
  const page = await prisma.page.upsert({
    where: { slug: "floating-buttons" },
    update: { sections: JSON.stringify(body) },
    create: { slug: "floating-buttons", title: "懸浮按鈕設定", sections: JSON.stringify(body) },
  });
  return NextResponse.json(page);
}
