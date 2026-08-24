"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ApiButton {
  key: string;
  label: string;
  href: string;
  iconUrl: string;
}

interface SocialItem {
  href: string;
  label: string;
  icon: ReactNode;
}

/* ── Default hardcoded SVG icons (fallback) ── */
const lineSvg = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386a.63.63 0 0 1-.63-.629V8.108a.63.63 0 0 1 .63-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016a.63.63 0 0 1-.63.63.629.629 0 0 1-.51-.26l-2.443-3.317v2.947a.63.63 0 0 1-1.26 0V8.108a.63.63 0 0 1 .63-.63c.2 0 .385.095.505.26l2.449 3.32V8.108a.63.63 0 0 1 1.259 0v4.771zm-5.741 0a.63.63 0 0 1-1.26 0V8.108a.63.63 0 0 1 1.26 0v4.771zm-2.451.63H4.932a.63.63 0 0 1-.63-.63V8.108a.63.63 0 0 1 1.261 0v4.141h1.756c.348 0 .629.283.629.63a.629.629 0 0 1-.629.63M12 1.004C5.926 1.004 1 5.073 1 10.14c0 4.49 3.855 8.277 9.115 9.016.355.077.836.236.958.542.11.277.072.712.035.993l-.153.919c-.047.282-.22 1.104.966.602 1.186-.502 6.394-3.767 8.724-6.447C22.543 13.584 23 11.945 23 10.14 23 5.073 18.074 1.004 12 1.004" />
  </svg>
);

const tiktokSvg = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.19a8.16 8.16 0 0 0 4.77 1.53V7.27a4.85 4.85 0 0 1-1.01-.58z" />
  </svg>
);

const instagramSvg = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const groupSvg = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
  </svg>
);

const defaultSocials: SocialItem[] = [
  { href: "https://lin.ee/L8iPk8a", label: "課程", icon: lineSvg },
  { href: "https://lin.ee/htTdJSH", label: "企業服務", icon: lineSvg },
  { href: "https://line.me/ti/g2/YFj_Hpwy78dJ7dg8A22-vDai5321_dw9MU-_SQ?utm_source=invitation&utm_medium=link_copy&utm_campaign=default", label: "成長朋友圈", icon: groupSvg },
  { href: "https://www.tiktok.com/@luoweimedia", label: "TikTok", icon: tiktokSvg },
  { href: "https://www.instagram.com/lowemedia_", label: "Instagram", icon: instagramSvg },
];

function getDefaultIcon(label: string): ReactNode {
  const l = label.toLowerCase();
  if (l.includes("line") || l.includes("課程") || l.includes("企業")) return lineSvg;
  if (l.includes("朋友圈") || l.includes("group")) return groupSvg;
  if (l.includes("tiktok")) return tiktokSvg;
  if (l.includes("instagram") || l.includes("ig")) return instagramSvg;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.172 13.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.102 1.101" />
    </svg>
  );
}

/* /fupo 是獨立形象頁，只掛 LINE 與 IG 兩個窗口，不沿用全站的社群清單。 */
const FUPO_PATH = "/fupo";
const FUPO_LINE_URL = "https://lin.ee/PQzIWDd";
const FUPO_IG_URL = "https://www.instagram.com/bossluo__";

export default function FloatingButtons() {
  const pathname = usePathname();
  const isFupo = pathname === FUPO_PATH;

  const [open, setOpen] = useState(false);
  const [socials, setSocials] = useState<SocialItem[]>(defaultSocials);

  useEffect(() => {
    if (isFupo) return;
    fetch("/api/floating-buttons")
      .then((res) => res.json())
      .then((data: ApiButton[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setSocials(
            data.map((btn) => ({
              href: btn.href,
              label: btn.label,
              icon: btn.iconUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={btn.iconUrl}
                  alt={btn.label}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                getDefaultIcon(btn.label)
              ),
            }))
          );
        }
      })
      .catch(() => {});
  }, [isFupo]);

  // 兩顆按鈕直接連出去，不做展開；配色沿用該頁的深金／象牙。
  // 靠右對齊而非撐滿，兩顆寬度不同時右緣才會切齊。
  if (isFupo) {
    const pill =
      "flex items-center gap-2 rounded-full py-3 pl-4 pr-5 shadow-lg transition-opacity duration-300 hover:opacity-90";
    const pillStyle = { background: "#7E5D28", color: "#FAF7F2" };

    return (
      <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end gap-3">
        <a
          href={FUPO_IG_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="追蹤 Instagram"
          className={pill}
          style={pillStyle}
        >
          {instagramSvg}
          <span className="text-[13px] font-semibold tracking-[0.1em]">IG 追蹤</span>
        </a>
        <a
          href={FUPO_LINE_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="透過 LINE 聯繫"
          className={pill}
          style={pillStyle}
        >
          {lineSvg}
          <span className="text-[13px] font-semibold tracking-[0.1em]">LINE 聯繫</span>
        </a>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-4 z-50">
      {/* Vertically stacked social buttons */}
      {socials.map((s, i) => {
        const offset = (i + 1) * 56;
        return (
          <Link
            key={`${s.href}-${i}`}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="absolute flex items-center gap-0 transition-all duration-300"
            style={{
              bottom: 0,
              right: 0,
              transform: open
                ? `translateY(-${offset}px) scale(1)`
                : "translateY(0) scale(0)",
              opacity: open ? 1 : 0,
              transitionDelay: open ? `${i * 40}ms` : "0ms",
            }}
          >
            {/* Label */}
            <span
              className="whitespace-nowrap rounded-l-full bg-bg-surface border border-r-0 border-accent/40 px-3 py-2 text-[11px] font-medium text-accent shadow-lg"
            >
              {s.label}
            </span>
            {/* Icon circle */}
            <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-bg-surface text-accent border border-accent/40 shadow-lg hover:bg-accent hover:text-bg-primary transition-colors">
              {s.icon}
            </span>
          </Link>
        );
      })}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative flex h-12 w-12 items-center justify-center rounded-full bg-accent text-bg-primary shadow-lg transition-transform duration-300 active:scale-95"
        aria-label="社群連結"
        style={{ transform: open ? "rotate(45deg)" : "rotate(0)" }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  );
}
