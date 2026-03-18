"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/RegistrationForm";

const courseTopics = [
  "AI 怎麼做出商業級影像",
  "AI 怎麼降低成本、提升效率",
  "怎麼打造虛擬角色與內容 IP",
  "怎麼把創作變成可複製的收入模式",
];

const dateOptions = [
  "5/7 週四",
  "5/23 週六",
  "6/11 週四",
  "6/27 週六",
  "7/9 週四",
  "7/25 週六",
];

const sellingPoints = [
  "這不是一堂普通課程，而是未來幾年你一定會遇到的現實。",
  "現在真正拉開差距的，不是 AI 會不會取代你，而是：誰先學會用 AI 放大自己。",
  "有人還在研究工具，有人已經開始用 AI：接案、賺錢、打造品牌。",
  "透過 AI × 短影音 × 自媒體，打造個人影響力，把影響力轉換成收入。",
];

const caseStudies = [
  {
    name: "AI 實驗室 KOKORO",
    href: "https://www.youtube.com/@AimeeLucky777",
    desc: "YouTube 頻道實戰案例",
  },
  {
    name: "CEO 楊",
    href: "https://www.youtube.com/watch?v=N3einxG6Zvg&t=1s",
    desc: "AI 影像商業應用示範",
  },
];

export default function AICourseContent() {
  return (
    <main className="relative z-10 flex min-h-dvh flex-col px-6 pt-10 pb-12">
      {/* Back link top */}
      <Link
        href="/"
        className="animate-fade-in self-start text-sm text-text-secondary hover:text-accent transition-colors mb-6"
      >
        &larr; 返回
      </Link>

      {/* Hero */}
      <section className="animate-fade-up mb-12 text-center">
        <p className="text-xs tracking-[0.2em] text-text-secondary/70 mb-3">
          AI 影像力變現
        </p>
        <h1 className="font-[family-name:var(--font-noto-serif-tc)] text-2xl font-bold leading-snug text-gold-shine mb-4">
          商業級影視 AI
          <br />
          技術公開 × 變現拆解
        </h1>
        <p className="text-sm text-text-secondary leading-[1.8]">
          活動報名申請
        </p>
      </section>

      {/* Introduction */}
      <section className="animate-fade-up mb-12">
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
          為什麼你現在必須了解這件事
        </h2>
        <div className="flex flex-col gap-4">
          {sellingPoints.map((point, i) => (
            <div
              key={i}
              className="bg-bg-surface border border-divider rounded-xl p-5"
            >
              <p className="text-sm text-text-secondary leading-[1.8]">
                {point}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 bg-bg-surface border border-accent/30 rounded-xl p-5">
          <p className="text-sm text-accent font-semibold mb-1">目標</p>
          <p className="text-sm text-text-secondary leading-[1.8]">
            在 2027 年前，幫助{" "}
            <span className="text-text-primary font-bold">100 個人</span>{" "}
            透過 AI 與自媒體實現變現。
          </p>
        </div>
      </section>

      {/* Course Topics */}
      <section className="animate-fade-up mb-12">
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
          課程主題
        </h2>
        <div className="flex flex-col gap-3">
          {courseTopics.map((topic) => (
            <div
              key={topic}
              className="flex items-start gap-3 bg-bg-surface border border-divider rounded-xl p-5"
            >
              <span className="mt-0.5 flex-shrink-0 text-accent font-bold text-base leading-none">
                ✔
              </span>
              <p className="text-sm text-text-secondary leading-[1.8]">
                {topic}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-text-secondary/60 text-center leading-[1.8]">
          不需要 AI 基礎，現場示範，看得懂就能用
        </p>
      </section>

      {/* Event Info */}
      <section className="animate-fade-up mb-12">
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
          活動資訊
        </h2>
        <div className="bg-bg-surface border border-divider rounded-xl p-6 flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <span className="text-accent flex-shrink-0">🗓</span>
            <div>
              <p className="text-sm font-semibold text-text-primary mb-1">
                場次時間
              </p>
              <p className="text-sm text-text-secondary leading-[1.8]">
                每月固定兩場（週四、週六）
                <br />
                時間：14:00–17:30
              </p>
            </div>
          </div>
          <div className="border-t border-divider" />
          <div className="flex items-start gap-3">
            <span className="text-accent flex-shrink-0">📍</span>
            <div>
              <p className="text-sm font-semibold text-text-primary mb-1">
                地點
              </p>
              <p className="text-sm text-text-secondary leading-[1.8]">
                台中市西區法院前街 17 號 4 樓
              </p>
            </div>
          </div>
          <div className="border-t border-divider" />
          <div className="flex items-start gap-3">
            <span className="text-accent flex-shrink-0">🎟</span>
            <div>
              <p className="text-sm font-semibold text-text-primary mb-1">
                票價
              </p>
              <p className="text-2xl font-bold text-accent">
                NT$ 1,000
              </p>
              <p className="text-xs text-text-secondary/60 mt-0.5">
                單場限量 30 人
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <RegistrationForm courseOptions={dateOptions} />

      {/* Payment Info */}
      <section className="animate-fade-up mb-12">
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
          付款方式
        </h2>
        <div className="bg-bg-surface border border-divider rounded-xl p-6 flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <span className="text-text-secondary/70">銀行代碼</span>
            <span className="text-text-primary font-semibold">
              006（合作金庫銀行｜雲林分行）
            </span>
          </div>
          <div className="border-t border-divider" />
          <div className="flex justify-between">
            <span className="text-text-secondary/70">匯款帳號</span>
            <span className="text-text-primary font-semibold tracking-wider">
              5665717273711
            </span>
          </div>
          <div className="border-t border-divider" />
          <div className="flex justify-between">
            <span className="text-text-secondary/70">戶名</span>
            <span className="text-text-primary font-semibold text-right max-w-[200px]">
              羅威傳媒數位行銷股份有限公司
            </span>
          </div>
        </div>
        <div className="mt-4 bg-bg-surface border border-accent/30 rounded-xl p-5 text-sm text-text-secondary leading-[2]">
          <p className="font-semibold text-text-primary mb-2">完成匯款後，請務必：</p>
          <ol className="flex flex-col gap-1 list-decimal list-inside">
            <li>
              將匯款紀錄私訊官方 LINE：
              <span className="text-accent font-semibold"> @021xhxhx</span>
            </li>
            <li>提供：姓名、聯絡電話、匯款帳號後五碼</li>
            <li>確認對帳後將邀請加入活動專屬群組</li>
          </ol>
        </div>
      </section>

      {/* Case Studies */}
      <section className="animate-fade-up mb-12">
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
          實戰案例參考
        </h2>
        <div className="flex flex-col gap-4">
          {caseStudies.map((c) => (
            <a
              key={c.name}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-bg-surface border border-divider rounded-xl p-5 flex items-center justify-between hover:border-accent transition-colors group"
            >
              <div>
                <p className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors">
                  {c.name}
                </p>
                <p className="text-xs text-text-secondary/70 mt-0.5">
                  {c.desc}
                </p>
              </div>
              <span className="text-accent text-lg">↗</span>
            </a>
          ))}
        </div>
      </section>

      {/* Back link bottom */}
      <Link
        href="/"
        className="self-start text-sm text-text-secondary hover:text-accent transition-colors mb-10"
      >
        &larr; 返回首頁
      </Link>

      <Footer />
    </main>
  );
}
