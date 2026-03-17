import Image from "next/image";
import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";
import AvatarMarquee from "@/components/AvatarMarquee";

const navItems = [
  { label: "短影音代操", href: "/short-video" },
  { label: "廣告投放代操", href: "/short-video-ad" },
  { label: "影響力變現課程", href: "/course" },
  { label: "案例展示", href: "/cases", badge: "即將推出" },
];

export default function Home() {
  return (
    <main className="relative z-10 flex min-h-dvh flex-col items-center px-6 pt-16 pb-10">
      {/* Logo & Brand */}
      <div className="animate-fade-up flex flex-col items-center gap-5 mb-16">
        <Image
          src="/images/logo.png"
          alt="LUOWEI MEDIA"
          width={80}
          height={80}
          priority
        />
        <h1 className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold tracking-[0.15em] text-text-primary">
          LUOWEI MEDIA
        </h1>
        <div className="h-px w-10 bg-divider" />
        <p className="font-[family-name:var(--font-noto-serif-tc)] text-sm text-text-secondary tracking-[0.2em]">
          無限進步｜個人成長
        </p>
      </div>

      {/* Navigation Cards */}
      <nav
        className="animate-fade-up w-full max-w-sm grid grid-cols-2 gap-3 mb-16"
        style={{ animationDelay: "150ms" }}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="bg-bg-surface/60 backdrop-blur-sm border border-divider rounded-xl p-5 flex flex-col justify-between gap-3 transition-all duration-200 hover:bg-bg-surface-light hover:border-accent/30"
          >
            <div className="flex items-start justify-between">
              <span className="text-sm tracking-widest text-text-primary">
                {item.label}
              </span>
              {item.badge && (
                <span className="text-accent-warm text-[10px] leading-none">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-text-secondary text-sm self-end">&rarr;</span>
          </Link>
        ))}
      </nav>

      {/* Avatar Marquee */}
      <div
        className="animate-fade-up w-[100vw] -mx-6 mb-12"
        style={{ animationDelay: "300ms" }}
      >
        <AvatarMarquee />
      </div>

      {/* Social Links */}
      <div
        className="animate-fade-up"
        style={{ animationDelay: "450ms" }}
      >
        <SocialLinks />
      </div>
    </main>
  );
}
