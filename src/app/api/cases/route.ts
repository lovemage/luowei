import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const cases = await prisma.case.findMany({
    where: {
      visible: true,
      ...(category ? { category } : {}),
    },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(cases);
}
