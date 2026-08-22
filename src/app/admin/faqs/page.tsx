"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface FAQ {
  id: string;
  pageSlug: string;
  question: string;
  answer: string;
  order: number;
}

const PAGE_OPTIONS = [
  { value: "", label: "全部頁面" },
  { value: "short-video", label: "short-video" },
  { value: "short-video-incubation", label: "short-video-incubation" },
  { value: "short-video-ad", label: "short-video-ad" },
  { value: "course", label: "course" },
  { value: "ai-course", label: "ai-course" },
  { value: "second-income", label: "second-income" },
];

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchFaqs = async () => {
    setLoading(true);
    const url = filter
      ? `/api/admin/faqs?pageSlug=${filter}`
      : "/api/admin/faqs";
    const res = await fetch(url);
    const data = await res.json();
    setFaqs(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchFaqs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("確定要刪除這則 FAQ 嗎？")) return;
    await fetch(`/api/admin/faqs/${id}`, { method: "DELETE" });
    fetchFaqs();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">FAQ 管理</h1>
        <Link
          href="/admin/faqs/new"
          className="inline-flex justify-center bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          新增 FAQ
        </Link>
      </div>

      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-auto border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 bg-white"
        >
          {PAGE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500 text-sm">
          載入中...
        </div>
      ) : faqs.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500 text-sm">
          尚無 FAQ 資料
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    問題
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    頁面
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    排序
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody>
                {faqs.map((faq) => (
                  <tr
                    key={faq.id}
                    className="border-b border-gray-50 hover:bg-gray-50"
                  >
                    <td className="px-4 py-3 text-gray-900">
                      {faq.question.length > 40
                        ? faq.question.slice(0, 40) + "..."
                        : faq.question}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{faq.pageSlug}</td>
                    <td className="px-4 py-3 text-gray-500">{faq.order}</td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <Link
                        href={`/admin/faqs/${faq.id}/edit`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        編輯
                      </Link>
                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="text-red-500 hover:text-red-700"
                      >
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
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="rounded-xl border border-gray-200 bg-white p-4"
              >
                <p className="text-sm text-gray-900 mb-2 leading-relaxed">
                  {faq.question}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-3">
                  <span className="px-2 py-0.5 bg-gray-100 rounded">
                    {faq.pageSlug}
                  </span>
                  <span>排序：{faq.order}</span>
                </div>
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <Link
                    href={`/admin/faqs/${faq.id}/edit`}
                    className="flex-1 min-h-[44px] flex items-center justify-center px-3 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg active:bg-blue-100"
                  >
                    編輯
                  </Link>
                  <button
                    onClick={() => handleDelete(faq.id)}
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
