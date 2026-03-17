"use client";

import { useState } from "react";

interface RegistrationFormProps {
  courseOptions: string[];
  defaultCourse?: string;
}

export default function RegistrationForm({ courseOptions, defaultCourse }: RegistrationFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      lineId: (form.elements.namedItem("lineId") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      courseName: (form.elements.namedItem("courseName") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        form.reset();
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section className="animate-fade-up mb-12 rounded-lg bg-bg-surface p-8 text-center">
        <p className="text-lg font-bold text-accent mb-2">感謝您的報名</p>
        <p className="text-sm text-text-secondary">我們會盡快與您聯繫</p>
      </section>
    );
  }

  const inputClass =
    "w-full bg-transparent border-b border-divider text-text-secondary py-3 text-sm focus:border-accent focus:outline-none placeholder:text-text-secondary/40 transition-colors";

  return (
    <section className="animate-fade-up mb-12">
      <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-text-primary mb-6">
        立即報名
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input type="text" name="name" placeholder="姓名" required className={inputClass} />
        <input type="tel" name="phone" placeholder="電話" required className={inputClass} />
        <input type="text" name="lineId" placeholder="LINE ID" className={inputClass} />
        <input type="email" name="email" placeholder="Email" className={inputClass} />
        <select name="courseName" defaultValue={defaultCourse || ""} className={`${inputClass} appearance-none`}>
          <option value="">選擇感興趣的課程/方案</option>
          {courseOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <textarea name="message" placeholder="留言" rows={3} className={`${inputClass} resize-none`} />
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full border-2 border-accent bg-transparent py-3.5 text-center text-sm font-semibold text-accent tracking-wider transition-colors duration-200 hover:bg-accent hover:text-bg-primary disabled:opacity-50"
        >
          {submitting ? "提交中..." : "送出報名"}
        </button>
      </form>
    </section>
  );
}
