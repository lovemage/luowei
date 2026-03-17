import { prisma } from "@/lib/prisma";
import CourseContent from "./CourseContent";

export default async function CoursePage() {
  const faqs = await prisma.fAQ.findMany({
    where: { pageSlug: "course" },
    orderBy: { order: "asc" },
  });
  return <CourseContent faqs={faqs} />;
}
