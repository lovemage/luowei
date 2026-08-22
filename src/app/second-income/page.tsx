import SecondIncomeContent from "./SecondIncomeContent";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "下班後第二收入計劃 | LUOWEI MEDIA",
  description:
    "普通人翻身合作申請。在2027年前，幫助100個人年收入突破100萬台幣。產業、流量、收入結構。",
};

// 這頁會在 render 時查 FAQ；Railway 建置階段連不到 postgres.railway.internal，
// 不標 force-dynamic 會在 prerender 時整個 build 失敗。
export const dynamic = "force-dynamic";

export default async function SecondIncomePage() {
  const faqs = await prisma.fAQ.findMany({
    where: { pageSlug: "second-income" },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "下班後第二收入計劃 — 普通人翻身合作申請",
          description:
            "在2027年前，幫助100個人年收入突破100萬台幣。產業、流量、收入結構。",
          url: "https://luowei-media.com/second-income",
          publisher: {
            "@type": "Organization",
            name: "羅威傳媒 LUOWEI MEDIA",
            url: "https://luowei-media.com",
          },
        }}
      />
      <SecondIncomeContent faqs={faqs} />
    </>
  );
}
