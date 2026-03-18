"use client";

import { useEffect, useState } from "react";

interface Announcement {
  id: string;
  text: string;
  visible: boolean;
}

interface AnnouncementConfig {
  enabled: boolean;
  effect: string;
  items: Announcement[];
}

const EFFECTS = [
  { value: "right-to-left", label: "右至左滾動" },
  { value: "left-to-right", label: "左至右滾動" },
  { value: "typewriter", label: "打字機" },
  { value: "blink", label: "閃爍" },
  { value: "static", label: "固定顯示" },
];

const MAX_ANNOUNCEMENTS = 10;

export default function AdminAnnouncementsPage() {
  const [config, setConfig] = useState<AnnouncementConfig>({
    enabled: true,
    effect: "right-to-left",
    items: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/announcements")
      .then((res) => res.json())
      .then((data) => {
        setConfig({
          enabled: data.enabled ?? true,
          effect: data.effect || "right-to-left",
          items: Array.isArray(data.items) ? data.items : [],
        });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = () => {
    if (config.items.length >= MAX_ANNOUNCEMENTS) {
      setMessage(`最多只能新增 ${MAX_ANNOUNCEMENTS} 則公告`);
      return;
    }
    setConfig({
      ...config,
      items: [...config.items, { id: `ann-${Date.now()}`, text: "", visible: true }],
    });
  };

  const updateItem = (index: number, field: keyof Announcement, value: string | boolean) => {
    const updated = [...config.items];
    updated[index] = { ...updated[index], [field]: value };
    setConfig({ ...config, items: updated });
  };

  const deleteItem = (index: number) => {
    if (!window.confirm("確定要刪除這則公告嗎？")) return;
    setConfig({ ...config, items: config.items.filter((_, i) => i !== index) });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/announcements", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      if (!res.ok) throw new Error();
      setMessage("儲存成功！");
    } catch {
      setMessage("儲存失敗，請重試");
    }
    setSaving(false);
  };

  if (loading) return <div className="p-8 text-center text-gray-500 text-sm">載入中...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">公告管理</h1>
        <button
          onClick={handleAdd}
          disabled={config.items.length >= MAX_ANNOUNCEMENTS}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          新增公告
        </button>
      </div>

      {message && (
        <div className={`mb-4 px-4 py-2 rounded-lg text-sm ${
          message.includes("成功")
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          {message}
        </div>
      )}

      {/* Global Settings */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6">
        <h2 className="text-sm font-bold text-gray-900 mb-4">全域設定</h2>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-700">公告功能</span>
          <button
            onClick={() => setConfig({ ...config, enabled: !config.enabled })}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              config.enabled ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                config.enabled ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2">顯示效果</label>
          <div className="flex flex-wrap gap-2">
            {EFFECTS.map((eff) => (
              <button
                key={eff.value}
                onClick={() => setConfig({ ...config, effect: eff.value })}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  config.effect === eff.value
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {eff.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Announcement Items */}
      {config.items.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500 text-sm">
          尚無公告，請點擊「新增公告」開始設定
        </div>
      ) : (
        <div className="space-y-4">
          {config.items.map((ann, index) => (
            <div key={ann.id} className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-mono">#{index + 1}</span>
                  <button
                    onClick={() => updateItem(index, "visible", !ann.visible)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      ann.visible
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-gray-100 text-gray-500 border border-gray-200"
                    }`}
                  >
                    {ann.visible ? "顯示中" : "已隱藏"}
                  </button>
                </div>
                <button
                  onClick={() => deleteItem(index)}
                  className="text-red-500 text-sm hover:text-red-700 transition-colors"
                >
                  刪除
                </button>
              </div>
              <textarea
                value={ann.text}
                onChange={(e) => updateItem(index, "text", e.target.value)}
                placeholder="請輸入公告文字..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {saving ? "儲存中..." : "儲存設定"}
        </button>
      </div>
    </div>
  );
}
