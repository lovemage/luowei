"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface NavSection {
  id: string;
  label: string;
  /** 導覽列上的小序號 */
  index: string;
  /** 敘事角色（WHY / HOW / WHO），點出這一段在全頁起承轉合的位置 */
  role?: string;
}

interface SectionNavProps {
  sections: NavSection[];
  /** 品牌字樣，點擊回到頁首 */
  brand: string;
  /** 選用的行動呼籲。形象頁不放，招募頁才給。 */
  ctaHref?: string;
  ctaLabel?: string;
}

const NAV_HEIGHT = 58;

export default function SectionNav({ sections, brand, ctaHref, ctaLabel }: SectionNavProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const [condensed, setCondensed] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  /* 捲動進度 + 依捲動位置判定目前段落 */
  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const scrollable = doc.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(scrollTop / scrollable, 1) : 0);
      setCondensed(scrollTop > 24);

      // 以視窗上緣往下 40% 的位置當作判定線
      const line = scrollTop + window.innerHeight * 0.4;
      let current = sections[0]?.id ?? "";
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + scrollTop;
        if (top <= line) current = section.id;
      }
      setActiveId(current);
    }

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  /* 目前段落的按鈕自動捲進視野（手機橫向捲動時） */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const button = list.querySelector<HTMLElement>(`[data-nav-id="${activeId}"]`);
    if (!button) return;
    // 用 rect 差值而非 offsetLeft：header 是 sticky，會成為 offsetParent，
    // offsetLeft 會把品牌字的寬度也算進去，導致作用中的按鈕被推出視野。
    const listRect = list.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const target =
      list.scrollLeft +
      (buttonRect.left - listRect.left) -
      (list.clientWidth - buttonRect.width) / 2;
    const max = list.scrollWidth - list.clientWidth;
    list.scrollTo({ left: Math.min(Math.max(target, 0), Math.max(max, 0)), behavior: "smooth" });
  }, [activeId]);

  const jumpTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top - NAV_HEIGHT + 1,
      behavior: reduced ? "auto" : "smooth",
    });
  }, []);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b transition-colors duration-500"
      style={{
        height: NAV_HEIGHT,
        borderColor: condensed ? "rgba(126,93,40,0.24)" : "rgba(126,93,40,0.10)",
        background: condensed ? "rgba(250,247,242,0.94)" : "rgba(250,247,242,0.72)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-stretch gap-3 px-4 sm:px-6">
        {/* 品牌 */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex shrink-0 items-center text-[13px] font-semibold tracking-[0.22em] text-[#7E5D28] sm:text-sm"
        >
          {brand}
        </button>

        {/* 分段 */}
        <nav
          ref={listRef}
          // min-w-0：Safari 的 flex 項目若不明確允許縮小，會被內容撐到 scrollWidth 而撐爆 header
          className="flex min-w-0 flex-1 items-stretch overflow-x-auto"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          aria-label="章節導覽"
        >
          <div className="flex items-stretch">
            {sections.map((section) => {
              const active = section.id === activeId;
              return (
                <button
                  key={section.id}
                  type="button"
                  data-nav-id={section.id}
                  onClick={() => jumpTo(section.id)}
                  aria-current={active ? "true" : undefined}
                  className={`relative flex shrink-0 items-center gap-1.5 px-3 text-[12px] tracking-[0.12em] whitespace-nowrap transition-colors duration-300 sm:px-4 sm:text-[13px] ${
                    active
                      ? "bg-[#7E5D28] font-bold text-[#FAF7F2]"
                      : "text-[#6B5F51] hover:text-[#7E5D28]"
                  }`}
                >
                  <span
                    className={`font-[family-name:var(--font-cormorant)] text-[11px] ${
                      active ? "text-[#FAF7F2]/70" : "text-[#B08D4F]"
                    }`}
                  >
                    {section.index}
                  </span>
                  {section.label}
                  {section.role && (
                    <span
                      className={`text-[9px] tracking-[0.18em] ${
                        active ? "text-[#FAF7F2]/60" : "text-[#B08D4F]/80"
                      }`}
                    >
                      {section.role}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* CTA（選用） */}
        {ctaHref && ctaLabel && (
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 items-center px-4 text-[12px] font-semibold tracking-[0.14em] text-[#FAF7F2] transition-opacity duration-300 hover:opacity-85 sm:flex"
            style={{ background: "#7E5D28" }}
          >
            {ctaLabel}
          </a>
        )}
      </div>

      {/* 進度條 */}
      <div
        className="absolute bottom-0 left-0 h-[2px] origin-left"
        style={{
          width: "100%",
          transform: `scaleX(${progress})`,
          background: "linear-gradient(90deg, #5E4418, #8F6B2E, #B08D4F)",
          transition: "transform 120ms linear",
        }}
      />
    </header>
  );
}
