import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const folder = (formData.get("folder") as string) || "luowei";
    const alt = (formData.get("alt") as string) || "";

    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise<Record<string, unknown>>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder, resource_type: "image" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result as Record<string, unknown>);
          }
        )
        .end(buffer);
    });

    const media = await prisma.media.create({
      data: {
        url: result.secure_url as string,
        publicId: result.public_id as string,
        alt,
        folder,
      },
    });

    return NextResponse.json(media, { status: 201 });
  } catch {
    return NextResponse.json({ error: "上傳失敗" }, { status: 500 });
  }
}
