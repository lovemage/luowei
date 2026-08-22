import CourseContent from "./CourseContent";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "2026 企業品牌影響力｜客製化包班實戰課 | LUOWEI MEDIA",
  description: "讓 AI 成為你的員工，讓短影音成為你的業務。企業客製化包班課程，單場 $36,000（含稅），上限 30 人，現場保證實作產出。",
  // 依業主指示暫時隱藏：不出現在首頁導覽、不進 sitemap、不給搜尋引擎索引。
  robots: { index: false, follow: false },
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
        name: "2026 企業品牌影響力｜客製化包班實戰課",
        provider: { "@type": "Organization", name: "羅威傳媒 LUOWEI MEDIA", url: "https://luowei-media.com" },
        description: "讓 AI 成為你的員工，讓短影音成為你的業務。拒絕空談理論，現場保證學會，直接產出成果。",
        url: "https://luowei-media.com/course",
        offers: {
          "@type": "Offer",
          price: "36000",
          priceCurrency: "TWD",
          description: "單場包班（含稅），上限 30 人",
        },
        hasCourseInstance: [
          { "@type": "CourseInstance", name: "AI 影像力應用軟體課程", courseMode: "onsite" },
          { "@type": "CourseInstance", name: "短影音影響力變現課程", courseMode: "onsite" },
        ],
      }} />
      <CourseContent faqs={faqs} />
    </>
  );
}
