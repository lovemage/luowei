import { prisma } from "@/lib/prisma";
import ShortVideoContent from "./ShortVideoContent";
import JsonLd from "@/components/JsonLd";

export const metadata = {
  title: "短影音代操與短影音孵化 | LUOWEI MEDIA",
  description:
    "專為女性企業主打造。付月費交給我們做的短影音代操，或各出 50% 預算一起投資 IP 的短影音孵化。",
};

export const dynamic = "force-dynamic";

// 舊的「短影音變現課」主視覺已依業主指示換掉，改用女性企業主拍攝現場。
// 後台若有設定 heroImage 會優先採用；圖片載入失敗時 HeroSection 會自動退回純文字。
const DEFAULT_HERO = ["/images/short-video-hero.jpg"];

export default async function ShortVideoPage() {
  const [page, videoFaqs, incubationFaqs] = await Promise.all([
    prisma.page.findUnique({
      where: { slug: "short-video" },
      select: { heroImage: true },
    }),
    prisma.fAQ.findMany({
      where: { pageSlug: "short-video" },
      orderBy: { order: "asc" },
    }),
    prisma.fAQ.findMany({
      where: { pageSlug: "short-video-incubation" },
      orderBy: { order: "asc" },
    }),
  ]);

  return (
    <>
    <JsonLd data={{
      "@context": "https://schema.org",
      "@type": "Service",
      name: "短影音代操與短影音孵化",
      provider: { "@type": "Organization", name: "羅威傳媒 LUOWEI MEDIA", url: "https://luowei-media.com" },
      description: "專為女性企業主打造的短影音代操，以及各出 50% 預算共同投資 IP 的短影音孵化。",
      url: "https://luowei-media.com/short-video",
      serviceType: ["短影音代操", "短影音孵化"],
    }} />
    <ShortVideoContent
      videoFaqs={videoFaqs}
      incubationFaqs={incubationFaqs}
      heroImageUrl={page?.heroImage?.split("|")[0] || DEFAULT_HERO[0]}
      heroImageUrls={page?.heroImage ? page.heroImage.split("|").filter(Boolean) : DEFAULT_HERO}
    />
    </>
  );
}
