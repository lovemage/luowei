"use client";

import Reveal from "@/components/fupo/Reveal";
import CountUp from "@/components/fupo/CountUp";
import SceneImage from "@/components/fupo/SceneImage";
import SectionNav from "@/components/fupo/SectionNav";
import {
  BELIEF_CLOSING,
  BELIEF_INTRO,
  BELIEF_POINTS,
  CHAINS,
  CHAIN_GROUPS,
  MANIFESTO,
  NAV_SECTIONS,
  NETWORK_INTRO,
  SCENE,
  SYSTEM_INTRO,
  SYSTEM_RULES,
  SYSTEM_STATS,
  TOUCHPOINTS,
} from "./data";

/* 淺色系調色盤。對比度皆通過 WCAG AA：
   ink 13.2:1、lead 8.4:1、body 5.3:1、gold 5.1:1（以最差底色 band 計）。 */
const C = {
  bg: "#FAF7F2",
  band: "#F3ECE1",
  card: "#FFFFFF",
  hover: "#F7F1E6",
  ink: "#2B2318",
  lead: "#4C4236",
  body: "#6B5F51",
  gold: "#7E5D28",
  deco: "#B08D4F",
} as const;

const LINE = "rgba(126,93,40,0.16)";
const LINE_SOFT = "rgba(126,93,40,0.11)";
const TINT = "rgba(126,93,40,0.06)";

/**
 * 產業鏈 icon。SVG 是黑色填色路徑，改用 mask-image 上色，
 * 可直接套成頁面的深金而不必改動原始檔。
 */
function ChainIcon({ name, size }: { name: string; size: number }) {
  const url = `/images/fupo/icons/icon-${name}.svg`;
  return (
    <span
      aria-hidden
      className="block shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: C.gold,
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

/**
 * 統一的段落標題。三段都用同一組版式，不再一段一個花樣——
 * 這是對業主「往下整個都好亂」的直接回應。
 */
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
    <header className="mb-14">
      <Reveal variant="wipe">
        <p className="mb-3 text-[11px] font-semibold tracking-[0.42em] text-[#7E5D28]">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal variant="up" delay={80}>
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-[28px] leading-[1.4] font-bold text-[#2B2318] sm:text-[38px]">
          {title}
        </h2>
      </Reveal>
      <Reveal variant="wipe" delay={180}>
        <div
          className="mt-5 h-px w-24"
          style={{ background: `linear-gradient(90deg, ${C.deco}, transparent)` }}
        />
      </Reveal>
      {lead && (
        <Reveal variant="up" delay={240}>
          <p className="mt-7 max-w-2xl text-[16px] leading-[2.05] text-[#4C4236]">{lead}</p>
        </Reveal>
      )}
    </header>
  );
}

/** 統一的編號條目版式，理念與系統兩段共用。 */
function NumberedRow({
  no,
  title,
  body,
  first,
}: {
  no: string;
  title: string;
  body: string;
  first: boolean;
}) {
  return (
    <div
      className="grid gap-3 py-9 sm:grid-cols-[88px_1fr] sm:gap-8"
      style={{ borderTop: first ? "none" : `1px solid ${LINE}` }}
    >
      <p className="font-[family-name:var(--font-noto-serif-tc)] text-[26px] leading-none font-bold text-[#B08D4F]">
        {no}
      </p>
      <div>
        <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-[19px] font-bold text-[#2B2318] sm:text-[21px]">
          {title}
        </h3>
        <p className="mt-3 max-w-2xl text-[15px] leading-[2.05] text-[#6B5F51]">{body}</p>
      </div>
    </div>
  );
}

export default function FupoContent() {
  return (
    <main
      data-standalone
      // overflow-x-clip 而非 overflow-hidden：hidden 會讓 SectionNav 的 position:sticky 失效
      className="relative w-full overflow-x-clip"
      style={{ background: C.bg, color: C.body }}
    >
      <SectionNav sections={NAV_SECTIONS} brand="BNI - 富婆分會" />

      {/* ══════════ 封面 ══════════ */}
      <div className="relative min-h-[88vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <SceneImage
            src={SCENE.hero}
            alt="BNI - 富婆分會"
            placeholder="情境圖 01 ─ 封面"
            ratio="auto"
            scrim={0.35}
            className="h-full w-full"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(250,247,242,0.96) 0%, rgba(250,247,242,0.86) 38%, rgba(250,247,242,0.34) 62%, rgba(250,247,242,0.22) 100%)",
          }}
        />

        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-6 py-24 sm:px-10">
          <Reveal variant="wipe">
            <p className="text-[11px] font-semibold tracking-[0.5em] text-[#7E5D28]">
              以女性商業為主的團隊
            </p>
          </Reveal>

          <Reveal variant="up" delay={160}>
            <h1
              className="mt-7 max-w-[16ch] font-[family-name:var(--font-noto-serif-tc)] text-[40px] leading-[1.18] font-bold sm:text-[66px]"
              style={{
                background:
                  "linear-gradient(100deg, #5E4418 0%, #8F6B2E 35%, #B08D4F 50%, #8F6B2E 65%, #5E4418 100%)",
                backgroundSize: "220% auto",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "fp-sheen 6s linear infinite",
              }}
            >
              BNI - 富婆分會
            </h1>
          </Reveal>

          <Reveal variant="up" delay={340}>
            <p className="mt-9 max-w-[22ch] text-[17px] leading-[2] text-[#4C4236] sm:max-w-md sm:text-[19px]">
              {MANIFESTO.lead}
            </p>
            <p className="mt-3 max-w-[22ch] font-[family-name:var(--font-noto-serif-tc)] text-[19px] leading-[1.9] font-bold text-[#2B2318] sm:max-w-lg sm:text-[24px]">
              {MANIFESTO.emphasis}
            </p>
          </Reveal>

          <Reveal variant="up" delay={520}>
            <p className="mt-12 font-[family-name:var(--font-noto-serif-tc)] text-[15px] tracking-[0.28em] text-[#7E5D28]">
              富婆 自己當．江山 自己扛
            </p>
          </Reveal>
        </div>

        <div
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.4em] text-[#B08D4F]"
          style={{ animation: "fp-drift 2.6s ease-in-out infinite" }}
        >
          SCROLL
        </div>
      </div>

      {/* ══════════ 01 創會理念 ══════════ */}
      <section id="belief" className="border-t" style={{ borderColor: LINE_SOFT }}>
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
          <SectionHeading
            eyebrow="WHY ─ 01"
            title="創會理念"
            lead={BELIEF_INTRO}
          />

          <div className="grid gap-14 md:grid-cols-[1.25fr_1fr] md:items-start">
            <div>
              {BELIEF_POINTS.map((point, i) => (
                <Reveal key={point.no} variant="up" delay={i * 90}>
                  <NumberedRow
                    no={point.no}
                    title={point.title}
                    body={point.body}
                    first={i === 0}
                  />
                </Reveal>
              ))}
            </div>

            <Reveal variant="up" delay={140} className="md:sticky md:top-24">
              <SceneImage
                src={SCENE.belief}
                alt="女性經營者"
                placeholder="情境圖 02 ─ 創會理念"
                ratio="4/5"
                scrim={0.18}
              />
            </Reveal>
          </div>

          {/* 理念收尾金句 */}
          <Reveal variant="wipe" delay={120}>
            <div className="mt-20 border-t pt-14" style={{ borderColor: LINE }}>
              {BELIEF_CLOSING.map((line) => (
                <p
                  key={line}
                  className="font-[family-name:var(--font-noto-serif-tc)] text-[20px] leading-[2] font-bold text-[#2B2318] sm:text-[26px]"
                >
                  {line}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════ 02 我們用的系統 ══════════ */}
      <section id="system" className="border-t" style={{ borderColor: LINE_SOFT, background: C.band }}>
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
          <SectionHeading eyebrow="HOW ─ 02" title="我們用的系統" lead={SYSTEM_INTRO} />

          {/* 規模佐證 */}
          <Reveal variant="up">
            <div className="mb-16 grid grid-cols-2 gap-px sm:grid-cols-4" style={{ background: LINE }}>
              {SYSTEM_STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className="stagger-item px-4 py-9 text-center"
                  style={{ background: C.band, ["--i" as string]: i }}
                >
                  <p className="font-[family-name:var(--font-noto-serif-tc)] text-[30px] leading-none font-black text-[#7E5D28] sm:text-[38px]">
                    <CountUp to={stat.value} suffix={stat.suffix} grouped={stat.value >= 1000} />
                  </p>
                  <p className="mt-3 text-[12px] tracking-[0.2em] text-[#6B5F51]">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-14 md:grid-cols-[1fr_1.25fr] md:items-start">
            <Reveal variant="up" className="md:sticky md:top-24">
              <SceneImage
                src={SCENE.gathering}
                alt="分會聚會"
                placeholder="情境圖 03 ─ 聚會"
                ratio="4/5"
                scrim={0.18}
              />
            </Reveal>

            <div>
              {SYSTEM_RULES.map((rule, i) => (
                <Reveal key={rule.no} variant="up" delay={i * 90}>
                  <NumberedRow
                    no={rule.no}
                    title={rule.title}
                    body={rule.body}
                    first={i === 0}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 03 需要的人脈 ══════════ */}
      <section id="network" className="relative border-t" style={{ borderColor: LINE_SOFT }}>
        {/* 開場：客戶會被接手好幾次 */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <SceneImage
              src={SCENE.network}
              alt="女性產業鏈"
              placeholder="情境圖 04 ─ 產業鏈"
              ratio="auto"
              scrim={0}
              className="h-full w-full"
            />
          </div>
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(250,247,242,0.95) 0%, rgba(250,247,242,0.86) 50%, rgba(250,247,242,0.97) 100%)",
            }}
          />

          <div className="relative mx-auto max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
            <SectionHeading
              eyebrow="WHO ─ 03"
              title="需要的人脈"
              lead={NETWORK_INTRO}
            />

            <Reveal variant="up">
              <div className="flex flex-wrap gap-2.5">
                {TOUCHPOINTS.map((t, i) => (
                  <span
                    key={t}
                    className="stagger-item border px-4 py-2 text-[14px] tracking-wide text-[#7E5D28]"
                    style={{ borderColor: "rgba(126,93,40,0.28)", background: TINT, ["--i" as string]: i }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-[16px] leading-[2] text-[#2B2318]">
                每一段，都有一個信得過的人可以問。
              </p>
            </Reveal>

            {/* 三大分區總覽 */}
            <div className="mt-20 space-y-12">
              {CHAIN_GROUPS.map((group, gi) => {
                const members = CHAINS.filter((c) => c.group === group.name);
                return (
                  <Reveal key={group.name} variant="up" delay={gi * 90}>
                    <div>
                      <div className="mb-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-[19px] font-bold text-[#2B2318]">
                          {group.name}
                        </h3>
                        <span className="text-[12px] tracking-[0.28em] text-[#7E5D28]">
                          {group.tagline}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-px sm:grid-cols-5" style={{ background: LINE }}>
                        {members.map((chain, i) => (
                          <a
                            key={chain.no}
                            href={`#chain-${chain.no}`}
                            className="stagger-item group flex flex-col items-center gap-2 px-4 py-7 transition-colors hover:bg-[#F7F1E6]"
                            style={{ background: C.card, ["--i" as string]: i }}
                          >
                            <ChainIcon name={chain.icon} size={30} />
                            <span className="font-[family-name:var(--font-noto-serif-tc)] text-[12px] font-bold text-[#B08D4F]">
                              {chain.no}
                            </span>
                            <span className="text-[13.5px] font-semibold text-[#2B2318] transition-colors group-hover:text-[#7E5D28]">
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

        {/* 15 條鏈細節 */}
        <div className="border-t" style={{ borderColor: LINE_SOFT, background: C.band }}>
          <div className="mx-auto max-w-5xl px-6 py-24 sm:px-10 sm:py-32">
            <div className="flex flex-col gap-px" style={{ background: LINE }}>
              {CHAINS.map((chain) => (
                <Reveal key={chain.no} id={`chain-${chain.no}`} variant="up" threshold={0.08} className="scroll-mt-20">
                  <article
                    className="grid gap-6 px-6 py-10 sm:grid-cols-[auto_1fr] sm:gap-8 sm:px-10 sm:py-12"
                    style={{ background: C.card }}
                  >
                    <div className="flex items-center gap-4 sm:w-[92px] sm:flex-col sm:items-start sm:gap-2">
                      <ChainIcon name={chain.icon} size={38} />
                      <p className="font-[family-name:var(--font-noto-serif-tc)] text-[26px] leading-none font-bold text-[#B08D4F]">
                        {chain.no}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <h3 className="font-[family-name:var(--font-noto-serif-tc)] text-[20px] font-bold text-[#2B2318] sm:text-[23px]">
                          {chain.name}
                        </h3>
                        <span className="text-[11px] tracking-[0.26em] text-[#7E5D28]">
                          {chain.group}
                        </span>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {chain.items.map((item, k) => (
                          <span
                            key={item}
                            className="stagger-item border px-3 py-1.5 text-[12.5px] text-[#4C4236]"
                            style={{ borderColor: "rgba(126,93,40,0.26)", ["--i" as string]: k }}
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 px-5 py-4" style={{ background: TINT }}>
                        <p className="mb-2 text-[11px] font-semibold tracking-[0.3em] text-[#7E5D28]">
                          舉個例
                        </p>
                        <p className="text-[14px] leading-[2] text-[#6B5F51]">{chain.example}</p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 收尾 ══════════ */}
      <section className="relative overflow-hidden border-t" style={{ borderColor: LINE_SOFT }}>
        <div className="absolute inset-0 opacity-35">
          <SceneImage
            src={SCENE.closing}
            alt="女性經營者"
            placeholder="情境圖 05 ─ 收尾"
            ratio="auto"
            scrim={0}
            className="h-full w-full"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(250,247,242,0.94) 0%, rgba(250,247,242,0.88) 45%, rgba(250,247,242,0.98) 100%)",
          }}
        />

        <div className="relative mx-auto max-w-3xl px-6 py-28 text-center sm:px-10 sm:py-36">
          <Reveal variant="up">
            <p className="font-[family-name:var(--font-noto-serif-tc)] text-[24px] leading-[1.9] font-bold text-[#2B2318] sm:text-[32px]">
              把這群女生組建在一起，
              <br />
              這個環境就什麼都知道了。
            </p>
          </Reveal>
          <Reveal variant="wipe" delay={200}>
            <div
              className="mx-auto mt-10 h-px w-24"
              style={{ background: `linear-gradient(90deg, transparent, ${C.deco}, transparent)` }}
            />
          </Reveal>
        </div>
      </section>

      <footer className="border-t px-6 py-12 text-center sm:px-10" style={{ borderColor: LINE_SOFT }}>
        <p className="text-[12px] tracking-[0.28em] text-[#6B5F51]">BNI - 富婆分會</p>
      </footer>
    </main>
  );
}
