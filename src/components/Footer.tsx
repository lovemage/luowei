"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [footerText, setFooterText] = useState("");

  useEffect(() => {
    fetch("/api/settings/public")
      .then((res) => res.json())
      .then((data) => setFooterText(data.footerText || ""))
      .catch(() => {});
  }, []);

  return (
    <footer className="mt-auto pt-14 text-center pb-8">
      <p className="font-[family-name:var(--font-noto-serif-tc)] text-sm tracking-[0.2em] text-text-secondary">
        無限進步｜個人成長
      </p>
      {footerText && (
        <p className="mt-3 text-xs text-text-secondary/60 tracking-wide max-w-xs mx-auto">
          {footerText}
        </p>
      )}
      <p className="mt-4 text-xs text-text-secondary/40 tracking-widest">
        羅威傳媒 | Louwei Media
      </p>
    </footer>
  );
}
