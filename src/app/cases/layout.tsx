import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "案例展示 | LUOWEI MEDIA",
  description: "成功學員的真實故事。短影音案例、課程案例一覽。",
};

export default function CasesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "案例展示",
        description: "成功學員的真實故事。短影音案例、課程案例。",
        url: "https://luowei-media.com/cases",
        isPartOf: { "@type": "WebSite", name: "羅威傳媒 LUOWEI MEDIA", url: "https://luowei-media.com" },
      }} />
      {children}
    </>
  );
}
