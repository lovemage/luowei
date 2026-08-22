"use client";

import Link from "next/link";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/RegistrationForm";
import FAQAccordion from "@/components/FAQAccordion";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export default function SecondIncomeContent({ faqs }: { faqs: FAQ[] }) {
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

        {/* Form — loaded from API, editable in admin */}
        <RegistrationForm pageSlug="second-income" />

        {faqs.length > 0 && (
          <FAQAccordion title="常見問題" items={faqs} />
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
