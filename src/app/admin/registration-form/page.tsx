"use client";

import { useEffect, useState, useMemo } from "react";

interface FormField {
  key: string;
  label: string;
  type: "text" | "tel" | "email" | "textarea" | "select";
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

type AllConfigs = Record<string, FormConfig>;

const TABS = [
  { key: "short-video", label: "短影音與廣告" },
  { key: "course", label: "影響力變現課程" },
  { key: "ai-course", label: "AI 課程" },
];

const FIELD_TYPES: { value: FormField["type"]; label: string }[] = [
  { value: "text", label: "文字" },
  { value: "tel", label: "電話" },
  { value: "email", label: "Email" },
  { value: "textarea", label: "多行文字" },
  { value: "select", label: "下拉選單" },
];

const MAX_FIELDS = 10;

const EMPTY_CONFIG: FormConfig = {
  title: "立即報名",
  submitText: "送出報名",
  successTitle: "感謝您的報名",
  successDesc: "我們會盡快與您聯繫",
  fields: [],
};

/* ── Preview ── */

function LivePreview({ config }: { config: FormConfig }) {
  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    borderBottom: "1px solid #2A2218",
    color: "#ccc",
    padding: "10px 0",
    fontSize: "12px",
    outline: "none",
  };

  return (
    <div className="px-2">
      <h2 className="text-sm font-bold mb-4" style={{ color: "#E2C191", fontFamily: "serif" }}>
        {config.title || "立即報名"}
      </h2>
      <div className="flex flex-col gap-4">
        {config.fields.map((field) => {
          if (field.type === "select") {
            return (
              <div key={field.key}>
                <select disabled style={{ ...inputStyle, appearance: "none" }}>
                  <option>{field.placeholder || "請選擇"}</option>
                  {field.options?.map((opt) => <option key={opt}>{opt}</option>)}
                </select>
              </div>
            );
          }
          if (field.type === "textarea") {
            return (
              <div key={field.key}>
                <textarea disabled placeholder={field.placeholder} rows={3} style={{ ...inputStyle, resize: "none" }} />
              </div>
            );
          }
          return (
            <div key={field.key}>
              <input disabled type={field.type} placeholder={field.placeholder} style={inputStyle} />
            </div>
          );
        })}
        <button
          disabled
          className="w-full rounded-full py-2.5 text-center text-xs font-semibold tracking-wider"
          style={{ border: "2px solid #E2C191", color: "#E2C191", background: "transparent" }}
        >
          {config.submitText || "送出報名"}
        </button>
      </div>
    </div>
  );
}

/* ── Main ── */

export default function AdminRegistrationFormPage() {
  const [allConfigs, setAllConfigs] = useState<AllConfigs>({});
  const [activeTab, setActiveTab] = useState("short-video");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/registration-form")
      .then((r) => r.json())
      .then((data: AllConfigs) => setAllConfigs(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const config = allConfigs[activeTab] || EMPTY_CONFIG;

  const setConfig = (newConfig: FormConfig) => {
    setAllConfigs((prev) => ({ ...prev, [activeTab]: newConfig }));
  };

  const updateField = (index: number, updates: Partial<FormField>) => {
    const fields = [...config.fields];
    fields[index] = { ...fields[index], ...updates };
    setConfig({ ...config, fields });
  };

  const addField = () => {
    if (config.fields.length >= MAX_FIELDS) {
      setMessage(`最多只能新增 ${MAX_FIELDS} 個欄位`);
      return;
    }
    setConfig({
      ...config,
      fields: [...config.fields, { key: `field-${Date.now()}`, label: "", type: "text", placeholder: "", required: false }],
    });
  };

  const deleteField = (index: number) => {
    if (!window.confirm("確定要刪除這個欄位嗎？")) return;
    setConfig({ ...config, fields: config.fields.filter((_, i) => i !== index) });
  };

  const moveField = (index: number, direction: "up" | "down") => {
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= config.fields.length) return;
    const fields = [...config.fields];
    [fields[index], fields[target]] = [fields[target], fields[index]];
    setConfig({ ...config, fields });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/admin/registration-form", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(allConfigs),
      });
      if (res.ok) setMessage("儲存成功！");
      else setMessage("儲存失敗");
    } catch {
      setMessage("儲存失敗");
    }
    setSaving(false);
  };

  const previewContent = useMemo(() => <LivePreview config={config} />, [config]);

  if (loading) return <div className="p-8 text-center text-gray-500 text-sm">載入中...</div>;

  return (
    <div className="flex flex-col xl:flex-row gap-6">
      {/* Left: Editor */}
      <div className="flex-1 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">報名表單管理</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {saving ? "儲存中..." : "儲存全部"}
          </button>
        </div>

        {message && (
          <div className={`mb-4 px-4 py-2 rounded-lg text-sm ${message.includes("成功") ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
            {message}
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setMessage(""); }}
              className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Title Settings */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-5">
          <h2 className="text-sm font-bold text-gray-900 mb-4">表單設定</h2>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1">表單標題</label>
              <input type="text" value={config.title} onChange={(e) => setConfig({ ...config, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">送出按鈕</label>
              <input type="text" value={config.submitText} onChange={(e) => setConfig({ ...config, submitText: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">成功標題</label>
              <input type="text" value={config.successTitle} onChange={(e) => setConfig({ ...config, successTitle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">成功描述</label>
              <input type="text" value={config.successDesc} onChange={(e) => setConfig({ ...config, successDesc: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        {/* Fields Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-900">欄位設定</h2>
          <button onClick={addField} disabled={config.fields.length >= MAX_FIELDS}
            className="text-blue-600 text-sm font-medium hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed">
            + 新增欄位
          </button>
        </div>

        {/* Field Cards */}
        {config.fields.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500 text-sm">
            尚無欄位，請點擊「新增欄位」開始設定
          </div>
        ) : (
          <div className="space-y-3">
            {config.fields.map((field, index) => (
              <div key={field.key} className="bg-white border border-gray-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1 space-y-2">
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <label className="block text-xs text-gray-400 mb-1">標籤</label>
                        <input type="text" value={field.label} onChange={(e) => updateField(index, { label: e.target.value })}
                          placeholder="欄位名稱" className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs text-gray-400 mb-1">提示文字</label>
                        <input type="text" value={field.placeholder} onChange={(e) => updateField(index, { placeholder: e.target.value })}
                          placeholder="Placeholder" className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" />
                      </div>
                      <div className="w-28">
                        <label className="block text-xs text-gray-400 mb-1">類型</label>
                        <select value={field.type} onChange={(e) => updateField(index, { type: e.target.value as FormField["type"] })}
                          className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                          {FIELD_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                        </select>
                      </div>
                    </div>
                    {field.type === "select" && (
                      <div>
                        <label className="block text-xs text-gray-400 mb-1">選項（每行一個）</label>
                        <textarea value={field.options?.join("\n") || ""} onChange={(e) => updateField(index, { options: e.target.value.split("\n").filter(Boolean) })}
                          rows={3} placeholder={"選項一\n選項二"} className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm font-mono focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y" />
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-1.5 text-xs text-gray-600 cursor-pointer">
                        <input type="checkbox" checked={field.required} onChange={(e) => updateField(index, { required: e.target.checked })} />
                        必填
                      </label>
                      <button onClick={() => deleteField(index)} className="text-red-500 text-xs hover:text-red-700">刪除</button>
                    </div>
                  </div>
                  {/* Arrows */}
                  <div className="flex flex-col gap-0.5 flex-shrink-0 pt-5">
                    <button onClick={() => moveField(index, "up")} disabled={index === 0}
                      className="p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-30" title="上移">▲</button>
                    <button onClick={() => moveField(index, "down")} disabled={index === config.fields.length - 1}
                      className="p-0.5 text-gray-400 hover:text-gray-700 disabled:opacity-30" title="下移">▼</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right: Preview */}
      <div className="flex-shrink-0">
        <div className="sticky top-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            即時預覽 — {TABS.find((t) => t.key === activeTab)?.label}
          </h3>
          <div className="w-[375px] h-[667px] rounded-3xl border-4 border-gray-300 overflow-hidden" style={{ background: "#050505" }}>
            <div className="flex justify-center pt-2 pb-1">
              <div className="w-24 h-5 rounded-full" style={{ background: "#1a1a1a" }} />
            </div>
            <div className="h-[calc(100%-2rem)] overflow-y-auto px-4 pb-6">
              {previewContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
