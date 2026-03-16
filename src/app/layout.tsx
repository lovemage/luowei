import type { Metadata, Viewport } from "next";
import { Noto_Serif_TC, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

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
        <div className="mx-auto max-w-[430px] min-h-dvh relative">
          {children}
        </div>
      </body>
    </html>
  );
}
