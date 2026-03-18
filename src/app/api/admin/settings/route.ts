import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "singleton" },
  });
  return NextResponse.json({
    adminEmail: settings?.adminEmail || "",
    footerText: settings?.footerText || "",
    hasPassword: !!settings?.adminPasswordHash,
  });
}

export async function PUT(request: Request) {
  const body = await request.json();
  const data: Record<string, string> = {};

  if (body.adminEmail !== undefined) data.adminEmail = body.adminEmail;
  if (body.footerText !== undefined) data.footerText = body.footerText;

  if (body.newPassword) {
    data.adminPasswordHash = await bcrypt.hash(body.newPassword, 10);
  }

  const settings = await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: data,
    create: { id: "singleton", ...data },
  });

  return NextResponse.json({
    adminEmail: settings.adminEmail || "",
    footerText: settings.footerText || "",
    hasPassword: !!settings.adminPasswordHash,
  });
}
