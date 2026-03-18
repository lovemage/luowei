"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewCasePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    slug: "",
    name: "",
    avatarUrl: "",
    category: "short-video",
    title: "",
    bio: "",
    stats: "{}",
    order: 0,
    visible: true,
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          stats: JSON.parse(form.stats),
        }),
      });
      if (res.ok) router.push("/admin/cases");
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/cases" className="text-gray-500 hover:text-gray-700">← 返回</Link>
        <h1 className="text-2xl font-bold text-gray-900">新增案例</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL 識別碼)</label>
          <input
            type="text" required value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            placeholder="dr-frankshen"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">名稱</label>
          <input
            type="text" required value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">頭像圖片 URL</label>
          <input
            type="text" required value={form.avatarUrl}
            onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
            placeholder="/images/avatar.jpg 或 S3 URL"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">分類</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
          >
            <option value="short-video">短影音案例</option>
            <option value="course">課程案例</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">頭銜</label>
          <input
            type="text" required value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">自我介紹</label>
          <textarea
            required value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm h-40"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">數據亮點 (JSON)</label>
          <textarea
            value={form.stats}
            onChange={(e) => setForm({ ...form, stats: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono h-20"
            placeholder='{"followers": "12.8K", "likes": "132.6K"}'
          />
        </div>
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">排序</label>
            <input
              type="number" value={form.order}
              onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox" checked={form.visible}
                onChange={(e) => setForm({ ...form, visible: e.target.checked })}
              />
              顯示
            </label>
          </div>
        </div>
        <button
          type="submit" disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {saving ? "儲存中..." : "儲存"}
        </button>
      </form>
    </div>
  );
}
