"use client";

import { useEffect, useMemo, useState } from "react";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
  imageUrls?: string[];
}

export default function HeroSection({
  title,
  subtitle,
  imageUrl,
  imageUrls,
}: HeroSectionProps) {
  const images = useMemo(() => {
    const list = imageUrls?.length ? imageUrls : imageUrl ? [imageUrl] : [];
    return [...new Set(list.filter(Boolean))];
  }, [imageUrl, imageUrls]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [fallbackActive, setFallbackActive] = useState(false);

  useEffect(() => {
    setFallbackActive(false);
  }, [activeIndex, images]);

  useEffect(() => {
    if (images.length < 2) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [images.length]);

  const currentImageUrl = images[activeIndex];
  const displayImageUrl = fallbackActive ? "/images/image_1.jpg" : currentImageUrl;

  return (
    <section className="animate-fade-up mb-12 overflow-hidden rounded-2xl border border-divider bg-bg-surface">
      {displayImageUrl && (
        <div className="relative h-48 w-full">
          {/* Use native img to support dynamic bucket URLs without Next image domain config. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={displayImageUrl}
            alt={title}
            className="h-full w-full object-cover"
            loading="eager"
            onError={() => setFallbackActive(true)}
          />
        </div>
      )}
      <div className={displayImageUrl ? "p-6" : "py-8"}>
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
