"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TabSwitcher from "@/components/TabSwitcher";
import CaseLogoWall from "@/components/CaseLogoWall";
import CaseDetailModal from "@/components/CaseDetailModal";

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

export default function CasesPage() {
  const [activeTab, setActiveTab] = useState("short-video");
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<CaseItem | null>(null);

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
      <Link
        href="/"
        className="self-start text-sm text-accent hover:text-accent-hover transition-colors mb-8"
      >
        ← 返回首頁
      </Link>

      <h1 className="font-[family-name:var(--font-noto-serif-tc)] text-[22px] font-bold text-gold-shine mb-2">
        案例展示
      </h1>
      <p className="text-sm text-text-secondary mb-8">
        成功學員的真實故事
      </p>

      <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full mb-8" />

      <div className="w-full">
        <TabSwitcher tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {loading ? (
        <p className="text-sm text-text-secondary py-12">載入中...</p>
      ) : (
        <CaseLogoWall cases={cases} onSelect={setSelected} />
      )}

      <CaseDetailModal caseData={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
