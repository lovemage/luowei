"use client";

import { useState } from "react";
import Link from "next/link";

const socials = [
  { label: "LINE 課程", href: "https://lin.ee/L8iPk8a", icon: "L1" },
  { label: "LINE 企業", href: "https://lin.ee/htTdJSH", icon: "L2" },
  { label: "TikTok", href: "https://www.tiktok.com/@luoweimedia", icon: "TT" },
  { label: "Instagram", href: "https://www.instagram.com/lowemedia_", icon: "IG" },
];

export default function FloatingButtons() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-4 z-50 flex flex-col-reverse items-end gap-3">
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform duration-200 active:scale-95"
        aria-label="社群連結"
      >
        <span
          className="text-lg transition-transform duration-200"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0)" }}
        >
          +
        </span>
      </button>

      {/* Social buttons */}
      {open &&
        socials.map((s, i) => (
          <Link
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="animate-fade-up flex h-10 items-center gap-2 rounded-full bg-bg-surface px-4 text-xs font-medium text-text-primary shadow-lg border border-divider transition-colors hover:bg-bg-surface-light"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <span className="text-accent font-bold">{s.icon}</span>
            <span>{s.label}</span>
          </Link>
        ))}
    </div>
  );
}
