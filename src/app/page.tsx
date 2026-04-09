import Image from "next/image";
import Link from "next/link";
import VideoBackground from "@/components/VideoBackground";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const navItems: { label: string; href: string; external?: boolean; tag?: string }[] = [
  { label: "短影音代操與廣告投放", href: "/short-video", tag: "企業專屬" },
  { label: "素人代操與課程案例", href: "/cases" },
  { label: "企業品牌影響力包班實戰課", href: "/course", tag: "企業培訓" },
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
            const externalProps = item.external ? { target: "_blank" as const, rel: "noopener noreferrer" } : {};

            // Primary filled button
            if (i === 0) {
              return (
                <div key={item.href} className="animate-fade-up relative" style={{ animationDelay: `${350 + i * 80}ms` }}>
                  {item.tag && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-accent text-bg-primary text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wider z-10">
                      {item.tag}
                    </span>
                  )}
                  <Link
                    href={item.href}
                    {...externalProps}
                    className="flex items-center justify-center w-[300px] h-12 rounded-full bg-accent text-sm tracking-[0.15em] text-bg-primary font-semibold transition-all duration-300 hover:brightness-110 active:scale-[0.98]"
                  >
                    {item.label}
                  </Link>
                </div>
              );
            }
            // Outline buttons
            if (i >= 1 && i <= 3) {
              return (
                <div key={item.href} className="animate-fade-up relative" style={{ animationDelay: `${350 + i * 80}ms` }}>
                  {item.tag && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-bg-surface text-accent text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-accent/30 tracking-wider z-10">
                      {item.tag}
                    </span>
                  )}
                  <Link
                    href={item.href}
                    {...externalProps}
                    className="flex items-center justify-center w-[300px] h-12 rounded-full border-2 border-accent text-sm tracking-[0.15em] text-accent transition-all duration-300 hover:bg-accent hover:text-bg-primary active:scale-[0.98]"
                  >
                    {item.label}
                  </Link>
                </div>
              );
            }
            // Text link
            return (
              <Link
                key={item.href}
                href={item.href}
                {...externalProps}
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
