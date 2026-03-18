import Link from "next/link";
import Footer from "@/components/Footer";

export const dynamic = "force-static";

export default function AICoursePage() {
  return (
    <main className="relative z-10 flex min-h-dvh flex-col items-center px-5 pt-16 pb-12 text-center">
      <p className="text-xs tracking-[0.2em] text-text-secondary/70">AI 影響力變現課程</p>
      <h1 className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl tracking-[0.2em] text-gold-shine">
        COMING SOON
      </h1>
      <p className="mt-6 max-w-[320px] text-sm leading-7 text-text-secondary">
        我們正在打磨全新的 AI 影響力變現內容，
        <br />
        即將上線，敬請期待。
      </p>

      <div className="mt-10 flex flex-col gap-3">
        <Link
          href="/course"
          className="inline-flex h-11 items-center justify-center rounded-full border border-accent px-6 text-sm tracking-[0.15em] text-accent transition-colors hover:bg-accent hover:text-bg-primary"
        >
          先看影響力變現課程
        </Link>
        <Link
          href="/"
          className="inline-flex h-11 items-center justify-center rounded-full border border-text-secondary/30 px-6 text-sm tracking-[0.15em] text-text-secondary transition-colors hover:border-text-secondary/70"
        >
          返回首頁
        </Link>
      </div>

      <Footer />
    </main>
  );
}
