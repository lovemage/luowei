import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import FupoContent from "./FupoContent";
import { SCENE } from "./data";

/** 分享卡就用封面那張圖本身，綁在 SCENE.hero 上，換封面時不必記得回來改這裡。 */
const OG_IMAGE = `https://luowei-media.com${SCENE.hero}`;

export const metadata: Metadata = {
  title: "BNI - 富婆分會｜以女性商業為主的團隊",
  // 頂層 description 一旦有值，Next 就會拿它自動填 og:description，
  // 空字串也算沒填、照樣回填。要讓分享卡只剩標題，只能設 null，
  // 再用 other 把搜尋引擎要的 meta description 直接輸出回來。
  description: null,
  other: {
    description:
      "以女性商業為主的團隊。沿用 BNI 的商業引薦系統，一個行業一位代表，串聯 15 條服務女性客群的產業鏈。富婆自己當，江山自己扛。",
  },
  // root layout 的 metadata.icons 會蓋掉檔案式的 icon 慣例，這裡明確覆寫
  icons: {
    icon: "/images/fupo/icon.png",
    apple: "/images/fupo/icon.png",
  },
  // 分享卡只留標題與圖
  openGraph: {
    title: "BNI - 富婆分會",
    url: "https://luowei-media.com/fupo",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1920,
        height: 1080,
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
          image: OG_IMAGE,
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
