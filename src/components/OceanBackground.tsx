export default function OceanBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Light rays */}
      <div className="absolute inset-0 animate-light-rays opacity-20"
        style={{
          background:
            "repeating-linear-gradient(115deg, transparent, transparent 40px, rgba(212,168,83,0.08) 40px, rgba(212,168,83,0.08) 80px)",
        }}
      />
      <div className="absolute inset-0 animate-light-rays-slow opacity-10"
        style={{
          background:
            "repeating-linear-gradient(125deg, transparent, transparent 60px, rgba(30,58,110,0.15) 60px, rgba(30,58,110,0.15) 100px)",
        }}
      />

      {/* SVG Waves */}
      <svg
        className="absolute bottom-0 w-full"
        style={{ height: "40%" }}
        viewBox="0 0 430 300"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Wave layer 1 - back */}
        <path className="animate-wave-1" opacity="0.3" fill="#162040"
          d="M0,120 C60,80 120,160 200,120 C280,80 360,140 430,100 L430,300 L0,300 Z"
        />
        {/* Wave layer 2 - middle */}
        <path className="animate-wave-2" opacity="0.5" fill="#1a2744"
          d="M0,160 C80,120 160,200 240,150 C320,100 380,170 430,140 L430,300 L0,300 Z"
        />
        {/* Wave layer 3 - front */}
        <path className="animate-wave-3" opacity="0.7" fill="#1e3a6e"
          d="M0,200 C70,170 140,220 220,190 C300,160 370,210 430,180 L430,300 L0,300 Z"
        />
      </svg>

      {/* Gold shimmer on water surface */}
      <div
        className="absolute bottom-[25%] left-0 right-0 h-[2px] animate-shimmer opacity-30"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #d4a853 30%, #e8c06a 50%, #d4a853 70%, transparent 100%)",
        }}
      />
    </div>
  );
}
