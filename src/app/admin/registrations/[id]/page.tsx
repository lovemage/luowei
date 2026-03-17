"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

export default function RegistrationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [reg, setReg] = useState<Registration | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/admin/registrations/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setReg(null);
        } else {
          setReg(data);
        }
        setLoading(false);
      });
  }, [id]);

  async function handleDelete() {
    if (!reg) return;
    if (!confirm(`確定刪除 ${reg.name} 的報名資料？`)) return;
    await fetch(`/api/admin/registrations/${id}`, { method: "DELETE" });
    router.push("/admin/registrations");
  }

  if (loading) {
    return <p className="text-gray-500 text-sm">載入中...</p>;
  }

  if (!reg) {
    return (
      <div>
        <p className="text-gray-500 mb-4">找不到該筆報名資料</p>
        <Link href="/admin/registrations" className="text-blue-600 hover:underline text-sm">
          返回列表
        </Link>
      </div>
    );
  }

  const fields: { label: string; value: string | null }[] = [
    { label: "姓名", value: reg.name },
    { label: "電話", value: reg.phone },
    { label: "LINE ID", value: reg.lineId },
    { label: "Email", value: reg.email },
    { label: "課程", value: reg.courseName },
    { label: "留言", value: reg.message },
    { label: "報名時間", value: new Date(reg.createdAt).toLocaleString("zh-TW") },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">報名詳情</h1>
        <div className="flex gap-2">
          <Link
            href="/admin/registrations"
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            返回列表
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
          >
            刪除
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        {fields.map((f) => (
          <div key={f.label} className="flex border-b border-gray-100 last:border-0">
            <div className="w-32 px-4 py-3 bg-gray-50 text-sm font-medium text-gray-600 shrink-0">
              {f.label}
            </div>
            <div className="px-4 py-3 text-sm text-gray-900">
              {f.value || <span className="text-gray-400">-</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
