import Link from "next/link";

export default function ShortVideoCourse() {
  return (
    <main className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-6">
      <h1 className="animate-fade-up font-[family-name:var(--font-noto-serif-tc)] text-2xl font-bold text-charcoal mb-3">
        短影音課程
      </h1>
      <p className="animate-fade-up text-sm text-warm-gray tracking-widest mb-6" style={{ animationDelay: "100ms" }}>
        即將推出
      </p>
      <div className="animate-fade-in h-0.5 w-10 bg-terracotta mb-8" style={{ animationDelay: "200ms" }} />
      <Link
        href="/"
        className="animate-fade-up text-sm text-terracotta transition-colors active:text-terracotta-light"
        style={{ animationDelay: "300ms" }}
      >
        返回首頁
      </Link>
    </main>
  );
}
