import Image from "next/image";
import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";
import AvatarMarquee from "@/components/AvatarMarquee";

const navItems = [
  { label: "短影音代操", href: "/short-video-class" },
  { label: "短影音課程", href: "/short-video-course" },
  { label: "短影音廣告", href: "/short-video-ad" },
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
        <h1 className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold tracking-[0.15em] text-charcoal">
          LUOWEI MEDIA
        </h1>
        <div className="h-px w-10 bg-divider" />
        <p className="font-[family-name:var(--font-noto-serif-tc)] text-sm text-warm-gray tracking-[0.2em]">
          無限進步｜個人成長
        </p>
      </div>

      {/* Navigation List */}
      <nav
        className="animate-fade-up w-full mb-16"
        style={{ animationDelay: "150ms" }}
      >
        {navItems.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center justify-between py-4 border-b border-divider text-charcoal transition-colors duration-200 active:text-terracotta"
          >
            <span className="text-base tracking-widest">{item.label}</span>
            <span className="text-warm-gray text-sm">→</span>
          </Link>
        ))}
      </nav>

      {/* Avatar Marquee */}
      <div
        className="animate-fade-in w-[100vw] -mx-6 mb-12"
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
