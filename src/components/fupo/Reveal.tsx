"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export type RevealVariant =
  | "up"
  | "down"
  | "left"
  | "right"
  | "scale"
  | "blur"
  | "rotate"
  | "wipe"
  | "curtain";

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  /** 觸發門檻，0-1。長內容用小一點的值才不會滑過頭才出現。 */
  threshold?: number;
  /** 只播一次；設 false 則離開視窗後會重置，回捲時重播。 */
  once?: boolean;
  className?: string;
  style?: CSSProperties;
  id?: string;
}

export default function Reveal({
  children,
  variant = "up",
  delay = 0,
  threshold = 0.15,
  once = true,
  className = "",
  style,
  id,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setShown(false);
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return (
    <div
      id={id}
      ref={ref}
      className={`reveal reveal-${variant} ${shown ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </div>
  );
}
