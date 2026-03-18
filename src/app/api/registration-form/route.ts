import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const DEFAULT_CONFIG = {
  fields: [],
  title: "立即報名",
  submitText: "送出報名",
  successTitle: "感謝您的報名",
  successDesc: "我們會盡快與您聯繫",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageSlug = searchParams.get("page") || "default";

  const page = await prisma.page.findUnique({ where: { slug: "registration-form" } });
  if (!page) return NextResponse.json(DEFAULT_CONFIG);
  try {
    const allConfigs = typeof page.sections === "string" ? JSON.parse(page.sections) : page.sections;
    // Support old single-config format (has "fields" key directly)
    if (allConfigs && allConfigs.fields) {
      return NextResponse.json(allConfigs);
    }
    // New multi-page format
    const config = allConfigs?.[pageSlug] || allConfigs?.["default"] || DEFAULT_CONFIG;
    return NextResponse.json(config);
  } catch {
    return NextResponse.json(DEFAULT_CONFIG);
  }
}
