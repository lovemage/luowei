"use client";

import { useState, useEffect, use, useMemo, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Section {
  key: string;
  label: string;
  content: string;
}

interface PageData {
  slug: string;
  title: string;
  heroImage?: string;
  metaTitle?: string;
  metaDesc?: string;
  sections: string | Section[];
}

function parseSections(raw: string | Section[] | undefined): Section[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

/* ── Preview renderer ── */

function PreviewSection({ section }: { section: Section }) {
  const { key, label, content } = section;

  // Title-style keys
  const isTitleKey =
    key.includes("Title") ||
    key.includes("TabLabel") ||
    key === "heroSubtitle" ||
    key === "heroExtra";

  // Pricing keys
  const isPricing = key.includes("Pricing") || key === "price";

  // CTA keys
  const isCta = key.includes("Cta") || key.includes("cta");

  // Structured data with | separators
  const isStructured = content.includes("|") && content.includes("\n");

  // Multi-line list
  const isMultiLine = content.includes("\n") && !isStructured;

  if (key === "heroTitle") {
    return (
      <div className="text-center mb-4">
        <h1
          className="text-lg font-bold leading-snug"
          style={{ color: "#E2C191", fontFamily: "serif" }}
        >
          {content.split("\n").map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </h1>
      </div>
    );
  }

  if (key === "heroSubtitle") {
    return (
      <div className="text-center mb-4">
        <p className="text-xs tracking-widest" style={{ color: "#999" }}>
          {content}
        </p>
      </div>
    );
  }

  if (key === "heroExtra") {
    return (
      <div className="text-center mb-6">
        <p className="text-xs" style={{ color: "#888" }}>
          {content}
        </p>
      </div>
    );
  }

  if (isTitleKey) {
    return (
      <div className="mb-3">
        <h2
          className="text-sm font-bold"
          style={{ color: "#E2C191", fontFamily: "serif" }}
        >
          {content}
        </h2>
      </div>
    );
  }

  if (isPricing) {
    const lines = content.split("\n");
    return (
      <div
        className="rounded-lg p-4 text-center mb-4"
        style={{ background: "#0D0D0D", border: "1px solid #2A2218" }}
      >
        {lines.map((line, i) => {
          const isOriginal = line.includes("原價");
          return (
            <p
              key={i}
              className={`text-sm ${isOriginal ? "line-through mb-1" : "font-bold text-base"}`}
              style={{ color: isOriginal ? "#888" : "#E2C191" }}
            >
              {line}
            </p>
          );
        })}
      </div>
    );
  }

  if (isCta) {
    const isButton = key.includes("Button");
    if (isButton) {
      return (
        <div className="mb-4">
          <div
            className="rounded-full py-2 text-center text-xs font-semibold tracking-wider"
            style={{
              border: "2px solid #E2C191",
              color: "#E2C191",
            }}
          >
            {content}
          </div>
        </div>
      );
    }
    return (
      <div className="text-center mb-2">
        <p className="text-xs font-bold" style={{ color: "#ccc" }}>
          {content}
        </p>
      </div>
    );
  }

  if (isStructured) {
    const lines = content.split("\n").filter(Boolean);
    return (
      <div className="mb-4">
        <p
          className="text-[10px] mb-2 tracking-wide"
          style={{ color: "#888" }}
        >
          {label}
        </p>
        <div className="flex flex-col gap-2">
          {lines.map((line, i) => {
            const parts = line.split("|");
            return (
              <div
                key={i}
                className="rounded-lg p-3"
                style={{ background: "#0D0D0D", border: "1px solid #2A2218" }}
              >
                {parts.length >= 3 && (
                  <span
                    className="text-[10px] font-bold tracking-wider"
                    style={{ color: "#E2C191" }}
                  >
                    {parts[0]}
                  </span>
                )}
                <p className="text-xs font-bold mt-0.5" style={{ color: "#eee" }}>
                  {parts.length >= 3 ? parts[1] : parts[0]}
                </p>
                {parts.length >= 3 && (
                  <p className="text-[10px] mt-0.5" style={{ color: "#999" }}>
                    {parts[2]}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (isMultiLine) {
    const lines = content.split("\n").filter(Boolean);
    return (
      <div className="mb-4">
        <div className="flex flex-col gap-1.5">
          {lines.map((line, i) => (
            <div
              key={i}
              className="rounded-lg p-3"
              style={{ background: "#0D0D0D", border: "1px solid #2A2218" }}
            >
              <p className="text-[11px] leading-relaxed" style={{ color: "#ccc" }}>
                {line}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default: plain text
  return (
    <div className="mb-3">
      <p className="text-[11px] leading-relaxed" style={{ color: "#ccc" }}>
        {content}
      </p>
    </div>
  );
}

function LivePreview({
  sections,
  title,
}: {
  sections: Section[];
  title: string;
}) {
  return (
    <div className="space-y-1">
      {/* Page title badge */}
      <div className="text-center mb-4">
        <span
          className="inline-block text-[10px] tracking-widest px-3 py-1 rounded-full"
          style={{
            color: "#E2C191",
            border: "1px solid #2A2218",
            background: "#0D0D0D",
          }}
        >
          {title}
        </span>
      </div>

      {sections.map((section) => (
        <PreviewSection key={section.key} section={section} />
      ))}
    </div>
  );
}

/* ── Hero Images Manager (max 2, auto WebP) ── */

const MAX_HERO_IMAGES = 2;

function HeroImagesManager({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState("");

  // Parse pipe-separated URLs
  const urls = value ? value.split("|").filter(Boolean) : [];

  const convertToWebP = useCallback(async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas not supported"));
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error("WebP conversion failed"));
          },
          "image/webp",
          0.85
        );
      };
      img.onerror = () => reject(new Error("Image load failed"));
      img.src = URL.createObjectURL(file);
    });
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || urls.length >= MAX_HERO_IMAGES) return;

    setUploading(true);
    setProgress("轉換為 WebP 中...");
    try {
      const webpBlob = await convertToWebP(file);
      const baseName = file.name.replace(/\.[^.]+$/, "");
      const webpFile = new File([webpBlob], `${baseName}.webp`, { type: "image/webp" });

      setProgress("上傳中...");
      const formData = new FormData();
      formData.append("file", webpFile);
      formData.append("folder", "hero");
      formData.append("alt", "Hero Image");

      const res = await fetch("/api/admin/media/upload", { method: "POST", body: formData });
      if (res.ok) {
        const media = await res.json();
        onChange([...urls, media.url].join("|"));
        setProgress("");
      } else {
        setProgress("上傳失敗");
      }
    } catch {
      setProgress("轉換或上傳失敗");
    }
    setUploading(false);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleRemove = (index: number) => {
    onChange(urls.filter((_, i) => i !== index).join("|"));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Hero 圖片（最多 {MAX_HERO_IMAGES} 張，自動輪播）
      </label>
      <div className="flex flex-wrap gap-3 mb-3">
        {urls.map((url, i) => (
          <div key={i} className="relative group">
            <div className="w-36 h-20 rounded-lg overflow-hidden border border-gray-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Hero ${i + 1}`} className="w-full h-full object-cover" />
            </div>
            <button
              type="button"
              onClick={() => handleRemove(i)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              title="移除"
            >
              ✕
            </button>
            <p className="text-[10px] text-gray-400 mt-1 truncate w-36">{url.split("/").pop()}</p>
          </div>
        ))}
      </div>
      {urls.length < MAX_HERO_IMAGES && (
        <div className="flex items-center gap-3">
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {uploading ? progress : "上傳圖片"}
          </button>
          <span className="text-xs text-gray-400">自動轉換為 WebP</span>
        </div>
      )}
      {urls.length >= MAX_HERO_IMAGES && (
        <p className="text-xs text-gray-400">已達上限，請先移除再上傳新圖片</p>
      )}
    </div>
  );
}

/* ── Main Component ── */

export default function EditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const [page, setPage] = useState<PageData | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch(`/api/admin/pages/${slug}`)
      .then((r) => r.json())
      .then((data: PageData) => {
        setPage(data);
        setSections(parseSections(data.sections));
      });
  }, [slug]);

  function updateSection(index: number, field: keyof Section, value: string) {
    setSections((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  async function handleSave() {
    if (!page) return;
    setSaving(true);
    setMessage("");
    try {
      const payload = {
        ...page,
        sections: JSON.stringify(sections),
      };
      const res = await fetch(`/api/admin/pages/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) setMessage("儲存成功");
      else setMessage("儲存失敗");
    } finally {
      setSaving(false);
    }
  }

  // Memoize preview to avoid unnecessary re-renders
  const previewContent = useMemo(
    () =>
      page ? (
        <LivePreview sections={sections} title={page.title} />
      ) : null,
    [sections, page]
  );

  if (!page) return <div className="text-gray-500 p-8">載入中...</div>;

  return (
    <div className="flex flex-col xl:flex-row gap-6">
      {/* ── Left: Editor ── */}
      <div className="flex-1 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            編輯頁面: {page.slug}
          </h1>
          <button
            onClick={() => router.back()}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            返回
          </button>
        </div>

        {/* 儲存按鈕（頂部） */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {saving ? "儲存中..." : "儲存"}
          </button>
          {message && (
            <span
              className={`text-sm ${message.includes("成功") ? "text-green-600" : "text-red-600"}`}
            >
              {message}
            </span>
          )}
        </div>

        {/* 基本設定 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            基本設定
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                頁面標題
              </label>
              <input
                value={page.title}
                onChange={(e) => setPage({ ...page, title: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <HeroImagesManager
              value={page.heroImage || ""}
              onChange={(val) => setPage({ ...page, heroImage: val })}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SEO 標題
              </label>
              <input
                value={page.metaTitle || ""}
                onChange={(e) =>
                  setPage({ ...page, metaTitle: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SEO 描述
              </label>
              <textarea
                value={page.metaDesc || ""}
                onChange={(e) =>
                  setPage({ ...page, metaDesc: e.target.value })
                }
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>
          </div>
        </div>

        {/* 頁面內容 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            頁面內容
          </h2>

          {sections.length === 0 ? (
            <p className="text-sm text-gray-500">此頁面尚未設定可編輯內容</p>
          ) : (
            <div className="space-y-4">
              {sections.map((section, index) => (
                <div
                  key={section.key || index}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block text-xs font-medium text-gray-500 bg-gray-100 rounded px-2 py-0.5">
                      {section.key}
                    </span>
                    <span className="text-xs text-gray-400">
                      {section.label}
                    </span>
                  </div>
                  <div>
                    <textarea
                      value={section.content}
                      onChange={(e) =>
                        updateSection(index, "content", e.target.value)
                      }
                      rows={Math.min(
                        Math.max(
                          section.content.split("\n").length + 1,
                          2
                        ),
                        12
                      )}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:border-blue-500 resize-y font-mono"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 儲存按鈕（底部） */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {saving ? "儲存中..." : "儲存"}
          </button>
          {message && (
            <span
              className={`text-sm ${message.includes("成功") ? "text-green-600" : "text-red-600"}`}
            >
              {message}
            </span>
          )}
        </div>
      </div>

      {/* ── Right: Preview ── */}
      <div className="flex-shrink-0">
        <div className="sticky top-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            即時預覽
          </h3>
          <div
            className="w-[375px] h-[667px] rounded-3xl border-4 border-gray-300 overflow-hidden"
            style={{ background: "#050505" }}
          >
            {/* Phone notch */}
            <div className="flex justify-center pt-2 pb-1">
              <div
                className="w-24 h-5 rounded-full"
                style={{ background: "#1a1a1a" }}
              />
            </div>
            {/* Scrollable content */}
            <div className="h-[calc(100%-2rem)] overflow-y-auto px-4 pb-6">
              {previewContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
