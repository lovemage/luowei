import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

function getClient() {
  return new S3Client({
    region: process.env.AWS_REGION || "auto",
    endpoint:
      process.env.BUCKET_ENDPOINT || process.env.AWS_ENDPOINT_URL_S3 || "",
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID || "",
      secretAccessKey:
        process.env.SECRET_ACCESS_KEY ||
        process.env.ACCESS_KEY_SECRET ||
        process.env.AWS_SECRET_ACCESS_KEY ||
        "",
    },
  });
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const key = path.join("/");
  const bucket = process.env.BUCKET || "";

  try {
    const client = getClient();
    const res = await client.send(
      new GetObjectCommand({ Bucket: bucket, Key: key })
    );

    const body = res.Body;
    if (!body) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const bytes = await body.transformToByteArray();

    return new NextResponse(Buffer.from(bytes), {
      status: 200,
      headers: {
        "Content-Type": res.ContentType || "application/octet-stream",
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Length": String(bytes.length),
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    if (message.includes("NoSuchKey") || message.includes("not found")) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    console.error("Media proxy error:", message);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
