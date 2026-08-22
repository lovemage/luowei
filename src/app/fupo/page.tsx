import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import FupoContent from "./FupoContent";

export const metadata: Metadata = {
  title: "BNI - 富婆分會｜以女性商業為主的團隊",
  description:
    "以女性商業為主的團隊。沿用 BNI 的商業引薦系統，一個行業一位代表，串聯 15 條服務女性客群的產業鏈。富婆自己當，江山自己扛。",
  // root layout 的 metadata.icons 會蓋掉檔案式的 icon 慣例，這裡明確覆寫
  icons: {
    icon: "/images/fupo/icon.png",
    apple: "/images/fupo/icon.png",
  },
  openGraph: {
    title: "BNI - 富婆分會",
    description:
      "妳不是誰的媽媽、誰的女兒、誰的老婆。妳可以選擇自己要當女生、女孩，還是女人。",
    url: "https://luowei-media.com/fupo",
    type: "website",
    // 換檔名而非覆蓋 og.jpg：社群爬蟲依 URL 快取 OG 圖，沿用舊名會繼續顯示舊版
    images: [
      {
        url: "https://luowei-media.com/images/fupo/og-hero.jpg",
        width: 1200,
        height: 630,
        alt: "BNI - 富婆分會",
      },
    ],
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
            "以女性商業為主的團隊。沿用 BNI 的商業引薦系統，一個行業一位代表，串聯 15 條服務女性客群的產業鏈。",
          url: "https://luowei-media.com/fupo",
          image: "https://luowei-media.com/images/fupo/og-hero.jpg",
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
