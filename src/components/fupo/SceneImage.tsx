"use client";

import Image from "next/image";
import { useState } from "react";

interface SceneImageProps {
  src: string;
  alt: string;
  /** 圖片缺席時顯示的裝飾字樣 */
  placeholder: string;
  className?: string;
  /** 圖片比例，例如 "16/9"、"4/5"、"auto"（由外層容器決定高度） */
  ratio?: string;
  /** 疊在圖片上的淺色遮罩濃度 0-1 */
  scrim?: number;
  /**
   * 版面配置提示，交給 next/image 決定要送哪一階尺寸。
   * 手機一律只會拿到約 360-640px 寬的檔案，而不是原始的 1920px。
   */
  sizes?: string;
  /** 首屏圖片設 true：改為 eager 載入並提高抓取優先度（LCP） */
  priority?: boolean;
  children?: React.ReactNode;
}

/**
 * 情境圖。走 next/image 產生 AVIF/WebP 與多尺寸 srcset，
 * 手機不會再下載桌機用的大圖。
 *
 * 圖片檔尚未產出（或載入失敗）時退回暖色漸層裝飾底，版面不會塌掉。
 */
export default function SceneImage({
  src,
  alt,
  placeholder,
  className = "",
  ratio = "16/9",
  scrim = 0.35,
  sizes = "100vw",
  priority = false,
  children,
}: SceneImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: ratio, background: "#EFE7DA" }}
    >
      {!failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className="object-cover"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center"
          style={{
            background:
              "radial-gradient(120% 90% at 20% 15%, rgba(176,141,79,0.22), transparent 60%), radial-gradient(100% 80% at 85% 85%, rgba(201,143,128,0.20), transparent 60%), #EFE7DA",
          }}
        >
          <span className="px-6 text-center text-[11px] tracking-[0.35em] text-[#7E5D28]">
            {placeholder}
          </span>
        </div>
      )}

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(180deg, rgba(250,247,242,${scrim * 0.5}) 0%, rgba(250,247,242,0) 40%, rgba(250,247,242,${scrim}) 100%)`,
        }}
      />
      {children}
    </div>
  );
}
