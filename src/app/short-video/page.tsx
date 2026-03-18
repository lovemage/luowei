import { prisma } from "@/lib/prisma";
import ShortVideoContent from "./ShortVideoContent";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: "短影音與廣告服務 | LUOWEI MEDIA",
  description: "全方位短影音品牌代操 + 精準廣告投放，用影像說故事讓品牌被看見。",
};

export const dynamic = "force-dynamic";

export default async function ShortVideoPage() {
  const [page, videoFaqs, adFaqs] = await Promise.all([
    prisma.page.findUnique({
      where: { slug: "short-video" },
      select: { heroImage: true },
    }),
    prisma.fAQ.findMany({
      where: { pageSlug: "short-video" },
      orderBy: { order: "asc" },
    }),
    prisma.fAQ.findMany({
      where: { pageSlug: "short-video-ad" },
      orderBy: { order: "asc" },
    }),
  ]);

  return (
    <>
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "Service",
      name: "短影音與廣告服務",
      provider: { "@type": "Organization", name: "羅威傳媒 LUOWEI MEDIA", url: "https://luowei-media.com" },
      description: "全方位短影音品牌代操 + 精準廣告投放，用影像說故事讓品牌被看見。",
      url: "https://luowei-media.com/short-video",
      serviceType: ["短影音代操", "廣告投放代操"],
    }} />
    <ShortVideoContent
      videoFaqs={videoFaqs}
      adFaqs={adFaqs}
      heroImageUrl={page?.heroImage?.split("|")[0] || "/images/image_1 (3).jpg"}
      heroImageUrls={page?.heroImage ? page.heroImage.split("|").filter(Boolean) : ["/images/image_1 (3).jpg", "/images/image_2.jpg"]}
    />
    </>
  );
}
