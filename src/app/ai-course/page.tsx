import AICourseContent from "./AICourseContent";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI 影像力變現課程 | LUOWEI MEDIA",
  description: "商業級影視 AI 技術公開 × 變現拆解。用 AI 打造個人影響力，把影響力轉換成收入。",
};

export const dynamic = "force-dynamic";

export default async function AICoursePage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Event",
        name: "商業級影視 AI｜技術公開 × 變現拆解",
        organizer: { "@type": "Organization", name: "羅威傳媒 LUOWEI MEDIA", url: "https://luowei-media.com" },
        description: "用 AI × 短影音 × 自媒體打造個人影響力，把影響力轉換成收入。",
        url: "https://luowei-media.com/ai-course",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: "台中市西區法院前街 17 號 4 樓",
          address: { "@type": "PostalAddress", addressLocality: "台中市", addressRegion: "台灣" },
        },
        offers: {
          "@type": "Offer",
          price: "1000",
          priceCurrency: "TWD",
          availability: "https://schema.org/InStock",
        },
      }} />
      <AICourseContent />
    </>
  );
}
