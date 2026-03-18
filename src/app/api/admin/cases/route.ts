import { NextResponse } from "next/server";
import { createCasesClient } from "@/lib/prisma-cases";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = createCasesClient();
  const cases = await db.case.findMany({ orderBy: { order: "asc" } });
  await db.$disconnect();
  return NextResponse.json(cases);
}

export async function POST(request: Request) {
  const body = await request.json();
  const db = createCasesClient();
  const newCase = await db.case.create({
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
  await db.$disconnect();
  return NextResponse.json(newCase, { status: 201 });
}
