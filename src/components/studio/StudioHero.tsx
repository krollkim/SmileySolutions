"use client";
import { useRef, useLayoutEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { useLocale } from 'next-intl';
import { SVG_COMPONENTS } from '@/components/studio/PillarSvgBg';
import type { Pillar } from '@/data/pillars';

interface StudioHeroProps {
  pillar: Pillar;
  title: string;
  tagline: string;
  backLabel: string;
}

export default function StudioHero({ pillar, title, tagline, backLabel }: StudioHeroProps) {
  const locale  = useLocale();
  const isRTL   = locale === 'he';
  const router  = useRouter();

  const heroRef       = useRef<HTMLDivElement>(null);
  const numberRef     = useRef<HTMLSpanElement>(null);
  const titleRef      = useRef<HTMLHeadingElement>(null);
  const lineRef       = useRef<HTMLDivElement>(null);
  const taglineRef    = useRef<HTMLParagraphElement>(null);
  const scrollIndRef  = useRef<HTMLDivElement>(null);

  const pillarIndex = parseInt(pillar.number, 10) - 1;
  const SvgBg = SVG_COMPONENTS[pillarIndex] ?? SVG_COMPONENTS[0];

  // ─── Entry animation + scroll indicator ──────────────────────────────────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        numberRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6 },
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.85 },
        '-=0.35',
      )
      .fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: isRTL ? 'right center' : 'left center' },
        { scaleX: 1, duration: 0.55 },
        '-=0.4',
      )
      .fromTo(
        taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.65 },
        '-=0.3',
      )
      .fromTo(
        scrollIndRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.1',
      );

      // Bounce loop — starts after entry sequence settles
      gsap.to(scrollIndRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 0.9,
        ease: 'sine.inOut',
        delay: 1.6,
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isRTL]);

  // ─── Back navigation with fade-out ────────────────────────────────────────
  const handleBack = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent) => {
      e.preventDefault();
      gsap.to(heroRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
        onComplete: () => router.push(`/${locale}#projects`),
      });
    },
    [locale, router],
  );

  return (
    <div ref={heroRef} className="relative overflow-hidden bg-[#0a0a0a]">
      {/* SVG background */}
      <div className="absolute inset-0 pointer-events-none">
        <SvgBg className="absolute inset-0 w-full h-full opacity-60" />
      </div>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 85% 90%, rgba(220,38,38,0.07) 0%, transparent 65%)',
        }}
      />

      {/* Back navigation */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 pt-32 pb-4">
        <button
          onClick={handleBack}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleBack(e)}
          className="group inline-flex items-center gap-2 text-[1.3rem] text-gray-500
                     hover:text-crimson transition-colors duration-300 uppercase
                     tracking-[0.2rem] cursor-pointer bg-transparent border-none p-0"
        >
          {isRTL ? (
            <>
              {backLabel}
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </>
          ) : (
            <>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:-translate-x-1"
              >
                ←
              </span>
              {backLabel}
            </>
          )}
        </button>
      </div>

      {/* Pillar identity */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <span
          ref={numberRef}
          className="block text-[1.2rem] text-crimson font-mono tracking-[0.3rem] mb-4"
        >
          {pillar.number}
        </span>

        <h1
          ref={titleRef}
          className="text-[4rem] sm:text-[6rem] lg:text-[8rem] font-bold
                     leading-[0.95] tracking-tight text-white mb-8"
        >
          {title}
        </h1>

        <div
          ref={lineRef}
          className="w-16 h-[3px] bg-crimson rounded-full mb-8"
        />

        <p
          ref={taglineRef}
          className="text-[1.8rem] sm:text-[2rem] text-gray-400 max-w-2xl leading-relaxed"
        >
          {tagline}
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndRef}
        className="relative z-10 flex flex-col items-center pb-12 opacity-0"
        aria-hidden="true"
      >
        <span className="text-[1rem] text-gray-600 uppercase tracking-[0.3rem] mb-3 font-mono">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-crimson/50 to-transparent" />
      </div>

      {/* Bottom rule */}
      <div className="border-b border-white/[0.06]" />
    </div>
  );
}
