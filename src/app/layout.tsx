import type { Metadata, Viewport } from "next";
import "./globals.css";

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
    <html lang="zh-Hant">
      <body>
        <div className="mx-auto max-w-[430px] min-h-dvh relative overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
