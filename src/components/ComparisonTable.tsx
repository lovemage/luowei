interface ComparisonItem {
  label: string;
  left: string;
  right: string;
}

interface ComparisonTableProps {
  title?: string;
  leftLabel: string;
  rightLabel: string;
  items: ComparisonItem[];
}

export default function ComparisonTable({ title, leftLabel, rightLabel, items }: ComparisonTableProps) {
  return (
    <section className="animate-fade-up mb-12">
      {title && (
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-text-primary mb-6">
          {title}
        </h2>
      )}
      <div className="overflow-hidden rounded-lg border border-divider">
        <div className="grid grid-cols-[1fr_1fr] bg-bg-surface">
          <div className="px-4 py-3 text-center text-xs font-semibold text-text-secondary border-r border-divider">
            {leftLabel}
          </div>
          <div className="px-4 py-3 text-center text-xs font-semibold text-accent">
            {rightLabel}
          </div>
        </div>
        {items.map((item, i) => (
          <div key={i} className={`grid grid-cols-[1fr_1fr] ${i < items.length - 1 ? "border-b border-divider" : ""}`}>
            <div className="px-4 py-3 text-xs text-text-secondary/60 border-r border-divider leading-[1.6]">
              {item.left}
            </div>
            <div className="px-4 py-3 text-xs text-text-primary leading-[1.6]">
              {item.right}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
