"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  { label: "頁面管理", href: "/admin/pages" },
  { label: "FAQ 管理", href: "/admin/faqs" },
  { label: "報名資料", href: "/admin/registrations" },
  { label: "案例管理", href: "/admin/cases" },
  { label: "懸浮按鈕", href: "/admin/floating-buttons" },
  { label: "報名表單", href: "/admin/registration-form" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-56 bg-gray-50 border-r border-gray-200 p-4 flex flex-col z-40">
      <h1 className="text-lg font-bold mb-8 px-3 text-gray-900">LUOWEI Admin</h1>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-3 py-2 rounded-lg text-sm transition-colors ${
              pathname === item.href
                ? "bg-blue-50 text-blue-700 font-medium"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="px-3 py-2 text-sm text-gray-500 hover:text-red-600 transition-colors"
        >
          登出
        </button>
      </div>
    </aside>
  );
}
