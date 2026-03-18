import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const page = await prisma.page.findUnique({ where: { slug: "announcements" } });
  if (!page) return NextResponse.json([]);
  try {
    const announcements = typeof page.sections === "string" ? JSON.parse(page.sections) : page.sections;
    if (!Array.isArray(announcements)) return NextResponse.json([]);
    const visible = announcements.filter((a: { visible?: boolean }) => a.visible !== false);
    return NextResponse.json(visible);
  } catch {
    return NextResponse.json([]);
  }
}
