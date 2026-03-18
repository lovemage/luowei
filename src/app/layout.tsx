import type { Metadata, Viewport } from "next";
import { Noto_Serif_TC, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import FloatingButtons from "@/components/FloatingButtons";
import AnnouncementBar from "@/components/AnnouncementBar";

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
      <body>
        <div className="relative z-10 mx-auto max-w-[430px] min-h-dvh">
          <AnnouncementBar />
          {children}
        </div>
        <FloatingButtons />
      </body>
    </html>
  );
}
