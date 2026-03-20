"use client";

import { useState, useEffect } from "react";

interface FormField {
  key: string;
  label: string;
  type: "text" | "tel" | "email" | "textarea" | "select" | "radio";
  placeholder: string;
  required: boolean;
  options?: string[];
}

interface FormConfig {
  title: string;
  submitText: string;
  successTitle: string;
  successDesc: string;
  fields: FormField[];
}

interface RegistrationFormProps {
  courseOptions?: string[];
  defaultCourse?: string;
  formConfig?: FormConfig;
  pageSlug?: string;
}

const DEFAULT_FIELDS: FormField[] = [
  { key: "name", label: "姓名", type: "text", placeholder: "姓名", required: true },
  { key: "phone", label: "電話", type: "tel", placeholder: "電話", required: true },
  { key: "lineId", label: "LINE ID", type: "text", placeholder: "LINE ID", required: false },
  { key: "email", label: "Email", type: "email", placeholder: "Email", required: false },
  { key: "courseName", label: "課程方案", type: "select", placeholder: "選擇感興趣的課程/方案", required: true, options: [] },
  { key: "message", label: "留言", type: "textarea", placeholder: "留言", required: false },
];

const DEFAULT_CONFIG: FormConfig = {
  title: "立即報名",
  submitText: "送出報名",
  successTitle: "感謝您的報名",
  successDesc: "我們會盡快與您聯繫",
  fields: DEFAULT_FIELDS,
};

export default function RegistrationForm({ courseOptions, defaultCourse, formConfig, pageSlug }: RegistrationFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [config, setConfig] = useState<FormConfig>(formConfig || DEFAULT_CONFIG);
  const [loaded, setLoaded] = useState(!!formConfig);

  useEffect(() => {
    if (formConfig) return;
    const url = pageSlug
      ? `/api/registration-form?page=${pageSlug}`
      : "/api/registration-form";
    fetch(url)
      .then((r) => r.json())
      .then((data: FormConfig) => {
        if (data && data.fields && data.fields.length > 0) {
          setConfig(data);
        }
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, [formConfig, pageSlug]);

  // If courseOptions prop is provided, inject them into the select field
  const fields = config.fields.map((field) => {
    if (field.type === "select" && courseOptions && courseOptions.length > 0) {
      return { ...field, options: courseOptions };
    }
    return field;
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const raw: Record<string, string> = {};
    for (const field of fields) {
      const el = form.elements.namedItem(field.key);
      if (el) {
        raw[field.key] = (el as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).value;
      }
    }

    // If form has standard keys (name, phone, courseName), send directly.
    // Otherwise, map custom fields into the registration schema.
    const STANDARD_KEYS = ["name", "phone", "lineId", "email", "courseName", "message"];
    const isStandard = fields.some((f) => STANDARD_KEYS.includes(f.key) && f.key !== "name");
    let data: Record<string, string>;

    if (isStandard) {
      data = raw;
    } else {
      // Custom form: pack non-standard fields into message
      const extraLines: string[] = [];
      for (const field of fields) {
        if (field.key === "name") continue;
        if (raw[field.key]) {
          extraLines.push(`【${field.label}】${raw[field.key]}`);
        }
      }
      data = {
        name: raw.name || "",
        phone: raw.ig || raw.phone || "",
        lineId: raw.city || raw.lineId || "",
        email: raw.email || "",
        courseName: pageSlug === "second-income" ? "下班後第二收入計劃" : (raw.courseName || pageSlug || ""),
        message: extraLines.join("\n"),
      };
    }

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
        <p className="text-lg font-bold text-accent mb-2">{config.successTitle}</p>
        <p className="text-sm text-text-secondary">{config.successDesc}</p>
      </section>
    );
  }

  if (!loaded && !formConfig) {
    return null;
  }

  const inputClass =
    "w-full bg-transparent border-b border-divider text-text-secondary py-3 text-sm focus:border-accent focus:outline-none placeholder:text-text-secondary/40 transition-colors";

  return (
    <section className="animate-fade-up mb-12">
      <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-text-primary mb-6">
        {config.title}
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {fields.map((field) => {
          if (field.type === "select") {
            return (
              <select
                key={field.key}
                name={field.key}
                required={field.required}
                defaultValue={field.key === "courseName" ? defaultCourse || (field.options?.length === 1 ? field.options[0] : "") : ""}
                className={`${inputClass} appearance-none`}
              >
                <option value="">{field.placeholder}</option>
                {(field.options || []).map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            );
          }
          if (field.type === "radio") {
            return (
              <fieldset key={field.key}>
                <legend className="text-sm font-semibold text-text-primary mb-3">{field.label}</legend>
                <div className="flex flex-col gap-2">
                  {(field.options || []).map((opt) => (
                    <label key={opt} className="flex items-center gap-3 cursor-pointer rounded-lg border border-divider px-4 py-3 text-sm text-text-secondary transition-colors hover:border-accent/50 has-[:checked]:border-accent has-[:checked]:text-accent">
                      <input type="radio" name={field.key} value={opt} required={field.required} className="accent-accent" />
                      {opt}
                    </label>
                  ))}
                </div>
              </fieldset>
            );
          }
          if (field.type === "textarea") {
            return (
              <textarea
                key={field.key}
                name={field.key}
                placeholder={field.placeholder}
                required={field.required}
                rows={3}
                className={`${inputClass} resize-none`}
              />
            );
          }
          return (
            <input
              key={field.key}
              type={field.type}
              name={field.key}
              placeholder={field.placeholder}
              required={field.required}
              className={inputClass}
            />
          );
        })}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full border-2 border-accent bg-transparent py-3.5 text-center text-sm font-semibold text-accent tracking-wider transition-colors duration-200 hover:bg-accent hover:text-bg-primary disabled:opacity-50"
        >
          {submitting ? "提交中..." : config.submitText}
        </button>
      </form>
    </section>
  );
}
