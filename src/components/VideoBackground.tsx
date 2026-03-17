export default function VideoBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
      >
        <source src="/videos/background_.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-bg-primary/85" />
    </div>
  );
}
