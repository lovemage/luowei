export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-dvh"
      style={{ background: "#f9fafb", color: "#111827", maxWidth: "100%", margin: 0, position: "fixed", inset: 0, zIndex: 60, overflow: "auto" }}
    >
      {children}
    </div>
  );
}
