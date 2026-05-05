"use client";
import { useState, useRef, useLayoutEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations, useLocale } from 'next-intl';
import { PILLARS } from '@/data/pillars';
import { SVG_COMPONENTS } from '@/components/studio/PillarSvgBg';

gsap.registerPlugin(ScrollTrigger);

// Project display labels
const PROJECT_LABELS: Record<string, string> = {
  yup: 'Yup.io',
  bullshit: 'Bullshit Map',
  michal: 'Michal B',
  better: 'Better Together',
  sanctuary: 'The Digital Sanctuary',
  pic: 'PIC Events',
};

// ─── Main Component ────────────────────────────────────────────────────────────

export default function PillarGrid() {
  const t       = useTranslations('pillars');
  const locale  = useLocale();
  const isRTL   = locale === 'he';
  const router  = useRouter();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const sectionRef  = useRef<HTMLElement>(null);
  const svgRefs     = useRef<(SVGSVGElement | null)[]>([]);
  const cardsRef    = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRef  = useRef<HTMLDivElement>(null);

  // ─── GSAP: SVG draw-in on scroll entry ─────────────────────────────────────
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      svgRefs.current.forEach((svgEl, index) => {
        if (!svgEl) return;

        const triggerConfig = {
          trigger: sectionRef.current,
          start: 'top 72%',
          once: true,
        };

        if (index === 0) {
          // Curve: stroke-dashoffset draw using exact path length
          const path = svgEl.querySelector('path') as SVGPathElement | null;
          if (!path) return;
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 2.2,
            ease: 'power2.inOut',
            scrollTrigger: triggerConfig,
          });
        }

        if (index === 1) {
          // Nodes: lines draw in, then circles pop
          const lines   = svgEl.querySelectorAll('line');
          const circles = svgEl.querySelectorAll('circle');
          gsap.set(lines,   { strokeDasharray: 2000, strokeDashoffset: 2000 });
          gsap.set(circles, { opacity: 0, transformOrigin: 'center', scale: 0 });
          const tl = gsap.timeline({ scrollTrigger: triggerConfig });
          tl.to(lines, {
            strokeDashoffset: 0,
            duration: 0.45,
            stagger: 0.09,
            ease: 'power2.out',
          }).to(circles, {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            stagger: 0.07,
            ease: 'back.out(2)',
          }, '-=0.15');
        }

        if (index === 2) {
          // Vanishing lines: converge from origins to focal point
          const lines = svgEl.querySelectorAll('line');
          gsap.set(lines, { strokeDasharray: 2000, strokeDashoffset: 2000 });
          gsap.to(lines, {
            strokeDashoffset: 0,
            duration: 1.8,
            stagger: 0.18,
            ease: 'power2.inOut',
            scrollTrigger: triggerConfig,
          });
        }
      });
    }, sectionRef);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      ctx.revert();
    };
  }, []);

  // ─── Cinematic click → fullscreen expansion ─────────────────────────────────
  const handlePillarClick = useCallback(
    (slug: string, index: number) => {
      const card    = cardsRef.current[index];
      const overlay = overlayRef.current;
      if (!card || !overlay) return;

      const rect = card.getBoundingClientRect();

      // Reveal overlay from the card's exact position, expand to fill viewport
      gsap.set(overlay, {
        display:         'block',
        backgroundColor: '#0f0f0f',
        clipPath: `inset(${rect.top}px ${window.innerWidth - rect.right}px ${window.innerHeight - rect.bottom}px ${rect.left}px)`,
      });

      gsap.to(overlay, {
        clipPath:   'inset(0px 0px 0px 0px)',
        duration:   0.65,
        ease:       'power3.inOut',
        onComplete: () => router.push(`/${locale}/studio/${slug}`),
      });
    },
    [locale, router],
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-[#0a0a0a]"
      aria-label={t('web_title').replace(/High.*/, 'Studio Work')}
    >
      {/* Screen-reader section label */}
      <h2 className="sr-only">Studio Work</h2>

      {/* ── Triptych grid ────────────────────────────────────────────────────── */}
      <div
        className="flex flex-col lg:flex-row"
        style={{ height: '90svh', minHeight: '540px' }}
      >
        {PILLARS.map((pillar, index) => {
          const isHovered    = hoveredIndex === index;
          const isCompressed = hoveredIndex !== null && !isHovered;
          const SvgBg        = SVG_COMPONENTS[index];

          const flexValue = hoveredIndex === null
            ? 1
            : isHovered
              ? 2.5
              : 0.75;

          return (
            <div
              key={pillar.slug}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={[
                'relative overflow-hidden cursor-pointer select-none',
                'flex flex-col',
                // Vertical dividers between panels (desktop)
                index < PILLARS.length - 1 ? 'lg:border-r border-b lg:border-b-0 border-white/[0.06]' : '',
              ].join(' ')}
              style={{
                flex:           flexValue,
                minWidth:       0,
                minHeight:      '180px',
                transition:     'flex 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handlePillarClick(pillar.slug, index)}
              role="button"
              tabIndex={0}
              aria-label={t(pillar.titleKey)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePillarClick(pillar.slug, index);
                }
              }}
            >
              {/* SVG background - draws in on scroll */}
              <div className="absolute inset-0 pointer-events-none">
                <SvgBg setRef={(el) => { svgRefs.current[index] = el; }} />
              </div>

              {/* Radial crimson glow - bottom corner, intensifies on hover */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-600"
                style={{
                  background: 'radial-gradient(ellipse at 85% 90%, rgba(220,38,38,0.09) 0%, transparent 65%)',
                  opacity: isHovered ? 1 : 0.35,
                  transition: 'opacity 0.5s ease',
                }}
              />

              {/* Content layer */}
              <div className="relative z-10 h-full flex flex-col p-6 lg:p-10">

                {/* Pillar number – top-right on mobile, normal flow on desktop */}
                <span
                  className="absolute top-4 right-5 lg:static text-[0.95rem] lg:text-[1.1rem] text-crimson font-bold font-mono tracking-[0.3rem] shrink-0"
                  style={{ filter: 'drop-shadow(0 0 4px rgba(220,20,60,0.55))' }}
                >
                  {pillar.number}
                </span>

                {/* Title – centered on mobile, vertically centred in flex-1 on desktop */}
                <div className="flex-1 flex items-center justify-center lg:justify-start overflow-hidden">
                  <h3
                    className="text-[1.7rem] sm:text-[2rem] lg:text-[3rem] xl:text-[3.4rem] font-bold text-white
                               leading-tight uppercase tracking-wider text-center lg:text-left lg:whitespace-nowrap"
                    style={{
                      transform:       isCompressed ? 'rotate(-90deg)' : 'rotate(0deg)',
                      transition:      'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
                      transformOrigin: 'center center',
                    }}
                  >
                    {t(pillar.titleKey)}
                  </h3>
                </div>

                {/* Expanded content – hidden on mobile (no hover state), desktop-only */}
                <div
                  className="hidden lg:block shrink-0 mt-6"
                  style={{
                    opacity:         isHovered ? 1 : 0,
                    transform:       isHovered ? 'translateY(0)' : 'translateY(14px)',
                    transition:      'opacity 0.3s ease 0.18s, transform 0.35s ease 0.18s',
                    pointerEvents:   isHovered ? 'auto' : 'none',
                  }}
                >
                  {/* Tagline */}
                  <p className="text-[1.45rem] text-gray-400 mb-5 leading-relaxed max-w-[26ch]">
                    {t(pillar.taglineKey)}
                  </p>

                  {/* Project list */}
                  <ul className="flex flex-col gap-[6px] mb-7" aria-label="Projects in this pillar">
                    {pillar.projectKeys.map((key) => (
                      <li
                        key={key}
                        className="flex items-center gap-3 text-[1.2rem] text-gray-600"
                      >
                        <span className="w-5 h-[1.5px] bg-crimson/60 shrink-0" aria-hidden="true" />
                        {PROJECT_LABELS[key] ?? key}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-crimson text-[1.25rem] uppercase tracking-[0.22rem]">
                    <span>Enter</span>
                    <span aria-hidden="true">{isRTL ? '←' : '→'}</span>
                  </div>
                </div>
              </div>

              {/* Bottom progress bar - sweeps in on hover */}
              <div
                className="absolute bottom-0 left-0 h-[2px] bg-crimson"
                style={{
                  width:      isHovered ? '100%' : '0%',
                  transition: 'width 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
                aria-hidden="true"
              />
            </div>
          );
        })}
      </div>

      {/* ── Section CTA ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-4 py-16">
        <p className="text-[1.4rem] text-gray-500">{t('cta_label')}</p>
        <a
          href="https://calendar.app.google/i5TALc1oJahNDeRw8"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('cta_aria')}
          className="inline-flex items-center gap-3 px-6 py-3 text-[1.4rem] font-medium uppercase tracking-[0.15rem] text-white bg-crimson border-2 border-crimson rounded-md hover:bg-crimson/85 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
        >
          <span>{t('cta')}</span>
          <span>{isRTL ? '←' : '→'}</span>
        </a>
      </div>

      {/* ── Fullscreen expansion overlay ─────────────────────────────────────── */}
      {/* Starts clipped to the clicked card's bounding rect, expands to cover
          the entire viewport before router.push fires. z-[50] keeps it above
          the fixed header during the transition. */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[50]"
        style={{ display: 'none' }}
        aria-hidden="true"
      />
    </section>
  );
}
