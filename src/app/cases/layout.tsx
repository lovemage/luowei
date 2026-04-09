import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "客戶見證 | LUOWEI MEDIA",
  description: "企業合作的實戰成果。廣告代操見證、授課培訓見證。",
};

export default function CasesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "客戶見證",
        description: "企業合作的實戰成果。廣告代操見證、授課培訓見證。",
        url: "https://luowei-media.com/cases",
        isPartOf: { "@type": "WebSite", name: "羅威傳媒 LUOWEI MEDIA", url: "https://luowei-media.com" },
      }} />
      {children}
    </>
  );
}
