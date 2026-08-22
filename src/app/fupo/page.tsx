import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import FupoContent from "./FupoContent";

export const metadata: Metadata = {
  title: "BNI - 富婆分會｜專屬於女企業家的高價值商業生態圈",
  description:
    "打破傳統商會盲點，串聯服務高價值女性客群的 15 條黃金產業鏈。一個行業一位代表，固定引薦機制，12 個月 100 席滿員。富婆自己當，江山自己扛。",
  openGraph: {
    title: "BNI - 富婆分會｜專屬於女企業家的高價值商業生態圈",
    description:
      "15 條女性產業鏈、一個行業一位代表、12 個月 100 席滿員。正在尋找第一批創會領頭羊。",
    url: "https://luowei-media.com/fupo",
    type: "website",
  },
};

export default function FupoPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "BNI - 富婆分會",
          description:
            "專屬於女企業家的高價值商業生態圈。串聯服務高價值女性客群的 15 條黃金產業鏈，打造互助、高效、共榮的商業生態。",
          url: "https://luowei-media.com/fupo",
          publisher: {
            "@type": "Organization",
            name: "羅威傳媒 LUOWEI MEDIA",
            url: "https://luowei-media.com",
          },
        }}
      />
      <FupoContent />
    </>
  );
}
