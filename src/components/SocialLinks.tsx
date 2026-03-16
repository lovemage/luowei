import Link from "next/link";

const links = [
  {
    label: "課程小幫手",
    href: "https://lin.ee/L8iPk8a",
    icon: "LINE",
  },
  {
    label: "企業小幫手",
    href: "https://lin.ee/htTdJSH",
    icon: "LINE",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/lowemedia_?igsh=MWppb2V2cWdwMTE2MQ==",
    icon: "IG",
  },
];

export default function SocialLinks() {
  return (
    <div className="flex items-center justify-center gap-8 pt-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1.5 transition-colors duration-200 active:scale-95"
        >
          <span className="text-xs font-semibold tracking-wide text-terracotta">
            {link.icon}
          </span>
          <span className="text-[10px] text-warm-gray">{link.label}</span>
        </Link>
      ))}
    </div>
  );
}
