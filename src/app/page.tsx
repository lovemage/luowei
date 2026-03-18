import Image from "next/image";
import Link from "next/link";
import VideoBackground from "@/components/VideoBackground";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const navItems: { label: string; href: string; external?: boolean }[] = [
  { label: "短影音與廣告服務", href: "/short-video" },
  { label: "素人代操與課程案例", href: "/cases" },
  { label: "短影音影響力變現課程", href: "/course" },
  { label: "AI 影響力變現課程", href: "/ai-course" },
  { label: "下班後第二收入計劃", href: "https://docs.google.com/forms/d/1aH9-xjN6od9ZK0Dbh4bAQRvceafI8FkNFBx4xsgic4g/viewform?edit_requested=true", external: true },
];

export default function Home() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "羅威傳媒 LUOWEI MEDIA",
        url: "https://luowei-media.com",
        description: "無限進步｜個人成長。短影音代操、影響力變現課程、AI影像力變現。",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://luowei-media.com/?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }} />
      <VideoBackground />
      <main className="relative z-10 flex min-h-dvh flex-col items-center px-5 pt-16 pb-12">
        {/* Logo */}
        <div
          className="animate-fade-up flex flex-col items-center"
          style={{ animationDelay: "0ms" }}
        >
          <Image
            src="/images/logo.png"
            alt="LUOWEI MEDIA"
            width={88}
            height={88}
            priority
          />
        </div>

        {/* Brand Name */}
        <h1
          className="animate-fade-up mt-6 font-[family-name:var(--font-cormorant)] text-3xl font-semibold tracking-[0.25em] text-gold-shine"
          style={{ animationDelay: "100ms" }}
        >
          LUOWEI MEDIA
        </h1>

        {/* Navigation Buttons */}
        <nav
          className="animate-fade-up mt-10 flex flex-col items-center gap-4"
          style={{ animationDelay: "300ms" }}
        >
          {navItems.map((item, i) => {
            if (i === 0) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="animate-fade-up flex items-center justify-center w-[300px] h-12 rounded-full bg-accent text-sm tracking-[0.15em] text-bg-primary font-semibold transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
                  style={{ animationDelay: `${350 + i * 80}ms` }}
                >
                  {item.label}
                </Link>
              );
            }
            if (i >= 1 && i <= 3) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="animate-fade-up flex items-center justify-center w-[300px] h-12 rounded-full border-2 border-accent text-sm tracking-[0.15em] text-accent transition-all duration-300 hover:bg-accent hover:text-bg-primary active:scale-[0.98]"
                  style={{ animationDelay: `${350 + i * 80}ms` }}
                >
                  {item.label}
                </Link>
              );
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="animate-fade-up text-sm text-text-secondary underline decoration-accent/40 hover:text-accent transition-colors"
                style={{ animationDelay: `${350 + i * 80}ms` }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Footer />
      </main>
    </>
  );
}
