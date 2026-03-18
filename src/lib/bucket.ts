import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

type BucketConfig = {
  bucket: string;
  endpoint: string;
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  publicBaseUrl?: string;
};

function requireEnv(name: string, value?: string): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function getBucketConfig(): BucketConfig {
  const accessKeyId = requireEnv("ACCESS_KEY_ID", process.env.ACCESS_KEY_ID);
  const secretAccessKey =
    process.env.SECRET_ACCESS_KEY ||
    process.env.ACCESS_KEY_SECRET ||
    process.env.AWS_SECRET_ACCESS_KEY;

  return {
    bucket: requireEnv("BUCKET", process.env.BUCKET),
    endpoint: requireEnv(
      "BUCKET_ENDPOINT or AWS_ENDPOINT_URL_S3",
      process.env.BUCKET_ENDPOINT || process.env.AWS_ENDPOINT_URL_S3
    ),
    region: process.env.AWS_REGION || "auto",
    accessKeyId,
    secretAccessKey: requireEnv(
      "SECRET_ACCESS_KEY (or ACCESS_KEY_SECRET / AWS_SECRET_ACCESS_KEY)",
      secretAccessKey
    ),
    publicBaseUrl: process.env.BUCKET_PUBLIC_URL,
  };
}

function encodeObjectKey(key: string): string {
  return key
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function sanitizeFilename(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function getClient(config: BucketConfig): S3Client {
  return new S3Client({
    region: config.region,
    endpoint: config.endpoint,
    forcePathStyle: true,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    },
  });
}

function getPublicUrl(_config: BucketConfig, key: string): string {
  const encodedKey = encodeObjectKey(key);
  return `/api/media/${encodedKey}`;
}

export function createObjectKey(folder: string, filename: string): string {
  const safeName = sanitizeFilename(filename) || "upload";
  const now = Date.now();
  return `${folder}/${now}-${safeName}`;
}

export async function uploadImageToBucket(input: {
  key: string;
  body: Buffer;
  contentType: string;
}): Promise<string> {
  const config = getBucketConfig();
  const client = getClient(config);

  await client.send(
    new PutObjectCommand({
      Bucket: config.bucket,
      Key: input.key,
      Body: input.body,
      ContentType: input.contentType,
      ACL: "public-read",
    })
  );

  return getPublicUrl(config, input.key);
}

export async function deleteObjectFromBucket(key: string): Promise<void> {
  const config = getBucketConfig();
  const client = getClient(config);

  await client.send(
    new DeleteObjectCommand({
      Bucket: config.bucket,
      Key: key,
    })
  );
}
