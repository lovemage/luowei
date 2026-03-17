import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const pages = await prisma.page.findMany({
    orderBy: { updatedAt: "desc" },
    select: { id: true, slug: true, title: true, heroImage: true, updatedAt: true },
  });
  return NextResponse.json(pages);
}
