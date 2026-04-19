import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const SYSTEM_SLUGS = ["announcements", "registration-form", "floating-buttons"];

export default async function AdminPages() {
  const pages = (await prisma.page.findMany({
    orderBy: { updatedAt: "desc" },
  })).filter((p) => !SYSTEM_SLUGS.includes(p.slug));

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">頁面管理</h1>

      {/* Desktop table */}
      <div className="hidden md:block bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">Slug</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">標題</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">更新時間</th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500">操作</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id} className="border-b border-gray-100">
                <td className="px-4 py-3 text-sm text-gray-600 font-mono">{page.slug}</td>
                <td className="px-4 py-3 text-sm text-gray-900">{page.title}</td>
                <td className="px-4 py-3 text-sm text-gray-500">
                  {new Date(page.updatedAt).toLocaleDateString("zh-TW")}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/pages/${page.slug}/edit`}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    編輯
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {pages.map((page) => (
          <Link
            key={page.id}
            href={`/admin/pages/${page.slug}/edit`}
            className="block rounded-xl border border-gray-200 bg-white p-4 active:bg-gray-50"
          >
            <p className="text-base font-medium text-gray-900 mb-1">
              {page.title}
            </p>
            <p className="text-xs text-gray-500 font-mono mb-2">{page.slug}</p>
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>
                更新：{new Date(page.updatedAt).toLocaleDateString("zh-TW")}
              </span>
              <span className="text-blue-600">編輯 →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
