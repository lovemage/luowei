"use client";

import { useState, useEffect } from "react";

interface CaseItem {
  id: number;
  slug: string;
  name: string;
  avatarUrl: string;
  category: string;
  title: string;
  bio: string;
  stats: Record<string, string>;
}

interface CaseLogoWallProps {
  cases: CaseItem[];
  onSelect: (c: CaseItem) => void;
}

export default function CaseLogoWall({ cases, onSelect }: CaseLogoWallProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Reset and re-trigger on cases change (tab switch)
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, [cases]);

  if (cases.length === 0) {
    return (
      <p className="text-center text-text-secondary text-sm py-12">
        尚無案例資料
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-4 w-full">
        {cases.map((c, i) => (
          <button
            key={c.id}
            onClick={() => onSelect(c)}
            className="flex flex-col items-center gap-2 group"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0) scale(1)" : "translateY(16px) scale(0.9)",
              transition: `opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1) ${i * 60}ms, transform 0.4s cubic-bezier(0.25, 1, 0.5, 1) ${i * 60}ms`,
            }}
          >
            <div className="case-avatar-ring relative w-20 h-20 rounded-full overflow-hidden border-2 border-accent/30 group-hover:border-accent group-active:scale-95 transition-all duration-200">
              <div className="case-glow absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <img
                src={c.avatarUrl}
                alt={c.name}
                className="w-full h-full object-cover relative z-[1]"
              />
            </div>
            <span className="text-xs text-text-secondary group-hover:text-accent transition-colors duration-200 text-center leading-tight">
              {c.name}
            </span>
          </button>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .case-glow {
          box-shadow: 0 0 20px rgba(226, 193, 145, 0.25), inset 0 0 20px rgba(226, 193, 145, 0.1);
        }
        .case-avatar-ring {
          box-shadow: 0 0 12px rgba(226, 193, 145, 0.12);
          transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.15s ease;
        }
        .case-avatar-ring:hover {
          box-shadow: 0 0 24px rgba(226, 193, 145, 0.3);
        }
        @media (prefers-reduced-motion: reduce) {
          .case-avatar-ring, .case-glow {
            transition: none !important;
          }
        }
      `}} />
    </>
  );
}
