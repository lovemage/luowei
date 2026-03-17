import Image from "next/image";
import Link from "next/link";
import VideoBackground from "@/components/VideoBackground";

const navItems = [
  { label: "短影音與廣告服務", href: "/short-video" },
  { label: "影響力變現課程", href: "/course" },
  { label: "AI 影響力變現課程", href: "/ai-course", comingSoon: true },
  { label: "案例展示區", href: "/cases", comingSoon: true },
];

export default function Home() {
  return (
    <>
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
          {navItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="animate-fade-up flex items-center justify-center w-[300px] h-12 rounded-full border-2 border-accent text-sm tracking-[0.15em] text-accent transition-all duration-300 hover:bg-accent hover:text-bg-primary active:scale-[0.98]"
              style={{ animationDelay: `${350 + i * 80}ms` }}
            >
              {item.label}
              {item.comingSoon && (
                <span className="ml-2 text-xs opacity-50">
                  (即將推出)
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-14 text-center">
          <p
            className="animate-fade-up font-[family-name:var(--font-noto-serif-tc)] text-sm tracking-[0.2em] text-text-secondary"
            style={{ animationDelay: "520ms" }}
          >
            無限進步｜個人成長
          </p>
          <p
            className="animate-fade-up mt-4 text-xs text-text-secondary/40 tracking-widest"
            style={{ animationDelay: "700ms" }}
          >
            羅威傳媒 | Louwei Studio
          </p>
        </div>
      </main>
    </>
  );
}
