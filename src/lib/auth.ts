import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const COOKIE_NAME = "admin_token";

export async function createToken() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function validateCredentials(user: string, password: string) {
  if (user !== process.env.ADMIN_USER) return false;

  const settings = await prisma.siteSettings.findUnique({
    where: { id: "singleton" },
  });

  if (settings?.adminPasswordHash) {
    return bcrypt.compare(password, settings.adminPasswordHash);
  }

  return password === process.env.ADMIN_PASSWORD;
}

export { COOKIE_NAME };
