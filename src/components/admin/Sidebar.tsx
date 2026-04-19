"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

function useEscapeKey(active: boolean, onEscape: () => void) {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onEscape();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, onEscape]);
}

const navItems = [
  { label: "公告管理", href: "/admin/announcements" },
  { label: "頁面管理", href: "/admin/pages" },
  { label: "FAQ 管理", href: "/admin/faqs" },
  { label: "報名資料", href: "/admin/registrations" },
  { label: "案例管理", href: "/admin/cases" },
  { label: "懸浮按鈕", href: "/admin/floating-buttons" },
  { label: "報名表單", href: "/admin/registration-form" },
  { label: "網站設定", href: "/admin/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useBodyScrollLock(open);
  useEscapeKey(open, () => setOpen(false));

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <>
      {/* Mobile Top Bar */}
      <header
        className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white/95 backdrop-blur border-b border-gray-200 flex items-center justify-between px-2 z-50"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <button
          type="button"
          aria-label="開啟選單"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-colors"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-base font-bold text-gray-900">LUOWEI Admin</h1>
        <button
          onClick={handleLogout}
          className="h-11 px-3 text-sm text-gray-600 hover:text-red-600 active:text-red-700 rounded-lg flex items-center"
        >
          登出
        </button>
      </header>

      {/* Mobile Overlay — div not button so focus doesn't trap */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`md:hidden fixed inset-0 bg-black/40 z-50 transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sidebar (fixed desktop / drawer mobile) */}
      <aside
        aria-hidden={!open}
        className={`fixed left-0 top-0 h-full w-64 md:w-56 bg-gray-50 border-r border-gray-200 flex flex-col z-50 transition-transform duration-200 ease-out md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          paddingTop: "max(1rem, env(safe-area-inset-top))",
          paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
          paddingLeft: "1rem",
          paddingRight: "1rem",
        }}
      >
        <div className="flex items-center justify-between mb-6 px-1">
          <h1 className="text-lg font-bold text-gray-900 px-2">LUOWEI Admin</h1>
          <button
            type="button"
            aria-label="關閉選單"
            onClick={() => setOpen(false)}
            className="md:hidden w-11 h-11 flex items-center justify-center rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col gap-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`px-3 min-h-[44px] flex items-center rounded-lg text-[15px] md:text-sm transition-colors ${
                  active
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100 active:bg-gray-200"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto pt-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full px-3 min-h-[44px] flex items-center text-sm text-gray-500 hover:text-red-600 active:text-red-700 transition-colors"
          >
            登出
          </button>
        </div>
      </aside>
    </>
  );
}
