"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PAGE_OPTIONS = [
  { value: "short-video", label: "short-video" },
  { value: "short-video-incubation", label: "short-video-incubation" },
  { value: "short-video-ad", label: "short-video-ad" },
  { value: "course", label: "course" },
  { value: "ai-course", label: "ai-course" },
  { value: "second-income", label: "second-income" },
];

export default function NewFAQPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    pageSlug: "short-video",
    question: "",
    answer: "",
    order: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/faqs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/admin/faqs");
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/faqs"
          className="text-gray-400 hover:text-gray-600 text-sm"
        >
          &larr; 返回
        </Link>
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">新增 FAQ</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl border border-gray-200 p-4 md:p-6 space-y-5 max-w-2xl"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            頁面
          </label>
          <select
            value={form.pageSlug}
            onChange={(e) => setForm({ ...form, pageSlug: e.target.value })}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white text-gray-900"
          >
            {PAGE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            問題
          </label>
          <textarea
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            required
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            答案
          </label>
          <textarea
            value={form.answer}
            onChange={(e) => setForm({ ...form, answer: e.target.value })}
            required
            rows={5}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            排序
          </label>
          <input
            type="number"
            value={form.order}
            onChange={(e) =>
              setForm({ ...form, order: parseInt(e.target.value) || 0 })
            }
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={saving}
            className="order-1 sm:order-none bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saving ? "儲存中..." : "儲存"}
          </button>
          <Link
            href="/admin/faqs"
            className="order-2 sm:order-none text-center px-5 py-2.5 rounded-lg text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            取消
          </Link>
        </div>
      </form>
    </div>
  );
}
