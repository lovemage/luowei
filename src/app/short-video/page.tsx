import { prisma } from "@/lib/prisma";
import ShortVideoContent from "./ShortVideoContent";

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
    <ShortVideoContent
      videoFaqs={videoFaqs}
      adFaqs={adFaqs}
      heroImageUrl={page?.heroImage?.split("|")[0] || "/images/image_1 (3).jpg"}
      heroImageUrls={page?.heroImage ? page.heroImage.split("|").filter(Boolean) : ["/images/image_1 (3).jpg", "/images/image_2.jpg"]}
    />
  );
}
