"use client";

import { useEffect, useState } from "react";

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

export default function AnnouncementBar() {
  const [config, setConfig] = useState<AnnouncementConfig | null>(null);

  useEffect(() => {
    fetch("/api/announcements")
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch(() => {});
  }, []);

  if (!config || !config.enabled || config.items.length === 0) return null;

  const fullText = config.items.map((a) => a.text).join("\u3000\u3000\u3000\u2605\u3000\u3000\u3000");

  return (
    <div className="sticky top-0 z-50 w-full bg-accent/10 border-b border-accent/20 overflow-hidden backdrop-blur-sm">
      {config.effect === "right-to-left" && (
        <div className="animate-marquee flex w-max items-center py-2">
          <span className="text-xs text-accent tracking-wider whitespace-nowrap px-4">
            {fullText}{"\u3000\u3000\u3000\u2605\u3000\u3000\u3000"}{fullText}
          </span>
        </div>
      )}

      {config.effect === "left-to-right" && (
        <div className="animate-marquee-reverse flex w-max items-center py-2">
          <span className="text-xs text-accent tracking-wider whitespace-nowrap px-4">
            {fullText}{"\u3000\u3000\u3000\u2605\u3000\u3000\u3000"}{fullText}
          </span>
        </div>
      )}

      {config.effect === "typewriter" && (
        <div className="flex items-center justify-center py-2 overflow-hidden">
          <span className="text-xs text-accent tracking-wider whitespace-nowrap animate-typewriter">
            {fullText}
          </span>
        </div>
      )}

      {config.effect === "blink" && (
        <div className="flex items-center justify-center py-2">
          <span className="text-xs text-accent tracking-wider animate-blink">
            {fullText}
          </span>
        </div>
      )}

      {config.effect === "static" && (
        <div className="flex items-center justify-center py-2">
          <span className="text-xs text-accent tracking-wider text-center px-4">
            {fullText}
          </span>
        </div>
      )}
    </div>
  );
}
