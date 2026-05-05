"use client";
import { useRef, useLayoutEffect } from 'react';
import { FaSitemap, FaMagic, FaCode, FaRocket } from 'react-icons/fa';
import { ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations, useLocale } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

interface Phase {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
  tags: string[];
}

// 4-card 3D scroll transforms — alternating drift directions (same engine as original)
const CARD_TRANSFORMS = [
  { from: { y: 50,  x: 30,  rotation:  4.5, scale: 0.92 }, to: { y: -50, x: -25, rotation: -4.5, scale: 1.06 } },
  { from: { y: -55, x: -35, rotation: -5.5, scale: 0.91 }, to: { y:  55, x:  30, rotation:  5.5, scale: 1.07 } },
  { from: { y: 45,  x: 25,  rotation:  4.0, scale: 0.93 }, to: { y: -45, x: -20, rotation: -4.0, scale: 1.05 } },
  { from: { y: -40, x: -20, rotation: -4.5, scale: 0.92 }, to: { y:  40, x:  20, rotation:  4.5, scale: 1.06 } },
];

export default function Services() {
  const t      = useTranslations('services');
  const locale = useLocale();
  const isRTL  = locale === 'he';

  const phases: Phase[] = [
    {
      number: '01',
      icon: <FaSitemap />,
      title: t('step_1_headline'),
      description: t('step_1_desc'),
      tags: ['Vision Mapping', 'Strategic Clarity', 'User Research'],
    },
    {
      number: '02',
      icon: <FaMagic />,
      title: t('step_2_headline'),
      description: t('step_2_desc'),
      tags: ['UX Design', 'User Flows', 'Information Architecture'],
    },
    {
      number: '03',
      icon: <FaCode />,
      title: t('step_3_headline'),
      description: t('step_3_desc'),
      tags: ['Visual Fidelity', 'Performance', 'Accessibility'],
    },
    {
      number: '04',
      icon: <FaRocket />,
      title: t('step_4_headline'),
      description: t('step_4_desc'),
      tags: ['Launch Strategy', 'Growth Partnership', 'Ongoing Support'],
    },
  ];

  const sectionRef  = useRef<HTMLElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef    = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // ── Header animations ────────────────────────────────────────────────────
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
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', force3D: true }
        )
        .fromTo(subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', force3D: true },
          '-=0.4'
        );

      // ── Cards entry — staggered opacity reveal ───────────────────────────────
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power2.out',
          force3D: true,
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );

      // ── 3D scroll-scrub float ────────────────────────────────────────────────
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const tf = CARD_TRANSFORMS[index] ?? CARD_TRANSFORMS[0];

        gsap.fromTo(card,
          { y: tf.from.y, x: tf.from.x, rotation: tf.from.rotation, scale: tf.from.scale },
          {
            y: tf.to.y, x: tf.to.x, rotation: tf.to.rotation, scale: tf.to.scale,
            ease: 'sine.inOut',
            force3D: true,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2.5,
            },
          }
        );

        // Dynamic z-index layering during scroll
        gsap.to(card, {
          zIndex: index % 2 === 0 ? 2 : 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'bottom 40%',
            scrub: 2.5,
            onUpdate: (self) => {
              const centerDistance = Math.abs(self.progress - 0.5);
              card.style.zIndex = centerDistance < 0.2 ? '3' : (index % 2 === 0 ? '2' : '1');
            },
          },
        });
      });

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
      {/* Background Glow */}
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

        {/* ── Process strip — overview first, sets context for the cards ──── */}
        <div className="mb-16 lg:mb-20">
          <div className="flex flex-wrap justify-center items-center gap-0">
            {(['process_1', 'process_2', 'process_3', 'process_4'] as const).map((key, index) => (
              <div key={key} className="flex items-center">
                <div className="flex flex-col items-center px-6 py-2">
                  <span
                    className="text-[1rem] font-bold font-mono text-crimson mb-1"
                    style={{ filter: 'drop-shadow(0 0 3px rgba(220,20,60,0.5))' }}
                  >
                    0{index + 1}
                  </span>
                  <span className="text-[1.5rem] font-medium text-white">
                    {t(key)}
                  </span>
                </div>
                {index < 3 && (
                  <span className="text-crimson/70 text-[1.6rem] mx-1 select-none">
                    {isRTL ? '←' : '→'}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── 4-Phase Cards — 2×2 grid ─────────────────────────────────────── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-20 max-w-5xl mx-auto"
          style={{ perspective: '1000px' }}
        >
          {phases.map((phase, index) => (
            <div
              key={phase.number}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              className="service-card p-10 rounded-2xl flex flex-col items-start h-full"
              style={{
                opacity: 0,
                transform: 'translateZ(0)',
                willChange: 'transform, opacity',
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Icon + step number — top row */}
              <div className="mb-6 flex items-center justify-between w-full">
                <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-crimson/10 text-[2.4rem] text-crimson">
                  {phase.icon}
                </div>
                <span
                  className="text-[1.1rem] font-bold font-mono text-crimson tracking-[0.2rem]"
                  style={{ filter: 'drop-shadow(0 0 4px rgba(220,20,60,0.55))' }}
                >
                  {phase.number}
                </span>
              </div>

              {/* Title — pure white, bold */}
              <h3 className="text-[2rem] font-semibold mb-3 text-white leading-tight">
                {phase.title}
              </h3>

              {/* Description — light grey */}
              <p className="text-[1.4rem] text-gray-400 leading-relaxed mb-6 flex-1">
                {phase.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {phase.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-[1.1rem] text-crimson/80 rounded-full border border-crimson/20 bg-crimson/5 tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Section CTA ──────────────────────────────────────────────────── */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="text-[1.4rem] text-gray-500">{t('cta_label')}</p>
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
