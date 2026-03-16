import Link from "next/link";
import OceanBackground from "@/components/OceanBackground";

export default function ShortVideoClass() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center px-8">
      <OceanBackground />
      <h1 className="text-xl font-bold tracking-[0.2em] text-gold mb-4">
        短影音帶操
      </h1>
      <p className="text-gold/50 tracking-widest text-sm mb-8">COMING SOON</p>
      <Link
        href="/"
        className="text-gold/60 text-sm underline underline-offset-4 hover:text-gold-bright transition-colors"
      >
        返回首頁
      </Link>
    </main>
  );
}
