interface PainPointHookProps {
  title?: string;
  points: string[];
}

export default function PainPointHook({ title, points }: PainPointHookProps) {
  return (
    <section className="animate-fade-up mb-12">
      {title && (
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-text-primary mb-6">
          {title}
        </h2>
      )}
      <div className="flex flex-col gap-3">
        {points.map((point, i) => (
          <div key={i} className="rounded-lg bg-bg-surface border-l-[3px] border-l-accent-warm p-4">
            <p className="text-sm text-text-primary leading-[1.8]">{point}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
