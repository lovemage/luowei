import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const page = await prisma.page.findUnique({ where: { slug: "announcements" } });
  if (!page) return NextResponse.json({ enabled: false, effect: "right-to-left", items: [] });
  try {
    const raw = typeof page.sections === "string" ? JSON.parse(page.sections) : page.sections;
    // Support both old array format and new config format
    if (Array.isArray(raw)) {
      const visible = raw.filter((a: { visible?: boolean }) => a.visible !== false);
      return NextResponse.json({ enabled: true, effect: "right-to-left", items: visible });
    }
    const config = raw as { enabled?: boolean; effect?: string; items?: unknown[] };
    if (!config.enabled) return NextResponse.json({ enabled: false, effect: config.effect || "right-to-left", items: [] });
    const items = Array.isArray(config.items)
      ? config.items.filter((a: any) => a.visible !== false)
      : [];
    return NextResponse.json({ enabled: config.enabled, effect: config.effect || "right-to-left", items });
  } catch {
    return NextResponse.json({ enabled: false, effect: "right-to-left", items: [] });
  }
}
