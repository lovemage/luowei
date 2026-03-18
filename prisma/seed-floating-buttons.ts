import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const buttons = [
  { key: "btn-1", label: "LINE 課程", href: "https://lin.ee/L8iPk8a", iconUrl: "" },
  { key: "btn-2", label: "LINE 企業", href: "https://lin.ee/htTdJSH", iconUrl: "" },
  { key: "btn-3", label: "TikTok", href: "https://www.tiktok.com/@luoweimedia", iconUrl: "" },
  { key: "btn-4", label: "Instagram", href: "https://www.instagram.com/lowemedia_", iconUrl: "" },
];

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  await prisma.page.upsert({
    where: { slug: "floating-buttons" },
    update: {
      title: "懸浮按鈕設定",
      sections: JSON.stringify(buttons),
    },
    create: {
      slug: "floating-buttons",
      title: "懸浮按鈕設定",
      sections: JSON.stringify(buttons),
    },
  });

  console.log("Floating buttons seeded successfully");
  await prisma.$disconnect();
}

main().catch(console.error);
