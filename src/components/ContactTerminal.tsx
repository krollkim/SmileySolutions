"use client";
import { useEffect, useRef, useState } from 'react';

type LineType = 'cmd' | 'ok' | 'accent' | 'dim' | 'gap';

interface Line {
  text: string;
  type: LineType;
}

const SEQUENCE: Line[] = [
  { text: '$ smiley-solution init', type: 'cmd' },
  { text: '', type: 'gap' },
  { text: '  vision      →  clear', type: 'ok' },
  { text: '  design      →  crafted', type: 'ok' },
  { text: '  code        →  engineered', type: 'ok' },
  { text: '  launch      →  shipped', type: 'ok' },
  { text: '', type: 'gap' },
  { text: '  // result: exceptional', type: 'accent' },
];

const LINE_DELAY = 380;

export default function ContactTerminal() {
  const [visibleCount, setVisibleCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const run = (count: number) => {
      if (count < SEQUENCE.length) {
        timerRef.current = setTimeout(() => {
          setVisibleCount(count + 1);
          run(count + 1);
        }, LINE_DELAY);
      }
      // Sequence complete — stay on final state, cursor keeps blinking
    };

    timerRef.current = setTimeout(() => run(0), 600);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const colorClass: Record<LineType, string> = {
    cmd:    'text-white font-medium',
    ok:     'text-gray-400',
    accent: 'text-crimson font-medium',
    dim:    'text-gray-600',
    gap:    '',
  };

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl bg-[#0d0d0d] border border-gray-800 overflow-hidden"
      aria-hidden="true"
    >
      {/* Terminal chrome */}
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-800/60">
        <span className="w-3 h-3 rounded-full bg-gray-700" />
        <span className="w-3 h-3 rounded-full bg-gray-700" />
        <span className="w-3 h-3 rounded-full bg-gray-700" />
        <span className="ml-4 text-[1.1rem] text-gray-600 tracking-widest uppercase select-none">
          terminal
        </span>
      </div>

      {/* Terminal body */}
      <div className="px-6 py-7 font-mono text-[1.35rem] leading-[2] min-h-[280px]">
        {SEQUENCE.map((line, i) => (
          <div
            key={i}
            className={`transition-opacity duration-300 ${
              i < visibleCount ? 'opacity-100' : 'opacity-0'
            } ${colorClass[line.type]}`}
          >
            {line.text || ' '}
          </div>
        ))}

        {/* Blinking cursor — shows during and after sequence */}
        {visibleCount > 0 && (
          <span className="inline-block w-[2px] h-[1.4em] bg-crimson align-middle animate-pulse" />
        )}
      </div>
    </div>
  );
}
