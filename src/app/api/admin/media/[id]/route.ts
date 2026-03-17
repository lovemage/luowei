import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { deleteObjectFromBucket } from "@/lib/bucket";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const media = await prisma.media.findUnique({ where: { id } });
  if (!media) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    await deleteObjectFromBucket(media.publicId);
  } catch {
    // Ignore bucket deletion failure and still remove DB record.
  }

  await prisma.media.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
