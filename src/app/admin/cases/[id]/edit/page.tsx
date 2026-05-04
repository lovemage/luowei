"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

export default function EditCasePage() {
  const router = useRouter();
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: "",
    avatarUrl: "",
    category: "short-video",
    title: "",
    bio: "",
    order: 0,
    visible: true,
  });
  const [statRows, setStatRows] = useState([{ key: "", value: "" }]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/cases/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setForm({
          name: data.name,
          avatarUrl: data.avatarUrl,
          category: data.category,
          title: data.title,
          bio: data.bio,
          order: data.order,
          visible: data.visible,
        });
        const rows = Object.entries(data.stats ?? {}).map(([key, value]) => ({
          key,
          value: String(value ?? ""),
        }));
        setStatRows(rows.length > 0 ? rows : [{ key: "", value: "" }]);
        setLoading(false);
      });
  }, [id]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "cases");
      formData.append("alt", form.name || "案例頭像");
      const res = await fetch("/api/admin/media/upload", { method: "POST", body: formData });
      if (res.ok) {
        const media = await res.json();
        setForm((prev) => ({ ...prev, avatarUrl: media.url }));
      }
    } catch (err) {
      console.error(err);
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/cases/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          stats: Object.fromEntries(
            statRows
              .map((row) => [row.key.trim(), row.value.trim()] as const)
              .filter(([key, value]) => key && value)
          ),
        }),
      });
      if (res.ok) router.push("/admin/cases");
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  if (loading) return <div className="p-8 text-gray-500">載入中...</div>;

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/cases" className="text-gray-500 hover:text-gray-700">← 返回</Link>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">編輯案例</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 space-y-4 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">名稱</label>
          <input type="text" required value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">頭像圖片</label>
          <div className="flex flex-wrap items-center gap-3">
            {form.avatarUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={form.avatarUrl} alt="預覽" className="w-12 h-12 rounded-full object-cover border border-gray-200" />
            )}
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {uploading ? "上傳中..." : "重新上傳"}
            </button>
            {form.avatarUrl && (
              <span className="text-xs text-green-600">已上傳</span>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">分類</label>
          <select value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm">
            <option value="short-video">短影音案例</option>
            <option value="course">課程案例</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">頭銜</label>
          <input type="text" required value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">自我介紹</label>
          <textarea required value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm h-40" />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">數據亮點</label>
          {statRows.map((row, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={row.key}
                onChange={(e) =>
                  setStatRows((prev) =>
                    prev.map((item, i) => (i === index ? { ...item, key: e.target.value } : item))
                  )
                }
                className="w-1/2 border border-gray-200 rounded-lg px-3 py-2 text-sm"
                placeholder="欄位名稱，例如 followers"
              />
              <input
                type="text"
                value={row.value}
                onChange={(e) =>
                  setStatRows((prev) =>
                    prev.map((item, i) => (i === index ? { ...item, value: e.target.value } : item))
                  )
                }
                className="w-1/2 border border-gray-200 rounded-lg px-3 py-2 text-sm"
                placeholder="值，例如 12.8K"
              />
              <button
                type="button"
                onClick={() =>
                  setStatRows((prev) => (prev.length === 1 ? prev : prev.filter((_, i) => i !== index)))
                }
                className="px-3 py-2 text-sm border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                刪除
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setStatRows((prev) => [...prev, { key: "", value: "" }])}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            + 新增一列
          </button>
        </div>
        <div className="flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">排序</label>
            <input type="number" value={form.order}
              onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div className="pb-1">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={form.visible}
                onChange={(e) => setForm({ ...form, visible: e.target.checked })} />
              顯示
            </label>
          </div>
        </div>
        <button type="submit" disabled={saving}
          className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50">
          {saving ? "儲存中..." : "更新"}
        </button>
      </form>
    </div>
  );
}
