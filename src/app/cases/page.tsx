"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TabSwitcher from "@/components/TabSwitcher";
import CaseLogoWall from "@/components/CaseLogoWall";
import CaseDetailModal from "@/components/CaseDetailModal";
import Footer from "@/components/Footer";

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

const TABS = [
  { key: "short-video", label: "短影音案例" },
  { key: "course", label: "課程案例" },
];

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4 w-full py-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-2">
          <div
            className="w-20 h-20 rounded-full bg-surface-light"
            style={{
              animation: "skeleton-pulse 1.5s ease-in-out infinite",
              animationDelay: `${i * 100}ms`,
            }}
          />
          <div
            className="w-12 h-3 rounded bg-surface-light"
            style={{
              animation: "skeleton-pulse 1.5s ease-in-out infinite",
              animationDelay: `${i * 100 + 50}ms`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default function CasesPage() {
  const [activeTab, setActiveTab] = useState("short-video");
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<CaseItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/cases?category=${activeTab}`)
      .then((res) => res.json())
      .then((data) => {
        setCases(data);
        setLoading(false);
      });
  }, [activeTab]);

  return (
    <main className="relative z-10 flex min-h-dvh flex-col items-center px-6 pt-12 pb-20">
      {/* Back link */}
      <Link
        href="/"
        className="self-start text-sm text-accent hover:text-accent-hover transition-colors mb-8"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateX(0)" : "translateX(-10px)",
          transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
        }}
      >
        ← 返回首頁
      </Link>

      {/* Title */}
      <h1
        className="font-[family-name:var(--font-noto-serif-tc)] text-[22px] font-bold text-gold-shine mb-2"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.5s ease 0.1s, transform 0.5s cubic-bezier(0.25, 1, 0.5, 1) 0.1s",
        }}
      >
        案例展示
      </h1>
      <p
        className="text-sm text-text-secondary mb-8"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.5s ease 0.2s, transform 0.5s cubic-bezier(0.25, 1, 0.5, 1) 0.2s",
        }}
      >
        成功學員的真實故事
      </p>

      {/* Divider */}
      <div
        className="h-[2px] w-12 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full mb-8"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "scaleX(1)" : "scaleX(0)",
          transition: "opacity 0.4s ease 0.3s, transform 0.5s cubic-bezier(0.25, 1, 0.5, 1) 0.3s",
        }}
      />

      {/* Tabs */}
      <div
        className="w-full"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.4s ease 0.35s, transform 0.4s cubic-bezier(0.25, 1, 0.5, 1) 0.35s",
        }}
      >
        <TabSwitcher tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* Content */}
      {loading ? (
        <LoadingSkeleton />
      ) : (
        <CaseLogoWall cases={cases} onSelect={setSelected} />
      )}

      <CaseDetailModal caseData={selected} onClose={() => setSelected(null)} />

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes skeleton-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}} />
    </main>
  );
}
