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
