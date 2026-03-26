"use client";
import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

const BASE_1 = ['Vision', 'Craft', 'Impact', 'Strategy', 'Clarity', 'Excellence', 'Purpose', 'Integrity'];
const BASE_2 = ['Design', 'Empathy', 'Performance', 'Partnership', 'Innovation', 'Growth', 'Precision', 'Care'];

// 4× ensures the track (~7,000px) is far wider than any viewport.
// The track is centered in the viewport — 25% drift never reaches an edge.
const ROW_1 = [...BASE_1, ...BASE_1, ...BASE_1, ...BASE_1];
const ROW_2 = [...BASE_2, ...BASE_2, ...BASE_2, ...BASE_2];

export default function Hook() {
  const t           = useTranslations('hook');
  const sectionRef  = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(statementRef.current, { opacity: 0, y: 24 });
      gsap.to(statementRef.current, {
        opacity: 1, y: 0,
        duration: 1, ease: 'power3.out', force3D: true,
        scrollTrigger: {
          trigger: statementRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 my-32 mx-6 min-h-[60vh] flex flex-col justify-center rounded-[2rem] bg-[#111111] border border-white/[0.05] shadow-[inset_0_0_80px_rgba(0,0,0,0.3)]"
    >
      {/* Editorial Statement */}
      <div ref={statementRef} className="flex flex-col items-center px-6 lg:px-12 mb-32">
        <p className="text-[2.2rem] sm:text-[2.8rem] lg:text-[3.6rem] font-extralight text-gray-500 leading-[1.3] tracking-tight max-w-3xl text-center">
          {t.rich('statement', {
            accent: (chunks) => (
              <em className="not-italic text-white font-light">{chunks}</em>
            ),
          })}
        </p>
      </div>

      {/* ── Marquee rows — center-anchored ────────────────────────────────── */}
      <div className="w-full overflow-hidden flex flex-col items-center gap-3">

        {/* Row 1 — drifts left */}
        <div className="relative flex w-full justify-center">
          <div
            style={{
              display: 'flex',
              width: 'max-content',
              transform: 'translateX(0)',
              animation: 'marquee-left 35s linear infinite',
              willChange: 'transform',
            }}
          >
            {ROW_1.map((value, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '2.4rem',
                  padding: '0 2.4rem',
                  fontSize: '1.15rem',
                  color: 'rgba(255,255,255,0.65)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.35rem',
                  fontWeight: 300,
                  whiteSpace: 'nowrap',
                  userSelect: 'none',
                }}
              >
                {value}
                <span
                  style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'crimson', opacity: 0.5, display: 'inline-block', flexShrink: 0 }}
                  aria-hidden="true"
                />
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — drifts right */}
        <div className="relative flex w-full justify-center">
          <div
            style={{
              display: 'flex',
              width: 'max-content',
              transform: 'translateX(0)',
              animation: 'marquee-right 45s linear infinite',
              willChange: 'transform',
            }}
          >
            {ROW_2.map((value, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '2.4rem',
                  padding: '0 2.4rem',
                  fontSize: '1.1rem',
                  color: 'rgba(255,255,255,0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.4rem',
                  fontWeight: 300,
                  whiteSpace: 'nowrap',
                  userSelect: 'none',
                }}
              >
                {value}
                <span
                  style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'crimson', opacity: 0.35, display: 'inline-block', flexShrink: 0 }}
                  aria-hidden="true"
                />
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
