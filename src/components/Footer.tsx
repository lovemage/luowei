import { prisma } from "@/lib/prisma";

export default async function Footer() {
  const settings = await prisma.siteSettings.findUnique({
    where: { id: "singleton" },
  });
  const footerText = settings?.footerText || "";

  return (
    <footer className="mt-auto pt-14 text-center pb-8">
      <p className="font-[family-name:var(--font-noto-serif-tc)] text-sm tracking-[0.2em] text-text-secondary">
        無限進步｜個人成長
      </p>
      {footerText && (
        <p className="mt-3 text-xs text-text-secondary/60 tracking-wide max-w-xs mx-auto">
          {footerText}
        </p>
      )}
      <p className="mt-4 text-xs text-text-secondary/40 tracking-widest">
        羅威傳媒 | Louwei Studio
      </p>
    </footer>
  );
}
