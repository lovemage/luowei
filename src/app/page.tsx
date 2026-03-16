import Image from "next/image";
import Link from "next/link";
import OceanBackground from "@/components/OceanBackground";
import SocialLinks from "@/components/SocialLinks";

const navButtons = [
  { label: "短影音帶操", href: "/short-video-class" },
  { label: "短影音課程", href: "/short-video-course" },
  { label: "短影音廣告", href: "/short-video-ad" },
];

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center px-8 py-12">
      <OceanBackground />

      {/* Logo */}
      <div className="flex flex-col items-center gap-4 mb-12">
        <Image
          src="/images/logo.png"
          alt="LUOWEI MEDIA"
          width={120}
          height={120}
          priority
        />
        <h1 className="text-2xl font-bold tracking-[0.2em] text-gold">
          LUOWEI MEDIA
        </h1>
      </div>

      {/* Navigation Buttons */}
      <div className="flex w-full flex-col gap-4 mb-12">
        {navButtons.map((btn) => (
          <Link
            key={btn.href}
            href={btn.href}
            className="block w-full rounded-lg border border-gold/40 bg-ocean-deep/60 py-4 text-center text-lg font-semibold tracking-widest text-gold backdrop-blur-sm transition-all hover:border-gold-bright hover:bg-ocean-deep/80 hover:text-gold-bright hover:shadow-[0_0_20px_rgba(212,168,83,0.15)]"
          >
            {btn.label}
          </Link>
        ))}
      </div>

      {/* Slogan */}
      <p className="text-sm tracking-[0.3em] text-gold/80 mb-8">
        無限進步 | 個人成長
      </p>

      {/* Social Links */}
      <SocialLinks />
    </main>
  );
}
