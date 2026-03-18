import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const announcements = [
  { id: "1", text: "\uD83C\uDF89 AI\u5F71\u50CF\u529B\u8B8A\u73FE\u8AB2\u7A0B \u53F0\u4E2D\u5834 5\u6708\u5834\u6B21\u958B\u653E\u5831\u540D\u4E2D\uFF01\u540D\u984D\u6709\u9650\uFF0C\u7ACB\u5373\u9810\u7D04 \u2192", visible: true },
];

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  await prisma.page.upsert({
    where: { slug: "announcements" },
    update: {
      title: "\u516C\u544A\u7BA1\u7406",
      sections: JSON.stringify(announcements),
    },
    create: {
      slug: "announcements",
      title: "\u516C\u544A\u7BA1\u7406",
      sections: JSON.stringify(announcements),
    },
  });

  console.log("Announcements seeded successfully");
  await prisma.$disconnect();
}

main().catch(console.error);
