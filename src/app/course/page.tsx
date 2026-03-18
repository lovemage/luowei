import { prisma } from "@/lib/prisma";
import CourseContent from "./CourseContent";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "短影音影響力變現課程 | LUOWEI MEDIA",
  description: "用短影音翻轉人生，從零基礎到商業變現。初階實戰班、進階陪跑班。",
};

export const dynamic = "force-dynamic";

export default async function CoursePage() {
  const faqs = await prisma.fAQ.findMany({
    where: { pageSlug: "course" },
    orderBy: { order: "asc" },
  });
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Course",
        name: "短影音影響力變現課程",
        provider: { "@type": "Organization", name: "羅威傳媒 LUOWEI MEDIA", url: "https://luowei-media.com" },
        description: "用短影音翻轉人生，從零基礎到商業變現。系統化實戰教學，團隊督促保證產出。",
        url: "https://luowei-media.com/course",
        hasCourseInstance: [
          { "@type": "CourseInstance", name: "初階實戰班", courseMode: "onsite" },
          { "@type": "CourseInstance", name: "進階陪跑班", courseMode: "blended" },
        ],
      }} />
      <CourseContent faqs={faqs} />
    </>
  );
}
