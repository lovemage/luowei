"use client";

import { useEffect } from "react";

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
};

export default function CaseDetailModal({ caseData, onClose }: CaseDetailModalProps) {
  useEffect(() => {
    if (caseData) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [caseData]);

  if (!caseData) return null;

  const statsEntries = Object.entries(caseData.stats);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-[430px] max-h-[85dvh] mx-4 bg-surface rounded-2xl overflow-y-auto animate-slide-up">
        {/* Close button */}
        <button
          onClick={onClose}
          className="sticky top-0 right-0 float-right m-4 w-8 h-8 flex items-center justify-center rounded-full bg-surface-light text-text-secondary hover:text-text-primary transition-colors z-10"
        >
          ✕
        </button>

        <div className="px-6 pt-10 pb-8 flex flex-col items-center">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent/40 shadow-[0_0_20px_rgba(226,193,145,0.15)] mb-4">
            <img
              src={caseData.avatarUrl}
              alt={caseData.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Name & Title */}
          <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-xl font-bold text-text-primary mb-1">
            {caseData.name}
          </h2>
          <p className="text-sm text-accent mb-6">{caseData.title}</p>

          {/* Stats */}
          {statsEntries.length > 0 && (
            <div className="flex gap-3 mb-8 w-full">
              {statsEntries.map(([key, value]) => (
                <div
                  key={key}
                  className="flex-1 bg-surface-light rounded-xl py-3 px-2 text-center border border-divider"
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
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-divider to-transparent mb-6" />

          {/* Bio */}
          <div className="w-full">
            <h3 className="text-sm font-medium text-accent tracking-widest mb-3">
              自我介紹
            </h3>
            <div className="text-sm text-text-secondary leading-relaxed whitespace-pre-line">
              {caseData.bio}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
