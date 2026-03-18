"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/RegistrationForm";
import PainPointHook from "@/components/PainPointHook";

const painPoints = [
  "以為 AI 只是玩具 -- 很多人還在研究工具，但真正厲害的人已經用 AI 重組工作流程、放大產能、接住商機",
  "學了一堆卻不會變現 -- 看了無數教學，卻不知道怎麼把 AI 放進工作與商業",
  "怕被淘汰卻不知從何開始 -- 知道 AI 很重要，但沒有人告訴你現在就能怎麼用",
];

const speakers = [
  {
    name: "CEO 楊",
    title: "辦公室的隱形骨架",
    tags: ["管理", "會計", "上市公司董事"],
    desc: "從管理、會計、上市公司董事的實務視角，直接分享這一年如何把 AI 放進辦公室流程、虛擬助理、管理決策，甚至一路走到全球算力中心的布局。",
    highlight: "AI 不只是工具，而是管理者手上越來越重要的一顆棋子",
  },
  {
    name: "張導",
    title: "影像的人文張力",
    tags: ["紀錄片導演", "AI 影像"],
    desc: "當紀錄片導演的敘事能力遇上 AI 影像技術，做出來的不只是畫面，而是能進提案、進品牌、進商業合作的內容。",
    highlight: "有溫度，也有商業價值",
  },
  {
    name: "郭大社長",
    title: "虛擬經濟的跨國視野",
    tags: ["日本大阪", "AI 虛擬藝人", "IP 經營"],
    desc: "特別從日本大阪來台分享，帶大家拆解 AI 虛擬藝人、IP 經營、虛擬經濟權，看懂 AI 在不同產業裡怎麼一步一步走向變現。",
    highlight: "跨國實戰，拆解虛擬經濟變現路徑",
  },
  {
    name: "小羅",
    title: "流量的真實轉化",
    tags: ["23 歲實戰派", "自媒體", "短影音"],
    desc: "分享如何把自媒體、短影音、AI 工具串起來，讓流量不只是流量，而是真的能導客、成交、變現。",
    highlight: "流量不只是數字，而是真實的營收",
  },
];

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
      <section className="animate-fade-up mb-12">
        <div className="relative rounded-xl overflow-hidden mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/pics/image_4.jpg"
            alt="AI 影像力變現課程"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 to-transparent" />
        </div>
        <div className="text-center">
          <p className="text-xs tracking-[0.2em] text-text-secondary/70 mb-3">
            AI 影像力變現
          </p>
          <h1 className="font-[family-name:var(--font-noto-serif-tc)] text-2xl font-bold leading-snug text-gold-shine mb-4">
            AI 實戰跨界拆解
            <br />
            從工具到變現
          </h1>
          <p className="text-sm text-text-secondary leading-[1.8] max-w-xs mx-auto">
            不講空話、不過度包裝，直接談 AI 怎麼真正進入工作、內容、商業，最後走到變現
          </p>
        </div>
      </section>

      {/* Pain Points */}
      <PainPointHook
        title="你是不是也卡在這裡？"
        points={painPoints}
      />

      {/* Core Message */}
      <section className="animate-fade-up mb-12">
        <div className="bg-bg-surface border border-accent/30 rounded-xl p-6 text-center">
          <p className="text-sm text-text-secondary leading-[2] mb-4">
            台灣與日本第一線的 AI 實戰者齊聚台中
            <br />
            不是來講很遠的未來
          </p>
          <p className="text-base font-bold text-accent leading-[1.8]">
            而是來講你現在就能怎麼用
          </p>
        </div>
      </section>

      {/* Speakers */}
      <section className="animate-fade-up mb-12">
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
          四位實戰講師
        </h2>
        <div className="flex flex-col gap-4">
          {speakers.map((speaker) => (
            <div
              key={speaker.name}
              className="bg-bg-surface border border-divider rounded-xl p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent font-bold text-sm">
                  {speaker.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text-primary">
                    {speaker.name}
                  </h3>
                  <p className="text-xs text-accent">
                    {speaker.title}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {speaker.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-text-secondary leading-[1.8] mb-3">
                {speaker.desc}
              </p>
              <p className="text-xs text-accent font-semibold leading-[1.6]">
                {speaker.highlight}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Course Topics */}
      <section className="animate-fade-up mb-12">
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
          你會學到什麼
        </h2>
        <div className="flex flex-col gap-3">
          {courseTopics.map((topic) => (
            <div
              key={topic}
              className="flex items-start gap-3 bg-bg-surface border border-divider rounded-xl p-5"
            >
              <span className="mt-0.5 flex-shrink-0 text-accent font-bold text-base leading-none">
                ✓
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

      {/* Video Preview */}
      <section className="animate-fade-up mb-12">
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
          課程搶先看
        </h2>
        <a
          href="https://youtu.be/N3einxG6Zvg"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-bg-surface border border-divider rounded-xl p-5 hover:border-accent transition-colors group"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent text-xl">
              ▶
            </span>
            <div>
              <p className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors">
                觀看介紹影片
              </p>
              <p className="text-xs text-text-secondary/70 mt-0.5">
                YouTube · AI 影像商業應用完整拆解
              </p>
            </div>
          </div>
        </a>
      </section>

      {/* Who Should Attend */}
      <section className="animate-fade-up mb-12">
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-gold-shine mb-6">
          適合誰來
        </h2>
        <div className="bg-bg-surface border border-divider rounded-xl p-5">
          <ul className="flex flex-col gap-2">
            {[
              "企業主、主管 — 想用 AI 優化管理與決策流程",
              "創作者 — 想用 AI 提升內容產能與品質",
              "自媒體經營者 — 想把流量真正轉化為收入",
              "任何想了解 AI 怎麼幫到工作與生意的人",
            ].map((item) => (
              <li
                key={item}
                className="text-sm text-text-secondary leading-[1.8] pl-3 relative before:content-['→'] before:absolute before:left-0 before:text-accent"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
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
                NT$ 500
              </p>
              <p className="text-xs text-text-secondary/60 mt-1">
                單場限量 30 人 · 買到的不只是一堂課，而是少走三年彎路的實戰經驗
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

      {/* Final CTA */}
      <section className="animate-fade-up mb-12">
        <div className="bg-bg-surface border border-accent/30 rounded-xl p-6 text-center">
          <p className="text-sm text-text-secondary leading-[1.8] mb-2">
            寫實，是入口。變現，才是目的。
          </p>
          <p className="text-lg font-bold text-gold-shine mb-4">
            這門課，就差你一個
          </p>
          <Link
            href="https://lin.ee/htTdJSH"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full rounded-full border-2 border-accent bg-transparent py-3.5 text-center text-sm font-semibold text-accent tracking-wider transition-colors duration-200 hover:bg-accent hover:text-bg-primary"
          >
            立即透過 LINE 報名
          </Link>
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
