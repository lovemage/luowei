"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";

const INCOME_OPTIONS = ["3萬以下", "3–5萬", "5–8萬", "8–12萬", "12萬以上"];
const EXPERIENCE_OPTIONS = ["沒有", "嘗試過", "目前有副業", "曾創業"];
const TIME_OPTIONS = ["0–2小時", "3–5小時", "5–10小時", "10小時以上"];
const STATE_OPTIONS = [
  "只是想了解看看",
  "正在尋找機會",
  "準備開始行動",
  "已經決定要改變收入",
];

export default function SecondIncomeContent() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const get = (k: string) => (fd.get(k) as string) || "";

    // Map to existing registration API fields
    const data = {
      name: get("name"),
      phone: get("ig"), // IG 帳號存入 phone 欄位
      lineId: get("city"), // 城市存入 lineId 欄位
      email: "",
      courseName: "下班後第二收入計劃",
      message: [
        `【目前主要工作】${get("job")}`,
        `【每月收入區間】${get("income")}`,
        `【創業/副業經驗】${get("experience")}`,
        `【想建立第二收入的原因】${get("whySecondIncome")}`,
        `【每週可投入時間】${get("weeklyTime")}`,
        `【目前狀態】${get("currentState")}`,
        `【為什麼適合參與】${get("whySuitable")}`,
      ].join("\n"),
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

  const inputClass =
    "w-full bg-transparent border-b border-divider text-text-secondary py-3 text-sm focus:border-accent focus:outline-none placeholder:text-text-secondary/40 transition-colors";
  const radioGroupClass = "flex flex-col gap-2";
  const radioLabelClass =
    "flex items-center gap-3 cursor-pointer rounded-lg border border-divider px-4 py-3 text-sm text-text-secondary transition-colors hover:border-accent/50 has-[:checked]:border-accent has-[:checked]:text-accent";

  return (
    <main className="min-h-screen bg-bg-primary px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-lg">
        {/* Back */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1 text-xs text-text-secondary/60 hover:text-accent transition-colors"
        >
          ← 回首頁
        </Link>

        {/* Hero */}
        <section className="animate-fade-up mb-10">
          <h1 className="font-[family-name:var(--font-noto-serif-tc)] text-[22px] font-bold leading-[1.6] text-gold-shine mb-4">
            普通人翻身合作申請
          </h1>
          <div className="space-y-4 text-sm leading-[1.9] text-text-secondary">
            <p>
              嗨，我是小羅。20歲時選擇返鄉創業，目前經營多個不同產業，包括：
              <br />
              代操公司、短劇平台、珠寶品牌、餐飲、環保產業。
            </p>
            <p className="font-semibold text-text-primary">
              這幾年創業下來，我慢慢看懂一件事情：
            </p>
            <p>
              很多人不是不努力，而是努力在錯的方向。
              <br />
              有人一輩子打工
              <br />
              有人一直創業失敗
              <br />
              有人很拼命，但收入始終沒有結構
            </p>
            <p>問題通常不在能力，而在於：</p>
            <p>沒有好的產業、沒有好的模式、沒有好的思維</p>
            <p className="font-semibold text-text-primary">
              所以這幾年我開始研究三件事：
            </p>
            <p>
              產業、流量、收入結構
              <br />
              透過自媒體、創業系統與團隊合作，
              <br />
              慢慢建立一套能長期發展的模式。
            </p>
            <p className="font-bold text-text-primary">
              我現在有一個目標：
            </p>
            <p className="text-base font-bold text-accent">
              在2027年前，幫助100個人年收入突破100萬台幣。
            </p>
            <p>
              這不是副業介紹，
              <br />
              也不是課程招生。
              <br />
              而是：<span className="text-text-primary font-semibold">合作申請。</span>
            </p>
            <p className="text-text-secondary/70">
              如果你只是想了解看看，沒有要認真填寫表單，建議先觀察我的內容即可。
              <br />
              但如果你正在思考人生下一步，可以繼續往下填寫。
            </p>
          </div>
          <div className="mt-6 h-[2px] w-12 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full" />
        </section>

        {/* Section: 合作理念 */}
        <section className="animate-fade-up mb-10 rounded-2xl border border-divider bg-bg-surface p-6">
          <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-text-primary mb-4">
            《普通人翻身的路｜合作理念》
          </h2>
          <div className="space-y-3 text-sm leading-[1.9] text-text-secondary">
            <p className="font-semibold text-text-primary">
              如果未來有機會一起做事情，我通常會先看幾個條件：
            </p>
            <ul className="list-disc list-inside space-y-1 text-text-secondary/90">
              <li>你是否願意投入時間</li>
              <li>是否願意學習新的能力，例如自媒體或 AI 及照顧自己</li>
              <li>是否願意為未來慢慢建立長期收入</li>
            </ul>
            <p>這不是快速賺錢的機會，而是一條需要時間累積的路。</p>
            <p>
              每個月增加 3–5 萬，其實對很多人來說並不困難；
              <br />
              但如果你追求的是短期暴利或快速致富，那可能不太適合。
            </p>
            <p>這件事情更像是在建立一份長期的事業，而不是一個短線機會。</p>
            <p className="font-semibold text-text-primary">
              如果你是想認真了解並慢慢建立自己的收入結構，可以繼續往下填寫。
            </p>
          </div>
        </section>

        {/* Form */}
        {submitted ? (
          <section className="animate-fade-up mb-12 rounded-2xl border border-divider bg-bg-surface p-8 text-center">
            <p className="text-lg font-bold text-accent mb-2">感謝你的申請</p>
            <p className="text-sm text-text-secondary mb-4">
              我會先閱讀你的資料，如果背景與方向適合，才會安排進一步交流。
            </p>
            <p className="text-sm text-text-secondary">
              請私訊{" "}
              <a
                href="https://www.instagram.com/lw__wel/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                IG：lw__wel
              </a>{" "}
              告知「我填表了」，我會協助安排後續流程。
            </p>
          </section>
        ) : (
          <section className="animate-fade-up mb-10">
            <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-text-primary mb-6">
              合作申請表
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* 姓名 */}
              <input
                type="text"
                name="name"
                placeholder="請問怎麼稱呼你？"
                required
                className={inputClass}
              />

              {/* IG */}
              <input
                type="text"
                name="ig"
                placeholder="你的 IG 或社群帳號"
                required
                className={inputClass}
              />

              {/* 城市 */}
              <input
                type="text"
                name="city"
                placeholder="目前居住城市"
                required
                className={inputClass}
              />

              {/* 工作 */}
              <input
                type="text"
                name="job"
                placeholder="目前主要工作"
                required
                className={inputClass}
              />

              {/* 月收入 */}
              <fieldset>
                <legend className="text-sm font-semibold text-text-primary mb-3">
                  目前每月收入區間
                </legend>
                <div className={radioGroupClass}>
                  {INCOME_OPTIONS.map((opt) => (
                    <label key={opt} className={radioLabelClass}>
                      <input
                        type="radio"
                        name="income"
                        value={opt}
                        required
                        className="accent-accent"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* 創業經驗 */}
              <fieldset>
                <legend className="text-sm font-semibold text-text-primary mb-3">
                  過去是否有創業或副業經驗？
                </legend>
                <div className={radioGroupClass}>
                  {EXPERIENCE_OPTIONS.map((opt) => (
                    <label key={opt} className={radioLabelClass}>
                      <input
                        type="radio"
                        name="experience"
                        value={opt}
                        required
                        className="accent-accent"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* 為什麼想建立第二收入 */}
              <div>
                <label className="text-sm font-semibold text-text-primary mb-2 block">
                  為什麼你想建立第二收入？
                </label>
                <textarea
                  name="whySecondIncome"
                  placeholder="開放回答"
                  required
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* 每週時間 */}
              <fieldset>
                <legend className="text-sm font-semibold text-text-primary mb-3">
                  每週大約可以投入多少時間？
                </legend>
                <div className={radioGroupClass}>
                  {TIME_OPTIONS.map((opt) => (
                    <label key={opt} className={radioLabelClass}>
                      <input
                        type="radio"
                        name="weeklyTime"
                        value={opt}
                        required
                        className="accent-accent"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* 目前狀態 */}
              <fieldset>
                <legend className="text-sm font-semibold text-text-primary mb-3">
                  你現在的狀態比較接近哪一種？
                </legend>
                <div className={radioGroupClass}>
                  {STATE_OPTIONS.map((opt) => (
                    <label key={opt} className={radioLabelClass}>
                      <input
                        type="radio"
                        name="currentState"
                        value={opt}
                        required
                        className="accent-accent"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* 為什麼適合 */}
              <div>
                <label className="text-sm font-semibold text-text-primary mb-2 block">
                  為什麼你覺得自己適合參與這個計畫？
                </label>
                <textarea
                  name="whySuitable"
                  placeholder="開放回答"
                  required
                  rows={3}
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full border-2 border-accent bg-transparent py-3.5 text-center text-sm font-semibold text-accent tracking-wider transition-colors duration-200 hover:bg-accent hover:text-bg-primary disabled:opacity-50"
              >
                {submitting ? "提交中..." : "送出申請"}
              </button>
            </form>
          </section>
        )}

        {/* 最後說明 */}
        <section className="animate-fade-up mb-12 rounded-2xl border border-divider bg-bg-surface p-6">
          <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-text-primary mb-4">
            最後說明
          </h2>
          <div className="space-y-3 text-sm leading-[1.9] text-text-secondary">
            <p>提交表單後，我會先閱讀你的資料。</p>
            <p>如果背景與方向適合，才會安排時間進一步交流。</p>
            <p>這不是單方面介紹，而是雙向了解：</p>
            <ul className="list-disc list-inside space-y-1">
              <li>你是否適合這個模式</li>
              <li>我是否適合帶你</li>
            </ul>
            <p>如果沒有安排面談，也代表目前可能不太適合。</p>
            <p className="font-semibold text-text-primary">
              填寫完成後，麻煩私訊我的{" "}
              <a
                href="https://www.instagram.com/lw__wel/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                IG：lw__wel
              </a>
            </p>
            <p>
              「我填表了」我會協助安排後續流程。
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
