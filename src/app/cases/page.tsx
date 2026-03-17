import Link from "next/link";

export default function CasesPage() {
  return (
    <main className="relative z-10 flex min-h-dvh flex-col items-center justify-center px-6">
      <h1 className="font-[family-name:var(--font-noto-serif-tc)] text-[22px] font-bold text-text-primary mb-4">
        案例展示
      </h1>
      <div className="h-[2px] w-12 bg-accent rounded-full mb-4" />
      <p className="text-sm text-text-secondary mb-8">即將推出</p>
      <Link
        href="/"
        className="text-sm text-accent hover:text-accent-hover transition-colors"
      >
        返回首頁
      </Link>
    </main>
  );
}
