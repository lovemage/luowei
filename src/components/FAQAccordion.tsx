"use client";

import { useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  title?: string;
  items: FAQItem[];
}

export default function FAQAccordion({ title, items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="animate-fade-up mb-12">
      {title && (
        <h2 className="font-[family-name:var(--font-noto-serif-tc)] text-lg font-bold text-text-primary mb-6">
          {title}
        </h2>
      )}
      <div className="flex flex-col">
        {items.map((item, i) => (
          <div key={item.id} className="border-b border-divider">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between py-4 text-left transition-colors"
            >
              <span className="text-sm font-medium text-text-secondary pr-4">{item.question}</span>
              <span
                className="text-accent text-lg flex-shrink-0 transition-transform duration-300"
                style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}
              >
                +
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: openIndex === i ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="pb-4 text-sm text-text-secondary leading-[1.8]">{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
