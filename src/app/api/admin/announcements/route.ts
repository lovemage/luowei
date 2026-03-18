import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const page = await prisma.page.findUnique({ where: { slug: "announcements" } });
  if (!page) return NextResponse.json({ enabled: true, effect: "right-to-left", items: [] });
  try {
    const raw = typeof page.sections === "string" ? JSON.parse(page.sections) : page.sections;
    // Support old array format -> convert to new config
    if (Array.isArray(raw)) {
      return NextResponse.json({ enabled: true, effect: "right-to-left", items: raw });
    }
    return NextResponse.json(raw);
  } catch {
    return NextResponse.json({ enabled: true, effect: "right-to-left", items: [] });
  }
}

export async function PUT(request: Request) {
  const body = await request.json();
  const page = await prisma.page.upsert({
    where: { slug: "announcements" },
    update: { sections: JSON.stringify(body) },
    create: { slug: "announcements", title: "公告管理", sections: JSON.stringify(body) },
  });
  return NextResponse.json(page);
}
