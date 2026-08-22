"use client";

import { useEffect, useRef, useState } from "react";

interface SceneImageProps {
  src: string;
  alt: string;
  /** 圖片缺席時顯示的裝飾字樣 */
  placeholder: string;
  className?: string;
  /** 圖片比例，例如 "16/9"、"4/5" */
  ratio?: string;
  /** 疊在圖片上的暗化程度 0-1 */
  scrim?: number;
  children?: React.ReactNode;
}

/**
 * 情境圖。圖片檔尚未產出（或載入失敗）時，退回金色漸層裝飾底，
 * 版面不會塌掉，之後把檔案放進 public/images/fupo/ 即可自動生效。
 */
export default function SceneImage({
  src,
  alt,
  placeholder,
  className = "",
  ratio = "16/9",
  scrim = 0.35,
  children,
}: SceneImageProps) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // SSR 產生的 <img> 可能在 React 掛上 onError 之前就已載入失敗，
  // 掛載後補檢查一次，否則會留下破圖的 alt 文字。
  useEffect(() => {
    const img = imgRef.current;
    if (!img || !img.complete || img.naturalWidth !== 0) return;
    const raf = requestAnimationFrame(() => setFailed(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: ratio, background: "#14110D" }}
    >
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center"
          style={{
            background:
              "radial-gradient(120% 90% at 20% 15%, rgba(226,193,145,0.20), transparent 60%), radial-gradient(100% 80% at 85% 85%, rgba(229,183,168,0.16), transparent 60%), #14110D",
          }}
        >
          <span className="px-6 text-center text-[11px] tracking-[0.35em] text-[#E2C191]/45">
            {placeholder}
          </span>
        </div>
      )}

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(9,8,7,${scrim * 0.5}) 0%, rgba(9,8,7,0) 40%, rgba(9,8,7,${scrim}) 100%)`,
        }}
      />
      {children}
    </div>
  );
}
