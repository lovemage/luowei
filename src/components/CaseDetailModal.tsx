"use client";

import { useEffect, useState, useCallback } from "react";

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

interface CaseDetailModalProps {
  caseData: CaseItem | null;
  onClose: () => void;
}

const STAT_LABELS: Record<string, string> = {
  followers: "粉絲",
  likes: "讚數",
  views: "觀看",
  platform: "平台",
  date: "日期",
  location: "地點",
  students: "學員",
  warehouse: "倉儲",
  vip: "會員",
  type: "類型",
};

export default function CaseDetailModal({ caseData, onClose }: CaseDetailModalProps) {
  const [phase, setPhase] = useState<"closed" | "entering" | "open" | "exiting">("closed");

  useEffect(() => {
    if (caseData) {
      setPhase("entering");
      document.body.style.overflow = "hidden";
      const t = setTimeout(() => setPhase("open"), 20);
      return () => clearTimeout(t);
    } else {
      document.body.style.overflow = "";
      setPhase("closed");
    }
    return () => { document.body.style.overflow = ""; };
  }, [caseData]);

  const handleClose = useCallback(() => {
    setPhase("exiting");
    setTimeout(() => {
      onClose();
      setPhase("closed");
    }, 250);
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && phase === "open") handleClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [phase, handleClose]);

  if (phase === "closed" && !caseData) return null;
  const data = caseData;
  if (!data) return null;

  const statsEntries = Object.entries(data.stats);
  const isOpen = phase === "open";
  const isExiting = phase === "exiting";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bg-primary/78 backdrop-blur-sm"
        onClick={handleClose}
        style={{
          opacity: isOpen ? 1 : isExiting ? 0 : 0,
          transition: "opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-[430px] max-h-[85dvh] mx-4 bg-surface rounded-2xl overflow-y-auto"
        style={{
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? "translateY(0) scale(1)" : isExiting ? "translateY(20px) scale(0.97)" : "translateY(30px) scale(0.95)",
          transition: isExiting
            ? "opacity 0.2s ease, transform 0.2s ease"
            : "opacity 0.35s cubic-bezier(0.25, 1, 0.5, 1), transform 0.35s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="sticky top-0 right-0 float-right m-4 w-8 h-8 flex items-center justify-center rounded-full bg-surface-light text-text-secondary hover:text-text-primary hover:bg-surface-light/80 active:scale-90 transition-all duration-150 z-10"
        >
          ✕
        </button>

        <div className="px-6 pt-10 pb-8 flex flex-col items-center">
          {/* Avatar */}
          <div
            className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent/40 mb-4"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "scale(1)" : "scale(0.8)",
              transition: "opacity 0.4s ease 0.1s, transform 0.4s cubic-bezier(0.25, 1, 0.5, 1) 0.1s",
              boxShadow: "0 0 24px rgba(226, 193, 145, 0.2)",
            }}
          >
            <img src={data.avatarUrl} alt={data.name} className="w-full h-full object-cover" />
          </div>

          {/* Name */}
          <h2
            className="font-[family-name:var(--font-noto-serif-tc)] text-xl font-bold text-text-primary mb-1"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.4s ease 0.15s, transform 0.4s cubic-bezier(0.25, 1, 0.5, 1) 0.15s",
            }}
          >
            {data.name}
          </h2>

          {/* Title */}
          <p
            className="text-sm text-accent mb-6"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.4s ease 0.2s, transform 0.4s cubic-bezier(0.25, 1, 0.5, 1) 0.2s",
            }}
          >
            {data.title}
          </p>

          {/* Stats */}
          {statsEntries.length > 0 && (
            <div className="flex gap-3 mb-8 w-full">
              {statsEntries.map(([key, value], i) => (
                <div
                  key={key}
                  className="flex-1 bg-surface-light rounded-xl py-3 px-2 text-center border border-divider"
                  style={{
                    opacity: isOpen ? 1 : 0,
                    transform: isOpen ? "translateY(0)" : "translateY(12px)",
                    transition: `opacity 0.4s ease ${0.25 + i * 0.06}s, transform 0.4s cubic-bezier(0.25, 1, 0.5, 1) ${0.25 + i * 0.06}s`,
                  }}
                >
                  <p className="text-lg font-bold text-accent">{value}</p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {STAT_LABELS[key] || key}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Divider */}
          <div
            className="h-[1px] w-full bg-gradient-to-r from-transparent via-divider to-transparent mb-6"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "scaleX(1)" : "scaleX(0)",
              transition: "opacity 0.3s ease 0.35s, transform 0.5s cubic-bezier(0.25, 1, 0.5, 1) 0.35s",
            }}
          />

          {/* Bio */}
          <div
            className="w-full"
            style={{
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.4s ease 0.4s, transform 0.4s cubic-bezier(0.25, 1, 0.5, 1) 0.4s",
            }}
          >
            <h3 className="text-sm font-medium text-accent tracking-widest mb-3">
              合作見證
            </h3>
            <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
              {data.bio}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
