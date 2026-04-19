"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface MediaItem {
  id: string;
  url: string;
  publicId: string;
  alt: string | null;
  folder: string | null;
  createdAt: string;
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/media");
    const data = await res.json();
    setMedia(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        fetchMedia();
      } else {
        alert("上傳失敗");
      }
    } catch {
      alert("上傳失敗");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("確定刪除此圖片？")) return;
    await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
    fetchMedia();
  }

  async function handleCopy(id: string, url: string) {
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">圖片庫</h1>

      <label className="block mb-6 cursor-pointer">
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
          {uploading ? (
            <p className="text-sm text-gray-500">上傳中...</p>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-1">點擊或拖曳上傳圖片</p>
              <p className="text-xs text-gray-400">支援 JPG、PNG、WebP</p>
            </>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
          disabled={uploading}
        />
      </label>

      {loading ? (
        <p className="text-sm text-gray-500">載入中...</p>
      ) : media.length === 0 ? (
        <p className="text-sm text-gray-500">尚無圖片</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {media.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-gray-200 overflow-hidden bg-white group"
            >
              <div className="aspect-square bg-gray-100 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.url}
                  alt={item.alt || ""}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-2 flex gap-1">
                <button
                  onClick={() => handleCopy(item.id, item.url)}
                  className="flex-1 text-xs px-2 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                >
                  {copiedId === item.id ? "已複製" : "複製網址"}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-xs px-2 py-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                >
                  刪除
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
