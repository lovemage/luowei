import SecondIncomeContent from "./SecondIncomeContent";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "下班後第二收入計劃 | LUOWEI MEDIA",
  description:
    "普通人翻身合作申請。在2027年前，幫助100個人年收入突破100萬台幣。產業、流量、收入結構。",
};

export default function SecondIncomePage() {
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
      <SecondIncomeContent />
    </>
  );
}
