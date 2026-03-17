import Image from "next/image";
import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";

const navItems = [
  { label: "短影音代操", href: "/short-video" },
  { label: "廣告投放代操", href: "/short-video-ad" },
  { label: "影響力變現課程", href: "/course" },
  { label: "案例展示", href: "/cases", comingSoon: true },
];

export default function Home() {
  return (
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

      {/* Tagline */}
      <p
        className="animate-fade-up mt-4 font-[family-name:var(--font-noto-serif-tc)] text-sm tracking-[0.2em] text-text-secondary"
        style={{ animationDelay: "200ms" }}
      >
        無限進步｜個人成長
      </p>

      {/* Navigation Buttons */}
      <nav
        className="animate-fade-up mt-10 w-full flex flex-col gap-4"
        style={{ animationDelay: "300ms" }}
      >
        {navItems.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className="animate-fade-up flex items-center justify-center w-full rounded-full border-2 border-accent py-4 text-sm tracking-[0.15em] text-accent transition-all duration-300 hover:bg-accent hover:text-bg-primary active:scale-[0.98]"
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

      {/* Social Links */}
      <div
        className="animate-fade-up mt-auto pt-16"
        style={{ animationDelay: "700ms" }}
      >
        <SocialLinks />
      </div>
    </main>
  );
}
