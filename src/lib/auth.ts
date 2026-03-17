import { SignJWT, jwtVerify } from "jose";

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

export function validateCredentials(user: string, password: string) {
  return user === process.env.ADMIN_USER && password === process.env.ADMIN_PASSWORD;
}

export { COOKIE_NAME };
