import { NextResponse } from "next/server";
import { createCasesClient } from "@/lib/prisma-cases";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const db = createCasesClient();
  const cases = await db.case.findMany({
    where: {
      visible: true,
      ...(category ? { category } : {}),
    },
    orderBy: { order: "asc" },
  });
  await db.$disconnect();
  return NextResponse.json(cases);
}
