"use client";

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

interface Registration {
  id: string;
  name: string;
  phone: string;
  lineId: string | null;
  email: string | null;
  courseName: string;
  message: string | null;
  createdAt: string;
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("");
  const [loading, setLoading] = useState(true);
  const pageSize = 20;

  const fetchData = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (search) params.set("search", search);
    if (course) params.set("course", course);

    const res = await fetch(`/api/admin/registrations?${params}`);
    const data = await res.json();
    setRegistrations(data.registrations);
    setTotal(data.total);
    setLoading(false);
  }, [page, search, course]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      const params = new URLSearchParams({ page: String(page) });
      if (search) params.set("search", search);
      if (course) params.set("course", course);

      const res = await fetch(`/api/admin/registrations?${params}`);
      const data = await res.json();
      if (!cancelled) {
        setRegistrations(data.registrations);
        setTotal(data.total);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [page, search, course]);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`確定刪除 ${name} 的報名資料？`)) return;
    await fetch(`/api/admin/registrations/${id}`, { method: "DELETE" });
    fetchData();
  }

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">報名資料管理</h1>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/api/admin/registrations/export"
          className="inline-flex w-full sm:w-auto justify-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
        >
          匯出 CSV
        </a>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="搜尋姓名 / 電話 / LINE ID"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full sm:flex-1 sm:max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="篩選課程名稱"
          value={course}
          onChange={(e) => {
            setCourse(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">載入中...</p>
      ) : registrations.length === 0 ? (
        <p className="text-gray-500 text-sm">尚無報名資料</p>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">姓名</th>
                  <th className="text-left px-4 py-3 font-medium">電話</th>
                  <th className="text-left px-4 py-3 font-medium">課程</th>
                  <th className="text-left px-4 py-3 font-medium">報名時間</th>
                  <th className="text-right px-4 py-3 font-medium">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-900">{reg.name}</td>
                    <td className="px-4 py-3 text-gray-600">{reg.phone}</td>
                    <td className="px-4 py-3 text-gray-600">{reg.courseName}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {new Date(reg.createdAt).toLocaleDateString("zh-TW")}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/admin/registrations/${reg.id}`}
                        className="text-blue-600 hover:underline text-sm mr-3"
                      >
                        查看
                      </Link>
                      <button
                        onClick={() => handleDelete(reg.id, reg.name)}
                        className="text-red-500 hover:underline text-sm"
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
            {registrations.map((reg) => (
              <div
                key={reg.id}
                className="rounded-xl border border-gray-200 bg-white p-4"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <p className="text-base font-medium text-gray-900 truncate">
                      {reg.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(reg.createdAt).toLocaleDateString("zh-TW")}
                    </p>
                  </div>
                </div>
                <dl className="text-sm text-gray-700 space-y-1.5 mb-3">
                  <div className="flex gap-2">
                    <dt className="text-gray-500 w-12 flex-shrink-0">電話</dt>
                    <dd className="break-all">
                      <a href={`tel:${reg.phone}`} className="text-blue-600">
                        {reg.phone}
                      </a>
                    </dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-gray-500 w-12 flex-shrink-0">課程</dt>
                    <dd className="break-all">{reg.courseName}</dd>
                  </div>
                </dl>
                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <Link
                    href={`/admin/registrations/${reg.id}`}
                    className="flex-1 min-h-[44px] flex items-center justify-center px-3 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg active:bg-blue-100"
                  >
                    查看
                  </Link>
                  <button
                    onClick={() => handleDelete(reg.id, reg.name)}
                    className="flex-1 min-h-[44px] flex items-center justify-center px-3 text-sm font-medium text-red-600 bg-red-50 rounded-lg active:bg-red-100"
                  >
                    刪除
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
            <p className="text-sm text-gray-500 text-center sm:text-left">
              共 {total} 筆，第 {page}/{totalPages} 頁
            </p>
            <div className="flex gap-2 justify-center sm:justify-end">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="flex-1 sm:flex-initial min-h-[44px] sm:min-h-0 px-4 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                上一頁
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="flex-1 sm:flex-initial min-h-[44px] sm:min-h-0 px-4 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                下一頁
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
