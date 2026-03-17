import Image from "next/image";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

export default function HeroSection({ title, subtitle, imageUrl }: HeroSectionProps) {
  return (
    <section className="animate-fade-up relative mb-12 overflow-hidden rounded-2xl">
      {imageUrl && (
        <div className="relative h-48 w-full">
          <Image src={imageUrl} alt={title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-transparent" />
        </div>
      )}
      <div className={imageUrl ? "absolute bottom-0 left-0 right-0 p-6" : "py-8"}>
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
