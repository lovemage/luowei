"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";

interface PageData {
  slug: string;
  title: string;
  heroImage?: string;
  metaTitle?: string;
  metaDesc?: string;
  sections: string | Record<string, unknown>[];
}

export default function EditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [page, setPage] = useState<PageData | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/admin/pages/${slug}`)
      .then((r) => r.json())
      .then(setPage);
  }, [slug]);

  async function handleSave() {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch(`/api/admin/pages/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(page),
      });
      if (res.ok) setMessage("儲存成功");
      else setMessage("儲存失敗");
    } finally {
      setSaving(false);
    }
  }

  if (!page) return <div className="text-gray-500">載入中...</div>;

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

      <div className="space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">標題</label>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
          <input
            value={page.metaTitle || ""}
            onChange={(e) => setPage({ ...page, metaTitle: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
          <textarea
            value={page.metaDesc || ""}
            onChange={(e) => setPage({ ...page, metaDesc: e.target.value })}
            rows={2}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sections (JSON)</label>
          <textarea
            value={typeof page.sections === "string" ? page.sections : JSON.stringify(page.sections, null, 2)}
            onChange={(e) => setPage({ ...page, sections: e.target.value })}
            rows={12}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono text-gray-900 bg-white focus:outline-none focus:border-blue-500 resize-y"
          />
        </div>

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
    </div>
  );
}
