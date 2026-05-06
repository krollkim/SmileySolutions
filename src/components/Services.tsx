"use client";
import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations, useLocale } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

interface Phase {
  number: string;
  title: string;
  description: string;
  tags: string[];
}

export default function Services() {
  const t      = useTranslations('services');
  const locale = useLocale();
  const isRTL  = locale === 'he';

  const phases: Phase[] = [
    {
      number: '01',
      title: t('step_1_headline'),
      description: t('step_1_desc'),
      tags: ['Vision Mapping', 'Strategic Clarity', 'User Research'],
    },
    {
      number: '02',
      title: t('step_2_headline'),
      description: t('step_2_desc'),
      tags: ['UX Design', 'User Flows', 'Information Architecture'],
    },
    {
      number: '03',
      title: t('step_3_headline'),
      description: t('step_3_desc'),
      tags: ['Visual Fidelity', 'Performance', 'Accessibility'],
    },
    {
      number: '04',
      title: t('step_4_headline'),
      description: t('step_4_desc'),
      tags: ['Launch Strategy', 'Growth Partnership', 'Ongoing Support'],
    },
  ];

  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);
  const itemsRef    = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
      headerTl
        .fromTo(titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', force3D: true, clearProps: 'all' }
        )
        .fromTo(subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', force3D: true, clearProps: 'all' },
          '-=0.4'
        );

      // Phase items — staggered left-to-right fade-up (motion audit: "guides reading order")
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          force3D: true,
          clearProps: 'all',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="pt-[160px] pb-40 lg:pb-48 bg-[#0a0a0a] relative overflow-hidden isolate"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-crimson/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* ── Section Header ───────────────────────────────────────────────── */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-20 isolate">
          <h2
            ref={titleRef}
            className="section-title text-white antialiased inline-block"
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            {t.rich('title', { highlight: (chunks) => <span>{chunks}</span> })}
          </h2>
          <p
            ref={subtitleRef}
            className="mt-6 text-[1.5rem] sm:text-[1.6rem] text-gray-400 max-w-2xl mx-auto leading-relaxed antialiased"
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* ── 4-phase grid — 4×1 desktop, 2×2 tablet, 1×4 mobile ──────────── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 max-w-7xl mx-auto"
        >
          {phases.map((phase, index) => (
            <div
              key={phase.number}
              ref={(el) => { if (el) itemsRef.current[index] = el; }}
              className={[
                'flex flex-col',
                index === 0
                  ? 'lg:ltr:pr-10 lg:rtl:pl-10'
                  : `lg:ltr:pl-10 lg:rtl:pr-10 lg:border-l lg:border-white/[0.06] ${
                      isRTL ? 'lg:border-l-0 lg:border-r lg:border-white/[0.06]' : ''
                    }`,
              ].join(' ')}
              style={{ opacity: 0 }}
            >
              {/* Small number marker */}
              <span className="text-sm font-mono text-crimson/60 tracking-[0.2rem] mb-4 block">
                {phase.number}
              </span>

              {/* Title */}
              <h3 className="text-[1.8rem] font-semibold text-white mb-3 leading-snug">
                {phase.title}
              </h3>

              {/* Description */}
              <p className="text-[1.4rem] text-gray-400 leading-relaxed mb-5 flex-1">
                {phase.description}
              </p>

              {/* Tags — plain dot-separated */}
              <p className="text-[1.1rem] text-gray-400 tracking-wide">
                {phase.tags.join(' · ')}
              </p>
            </div>
          ))}
        </div>

        {/* ── Section CTA ──────────────────────────────────────────────────── */}
        <div className="mt-20 flex flex-col items-center gap-4">
          <p className="text-[1.4rem] text-gray-400">{t('cta_label')}</p>
          <a
            href="https://calendar.app.google/i5TALc1oJahNDeRw8"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('cta_aria')}
            className="inline-flex items-center gap-3 px-6 py-3 text-[1.4rem] font-medium uppercase tracking-[0.15rem] text-white bg-crimson border-2 border-crimson rounded-md hover:bg-crimson/85 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
          >
            <span>{t('cta')}</span>
            <span>{t('cta_arrow')}</span>
          </a>
        </div>

      </div>
    </section>
  );
}
