import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createObjectKey, uploadImageToBucket } from "@/lib/bucket";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "luowei";
    const alt = (formData.get("alt") as string) || "";

    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const objectKey = createObjectKey(folder, file.name || "upload");
    const url = await uploadImageToBucket({
      key: objectKey,
      body: buffer,
      contentType: file.type || "application/octet-stream",
    });

    const media = await prisma.media.create({
      data: {
        url,
        publicId: objectKey,
        alt,
        folder,
      },
    });

    return NextResponse.json(media, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "上傳失敗";
    console.error("Upload error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
