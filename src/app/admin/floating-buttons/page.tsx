"use client";

import { useEffect, useState, useRef } from "react";

interface FloatingButton {
  key: string;
  label: string;
  href: string;
  iconUrl: string;
}

const MAX_BUTTONS = 6;

export default function AdminFloatingButtonsPage() {
  const [buttons, setButtons] = useState<FloatingButton[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    fetchButtons();
  }, []);

  const fetchButtons = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/floating-buttons");
      const data = await res.json();
      setButtons(Array.isArray(data) ? data : []);
    } catch {
      setButtons([]);
    }
    setLoading(false);
  };

  const handleAdd = () => {
    if (buttons.length >= MAX_BUTTONS) {
      setMessage(`最多只能新增 ${MAX_BUTTONS} 個按鈕`);
      return;
    }
    const newKey = `btn-${Date.now()}`;
    setButtons([...buttons, { key: newKey, label: "", href: "", iconUrl: "" }]);
  };

  const handleUpdate = (index: number, field: keyof FloatingButton, value: string) => {
    const updated = [...buttons];
    updated[index] = { ...updated[index], [field]: value };
    setButtons(updated);
  };

  const handleDelete = (index: number) => {
    if (!window.confirm("確定要刪除這個按鈕嗎？")) return;
    setButtons(buttons.filter((_, i) => i !== index));
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updated = [...buttons];
    [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
    setButtons(updated);
  };

  const handleMoveDown = (index: number) => {
    if (index === buttons.length - 1) return;
    const updated = [...buttons];
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setButtons(updated);
  };

  const handleIconUpload = async (index: number, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "icons");
    formData.append("alt", buttons[index].label || "icon");

    try {
      const res = await fetch("/api/admin/media/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const media = await res.json();
      handleUpdate(index, "iconUrl", media.url);
    } catch {
      setMessage("圖示上傳失敗");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/floating-buttons", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buttons),
      });
      if (!res.ok) throw new Error("Save failed");
      setMessage("儲存成功！");
    } catch {
      setMessage("儲存失敗，請重試");
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500 text-sm">載入中...</div>;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">懸浮按鈕管理</h1>
        <button
          onClick={handleAdd}
          disabled={buttons.length >= MAX_BUTTONS}
          className="inline-flex justify-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          新增按鈕
        </button>
      </div>

      {message && (
        <div
          className={`mb-4 px-4 py-2 rounded-lg text-sm ${
            message.includes("成功")
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message}
        </div>
      )}

      {buttons.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500 text-sm">
          尚無懸浮按鈕，請點擊「新增按鈕」開始設定
        </div>
      ) : (
        <div className="space-y-4">
          {buttons.map((btn, index) => (
            <div
              key={btn.key}
              className="bg-white border border-gray-200 rounded-xl p-4 md:p-5"
            >
              <div className="flex items-start gap-3 md:gap-4">
                {/* Icon preview */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                    {btn.iconUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={btn.iconUrl}
                        alt={btn.label}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">ICON</span>
                    )}
                  </div>
                </div>

                {/* Fields */}
                <div className="flex-1 min-w-0 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">按鈕名稱</label>
                      <input
                        type="text"
                        value={btn.label}
                        onChange={(e) => handleUpdate(index, "label", e.target.value)}
                        placeholder="例如：LINE 課程"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">連結網址</label>
                      <input
                        type="text"
                        value={btn.href}
                        onChange={(e) => handleUpdate(index, "href", e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 md:gap-3">
                    <input
                      type="file"
                      accept="image/*"
                      ref={(el) => { fileInputRefs.current[btn.key] = el; }}
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleIconUpload(index, file);
                      }}
                    />
                    <button
                      onClick={() => fileInputRefs.current[btn.key]?.click()}
                      className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                    >
                      上傳圖示
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500 text-sm px-2 py-1.5 hover:text-red-700 transition-colors"
                    >
                      刪除
                    </button>
                  </div>
                </div>

                {/* Reorder arrows */}
                <div className="flex flex-col gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="w-10 h-10 md:w-9 md:h-9 flex items-center justify-center text-gray-400 hover:text-gray-700 active:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100 transition-colors"
                    title="上移"
                    aria-label="上移"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleMoveDown(index)}
                    disabled={index === buttons.length - 1}
                    className="w-10 h-10 md:w-9 md:h-9 flex items-center justify-center text-gray-400 hover:text-gray-700 active:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg hover:bg-gray-100 transition-colors"
                    title="下移"
                    aria-label="下移"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {buttons.length > 0 && (
        <div
          className="mt-6 sticky bottom-0 -mx-4 px-4 py-3 bg-white/95 backdrop-blur border-t border-gray-200 md:static md:mx-0 md:px-0 md:py-0 md:bg-transparent md:backdrop-blur-none md:border-0 md:flex md:justify-end"
          style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
        >
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 md:py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 active:bg-blue-800 transition-colors disabled:opacity-50"
          >
            {saving ? "儲存中..." : "儲存設定"}
          </button>
        </div>
      )}
    </div>
  );
}
