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
    <div className="flex flex-col items-center gap-3 pt-6">
      <div className="flex items-center gap-6">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-1 text-gold/70 hover:text-gold-bright transition-colors"
          >
            <span className="text-xs font-medium tracking-wide">{link.icon}</span>
            <span className="text-[10px] opacity-70">{link.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
