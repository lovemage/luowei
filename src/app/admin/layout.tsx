import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex min-h-dvh"
      style={{ background: "#ffffff", color: "#111827", maxWidth: "100%", margin: 0, position: "fixed", inset: 0, zIndex: 60, overflow: "auto" }}
    >
      <Sidebar />
      <main className="flex-1 p-6 ml-56">{children}</main>
    </div>
  );
}
