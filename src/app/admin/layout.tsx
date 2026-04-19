import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="admin-root min-h-dvh"
      style={{
        background: "#ffffff",
        color: "#111827",
        maxWidth: "100%",
        margin: 0,
        position: "fixed",
        inset: 0,
        zIndex: 60,
        overflow: "auto",
      }}
    >
      <Sidebar />
      <main className="admin-main md:ml-56 pt-14 md:pt-0 px-4 py-4 md:px-6 md:py-6">
        {children}
      </main>
    </div>
  );
}
