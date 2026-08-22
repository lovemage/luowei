import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import JsonLd from "@/components/JsonLd";
import AdContent from "./AdContent";

export const metadata: Metadata = {
  title: "廣告投放 | LUOWEI MEDIA",
  description:
    "TikTok 官方認證二級代理商。每月 3 萬 / 6 萬 / 8 萬與客製化方案，精準受眾、每日優化、透明報表。",
};

export const dynamic = "force-dynamic";

export default async function ShortVideoAdPage() {
  const faqs = await prisma.fAQ.findMany({
    where: { pageSlug: "short-video-ad" },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "廣告投放代操",
          provider: {
            "@type": "Organization",
            name: "羅威傳媒 LUOWEI MEDIA",
            url: "https://luowei-media.com",
          },
          description:
            "TikTok 官方認證二級代理商，提供每月 3 萬 / 6 萬 / 8 萬與客製化廣告投放方案。",
          url: "https://luowei-media.com/short-video-ad",
          serviceType: ["廣告投放代操", "TikTok 廣告"],
        }}
      />
      <AdContent faqs={faqs} />
    </>
  );
}
