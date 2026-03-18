"use client";

import { useEffect, useState } from "react";

interface Announcement {
  id: string;
  text: string;
  visible: boolean;
}

export default function AnnouncementBar() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    fetch("/api/announcements")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAnnouncements(data);
        }
      })
      .catch(() => {});
  }, []);

  if (announcements.length === 0) return null;

  const marqueeText = announcements.map((a) => a.text).join("\u3000\u3000\u3000\u2605\u3000\u3000\u3000");

  return (
    <div className="w-full bg-accent/10 border-b border-accent/20 overflow-hidden">
      <div className="animate-marquee flex w-max items-center py-2">
        <span className="text-xs text-accent tracking-wider whitespace-nowrap px-4">
          {marqueeText}{"\u3000\u3000\u3000\u2605\u3000\u3000\u3000"}{marqueeText}
        </span>
      </div>
    </div>
  );
}
