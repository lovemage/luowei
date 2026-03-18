"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

interface Section {
  key: string;
  label: string;
  content: string;
}

interface PageData {
  slug: string;
  title: string;
  heroImage?: string;
  metaTitle?: string;
  metaDesc?: string;
  sections: string | Section[];
}

function parseSections(raw: string | Section[] | undefined): Section[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

export default function EditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [page, setPage] = useState<PageData | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/admin/pages/${slug}`)
      .then((r) => r.json())
      .then((data: PageData) => {
        setPage(data);
        setSections(parseSections(data.sections));
      });
  }, [slug]);

  function updateSection(index: number, field: keyof Section, value: string) {
    setSections((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  async function handleSave() {
    if (!page) return;
    setSaving(true);
    setMessage("");
    try {
      const payload = {
        ...page,
        sections: JSON.stringify(sections),
      };
      const res = await fetch(`/api/admin/pages/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) setMessage("儲存成功");
      else setMessage("儲存失敗");
    } finally {
      setSaving(false);
    }
  }

  if (!page) return <div className="text-gray-500 p-8">載入中...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">編輯頁面: {page.slug}</h1>
        <button
          onClick={() => router.back()}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          返回
        </button>
      </div>

      {/* 基本設定 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">基本設定</h2>
        <div className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">頁面標題</label>
            <input
              value={page.title}
              onChange={(e) => setPage({ ...page, title: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Hero 圖片 URL</label>
            <input
              value={page.heroImage || ""}
              onChange={(e) => setPage({ ...page, heroImage: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
              placeholder="https://your-bucket-domain/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SEO 標題</label>
            <input
              value={page.metaTitle || ""}
              onChange={(e) => setPage({ ...page, metaTitle: e.target.value })}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SEO 描述</label>
            <textarea
              value={page.metaDesc || ""}
              onChange={(e) => setPage({ ...page, metaDesc: e.target.value })}
              rows={2}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>
        </div>
      </div>

      {/* 頁面內容 */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">頁面內容</h2>

        {sections.length === 0 ? (
          <p className="text-sm text-gray-500">此頁面尚未設定可編輯內容</p>
        ) : (
          <div className="space-y-4 max-w-2xl">
            {sections.map((section, index) => (
              <div
                key={section.key || index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <span className="inline-block text-xs font-medium text-gray-500 bg-gray-100 rounded px-2 py-0.5 mb-3">
                  {section.label || section.key}
                </span>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">標題</label>
                    <input
                      value={section.label}
                      onChange={(e) => updateSection(index, "label", e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">內容</label>
                    <textarea
                      value={section.content}
                      onChange={(e) => updateSection(index, "content", e.target.value)}
                      rows={5}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500 resize-y"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 儲存按鈕 */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {saving ? "儲存中..." : "儲存"}
        </button>
        {message && (
          <span className={`text-sm ${message.includes("成功") ? "text-green-600" : "text-red-600"}`}>
            {message}
          </span>
        )}
      </div>
    </div>
  );
}
