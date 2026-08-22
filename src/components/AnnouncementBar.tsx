"use client";

import { useEffect, useState, useRef } from "react";

interface Announcement {
  id: string;
  text: string;
  visible: boolean;
}

interface AnnouncementConfig {
  enabled: boolean;
  effect: string;
  items: Announcement[];
}

function TypewriterText({ text }: { text: string }) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);
  const dirRef = useRef<"typing" | "pausing" | "erasing">("typing");
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    indexRef.current = 0;
    dirRef.current = "typing";
    setDisplayed("");

    function tick() {
      if (dirRef.current === "typing") {
        indexRef.current++;
        setDisplayed(text.slice(0, indexRef.current));
        if (indexRef.current >= text.length) {
          dirRef.current = "pausing";
          timerRef.current = setTimeout(tick, 2000);
        } else {
          timerRef.current = setTimeout(tick, 80);
        }
      } else if (dirRef.current === "pausing") {
        dirRef.current = "erasing";
        timerRef.current = setTimeout(tick, 30);
      } else {
        indexRef.current--;
        setDisplayed(text.slice(0, indexRef.current));
        if (indexRef.current <= 0) {
          dirRef.current = "typing";
          timerRef.current = setTimeout(tick, 500);
        } else {
          timerRef.current = setTimeout(tick, 30);
        }
      }
    }

    timerRef.current = setTimeout(tick, 300);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [text]);

  return (
    <span className="text-xs text-accent tracking-wider">
      {displayed}
      <span style={{ borderRight: "2px solid #E2C191", marginLeft: "2px", animation: "cursor-blink 0.8s step-end infinite" }}>&nbsp;</span>
    </span>
  );
}

export default function AnnouncementBar() {
  const [config, setConfig] = useState<AnnouncementConfig | null>(null);

  useEffect(() => {
    fetch("/api/announcements")
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch(() => {});
  }, []);

  if (!config || !config.enabled || config.items.length === 0) return null;

  const separator = "\u3000\u3000\u2605\u3000\u3000";
  const fullText = config.items.map((a) => a.text).join(separator);

  return (
    <div className="announcement-bar sticky top-0 z-50 w-full bg-accent/10 border-b border-accent/20 overflow-hidden backdrop-blur-sm">
      {/* 右至左 */}
      {config.effect === "right-to-left" && (
        <div
          className="flex w-max items-center py-2"
          style={{ animation: "announcement-rtl 20s linear infinite" }}
        >
          <span className="text-xs text-accent tracking-wider whitespace-nowrap px-4">
            {fullText}{separator}{fullText}{separator}
          </span>
        </div>
      )}

      {/* 左至右 */}
      {config.effect === "left-to-right" && (
        <div
          className="flex w-max items-center py-2"
          style={{ animation: "announcement-ltr 20s linear infinite" }}
        >
          <span className="text-xs text-accent tracking-wider whitespace-nowrap px-4">
            {fullText}{separator}{fullText}{separator}
          </span>
        </div>
      )}

      {/* 打字機 */}
      {config.effect === "typewriter" && (
        <div className="flex items-center justify-center py-2 min-h-[28px]">
          <TypewriterText text={fullText} />
        </div>
      )}

      {/* 閃爍 */}
      {config.effect === "blink" && (
        <div className="flex items-center justify-center py-2">
          <span
            className="text-xs text-accent tracking-wider text-center px-4"
            style={{ animation: "announcement-blink 1.5s ease-in-out infinite" }}
          >
            {fullText}
          </span>
        </div>
      )}

      {/* 固定 */}
      {config.effect === "static" && (
        <div className="flex items-center justify-center py-2">
          <span className="text-xs text-accent tracking-wider text-center px-4 truncate">
            {fullText}
          </span>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes announcement-rtl {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes announcement-ltr {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes announcement-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes cursor-blink {
          0%, 100% { border-color: #E2C191; }
          50% { border-color: transparent; }
        }
      `}} />
    </div>
  );
}
