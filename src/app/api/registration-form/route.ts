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

export async function GET() {
  const page = await prisma.page.findUnique({ where: { slug: "registration-form" } });
  if (!page) return NextResponse.json(DEFAULT_CONFIG);
  try {
    const config = typeof page.sections === "string" ? JSON.parse(page.sections) : page.sections;
    return NextResponse.json(config);
  } catch {
    return NextResponse.json(DEFAULT_CONFIG);
  }
}
