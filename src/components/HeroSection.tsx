"use client";

import { useEffect, useMemo, useState, useCallback } from "react";

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
  const [failedUrls, setFailedUrls] = useState<Set<string>>(new Set());

  // Filter out failed images
  const validImages = useMemo(
    () => images.filter((url) => !failedUrls.has(url)),
    [images, failedUrls]
  );

  const handleError = useCallback(() => {
    const failedUrl = images[activeIndex];
    if (failedUrl) {
      setFailedUrls((prev) => new Set(prev).add(failedUrl));
      // Move to next valid image
      if (validImages.length > 1) {
        setActiveIndex((prev) => (prev + 1) % images.length);
      }
    }
  }, [activeIndex, images, validImages.length]);

  useEffect(() => {
    if (validImages.length < 2) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        let next = (prev + 1) % images.length;
        // Skip failed images
        while (failedUrls.has(images[next]) && next !== prev) {
          next = (next + 1) % images.length;
        }
        return next;
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [validImages.length, images, failedUrls]);

  const currentImageUrl = validImages.length > 0
    ? images[activeIndex] && !failedUrls.has(images[activeIndex])
      ? images[activeIndex]
      : validImages[0]
    : null;

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
