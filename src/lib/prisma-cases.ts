import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Creates a fresh PrismaClient for Case model operations.
 * Needed because the global cached prisma instance may not have the Case model
 * if it was created before the Case model was added to the schema.
 * Remember to call db.$disconnect() after use.
 */
export function createCasesClient() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  return new PrismaClient({ adapter });
}
