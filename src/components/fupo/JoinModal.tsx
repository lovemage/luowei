"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const GENDERS = ["女", "男", "其他"] as const;
const SOCIALS = ["IG", "FB", "Threads", "其他"] as const;

const C = {
  card: "#FFFFFF",
  band: "#F3ECE1",
  ink: "#2B2318",
  lead: "#4C4236",
  body: "#6B5F51",
  gold: "#7E5D28",
  deco: "#B08D4F",
  danger: "#A63A24",
} as const;

const LINE = "rgba(126,93,40,0.22)";
const TINT = "rgba(126,93,40,0.06)";
/** 裁掉手撕毛邊後的紙面。整張卡是一張裁切過的信紙，邊由 CSS 畫，不由素材決定。 */
const PAPER = "url(/images/fupo/tex/modal-paper.webp)";
/** 紙的切口：比內文分隔線深一點，才看得出是紙的厚度而不是一條裝飾線。 */
const EDGE = "rgba(126,93,40,0.20)";

interface JoinModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormValues {
  name: string;
  gender: (typeof GENDERS)[number];
  phone: string;
  lineId: string;
  socialPlatform: (typeof SOCIALS)[number];
  socialLink: string;
  captchaInput: string;
  website: string;
}

interface JoinResult {
  lineUrl: string;
  lineMessage: string;
  prefilled: boolean;
}

const EMPTY: FormValues = {
  name: "",
  gender: "女",
  phone: "",
  lineId: "",
  socialPlatform: "IG",
  socialLink: "",
  captchaInput: "",
  website: "",
};

type FieldKey = "name" | "phone" | "lineId" | "socialLink" | "captchaInput";

/** 前端先擋一次，錯誤訊息與後端一致；真正的把關仍在 API。 */
function validate(values: FormValues): Partial<Record<FieldKey, string>> {
  const errors: Partial<Record<FieldKey, string>> = {};

  if (!values.name.trim()) errors.name = "請填寫姓名";
  else if (values.name.trim().length > 30) errors.name = "姓名過長";

  const phone = values.phone.replace(/[^\d+]/g, "").replace(/^\+?886/, "0");
  if (!phone) errors.phone = "請填寫手機號碼";
  else if (!/^09\d{8}$/.test(phone)) errors.phone = "請輸入 09 開頭的 10 碼手機號碼";

  const lineId = values.lineId.trim();
  if (!lineId) errors.lineId = "請填寫 LINE ID";
  else if (lineId.length < 2) errors.lineId = "LINE ID 過短";
  else if (!/^[A-Za-z0-9._@-]+$/.test(lineId)) errors.lineId = "只能包含英數字與 . _ - @";

  if (values.socialLink.trim().length > 200) errors.socialLink = "連結過長";

  if (!values.captchaInput.trim()) errors.captchaInput = "請填寫驗證碼";

  return errors;
}

export default function JoinModal({ open, onClose }: JoinModalProps) {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [formError, setFormError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<JoinResult | null>(null);
  const [captcha, setCaptcha] = useState<{ token: string; image: string } | null>(null);
  const [captchaLoading, setCaptchaLoading] = useState(false);
  const [entered, setEntered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [autoJump, setAutoJump] = useState(true);

  const captchaInputRef = useRef<HTMLInputElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  const loadCaptcha = useCallback(async () => {
    setCaptchaLoading(true);
    try {
      const res = await fetch("/api/captcha", { cache: "no-store" });
      if (!res.ok) throw new Error("captcha");
      const data = (await res.json()) as { token: string; image: string };
      setCaptcha(data);
    } catch {
      setCaptcha(null);
    } finally {
      setCaptchaLoading(false);
    }
  }, []);

  /* 每次開啟都重置，避免上一次的錯誤訊息或成功畫面殘留 */
  useEffect(() => {
    if (!open) {
      setEntered(false);
      return;
    }
    setValues(EMPTY);
    setErrors({});
    setFormError("");
    setResult(null);
    setCopied(false);
    setCountdown(3);
    setAutoJump(true);
    loadCaptcha();

    const frame = requestAnimationFrame(() => {
      setEntered(true);
      // preventScroll：不讓對焦動作把對話框往上推
      firstFieldRef.current?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [open, loadCaptcha]);

  /* 鎖住背景捲動 + ESC 關閉 */
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  /* 成功且訊息可預填時，倒數後直接把使用者送進 LINE 對話框 */
  useEffect(() => {
    if (!result?.prefilled || !autoJump) return;
    if (countdown <= 0) {
      window.location.assign(result.lineUrl);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [result, countdown, autoJump]);

  function update<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (key in errors) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function copyMessage() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result.lineMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // 某些瀏覽器在非 https 下沒有 clipboard API，退回手動選取
      const el = document.getElementById("fp-line-message") as HTMLTextAreaElement | null;
      el?.select();
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setFormError("");
    if (Object.keys(nextErrors).length > 0) return;

    if (!captcha) {
      setFormError("驗證碼載入失敗，請點擊圖片重新取得");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/fupo/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          gender: values.gender,
          phone: values.phone,
          lineId: values.lineId.trim(),
          socialPlatform: values.socialPlatform,
          socialLink: values.socialLink.trim(),
          captchaToken: captcha.token,
          captchaInput: values.captchaInput,
          website: values.website,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setFormError(data?.error || "送出失敗，請稍後再試");
        if (data?.field === "captcha") {
          setValues((prev) => ({ ...prev, captchaInput: "" }));
          await loadCaptcha();
          captchaInputRef.current?.focus();
        }
        return;
      }

      setResult(data as JoinResult);
    } catch {
      setFormError("網路異常，請稍後再試");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  const inputClass =
    "w-full bg-transparent py-2.5 text-[15px] text-[#2B2318] outline-none transition-colors placeholder:text-[#6B5F51]/35";

  function fieldBorder(key: FieldKey) {
    return { borderBottom: `1px solid ${errors[key] ? C.danger : LINE}` };
  }

  const content = (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto px-4 py-8 sm:items-center sm:py-12"
      role="dialog"
      aria-modal="true"
      aria-labelledby="fp-join-title"
    >
      {/* 遮罩 */}
      <button
        type="button"
        aria-label="關閉表單"
        onClick={onClose}
        className="fixed inset-0 cursor-default transition-opacity duration-300"
        style={{
          background: "rgba(43,35,24,0.55)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          opacity: entered ? 1 : 0,
        }}
      />

      {/* 卡片。一張裁邊的信紙：直角、四邊乾淨，質感全部來自紙紋與邊緣的受光，
          不再用素材的 alpha 去 mask 手撕邊。底色直接留在卡片上即可，矩形不會外露。 */}
      <div
        className="relative w-full max-w-[452px]"
        style={{
          background: C.card,
          boxShadow: "0 26px 64px rgba(43,35,24,0.42), 0 3px 10px rgba(43,35,24,0.16)",
          opacity: entered ? 1 : 0,
          transform: entered ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 340ms cubic-bezier(0.16,1,0.3,1), transform 340ms cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* 紙張紋理，55% 疊在卡片底色之上——與全頁其他素材同一組規則，
            詳見 FupoContent 的 TEX_OPACITY 註解。 */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: PAPER,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            opacity: 0.55,
          }}
        />

        {/* 紙面受光：四角比中央沉一點，整張紙才不會看起來像一塊平色。
            用暖褐而不是灰，才跟紙的色溫是同一件事。 */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(118% 76% at 50% 38%, rgba(126,93,40,0) 52%, rgba(126,93,40,0.075) 100%)",
          }}
        />

        {/* 紙的厚度：一圈切口細線，上緣補一道亮邊當作裁切面的反光。 */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            boxShadow: `inset 0 0 0 1px ${EDGE}, inset 0 1px 0 rgba(255,255,255,0.66)`,
          }}
        />

        <button
          type="button"
          onClick={onClose}
          aria-label="關閉"
          className="absolute top-6 right-5 z-20 flex h-9 w-9 items-center justify-center text-[#6B5F51] transition-colors hover:text-[#7E5D28]"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.6}>
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        <div className="relative z-10 px-8 pt-10 pb-11 sm:px-11 sm:pt-12">
          {/* ── 表頭：Logo 置中 ── */}
          <div className="text-center">
            <Image
              src="/images/fupo/owl-mark.webp"
              alt="BNI - 富婆分會"
              width={112}
              height={112}
              className="mx-auto h-[58px] w-[58px]"
            />
            <p className="mt-4 text-[10px] font-semibold tracking-[0.46em] text-[#7E5D28]">
              JOIN US
            </p>
            <h2
              id="fp-join-title"
              className="mt-2.5 font-[family-name:var(--font-noto-serif-tc)] text-[23px] leading-[1.4] font-bold text-[#2B2318]"
            >
              {result ? "資料已收到" : "加入 BNI - 富婆分會"}
            </h2>
            <div
              className="mx-auto mt-4 h-px w-16"
              style={{ background: `linear-gradient(90deg, transparent, ${C.deco}, transparent)` }}
            />
          </div>

          {result ? (
            /* ══════════ 成功畫面 ══════════ */
            <div className="mt-7">
              <p className="text-center text-[14.5px] leading-[2] text-[#4C4236]">
                {result.prefilled
                  ? "已為妳打好一則 LINE 訊息，開啟後直接按送出即可。"
                  : "訊息已為妳打好，請複製後貼到 LINE 官方帳號送出。"}
              </p>

              <div className="mt-5 px-5 py-4" style={{ background: TINT, border: `1px solid ${LINE}` }}>
                <p className="mb-2 text-[10px] font-semibold tracking-[0.3em] text-[#7E5D28]">
                  訊息內容
                </p>
                <textarea
                  id="fp-line-message"
                  readOnly
                  value={result.lineMessage}
                  rows={11}
                  className="w-full resize-none bg-transparent text-[13.5px] leading-[1.9] text-[#4C4236] outline-none"
                />
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={result.lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setAutoJump(false)}
                  className="flex items-center justify-center gap-2 py-3.5 text-[14px] font-semibold tracking-[0.14em] transition-opacity hover:opacity-88"
                  style={{ background: "#06C755", color: "#FFFFFF" }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
                    <path d="M12 2C6.48 2 2 5.69 2 10.23c0 4.07 3.55 7.48 8.35 8.12.32.07.77.22.88.5.1.25.07.65.03.9l-.14.85c-.04.25-.2.98.86.53s5.72-3.37 7.8-5.77c1.44-1.58 2.13-3.18 2.13-4.96C22 5.69 17.52 2 12 2z" />
                  </svg>
                  {result.prefilled ? "開啟 LINE 傳送訊息" : "開啟 LINE 官方帳號"}
                </a>

                <button
                  type="button"
                  onClick={copyMessage}
                  className="py-3 text-[13.5px] font-semibold tracking-[0.14em] text-[#7E5D28] transition-colors hover:bg-[#F7F1E6]"
                  style={{ border: `1px solid ${LINE}` }}
                >
                  {copied ? "已複製訊息" : "複製訊息內容"}
                </button>
              </div>

              {result.prefilled && autoJump && (
                <p className="mt-5 text-center text-[12.5px] text-[#6B5F51]">
                  {countdown} 秒後自動開啟 LINE．
                  <button
                    type="button"
                    onClick={() => setAutoJump(false)}
                    className="ml-1 underline underline-offset-4 transition-colors hover:text-[#7E5D28]"
                  >
                    留在本頁
                  </button>
                </p>
              )}
            </div>
          ) : (
            /* ══════════ 表單 ══════════ */
            <>
              <form onSubmit={handleSubmit} noValidate className="mt-9 flex flex-col gap-6">
                {/* 蜜罐：純給機器人填的隱藏欄位 */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={values.website}
                  onChange={(e) => update("website", e.target.value)}
                  className="pointer-events-none absolute h-0 w-0 opacity-0"
                />

                {/* 姓名 */}
                <div>
                  <label
                    htmlFor="fp-name"
                    className="mb-1 block text-[11px] font-semibold tracking-[0.26em] text-[#7E5D28]"
                  >
                    姓名
                  </label>
                  <input
                    id="fp-name"
                    ref={firstFieldRef}
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="請填寫姓名"
                    className={inputClass}
                    style={fieldBorder("name")}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-[12px]" style={{ color: C.danger }}>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* 性別 */}
                <fieldset>
                  <legend className="mb-2 text-[11px] font-semibold tracking-[0.26em] text-[#7E5D28]">
                    性別
                  </legend>
                  {/* 未選取一律透明，讓底下的紙紋透出來；原本填白色會在紙上
                      壓出一塊突兀的白方塊。分隔線改用 border，不再靠 gap-px。 */}
                  <div className="grid grid-cols-3" style={{ border: `1px solid ${LINE}` }}>
                    {GENDERS.map((g, i) => {
                      const active = values.gender === g;
                      return (
                        <button
                          key={g}
                          type="button"
                          onClick={() => update("gender", g)}
                          aria-pressed={active}
                          className={`py-2.5 text-[14px] transition-colors ${
                            active
                              ? "font-bold text-[#FAF7F2]"
                              : "text-[#6B5F51] hover:text-[#7E5D28]"
                          }`}
                          style={{
                            background: active ? C.gold : "transparent",
                            borderLeft: i === 0 ? undefined : `1px solid ${LINE}`,
                          }}
                        >
                          {g}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* 手機 */}
                <div>
                  <label
                    htmlFor="fp-phone"
                    className="mb-1 block text-[11px] font-semibold tracking-[0.26em] text-[#7E5D28]"
                  >
                    手機號碼
                  </label>
                  <input
                    id="fp-phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="09xxxxxxxx"
                    className={inputClass}
                    style={fieldBorder("phone")}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-[12px]" style={{ color: C.danger }}>
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* LINE ID */}
                <div>
                  <label
                    htmlFor="fp-lineid"
                    className="mb-1 block text-[11px] font-semibold tracking-[0.26em] text-[#7E5D28]"
                  >
                    LINE ID
                  </label>
                  <input
                    id="fp-lineid"
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    value={values.lineId}
                    onChange={(e) => update("lineId", e.target.value)}
                    placeholder="請填寫 LINE ID"
                    className={inputClass}
                    style={fieldBorder("lineId")}
                  />
                  {errors.lineId && (
                    <p className="mt-1.5 text-[12px]" style={{ color: C.danger }}>
                      {errors.lineId}
                    </p>
                  )}
                </div>

                {/* 社群連結（選填） */}
                <div>
                  <div className="mb-2 flex items-baseline justify-between">
                    <span className="text-[11px] font-semibold tracking-[0.26em] text-[#7E5D28]">
                      社群連結
                    </span>
                    <span className="text-[11px] tracking-[0.1em] text-[#6B5F51]/70">選填</span>
                  </div>
                  <div className="grid grid-cols-4" style={{ border: `1px solid ${LINE}` }}>
                    {SOCIALS.map((s, i) => {
                      const active = values.socialPlatform === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => update("socialPlatform", s)}
                          aria-pressed={active}
                          className={`py-2.5 text-[13px] transition-colors ${
                            active
                              ? "font-bold text-[#FAF7F2]"
                              : "text-[#6B5F51] hover:text-[#7E5D28]"
                          }`}
                          style={{
                            background: active ? C.gold : "transparent",
                            borderLeft: i === 0 ? undefined : `1px solid ${LINE}`,
                          }}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                  <input
                    type="text"
                    autoCapitalize="none"
                    autoCorrect="off"
                    value={values.socialLink}
                    onChange={(e) => update("socialLink", e.target.value)}
                    placeholder={`${values.socialPlatform} 連結或帳號`}
                    className={`${inputClass} mt-2`}
                    style={fieldBorder("socialLink")}
                    aria-label="社群連結"
                  />
                  {errors.socialLink && (
                    <p className="mt-1.5 text-[12px]" style={{ color: C.danger }}>
                      {errors.socialLink}
                    </p>
                  )}
                </div>

                {/* 驗證碼 */}
                <div>
                  <label
                    htmlFor="fp-captcha"
                    className="mb-2 block text-[11px] font-semibold tracking-[0.26em] text-[#7E5D28]"
                  >
                    驗證碼
                  </label>
                  <div className="flex items-end gap-3">
                    <input
                      id="fp-captcha"
                      ref={captchaInputRef}
                      type="text"
                      inputMode="text"
                      autoComplete="off"
                      autoCapitalize="characters"
                      autoCorrect="off"
                      maxLength={4}
                      value={values.captchaInput}
                      onChange={(e) => update("captchaInput", e.target.value.toUpperCase())}
                      placeholder="輸入圖片上的 4 碼"
                      className={`${inputClass} flex-1 tracking-[0.3em]`}
                      style={fieldBorder("captchaInput")}
                    />
                    <button
                      type="button"
                      onClick={loadCaptcha}
                      title="換一張驗證碼"
                      aria-label="換一張驗證碼"
                      className="shrink-0 transition-opacity hover:opacity-80"
                      style={{ border: `1px solid ${LINE}`, background: C.band }}
                    >
                      {captcha ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={captcha.image}
                          alt="驗證碼圖片"
                          width={132}
                          height={48}
                          className="block h-[48px] w-[132px]"
                        />
                      ) : (
                        <span className="flex h-[48px] w-[132px] items-center justify-center text-[12px] text-[#6B5F51]">
                          {captchaLoading ? "載入中…" : "點擊重新取得"}
                        </span>
                      )}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={loadCaptcha}
                    className="mt-2 text-[12px] text-[#6B5F51] underline underline-offset-4 transition-colors hover:text-[#7E5D28]"
                  >
                    看不清楚？換一張
                  </button>
                  {errors.captchaInput && (
                    <p className="mt-1.5 text-[12px]" style={{ color: C.danger }}>
                      {errors.captchaInput}
                    </p>
                  )}
                </div>

                {formError && (
                  <p
                    role="alert"
                    className="px-4 py-3 text-[13px] leading-[1.8]"
                    style={{ background: "rgba(166,58,36,0.07)", color: C.danger }}
                  >
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-1 py-3.5 text-[14px] font-semibold tracking-[0.22em] transition-opacity hover:opacity-88 disabled:opacity-50"
                  style={{ background: C.gold, color: "#FAF7F2" }}
                >
                  {submitting ? "送出中…" : "送出並聯繫 LINE"}
                </button>

                <p className="text-center text-[11.5px] leading-[1.9] text-[#6B5F51]/85">
                  送出後將自動為妳打好一則 LINE 訊息，
                  <br />
                  確認內容後按送出即可完成聯繫。
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );

  // layout 的 .site-shell 有 relative z-10，會把 z-index 關在自己的堆疊環境裡，
  // 導致 z-50 的浮動 LINE 按鈕蓋在對話框上。掛到 body 才能真正疊到最上層。
  return createPortal(content, document.body);
}
