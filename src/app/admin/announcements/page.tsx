"use client";

import { useEffect, useState } from "react";

interface Announcement {
  id: string;
  text: string;
  visible: boolean;
}

const MAX_ANNOUNCEMENTS = 10;

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/announcements");
      const data = await res.json();
      setAnnouncements(Array.isArray(data) ? data : []);
    } catch {
      setAnnouncements([]);
    }
    setLoading(false);
  };

  const handleAdd = () => {
    if (announcements.length >= MAX_ANNOUNCEMENTS) {
      setMessage(`最多只能新增 ${MAX_ANNOUNCEMENTS} 則公告`);
      return;
    }
    setAnnouncements([
      ...announcements,
      { id: `ann-${Date.now()}`, text: "", visible: true },
    ]);
  };

  const handleUpdate = (index: number, field: keyof Announcement, value: string | boolean) => {
    const updated = [...announcements];
    updated[index] = { ...updated[index], [field]: value };
    setAnnouncements(updated);
  };

  const handleDelete = (index: number) => {
    if (!window.confirm("確定要刪除這則公告嗎？")) return;
    setAnnouncements(announcements.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/announcements", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(announcements),
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">公告管理</h1>
        <button
          onClick={handleAdd}
          disabled={announcements.length >= MAX_ANNOUNCEMENTS}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          新增公告
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

      {announcements.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500 text-sm">
          尚無公告，請點擊「新增公告」開始設定
        </div>
      ) : (
        <div className="space-y-4">
          {announcements.map((ann, index) => (
            <div
              key={ann.id}
              className="bg-white border border-gray-200 rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <button
                  onClick={() => handleUpdate(index, "visible", !ann.visible)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    ann.visible
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-gray-100 text-gray-500 border border-gray-200"
                  }`}
                >
                  {ann.visible ? "顯示中" : "已隱藏"}
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 text-sm hover:text-red-700 transition-colors"
                >
                  刪除
                </button>
              </div>
              <textarea
                value={ann.text}
                onChange={(e) => handleUpdate(index, "text", e.target.value)}
                placeholder="請輸入公告文字..."
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          ))}
        </div>
      )}

      {announcements.length > 0 && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saving ? "儲存中..." : "儲存"}
          </button>
        </div>
      )}
    </div>
  );
}
