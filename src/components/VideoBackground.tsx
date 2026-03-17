"use client";

const backgroundVideoUrl =
  process.env.NEXT_PUBLIC_BACKGROUND_VIDEO_URL || "/videos/background_.mp4";

export default function VideoBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
        onCanPlay={(e) => {
          const video = e.currentTarget;
          video.play().catch(() => {});
        }}
      >
        <source src={backgroundVideoUrl} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-bg-primary/60" />
    </div>
  );
}
