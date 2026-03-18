"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = e.currentTarget;
    const user = (form.elements.namedItem("user") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password }),
    });

    if (res.ok) {
      // Use hard redirect so the new cookie is sent with the server request
      window.location.href = "/admin";
      return;
    } else {
      setError("帳號或密碼錯誤");
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center">
      <form onSubmit={handleSubmit} className="w-80 rounded-xl bg-white p-8 shadow-lg">
        <h1 className="text-xl font-bold mb-6 text-center text-gray-900">Admin 登入</h1>
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <input
          name="user"
          placeholder="帳號"
          required
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 mb-4 text-sm focus:outline-none focus:border-blue-500 text-gray-900 bg-white"
        />
        <input
          name="password"
          type="password"
          placeholder="密碼"
          required
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 mb-6 text-sm focus:outline-none focus:border-blue-500 text-gray-900 bg-white"
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          登入
        </button>
      </form>
    </div>
  );
}
