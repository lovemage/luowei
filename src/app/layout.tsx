import type { Metadata, Viewport } from "next";
import { Noto_Serif_TC, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import FloatingButtons from "@/components/FloatingButtons";
import AnnouncementBar from "@/components/AnnouncementBar";
import JsonLd from "@/components/JsonLd";

const notoSerifTC = Noto_Serif_TC({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-noto-serif-tc",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LUOWEI MEDIA",
  description: "無限進步 | 個人成長",
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant" className={`${notoSerifTC.variable} ${cormorantGaramond.variable}`}>
      <head>
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "羅威傳媒 LUOWEI MEDIA",
          url: "https://luowei-media.com",
          logo: "https://luowei-media.com/images/logo.png",
          description: "短影音代操、影響力變現課程、AI影像力變現課程",
          sameAs: [
            "https://www.tiktok.com/@luoweimedia",
            "https://www.instagram.com/lowemedia_",
          ],
        }} />
      </head>
      <body>
        <div className="site-shell relative z-10 min-h-dvh">
          <AnnouncementBar />
          {children}
        </div>
        <FloatingButtons />
      </body>
    </html>
  );
}
