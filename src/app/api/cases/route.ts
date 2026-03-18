import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

export const dynamic = "force-dynamic";

function getCasesClient() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  return new PrismaClient({ adapter });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  const db = getCasesClient();
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
