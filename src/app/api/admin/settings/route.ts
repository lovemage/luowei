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
    // Verify old password first
    const current = await prisma.siteSettings.findUnique({
      where: { id: "singleton" },
    });
    if (current?.adminPasswordHash) {
      const valid = await bcrypt.compare(body.oldPassword || "", current.adminPasswordHash);
      if (!valid) {
        return NextResponse.json({ error: "目前密碼不正確" }, { status: 400 });
      }
    } else {
      // No DB password yet, verify against env var
      if (body.oldPassword !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json({ error: "目前密碼不正確" }, { status: 400 });
      }
    }
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
