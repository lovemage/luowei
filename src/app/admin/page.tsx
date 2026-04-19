import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [pageCount, faqCount, registrationCount] = await Promise.all([
    prisma.page.count(),
    prisma.fAQ.count(),
    prisma.registration.count(),
  ]);

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold mb-6 text-gray-900">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="rounded-xl bg-gray-50 p-5 md:p-6">
          <p className="text-2xl md:text-3xl font-bold text-gray-900">{pageCount}</p>
          <p className="text-sm text-gray-500 mt-1">頁面</p>
        </div>
        <div className="rounded-xl bg-gray-50 p-5 md:p-6">
          <p className="text-2xl md:text-3xl font-bold text-gray-900">{faqCount}</p>
          <p className="text-sm text-gray-500 mt-1">FAQ</p>
        </div>
        <div className="rounded-xl bg-gray-50 p-5 md:p-6">
          <p className="text-2xl md:text-3xl font-bold text-gray-900">{registrationCount}</p>
          <p className="text-sm text-gray-500 mt-1">報名</p>
        </div>
      </div>
    </div>
  );
}
