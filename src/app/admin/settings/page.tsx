"use client";

import { useEffect, useState } from "react";

export default function SettingsPage() {
  const [adminEmail, setAdminEmail] = useState("");
  const [footerText, setFooterText] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailMsg, setEmailMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [footerMsg, setFooterMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [savingEmail, setSavingEmail] = useState(false);
  const [savingFooter, setSavingFooter] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setAdminEmail(data.adminEmail || "");
        setFooterText(data.footerText || "");
      }
    }
    fetchSettings();
  }, []);

  async function handleSaveEmail() {
    setSavingEmail(true);
    setEmailMsg(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminEmail }),
      });
      if (res.ok) {
        setEmailMsg({ type: "success", text: "儲存成功" });
      } else {
        const data = await res.json();
        setEmailMsg({ type: "error", text: data.error || "儲存失敗" });
      }
    } catch {
      setEmailMsg({ type: "error", text: "儲存失敗" });
    } finally {
      setSavingEmail(false);
    }
  }

  async function handleSaveFooter() {
    setSavingFooter(true);
    setFooterMsg(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ footerText }),
      });
      if (res.ok) {
        setFooterMsg({ type: "success", text: "儲存成功" });
      } else {
        const data = await res.json();
        setFooterMsg({ type: "error", text: data.error || "儲存失敗" });
      }
    } catch {
      setFooterMsg({ type: "error", text: "儲存失敗" });
    } finally {
      setSavingFooter(false);
    }
  }

  async function handleSavePassword() {
    setPasswordMsg(null);
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "新密碼與確認密碼不符" });
      return;
    }
    if (!newPassword) {
      setPasswordMsg({ type: "error", text: "請輸入新密碼" });
      return;
    }
    setSavingPassword(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      if (res.ok) {
        setPasswordMsg({ type: "success", text: "密碼已更新" });
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        const data = await res.json();
        setPasswordMsg({ type: "error", text: data.error || "密碼更新失敗" });
      }
    } catch {
      setPasswordMsg({ type: "error", text: "密碼更新失敗" });
    } finally {
      setSavingPassword(false);
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">網站設定</h1>

      <div className="space-y-8 max-w-xl">
        {/* Section 1: Admin Email */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">管理員通知 Email</h2>
          <div className="space-y-3">
            <input
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={handleSaveEmail}
                disabled={savingEmail}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {savingEmail ? "儲存中..." : "儲存"}
              </button>
              {emailMsg && (
                <span className={`text-sm ${emailMsg.type === "success" ? "text-green-600" : "text-red-600"}`}>
                  {emailMsg.text}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Section 2: Footer Text */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">頁腳文字</h2>
          <div className="space-y-3">
            <textarea
              value={footerText}
              onChange={(e) => setFooterText(e.target.value)}
              placeholder="顯示在頁腳的自訂文字"
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={handleSaveFooter}
                disabled={savingFooter}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {savingFooter ? "儲存中..." : "儲存"}
              </button>
              {footerMsg && (
                <span className={`text-sm ${footerMsg.type === "success" ? "text-green-600" : "text-red-600"}`}>
                  {footerMsg.text}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Section 3: Change Password */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-gray-800 mb-4">修改密碼</h2>
          <div className="space-y-3">
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="目前密碼"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="新密碼"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="確認新密碼"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex items-center gap-3">
              <button
                onClick={handleSavePassword}
                disabled={savingPassword}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {savingPassword ? "儲存中..." : "更新密碼"}
              </button>
              {passwordMsg && (
                <span className={`text-sm ${passwordMsg.type === "success" ? "text-green-600" : "text-red-600"}`}>
                  {passwordMsg.text}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
