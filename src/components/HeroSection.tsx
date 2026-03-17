"use client";

import Image from "next/image";
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

  useEffect(() => {
    if (images.length < 2) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [images.length]);

  const currentImageUrl = images[activeIndex];

  return (
    <section className="animate-fade-up mb-12 overflow-hidden rounded-2xl border border-divider bg-bg-surface">
      {currentImageUrl && (
        <div className="relative h-48 w-full">
          <Image src={currentImageUrl} alt={title} fill className="object-cover" priority />
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
