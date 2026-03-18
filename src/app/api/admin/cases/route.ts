import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const cases = await prisma.case.findMany({
    orderBy: { order: "asc" },
  });
  return NextResponse.json(cases);
}

export async function POST(request: Request) {
  const body = await request.json();
  const newCase = await prisma.case.create({
    data: {
      slug: body.slug,
      name: body.name,
      avatarUrl: body.avatarUrl,
      category: body.category,
      title: body.title,
      bio: body.bio,
      stats: body.stats || {},
      order: body.order || 0,
      visible: body.visible ?? true,
    },
  });
  return NextResponse.json(newCase, { status: 201 });
}
