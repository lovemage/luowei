import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const defaultConfig = {
  title: "立即報名",
  submitText: "送出報名",
  successTitle: "感謝您的報名",
  successDesc: "我們會盡快與您聯繫",
  fields: [
    { key: "name", label: "姓名", type: "text", placeholder: "姓名", required: true },
    { key: "phone", label: "電話", type: "tel", placeholder: "電話", required: true },
    { key: "lineId", label: "LINE ID", type: "text", placeholder: "LINE ID", required: false },
    { key: "email", label: "Email", type: "email", placeholder: "Email", required: false },
    {
      key: "courseName",
      label: "課程方案",
      type: "select",
      placeholder: "選擇感興趣的課程/方案",
      required: false,
      options: ["初階實戰班", "進階陪跑班"],
    },
    { key: "message", label: "留言", type: "textarea", placeholder: "留言", required: false },
  ],
};

async function main() {
  const page = await prisma.page.upsert({
    where: { slug: "registration-form" },
    update: { sections: JSON.stringify(defaultConfig) },
    create: {
      slug: "registration-form",
      title: "報名表單設定",
      sections: JSON.stringify(defaultConfig),
    },
  });
  console.log("Seeded registration-form config:", page.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
