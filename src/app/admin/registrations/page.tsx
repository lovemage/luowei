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
    fetchData();
  }, [fetchData]);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`確定刪除 ${name} 的報名資料？`)) return;
    await fetch(`/api/admin/registrations/${id}`, { method: "DELETE" });
    fetchData();
  }

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">報名資料管理</h1>
        <a
          href="/api/admin/registrations/export"
          className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
        >
          匯出 CSV
        </a>
      </div>

      <div className="flex gap-3 mb-4">
        <input
          type="text"
          placeholder="搜尋姓名 / 電話 / LINE ID"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm flex-1 max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="篩選課程名稱"
          value={course}
          onChange={(e) => {
            setCourse(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">載入中...</p>
      ) : registrations.length === 0 ? (
        <p className="text-gray-500 text-sm">尚無報名資料</p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-gray-200">
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

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-500">
              共 {total} 筆，第 {page}/{totalPages} 頁
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
              >
                上一頁
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition-colors"
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
