import { prisma } from "@/lib/prisma";
import ShortVideoContent from "./ShortVideoContent";

export const dynamic = "force-dynamic";

export default async function ShortVideoPage() {
  const [videoFaqs, adFaqs] = await Promise.all([
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
      heroImageUrl="/images/image_1.jpg"
      heroImageUrls={["/images/image_1.jpg", "/images/image_2.jpg"]}
    />
  );
}
