"use client";

import { useEffect, useMemo, useState, useRef } from "react";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  imageUrls?: string[];
  borderless?: boolean;
}

const MAX_IMAGES = 3;

export default function HeroSection({
  title,
  subtitle,
  imageUrl,
  imageUrls,
  borderless,
}: HeroSectionProps) {
  const images = useMemo(() => {
    const list = imageUrls?.length ? imageUrls : imageUrl ? [imageUrl] : [];
    return [...new Set(list.filter(Boolean))].slice(0, MAX_IMAGES);
  }, [imageUrl, imageUrls]);

  const [activeIndex, setActiveIndex] = useState(0);
  const failedRef = useRef<Set<string>>(new Set());
  const [validImages, setValidImages] = useState(images);

  useEffect(() => {
    failedRef.current = new Set();
    setValidImages(images);
    setActiveIndex(0);
  }, [images]);

  function handleError() {
    const failedUrl = validImages[activeIndex];
    if (!failedUrl || failedRef.current.has(failedUrl)) return;
    failedRef.current.add(failedUrl);
    const remaining = images.filter((url) => !failedRef.current.has(url));
    setValidImages(remaining);
    setActiveIndex(0);
  }

  useEffect(() => {
    if (validImages.length < 2) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % validImages.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [validImages.length]);

  const currentImageUrl = validImages.length > 0 ? validImages[activeIndex % validImages.length] : null;

  return (
    <section className={`animate-fade-up mb-12 overflow-hidden rounded-2xl ${borderless ? "" : "border border-divider bg-bg-surface"}`}>
      {currentImageUrl && (
        <div className="relative h-48 w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={currentImageUrl}
            alt={title}
            className="h-full w-full object-cover"
            loading="eager"
            onError={handleError}
          />
        </div>
      )}
      <div className={currentImageUrl ? "p-6" : "py-8"}>
        <h1 className="font-[family-name:var(--font-noto-serif-tc)] text-[22px] font-bold leading-[1.6] text-gold-shine mb-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-text-secondary leading-[1.8]">{subtitle}</p>
        )}
        <div className="mt-4 h-[2px] w-12 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full" />
      </div>
    </section>
  );
}
