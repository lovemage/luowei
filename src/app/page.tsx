import Image from "next/image";
import Link from "next/link";
import OceanBackground from "@/components/OceanBackground";
import SocialLinks from "@/components/SocialLinks";

const navButtons = [
  { label: "短影音代操", href: "/short-video-class" },
  { label: "短影音課程", href: "/short-video-course" },
  { label: "短影音廣告", href: "/short-video-ad" },
];

export default function Home() {
  return (
    <main className="relative z-10 flex min-h-dvh flex-col items-center justify-start px-8 pt-16 pb-12">
      <OceanBackground />

      {/* Logo — entrance: scale-in with glow pulse */}
      <div
        className="animate-scale-in animate-glow-pulse flex flex-col items-center gap-4 mb-14"
      >
        <Image
          src="/images/logo.png"
          alt="LUOWEI MEDIA"
          width={120}
          height={120}
          priority
        />
        <h1
          className="animate-fade-up text-2xl font-bold tracking-[0.2em] text-gold"
          style={{ animationDelay: "200ms" }}
        >
          LUOWEI MEDIA
        </h1>
      </div>

      {/* Navigation Buttons — staggered entrance */}
      <div className="flex w-full flex-col gap-4 mb-14">
        {navButtons.map((btn, i) => (
          <Link
            key={btn.href}
            href={btn.href}
            className="animate-fade-up block w-full rounded-lg border border-gold/30 bg-ocean-deep/50 py-4 text-center text-lg font-semibold tracking-widest text-gold backdrop-blur-sm transition-all duration-300 active:scale-[0.97] hover:border-gold-bright hover:bg-ocean-deep/70 hover:text-gold-bright hover:shadow-[0_0_24px_rgba(212,168,83,0.12)]"
            style={{
              animationDelay: `${400 + i * 120}ms`,
              transitionTimingFunction: "var(--ease-out-quart)",
            }}
          >
            {btn.label}
          </Link>
        ))}
      </div>

      {/* Slogan — fade in */}
      <p
        className="animate-fade-in text-sm tracking-[0.3em] text-gold/70 mb-8"
        style={{ animationDelay: "850ms" }}
      >
        無限進步 | 個人成長
      </p>

      {/* Social Links — fade up last */}
      <div
        className="animate-fade-up"
        style={{ animationDelay: "1000ms" }}
      >
        <SocialLinks />
      </div>
    </main>
  );
}
