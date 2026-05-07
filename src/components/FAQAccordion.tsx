'use client';

import { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

export default function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div>
      {items.map((item, i) => {
        const isOpen = openIndex === i;

        return (
          <div key={i} className="border-b border-gray-800">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggle(i)}
              className="w-full flex justify-between items-center py-7 text-start gap-6 group cursor-pointer"
            >
              <span className="text-[1.8rem] font-semibold text-white group-hover:text-crimson transition-colors duration-200 leading-snug">
                {item.q}
              </span>
              <svg
                aria-hidden="true"
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`text-crimson shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Grid-row transition — smoother than max-height */}
            <div
              style={{
                display: 'grid',
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                transition: 'grid-template-rows 300ms ease',
              }}
            >
              <div style={{ overflow: 'hidden' }}>
                <p className="text-[1.6rem] text-gray-400 leading-relaxed pb-7">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
