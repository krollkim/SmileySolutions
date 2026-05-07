"use client";
import { useRef, useLayoutEffect, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations, useLocale } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

const BASE_1 = ['Vision', 'Craft', 'Impact', 'Strategy', 'Clarity', 'Excellence', 'Purpose', 'Integrity'];

// 4× ensures the track (~7,000px) is far wider than any viewport.
// The track is centered in the viewport — 25% drift never reaches an edge.
const ROW_1 = [...BASE_1, ...BASE_1, ...BASE_1, ...BASE_1];

export default function Hook() {
  const t           = useTranslations('hook');
  const locale      = useLocale();
  const sectionRef  = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const marqueeRef  = useRef<HTMLDivElement>(null);

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

  // GSAP-based marquee animation (replaces CSS @keyframes for iOS reliability)
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const singleSetWidth = marquee.scrollWidth / 4;

    const tween = gsap.to(marquee, {
      x: -singleSetWidth,
      duration: 35,
      ease: 'none',
      repeat: -1,
      force3D: true,
    });

    // Pause when out of view for performance
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => tween.play(),
      onLeave: () => tween.pause(),
      onEnterBack: () => tween.play(),
      onLeaveBack: () => tween.pause(),
    });

    return () => { tween.kill(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 lg:py-16 my-16 lg:my-24 mx-6 flex flex-col justify-center rounded-[2rem] bg-[#111111] border border-white/[0.05] shadow-[inset_0_0_80px_rgba(0,0,0,0.3)]"
    >
      {/* Editorial Statement */}
      <div ref={statementRef} className="flex flex-col items-center px-6 lg:px-12 mb-8 lg:mb-10">
        <p className="text-[2.2rem] sm:text-[2.8rem] lg:text-[3.6rem] font-extralight text-gray-400 leading-[1.3] tracking-tight max-w-3xl text-center">
          {t.rich('statement', {
            accent: (chunks) => (
              <em className="not-italic text-white font-light">{chunks}</em>
            ),
          })}
        </p>
      </div>

      {/* Scroll nudge — subtle forward momentum */}
      <div className="flex justify-center mb-6">
        <Link
          href={`/${locale}/services`}
          aria-label={t('nudge')}
          className="group flex flex-col items-center gap-2 text-[1.1rem] text-gray-400 hover:text-white uppercase tracking-[0.25rem] transition-colors duration-300"
        >
          <span>{t('nudge')}</span>
          <span className="text-crimson group-hover:translate-y-1 transition-transform duration-300" aria-hidden="true">↓</span>
        </Link>
      </div>

      {/* ── Marquee row — center-anchored ────────────────────────────────── */}
      <div className="w-full overflow-hidden flex flex-col items-center gap-3">
        {/* Row 1 — drifts left */}
        <div className="relative flex w-full justify-center">
          <div
            ref={marqueeRef}
            style={{
              display: 'flex',
              width: 'max-content',
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
      </div>
    </section>
  );
}
