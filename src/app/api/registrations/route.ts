import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { registrationSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = registrationSchema.parse(body);

    const registration = await prisma.registration.create({ data });

    return NextResponse.json({ id: registration.id }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ error: "驗證失敗" }, { status: 400 });
    }
    return NextResponse.json({ error: "伺服器錯誤" }, { status: 500 });
  }
}
