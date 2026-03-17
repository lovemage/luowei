import { prisma } from "@/lib/prisma";
import ShortVideoContent from "./ShortVideoContent";

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

  return <ShortVideoContent videoFaqs={videoFaqs} adFaqs={adFaqs} />;
}
