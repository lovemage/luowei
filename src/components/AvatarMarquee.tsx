import Image from "next/image";

const avatars = [
  "S__4505733_0.webp",
  "S__4505734_0.webp",
  "S__4505735_0.webp",
  "S__4505736_0.webp",
  "S__4505737_0.webp",
  "S__4505738_0.webp",
  "S__4505739_0.webp",
  "S__4505740_0.webp",
  "S__4505741_0.webp",
];

export default function AvatarMarquee() {
  return (
    <div className="relative w-full overflow-hidden py-4">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ocean-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ocean-bg to-transparent" />

      {/* Scrolling track — duplicated for seamless loop */}
      <div className="animate-marquee flex w-max gap-5">
        {[...avatars, ...avatars].map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-gold/30"
          >
            <Image
              src={`/avator/${src}`}
              alt={`學員 ${(i % avatars.length) + 1}`}
              width={80}
              height={80}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
