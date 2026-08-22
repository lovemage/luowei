"use client";

import Link from "next/link";
import Reveal from "@/components/fupo/Reveal";
import CountUp from "@/components/fupo/CountUp";
import SceneImage from "@/components/fupo/SceneImage";
import SectionNav from "@/components/fupo/SectionNav";
import {
  BNI_REASONS,
  CHAINS,
  CHAIN_GROUPS,
  EMPOWERMENT,
  FOUNDATIONS,
  GROUND_PUSH,
  LEADER_ROLES,
  NAV_SECTIONS,
  ROADMAP,
  SAVINGS,
  SCENE,
  SKY_PUSH,
  WHY_BUILD,
} from "./data";

const LINE_URL = "https://lin.ee/htTdJSH";

const GOLD = "#E2C191";
const INK = "#090807";

/* 段落標題：小標籤 + 主標 + 金線 */
function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="mb-12">
      <Reveal variant="wipe">
        <p className="mb-3 text-[11px] font-semibold tracking-[0.42em] text-[#E2C191]/55">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal variant="up" delay={80}>
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-[26px] leading-[1.4] font-bold text-[#F3E8D7] sm:text-[34px]">
          {title}
        </h2>
      </Reveal>
      <Reveal variant="wipe" delay={200}>
        <div
          className="mt-5 h-px w-24"
          style={{ background: `linear-gradient(90deg, ${GOLD}, transparent)` }}
        />
      </Reveal>
      {lead && (
        <Reveal variant="up" delay={260}>
          <p className="mt-6 max-w-2xl text-[15px] leading-[2] text-[#A99C8C]">{lead}</p>
        </Reveal>
      )}
    </div>
  );
}

export default function FupoContent() {
  return (
    <main
      data-standalone
      // overflow-x-clip 而非 overflow-hidden：hidden 會讓 SectionNav 的 position:sticky 失效
      className="relative w-full overflow-x-clip"
      style={{ background: INK, color: "#A99C8C" }}
    >
      <SectionNav
        sections={NAV_SECTIONS}
        brand="富婆籌備會"
        ctaHref={LINE_URL}
        ctaLabel="申請席次"
      />

      {/* ══════════ 01 創會理念 ══════════ */}
      <section id="vision" className="relative">
        {/* ── P1 封面 ── */}
        <div className="relative min-h-[86vh] w-full overflow-hidden">
          <div className="absolute inset-0">
            <SceneImage
              src={SCENE.hero}
              alt="富婆組建籌備會"
              placeholder="情境圖 01 ─ 封面"
              ratio="auto"
              scrim={0.55}
              className="h-full w-full"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(9,8,7,0.72) 0%, rgba(9,8,7,0.5) 45%, rgba(9,8,7,0.96) 100%)",
            }}
          />
          {/* 光暈 */}
          <div
            className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(226,193,145,0.22), transparent 65%)",
              animation: "fp-glow-pulse 7s ease-in-out infinite",
            }}
          />

          <div className="relative mx-auto flex min-h-[86vh] max-w-4xl flex-col justify-center px-6 py-24 sm:px-10">
            <Reveal variant="down">
              <p className="text-[11px] font-semibold tracking-[0.5em] text-[#E2C191]/70">
                專屬於女企業家的高價值商業生態圈
              </p>
            </Reveal>

            <Reveal variant="blur" delay={200}>
              <h1
                className="mt-7 font-[family-name:var(--font-noto-serif-tc)] text-[44px] leading-[1.18] font-bold sm:text-[72px]"
                style={{
                  background:
                    "linear-gradient(100deg, #B98A54 0%, #E2C191 35%, #FBF1E2 50%, #E2C191 65%, #B98A54 100%)",
                  backgroundSize: "220% auto",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  animation: "fp-sheen 6s linear infinite",
                }}
              >
                富婆組建籌備會
              </h1>
            </Reveal>

            <Reveal variant="up" delay={420}>
              <p className="mt-8 max-w-xl text-[15px] leading-[2.1] text-[#C6B9A8] sm:text-base">
                打破傳統商會盲點，串聯服務高價值女性客群的黃金產業鏈，
                打造互助、高效、共榮的商業生態。
              </p>
            </Reveal>

            <Reveal variant="up" delay={560}>
              <p className="mt-10 font-[family-name:var(--font-noto-serif-tc)] text-[20px] leading-[1.9] font-bold text-[#E2C191] sm:text-[26px]">
                富婆 自己當．江山 自己扛。
              </p>
            </Reveal>

            <Reveal variant="up" delay={700}>
              <div className="mt-12 flex flex-wrap gap-3">
                <a
                  href={LINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 text-sm font-semibold tracking-[0.16em] transition-opacity hover:opacity-85"
                  style={{ background: GOLD, color: INK }}
                >
                  我要成為創會領頭羊
                </a>
                <a
                  href="#chains"
                  className="border px-8 py-3.5 text-sm tracking-[0.16em] text-[#E2C191] transition-colors hover:bg-[#E2C191] hover:text-[#090807]"
                  style={{ borderColor: "rgba(226,193,145,0.45)" }}
                >
                  看 15 條產業鏈
                </a>
              </div>
            </Reveal>
          </div>

          {/* 捲動提示 */}
          <div
            className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-[#E2C191]/45"
            style={{ animation: "fp-drift 2.6s ease-in-out infinite" }}
          >
            SCROLL
          </div>
        </div>

        {/* ── P2 創會理念 ── */}
        <div className="mx-auto max-w-4xl px-6 py-24 sm:px-10 sm:py-32">
          <SectionHeading eyebrow="OUR BELIEF ─ 01" title="創會理念" />

          <div className="grid gap-12 md:grid-cols-[1.15fr_1fr] md:items-start">
            <div>
              <Reveal variant="left">
                <p className="text-[13px] tracking-[0.2em] text-[#E2C191]/60">猶太人說：</p>
                <blockquote className="mt-4 font-[family-name:var(--font-noto-serif-tc)] text-[24px] leading-[1.7] font-bold text-[#F3E8D7] sm:text-[30px]">
                  「財富，都是掌握在女人手上的。」
                </blockquote>
              </Reveal>

              <Reveal variant="up" delay={160} className="mt-10">
                <div className="space-y-6 text-[15px] leading-[2.1] text-[#A99C8C]">
                  <p className="stagger-item" style={{ ["--i" as string]: 0 }}>
                    她們很努力，事業做得很好，卻很少有人陪她們一起走。
                  </p>
                  <p className="stagger-item" style={{ ["--i" as string]: 1 }}>
                    所以，我想自己建一個真正屬於女人的圈子。
                  </p>
                  <p className="stagger-item" style={{ ["--i" as string]: 2 }}>
                    讓每一個女生，都找到自己的<span className="text-[#E2C191]">配得感</span>。
                  </p>
                </div>
              </Reveal>

              <Reveal variant="wipe" delay={420} className="mt-10">
                <p className="font-[family-name:var(--font-noto-serif-tc)] text-[19px] leading-[1.9] font-bold text-[#E2C191] sm:text-[22px]">
                  富婆，自己當；<br />江山，自己扛。
                </p>
              </Reveal>
            </div>

            <Reveal variant="scale" delay={200}>
              <SceneImage
                src={SCENE.belief}
                alt="女性創業家的自我實現"
                placeholder="情境圖 02 ─ 創會理念"
                ratio="4/5"
                scrim={0.3}
              />
            </Reveal>
          </div>
        </div>

        {/* ── P3 分會四大地基 ── */}
        <div
          className="border-t"
          style={{ borderColor: "rgba(226,193,145,0.12)", background: "#0C0B09" }}
        >
          <div className="mx-auto max-w-5xl px-6 py-24 sm:px-10 sm:py-32">
            <SectionHeading
              eyebrow="FOUNDATION ─ 02"
              title="分會四大地基"
              lead="不是多辦一個聚會，而是把一個能長期運轉的結構，先蓋穩。"
            />

            <div className="grid gap-px sm:grid-cols-2" style={{ background: "rgba(226,193,145,0.14)" }}>
              {FOUNDATIONS.map((item, i) => (
                <Reveal
                  key={item.no}
                  variant={i % 2 === 0 ? "left" : "right"}
                  delay={i * 90}
                >
                  <div className="h-full p-8 sm:p-10" style={{ background: "#0C0B09" }}>
                    <p className="font-[family-name:var(--font-noto-serif-tc)] text-[34px] leading-none font-bold text-[#E2C191]/30">
                      {item.no}
                    </p>
                    <h3 className="mt-4 font-[family-name:var(--font-noto-serif-tc)] text-[17px] font-bold text-[#F3E8D7]">
                      {item.title}
                    </h3>
                    <div className="mt-4 space-y-2">
                      {item.lines.map((line) => (
                        <p key={line} className="text-[14px] leading-[1.95] text-[#A99C8C]">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* ── P4 為什麼想組建這個團隊 ── */}
        <div className="mx-auto max-w-5xl px-6 py-24 sm:px-10 sm:py-32">
          <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:items-start">
            <div className="md:sticky md:top-24">
              <SectionHeading eyebrow="WHY ─ 03" title="為什麼我想組建這個團隊？" />
              <Reveal variant="scale" delay={120}>
                <SceneImage
                  src={SCENE.foundation}
                  alt="女性企業家的商業聚會"
                  placeholder="情境圖 03 ─ 為什麼組建"
                  ratio="3/4"
                  scrim={0.3}
                />
              </Reveal>
            </div>

            <div className="flex flex-col">
              {WHY_BUILD.map((item, i) => (
                <Reveal key={item.label} variant="right" delay={i * 110}>
                  <div
                    className="py-8"
                    style={{
                      borderTop: i === 0 ? "none" : "1px solid rgba(226,193,145,0.14)",
                    }}
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-[family-name:var(--font-noto-serif-tc)] text-[15px] font-bold text-[#E2C191]">
                        {item.label}
                      </span>
                      <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-[18px] font-bold text-[#F3E8D7] sm:text-[20px]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="mt-4 text-[14.5px] leading-[2.05] text-[#A99C8C]">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 02 產業鏈 ══════════ */}
      <section id="chains" className="relative" style={{ background: "#0C0B09" }}>
        {/* ── P5 我們要挖一個魚池 ── */}
        <div className="relative overflow-hidden border-t" style={{ borderColor: "rgba(226,193,145,0.12)" }}>
          <div className="absolute inset-0 opacity-45">
            <SceneImage
              src={SCENE.pond}
              alt="女性產業鏈生態"
              placeholder="情境圖 04 ─ 魚池"
              ratio="auto"
              scrim={0.7}
              className="h-full w-full"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(12,11,9,0.94) 0%, rgba(12,11,9,0.82) 50%, rgba(12,11,9,0.97) 100%)",
            }}
          />

          <div className="relative mx-auto max-w-5xl px-6 py-24 sm:px-10 sm:py-36">
            <SectionHeading
              eyebrow="THE POND ─ 04"
              title="我們要挖一個魚池"
              lead="把服務女性的所有行業，通通放進同一個池子裡。"
            />

            <Reveal variant="up">
              <div className="grid gap-px sm:grid-cols-3" style={{ background: "rgba(226,193,145,0.16)" }}>
                {["不抽佣金", "不拿好處", "不算利潤"].map((t, i) => (
                  <div
                    key={t}
                    className="stagger-item px-6 py-8 text-center"
                    style={{ background: "#0C0B09", ["--i" as string]: i }}
                  >
                    <p className="font-[family-name:var(--font-noto-serif-tc)] text-[19px] font-bold text-[#E2C191]">
                      {t}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal variant="wipe" delay={160}>
              <p className="mt-10 font-[family-name:var(--font-noto-serif-tc)] text-[20px] leading-[1.8] font-bold text-[#F3E8D7] sm:text-[26px]">
                只做一件事：<span className="text-[#E2C191]">互相把客戶養大</span>
              </p>
            </Reveal>

            {/* 倍增公式 */}
            <Reveal variant="scale" delay={220}>
              <div
                className="mt-12 flex flex-wrap items-center justify-center gap-x-5 gap-y-4 border px-6 py-12 text-center"
                style={{ borderColor: "rgba(226,193,145,0.25)", background: "rgba(226,193,145,0.04)" }}
              >
                <span className="text-[15px] text-[#A99C8C]">
                  1 人 <CountUp to={30} className="text-[#E2C191]" /> 個客戶
                </span>
                <span className="text-[22px] text-[#E2C191]/50">✕</span>
                <span className="text-[15px] text-[#A99C8C]">
                  <CountUp to={30} className="text-[#E2C191]" /> 人
                </span>
                <span className="text-[22px] text-[#E2C191]/50">＝</span>
                <span className="font-[family-name:var(--font-noto-serif-tc)] text-[34px] leading-none font-black text-[#E2C191] sm:text-[46px]">
                  破千
                </span>
              </div>
            </Reveal>

            <Reveal variant="up" delay={140}>
              <p className="mt-8 text-center text-[15px] leading-[2] text-[#A99C8C]">
                這個時代，只有<span className="text-[#E2C191]">人傳人</span>，才會倍增。
              </p>
            </Reveal>

            {/* 她的一切都有人接 */}
            <Reveal variant="up" delay={120} className="mt-16">
              <div className="flex flex-wrap justify-center gap-2.5">
                {[
                  "她的臉",
                  "她的身材",
                  "她的穿搭",
                  "她的家",
                  "她的錢",
                  "她的小孩",
                  "她的旅行",
                ].map((t, i) => (
                  <span
                    key={t}
                    className="stagger-item border px-4 py-2 text-[13px] tracking-wide text-[#E2C191]"
                    style={{
                      borderColor: "rgba(226,193,145,0.28)",
                      background: "rgba(226,193,145,0.05)",
                      ["--i" as string]: i,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-center text-[15px] tracking-wide text-[#F3E8D7]">
                —— 全部都有人接。
              </p>
            </Reveal>

            <Reveal variant="curtain" delay={200}>
              <p className="mx-auto mt-16 max-w-2xl text-center font-[family-name:var(--font-noto-serif-tc)] text-[17px] leading-[2] font-bold text-[#F3E8D7] sm:text-[20px]">
                這不是商會，這是一條猶太人講了一千年，
                <br className="hidden sm:block" />
                但今天還沒有人挖出來的產業鏈。
              </p>
            </Reveal>
          </div>
        </div>

        {/* ── P6 產業鏈總覽 ── */}
        <div className="border-t" style={{ borderColor: "rgba(226,193,145,0.12)" }}>
          <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
            <SectionHeading
              eyebrow="ECOSYSTEM ─ 05"
              title="富婆產業鏈組建"
              lead="修心．養顏．進財 —— 養出一個富婆。15 條產業鏈，三大分區，一個行業只留一個位置。"
            />

            <div className="space-y-12">
              {CHAIN_GROUPS.map((group, gi) => {
                const members = CHAINS.filter((c) => c.group === group.name);
                return (
                  <Reveal key={group.name} variant="up" delay={gi * 120}>
                    <div>
                      <div className="mb-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-[19px] font-bold text-[#F3E8D7]">
                          {group.name}
                        </h3>
                        <span className="text-[12px] tracking-[0.28em] text-[#E2C191]/60">
                          {group.tagline}
                        </span>
                        <span className="font-[family-name:var(--font-cormorant)] text-[13px] text-[#E2C191]/30">
                          {group.range}
                        </span>
                      </div>
                      <div
                        className="grid grid-cols-2 gap-px sm:grid-cols-5"
                        style={{ background: "rgba(226,193,145,0.14)" }}
                      >
                        {members.map((chain, i) => (
                          <a
                            key={chain.no}
                            href={`#chain-${chain.no}`}
                            className="stagger-item group flex flex-col items-center gap-2 px-4 py-7 transition-colors hover:bg-[#171310]"
                            style={{ background: "#0C0B09", ["--i" as string]: i }}
                          >
                            <span className="text-[26px] leading-none">{chain.emoji}</span>
                            <span className="font-[family-name:var(--font-cormorant)] text-[12px] text-[#E2C191]/40">
                              {chain.no}
                            </span>
                            <span className="text-[13.5px] font-semibold text-[#D8CBBA] transition-colors group-hover:text-[#E2C191]">
                              {chain.name}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── P10-P24 十五條產業鏈細節 ── */}
        <div className="border-t" style={{ borderColor: "rgba(226,193,145,0.12)" }}>
          <div className="mx-auto max-w-5xl px-6 py-24 sm:px-10 sm:py-32">
            <SectionHeading
              eyebrow="THE 15 CHAINS ─ 06"
              title="一條一條，把鏈接起來"
              lead="每一條鏈都有明確的引薦路徑。客戶進來一次，會在池子裡被接手好幾次。"
            />

            <div className="flex flex-col gap-px" style={{ background: "rgba(226,193,145,0.12)" }}>
              {CHAINS.map((chain, i) => (
                <Reveal
                  key={chain.no}
                  id={`chain-${chain.no}`}
                  variant={i % 2 === 0 ? "left" : "right"}
                  threshold={0.08}
                  className="scroll-mt-20"
                >
                  <article
                    className="grid gap-6 px-6 py-10 sm:grid-cols-[auto_1fr] sm:gap-8 sm:px-10 sm:py-12"
                    style={{ background: "#0C0B09" }}
                  >
                    {/* 左：序號 + emoji */}
                    <div className="flex items-center gap-4 sm:w-[104px] sm:flex-col sm:items-start sm:gap-2">
                      <span className="text-[34px] leading-none">{chain.emoji}</span>
                      <div>
                        <p className="font-[family-name:var(--font-noto-serif-tc)] text-[26px] leading-none font-bold text-[#E2C191]/40">
                          {chain.no}
                        </p>
                      </div>
                    </div>

                    {/* 右：內容 */}
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-[20px] font-bold text-[#F3E8D7] sm:text-[23px]">
                          {chain.name}
                        </h3>
                        <span className="text-[11px] tracking-[0.26em] text-[#E2C191]/55">
                          {chain.group}
                        </span>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {chain.items.map((item, k) => (
                          <span
                            key={item}
                            className="stagger-item border px-3 py-1.5 text-[12.5px] text-[#C6B9A8]"
                            style={{
                              borderColor: "rgba(226,193,145,0.22)",
                              ["--i" as string]: k,
                            }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <div
                        className="mt-6 px-5 py-4"
                        style={{ background: "rgba(226,193,145,0.05)" }}
                      >
                        <p className="mb-2 text-[11px] font-semibold tracking-[0.3em] text-[#E2C191]/60">
                          舉個例
                        </p>
                        <p className="text-[14px] leading-[2] text-[#A99C8C]">{chain.example}</p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 03 運作機制 ══════════ */}
      <section id="engine" className="relative border-t" style={{ borderColor: "rgba(226,193,145,0.12)" }}>
        {/* ── P7 地推 × 天推 ── */}
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
          <SectionHeading
            eyebrow="TWO ENGINES ─ 07"
            title="富婆成會兩條線｜地推 × 天推"
            lead="核心理念｜每個女人，都值得被好好對待。一條腳踏實地把會建起來，一條讓全世界看到這個會多讓人羨慕。"
          />

          <Reveal variant="scale" className="mb-12">
            <SceneImage
              src={SCENE.engine}
              alt="地推與天推雙引擎"
              placeholder="情境圖 05 ─ 地推 × 天推"
              ratio="21/9"
              scrim={0.4}
            />
          </Reveal>

          <div className="grid gap-px md:grid-cols-2" style={{ background: "rgba(226,193,145,0.14)" }}>
            {[GROUND_PUSH, SKY_PUSH].map((engine, gi) => (
              <Reveal key={engine.title} variant={gi === 0 ? "left" : "right"} delay={gi * 120}>
                <div className="h-full p-8 sm:p-10" style={{ background: INK }}>
                  <div className="flex items-center gap-3">
                    <span className="text-[30px] leading-none">{engine.emoji}</span>
                    <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-[24px] font-bold text-[#E2C191]">
                      {engine.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-[14px] tracking-wide text-[#C6B9A8]">{engine.subtitle}</p>
                  <ul className="mt-7 space-y-3">
                    {engine.points.map((point, i) => (
                      <li
                        key={point}
                        className="stagger-item flex gap-3 text-[14px] leading-[1.9] text-[#A99C8C]"
                        style={{ ["--i" as string]: i }}
                      >
                        <span className="mt-[9px] h-1 w-1 shrink-0" style={{ background: GOLD }} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal variant="curtain" delay={160}>
            <p className="mt-12 text-center font-[family-name:var(--font-noto-serif-tc)] text-[16px] leading-[2] font-bold text-[#F3E8D7] sm:text-[19px]">
              地推把根扎穩，天推把光打亮
              <br className="sm:hidden" />
              —— 讓每個女人，都感受到自己值得被好好對待。
            </p>
          </Reveal>
        </div>

        {/* ── P8 為什麼選擇 BNI 機制 ── */}
        <div className="border-t" style={{ borderColor: "rgba(226,193,145,0.12)", background: "#0C0B09" }}>
          <div className="mx-auto max-w-5xl px-6 py-24 sm:px-10 sm:py-32">
            <SectionHeading
              eyebrow="THE SYSTEM ─ 08"
              title="為什麼選擇 BNI 機制？"
              lead="台灣超過一萬名會員 —— 唯一不是社團，是以生意為導向，建立長期有意義關係的系統。"
            />

            {/* 數據條 */}
            <Reveal variant="up">
              <div
                className="mb-12 grid grid-cols-2 gap-px sm:grid-cols-4"
                style={{ background: "rgba(226,193,145,0.14)" }}
              >
                {[
                  { value: 41, suffix: " 年", label: "歷史" },
                  { value: 76, suffix: " 國", label: "跨國佈局" },
                  { value: 35, suffix: " 萬", label: "全球會員" },
                  { value: 8500, suffix: " 億", label: "去年全球生意額", grouped: true },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    className="stagger-item px-4 py-8 text-center"
                    style={{ background: "#0C0B09", ["--i" as string]: i }}
                  >
                    <p className="font-[family-name:var(--font-noto-serif-tc)] text-[30px] leading-none font-black text-[#E2C191] sm:text-[36px]">
                      <CountUp to={stat.value} suffix={stat.suffix} grouped={stat.grouped} />
                    </p>
                    <p className="mt-3 text-[12px] tracking-[0.2em] text-[#A99C8C]/70">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            <div className="grid gap-px md:grid-cols-3" style={{ background: "rgba(226,193,145,0.14)" }}>
              {BNI_REASONS.map((item, i) => (
                <Reveal key={item.title} variant="rotate" delay={i * 110}>
                  <div className="h-full p-8" style={{ background: "#0C0B09" }}>
                    <span className="text-[28px] leading-none">{item.emoji}</span>
                    <h3 className="mt-4 font-[family-name:var(--font-noto-serif-tc)] text-[17px] font-bold text-[#F3E8D7]">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-[14px] leading-[2] text-[#A99C8C]">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* ── P9 為妳省下三大成本 ── */}
        <div className="border-t" style={{ borderColor: "rgba(226,193,145,0.12)" }}>
          <div className="mx-auto max-w-5xl px-6 py-24 sm:px-10 sm:py-32">
            <SectionHeading eyebrow="CORE VALUE ─ 09" title="本分會核心價值｜為妳省下三大成本" />

            <div className="flex flex-col">
              {SAVINGS.map((item, i) => (
                <Reveal key={item.label} variant={i % 2 === 0 ? "left" : "right"} delay={i * 100}>
                  <div
                    className="grid items-start gap-5 py-9 sm:grid-cols-[220px_1fr] sm:gap-10"
                    style={{ borderTop: i === 0 ? "none" : "1px solid rgba(226,193,145,0.14)" }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[26px] leading-none">{item.emoji}</span>
                      <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-[19px] font-bold text-[#E2C191]">
                        {item.label}
                      </h3>
                    </div>
                    <p className="text-[14.5px] leading-[2.05] text-[#A99C8C]">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 04 創會領頭羊 ══════════ */}
      <section
        id="founder"
        className="relative border-t"
        style={{ borderColor: "rgba(226,193,145,0.12)", background: "#0C0B09" }}
      >
        {/* ── P25 我要找的，是創會領頭羊 ── */}
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
          <SectionHeading
            eyebrow="FOUNDING MEMBER ─ 10"
            title="我要找的，是「創會領頭羊」"
            lead="不是招募會員，是找一起造局的人。"
          />

          <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:items-center">
            <Reveal variant="left">
              <SceneImage
                src={SCENE.founder}
                alt="創會領頭羊"
                placeholder="情境圖 06 ─ 創會領頭羊"
                ratio="4/5"
                scrim={0.32}
              />
            </Reveal>

            <div className="flex flex-col gap-px" style={{ background: "rgba(226,193,145,0.14)" }}>
              {LEADER_ROLES.map((role, i) => (
                <Reveal key={role.title} variant="right" delay={i * 130}>
                  <div className="p-8 sm:p-10" style={{ background: "#0C0B09" }}>
                    <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-[20px] font-bold text-[#E2C191]">
                      {role.title}
                    </h3>
                    <p className="mt-4 text-[14.5px] leading-[2.05] text-[#A99C8C]">{role.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* ── P27 賦能武器 ── */}
        <div className="border-t" style={{ borderColor: "rgba(226,193,145,0.12)" }}>
          <div className="mx-auto max-w-5xl px-6 py-24 sm:px-10 sm:py-32">
            <SectionHeading
              eyebrow="AMPLIFIER ─ 11"
              title="獨特成會主張｜賦能武器"
              lead="自媒體放大——把妳既有的實力，變成看得見的影響力。"
            />

            <div className="grid gap-px md:grid-cols-2" style={{ background: "rgba(226,193,145,0.14)" }}>
              {EMPOWERMENT.map((item, i) => (
                <Reveal key={item.title} variant="blur" delay={i * 140}>
                  <div className="h-full p-8 sm:p-10" style={{ background: "#0C0B09" }}>
                    <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-[18px] font-bold text-[#F3E8D7]">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-[14.5px] leading-[2.05] text-[#A99C8C]">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 05 發展藍圖 ══════════ */}
      <section id="roadmap" className="relative border-t" style={{ borderColor: "rgba(226,193,145,0.12)" }}>
        {/* ── P26 一年會走到哪裡 ── */}
        <div className="mx-auto max-w-5xl px-6 py-24 sm:px-10 sm:py-32">
          <SectionHeading
            eyebrow="ROADMAP ─ 12"
            title="我們一年會走到哪裡？"
            lead="目標：12 個月，100 席到位。全台首創女性產業鏈分會，月引薦金額破百萬。"
          />

          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: "rgba(226,193,145,0.14)" }}>
            {ROADMAP.map((step, i) => (
              <Reveal key={step.when} variant="curtain" delay={i * 130}>
                <div className="h-full p-8" style={{ background: INK }}>
                  <p className="text-[11px] font-semibold tracking-[0.3em] text-[#E2C191]/55">
                    {step.when}
                  </p>
                  <p className="mt-5 font-[family-name:var(--font-noto-serif-tc)] text-[42px] leading-none font-black text-[#E2C191]">
                    <CountUp to={step.seats} />
                    <span className="ml-1 text-[16px] font-bold">席</span>
                  </p>
                  <h3 className="mt-5 text-[15px] font-bold text-[#F3E8D7]">{step.title}</h3>
                  <p className="mt-3 text-[13.5px] leading-[1.95] text-[#A99C8C]">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* 進度視覺 */}
          <Reveal variant="wipe" delay={120}>
            <div className="mt-10 h-[3px] w-full" style={{ background: "rgba(226,193,145,0.14)" }}>
              <div className="h-full w-full" style={{ background: `linear-gradient(90deg, rgba(226,193,145,0.35), ${GOLD})` }} />
            </div>
          </Reveal>
        </div>

        {/* ── P28 最後的機會 ── */}
        <div className="relative overflow-hidden border-t" style={{ borderColor: "rgba(226,193,145,0.12)" }}>
          <div className="absolute inset-0 opacity-55">
            <SceneImage
              src={SCENE.roadmap}
              alt="最後的機會"
              placeholder="情境圖 07 ─ 最後的機會"
              ratio="auto"
              scrim={0.6}
              className="h-full w-full"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(9,8,7,0.92) 0%, rgba(9,8,7,0.78) 40%, rgba(9,8,7,0.98) 100%)",
            }}
          />

          <div className="relative mx-auto max-w-3xl px-6 py-28 text-center sm:px-10 sm:py-40">
            <Reveal variant="down">
              <p className="text-[11px] font-semibold tracking-[0.5em] text-[#E2C191]/60">
                LAST CALL ─ 13
              </p>
            </Reveal>

            <Reveal variant="blur" delay={140}>
              <h2 className="mt-6 font-[family-name:var(--font-noto-serif-tc)] text-[34px] leading-[1.35] font-bold text-[#F3E8D7] sm:text-[46px]">
                最後的機會
              </h2>
            </Reveal>

            <Reveal variant="up" delay={280}>
              <p className="mt-6 text-[17px] tracking-wide text-[#E2C191] sm:text-[20px]">
                為什麼是妳？為什麼是現在？
              </p>
            </Reveal>

            <Reveal variant="up" delay={380}>
              <div className="mt-10 space-y-4 text-[15px] leading-[2.1] text-[#C6B9A8]">
                <p className="stagger-item" style={{ ["--i" as string]: 0 }}>
                  妳在這個領域已靠實力站穩腳步。<span className="text-[#E2C191]">位子只有一個。</span>
                </p>
                <p className="stagger-item" style={{ ["--i" as string]: 1 }}>
                  錯過這個機會，同行業一年之內將不再開放。
                </p>
              </div>
            </Reveal>

            <Reveal variant="scale" delay={520}>
              <p className="mt-12 font-[family-name:var(--font-noto-serif-tc)] text-[19px] leading-[1.9] font-bold text-[#F3E8D7] sm:text-[24px]">
                期待妳成為我們的
                <br className="sm:hidden" />
                第一批創會領頭羊
              </p>
            </Reveal>

            <Reveal variant="up" delay={640}>
              <a
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-12 inline-block px-12 py-4 text-sm font-semibold tracking-[0.2em] transition-opacity hover:opacity-85"
                style={{ background: GOLD, color: INK }}
              >
                立即申請創會席次
              </a>
            </Reveal>

            <Reveal variant="up" delay={720}>
              <p className="mt-8 font-[family-name:var(--font-noto-serif-tc)] text-[14px] tracking-[0.3em] text-[#E2C191]/60">
                富婆 自己當．江山 自己扛
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 頁尾 */}
      <footer
        className="border-t px-6 py-12 text-center sm:px-10"
        style={{ borderColor: "rgba(226,193,145,0.12)" }}
      >
        <p className="text-[12px] tracking-[0.28em] text-[#A99C8C]/70">富婆組建籌備會</p>
        <p className="mt-3 text-[11px] tracking-[0.2em] text-[#A99C8C]/40">
          由 羅威傳媒 LUOWEI MEDIA 協力打造
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-[12px] tracking-[0.2em] text-[#E2C191]/70 transition-colors hover:text-[#E2C191]"
        >
          &larr; 回到羅威傳媒
        </Link>
      </footer>
    </main>
  );
}
