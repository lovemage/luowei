"use client";

interface CaseItem {
  id: number;
  slug: string;
  name: string;
  avatarUrl: string;
  category: string;
  title: string;
  bio: string;
  stats: Record<string, string>;
}

interface CaseLogoWallProps {
  cases: CaseItem[];
  onSelect: (c: CaseItem) => void;
}

export default function CaseLogoWall({ cases, onSelect }: CaseLogoWallProps) {
  if (cases.length === 0) {
    return (
      <p className="text-center text-text-secondary text-sm py-12">
        尚無案例資料
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {cases.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c)}
          className="flex flex-col items-center gap-2 group"
        >
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-accent/30 group-hover:border-accent transition-colors shadow-[0_0_12px_rgba(226,193,145,0.12)]">
            <img
              src={c.avatarUrl}
              alt={c.name}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs text-text-secondary group-hover:text-accent transition-colors text-center leading-tight">
            {c.name}
          </span>
        </button>
      ))}
    </div>
  );
}
