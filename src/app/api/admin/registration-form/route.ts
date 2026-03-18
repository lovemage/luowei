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

export async function PUT(request: Request) {
  const body = await request.json();
  const page = await prisma.page.upsert({
    where: { slug: "registration-form" },
    update: { sections: JSON.stringify(body) },
    create: { slug: "registration-form", title: "報名表單設定", sections: JSON.stringify(body) },
  });
  return NextResponse.json(page);
}
