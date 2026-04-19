"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Case {
  id: number;
  slug: string;
  name: string;
  avatarUrl: string;
  category: string;
  title: string;
  order: number;
  visible: boolean;
}

const TABS = [
  { key: "short-video", label: "短影音案例" },
  { key: "course", label: "課程案例" },
];

export default function AdminCasesPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("short-video");

  const fetchCases = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/cases");
    const data = await res.json();
    setCases(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const filteredCases = cases.filter((c) => c.category === activeTab);

  const handleDelete = async (id: number) => {
    if (!window.confirm("確定要刪除這個案例嗎？")) return;
    await fetch(`/api/admin/cases/${id}`, { method: "DELETE" });
    fetchCases();
  };

  const toggleVisible = async (c: Case) => {
    await fetch(`/api/admin/cases/${c.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...c, visible: !c.visible }),
    });
    fetchCases();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">案例管理</h1>
        <Link
          href="/admin/cases/new"
          className="inline-flex justify-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          新增案例
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4 overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-shrink-0 px-4 py-2.5 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
            <span className="ml-1.5 text-xs text-gray-400">
              ({cases.filter((c) => c.category === tab.key).length})
            </span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500 text-sm">
          載入中...
        </div>
      ) : filteredCases.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500 text-sm">
          此分類尚無案例資料
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">頭像</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">名稱</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">頭銜</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">排序</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">顯示</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredCases.map((c) => (
                  <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-4 py-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.avatarUrl} alt={c.name} className="w-10 h-10 rounded-full object-cover" />
                    </td>
                    <td className="px-4 py-3 text-gray-900">{c.name}</td>
                    <td className="px-4 py-3 text-gray-500">{c.title}</td>
                    <td className="px-4 py-3 text-gray-500">{c.order}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleVisible(c)}
                        className={`text-xs px-2 py-1 rounded ${
                          c.visible
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {c.visible ? "顯示" : "隱藏"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <Link href={`/admin/cases/${c.id}/edit`} className="text-blue-600 hover:text-blue-800">
                        編輯
                      </Link>
                      <button onClick={() => handleDelete(c.id)} className="text-red-500 hover:text-red-700">
                        刪除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {filteredCases.map((c) => (
              <div key={c.id} className="rounded-xl border border-gray-200 bg-white p-4">
                <div className="flex items-start gap-3 mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.avatarUrl}
                    alt={c.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-medium text-gray-900 truncate">
                      {c.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">{c.title}</p>
                  </div>
                  <button
                    onClick={() => toggleVisible(c)}
                    className={`flex-shrink-0 text-xs px-2 py-1 rounded ${
                      c.visible
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {c.visible ? "顯示" : "隱藏"}
                  </button>
                </div>
                <div className="flex items-center justify-between gap-2 text-xs text-gray-500 mb-3">
                  <span>排序：{c.order}</span>
                </div>
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <Link
                    href={`/admin/cases/${c.id}/edit`}
                    className="flex-1 min-h-[44px] flex items-center justify-center px-3 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg active:bg-blue-100"
                  >
                    編輯
                  </Link>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="flex-1 min-h-[44px] flex items-center justify-center px-3 text-sm font-medium text-red-600 bg-red-50 rounded-lg active:bg-red-100"
                  >
                    刪除
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
