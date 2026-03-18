import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const cases = [
  {
    slug: "course-2024-03",
    name: "2024.03 台南場",
    avatarUrl: "/pics/S__4505725_0.webp",
    category: "course",
    title: "影響力變現課程",
    bio: "2024 年 3 月，羅威傳媒在台南舉辦了影響力變現課程。這場小班制課程聚集了來自不同領域的學員，大家在輕鬆的氛圍中學習社群灌粉、短影音製作等核心技能。課程結束後每位學員都帶著滿滿的收穫與實戰經驗回到各自的事業中。",
    stats: { date: "2024.03", location: "台南", students: "10人" },
    order: 1,
  },
  {
    slug: "course-2024-06",
    name: "2024.06 台南場",
    avatarUrl: "/pics/S__4505724_0.webp",
    category: "course",
    title: "影響力變現課程",
    bio: "2024 年 6 月，羅威傳媒再次於台南開課，這次迎來了更多對短影音創作有熱情的學員。課程內容涵蓋從零開始的帳號規劃、拍攝技巧到後期剪輯，每位學員都在課堂上實際操作，學以致用。現場氣氛熱絡，大家互相交流、彼此激勵。",
    stats: { date: "2024.06", location: "台南", students: "20人" },
    order: 2,
  },
  {
    slug: "course-2024-08",
    name: "2024.08 台南場",
    avatarUrl: "/pics/S__4505723_0.webp",
    category: "course",
    title: "影響力變現課程",
    bio: "2024 年 8 月盛夏，羅威傳媒在台南教室舉辦了一場精彩的影響力變現課程。學員們不畏高溫，熱情參與每一個環節。從社群灌粉策略到內容變現模式，每位學員都收穫了實用的知識與技能。課後合照中每個人的笑容，就是最好的課程見證。",
    stats: { date: "2024.08", location: "台南", students: "25人" },
    order: 3,
  },
  {
    slug: "course-2024-10",
    name: "2024.10 台南場",
    avatarUrl: "/pics/S__4505722_0.webp",
    category: "course",
    title: "影響力變現課程",
    bio: "2024 年 10 月，羅威傳媒的影響力變現課程持續在台南開課。這場課程特別加入了小羅百態的案例分享，讓學員們看到成功經營短影音帳號的實際成果。每位學員都帶著自己的故事來到課堂，在學習的過程中找到了屬於自己的創作方向。",
    stats: { date: "2024.10", location: "台南", students: "25人" },
    order: 4,
  },
  {
    slug: "course-2024-12",
    name: "2024.12 馬來西亞場",
    avatarUrl: "/pics/S__4505716_0.webp",
    category: "course",
    title: "海外影響力變現課程",
    bio: "2024 年 12 月，羅威傳媒首次將課程帶到海外，在馬來西亞舉辦了一場特別的影響力變現課程。現場聚集了對短影音充滿熱情的馬來西亞學員，大家一起學習如何運用社群平台打造個人品牌。跨國教學的經驗不僅拓展了學員的視野，也證明了影響力變現的方法可以跨越國界。",
    stats: { date: "2024.12", location: "馬來西亞", students: "20人" },
    order: 5,
  },
  {
    slug: "course-2025-01",
    name: "2025.01 雲林場",
    avatarUrl: "/pics/S__4505719_0.webp",
    category: "course",
    title: "大自媒體時代課程",
    bio: "2025 年 1 月，羅威傳媒在雲林舉辦了「因雲而聚・大自媒體時代」課程。這場課程特別針對在地中小企業主和創業者設計，教大家如何利用短影音和自媒體工具為自己的事業加分。現場氣氛溫馨熱絡，許多學員都是第一次接觸短影音製作，但在課程結束時都已經能獨立完成一支作品。",
    stats: { date: "2025.01", location: "雲林", students: "30人" },
    order: 6,
  },
  {
    slug: "course-2025-03",
    name: "2025.03 台南場",
    avatarUrl: "/pics/S__4505718_0.webp",
    category: "course",
    title: "卓越系統八把金鑰匙",
    bio: "2025 年 3 月，羅威傳媒推出了全新的「卓越系統・八把金鑰匙深度剖析」課程。這門進階課程深入探討影響力變現的核心策略，從帳號定位、內容規劃到流量變現，八個關鍵步驟環環相扣。學員們在精心設計的教學空間中，透過實作演練掌握每一把「金鑰匙」。",
    stats: { date: "2025.03", location: "台南", students: "15人" },
    order: 7,
  },
  {
    slug: "course-2025-06",
    name: "2025.06 台北場",
    avatarUrl: "/pics/S__4505721_0.webp",
    category: "course",
    title: "影響力變現課程",
    bio: "2025 年 6 月，羅威傳媒北上台北開課，將影響力變現的課程帶到更多學員面前。這場課程吸引了來自各行各業的參加者，從上班族到自營業者，每個人都帶著對短影音創作的好奇與期待。課程中不僅有理論教學，更有大量的實戰練習，讓每位學員在離開教室時都信心滿滿。",
    stats: { date: "2025.06", location: "台北", students: "30人" },
    order: 8,
  },
  {
    slug: "course-2025-09",
    name: "2025.09 台南場",
    avatarUrl: "/pics/S__4505717_0.webp",
    category: "course",
    title: "影響力變現課程",
    bio: "2025 年 9 月，羅威傳媒在台南教室再度開課。這場課程的規模更大，聚集了超過二十位來自不同背景的學員。課堂上方的跑馬燈展示著歷屆優秀學員的品牌名稱，激勵著新學員們向前輩看齊。每位學員都在課程中找到了適合自己的內容方向，也建立了寶貴的人脈網絡。",
    stats: { date: "2025.09", location: "台南", students: "25人" },
    order: 9,
  },
  {
    slug: "course-2026-01",
    name: "2026.01 台北場",
    avatarUrl: "/pics/S__4505720_0.webp",
    category: "course",
    title: "影響力變現課程",
    bio: "2026 年 1 月，羅威傳媒在台北舉辦了新年度的首場影響力變現課程。這場課程規模盛大，超過三十位學員齊聚一堂，展現了短影音創作持續升溫的熱度。課程結束後的大合照中，每位學員臉上的笑容和自信的手勢，正是羅威傳媒最引以為傲的成果。",
    stats: { date: "2026.01", location: "台北", students: "35人" },
    order: 10,
  },
];

async function main() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  const prisma = new PrismaClient({ adapter });

  for (const c of cases) {
    await prisma.case.upsert({
      where: { slug: c.slug },
      update: {
        name: c.name,
        avatarUrl: c.avatarUrl,
        category: c.category,
        title: c.title,
        bio: c.bio,
        stats: c.stats,
        order: c.order,
      },
      create: {
        slug: c.slug,
        name: c.name,
        avatarUrl: c.avatarUrl,
        category: c.category,
        title: c.title,
        bio: c.bio,
        stats: c.stats,
        order: c.order,
        visible: true,
      },
    });
    console.log(`Case seeded: ${c.slug}`);
  }

  await prisma.$disconnect();
}

main().catch(console.error);
