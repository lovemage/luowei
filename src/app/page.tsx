import Image from "next/image";
import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";
import AvatarMarquee from "@/components/AvatarMarquee";

const navItems = [
  { label: "短影音代操", href: "/short-video" },
  { label: "廣告投放代操", href: "/short-video-ad" },
  { label: "影響力變現課程", href: "/course" },
  { label: "案例展示", href: "/cases", comingSoon: true },
];

export default function Home() {
  return (
    <main className="relative z-10 flex min-h-dvh flex-col items-center px-6 pt-20 pb-12">
      {/* Logo */}
      <div
        className="animate-fade-up flex flex-col items-center"
        style={{ animationDelay: "0ms" }}
      >
        <Image
          src="/images/logo.png"
          alt="LUOWEI MEDIA"
          width={80}
          height={80}
          priority
        />
      </div>

      {/* Brand Name */}
      <h1
        className="animate-fade-up mt-8 font-[family-name:var(--font-cormorant)] text-3xl font-semibold tracking-[0.25em] text-gold-shine"
        style={{ animationDelay: "100ms" }}
      >
        LUOWEI MEDIA
      </h1>

      {/* Gold line separator */}
      <div
        className="animate-fade-up mt-6"
        style={{ animationDelay: "200ms" }}
      >
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
      </div>

      {/* Tagline */}
      <p
        className="animate-fade-up mt-5 font-[family-name:var(--font-noto-serif-tc)] text-sm tracking-[0.2em] text-text-secondary"
        style={{ animationDelay: "300ms" }}
      >
        無限進步｜個人成長
      </p>

      {/* Navigation List */}
      <nav
        className="animate-fade-up mt-16 w-full max-w-sm"
        style={{ animationDelay: "400ms" }}
      >
        {navItems.map((item, index) => (
          <Link
            key={item.href}
            href={item.href}
            className={`group flex items-center justify-between py-4 transition-all duration-200 hover:opacity-80${index < navItems.length - 1 ? " border-b border-divider" : ""}`}
          >
            <span className="text-sm tracking-widest text-text-primary">
              {item.label}
              {item.comingSoon && (
                <span className="ml-2 text-xs text-text-secondary/50">
                  (即將推出)
                </span>
              )}
            </span>
            <span className="text-accent text-sm transition-transform duration-200 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        ))}
      </nav>

      {/* Avatar Marquee */}
      <div
        className="animate-fade-up mt-16 w-[100vw] -mx-6"
        style={{ animationDelay: "500ms" }}
      >
        <AvatarMarquee />
      </div>

      {/* CTA Button */}
      <div
        className="animate-fade-up mt-14"
        style={{ animationDelay: "600ms" }}
      >
        <Link
          href="https://lin.ee/L8iPk8a"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border-2 border-accent bg-transparent text-accent px-8 py-3 text-sm tracking-[0.2em] hover:bg-accent hover:text-bg-primary transition-all duration-300"
        >
          立即諮詢
        </Link>
      </div>

      {/* Social Links */}
      <div
        className="animate-fade-up mt-14"
        style={{ animationDelay: "700ms" }}
      >
        <SocialLinks />
      </div>
    </main>
  );
}
