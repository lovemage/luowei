import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    await cloudinary.uploader.destroy(media.publicId);
  } catch {
    // Cloudinary deletion may fail if already removed
  }

  await prisma.media.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
