"use client";
import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaLinkedin, FaCalendarAlt } from 'react-icons/fa';
import { useTranslations, useLocale } from 'next-intl';
import ContactTerminal from './ContactTerminal';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const isRTL = locale === 'he';

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
          force3D: true, clearProps: 'all',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );

      gsap.fromTo(
        leftContentRef.current,
        { opacity: 0, x: isRTL ? 50 : -50 },
        {
          opacity: 1, x: 0, duration: 0.6, ease: 'power2.out',
          force3D: true, clearProps: 'all',
          scrollTrigger: {
            trigger: leftContentRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );

      gsap.fromTo(
        rightContentRef.current,
        { opacity: 0, x: isRTL ? -50 : 50 },
        {
          opacity: 1, x: 0, duration: 0.6, delay: 0.2, ease: 'power2.out',
          force3D: true, clearProps: 'all',
          scrollTrigger: {
            trigger: rightContentRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      ctx.revert();
    };
  }, [isRTL]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-48 bg-[#0a0a0a] relative overflow-hidden"
      style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
    >
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-crimson/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-crimson/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20">
          <h2
            ref={titleRef}
            className="section-title text-white"
            style={{ opacity: 0, transform: 'translateY(30px)' }}
          >
            {t.rich('title', { highlight: (chunks) => <span>{chunks}</span> })}
          </h2>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 max-w-6xl mx-auto items-center">

          {/* LEFT — CTA */}
          <div
            ref={leftContentRef}
            className="w-full lg:w-1/2"
            style={{ opacity: 0, transform: isRTL ? 'translateX(50px)' : 'translateX(-50px)' }}
          >
            <div className="lg:pr-8">
              <h3 className="text-[3rem] sm:text-[4rem] lg:text-[4.5rem] font-bold text-white leading-[1.1] mb-6">
                {t('heading')}
                <br />
                <span className="text-crimson">{t('heading_accent')}</span>
              </h3>

              <p className="text-[1.6rem] sm:text-[1.8rem] text-gray-400 mb-10 leading-relaxed max-w-[450px]">
                {t('subtext')}
              </p>

              {/* Social links */}
              <div className="flex items-center gap-4 mb-10">
                <a
                  href="https://github.com/krollkim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-700 text-[2rem] text-gray-400 hover:border-crimson hover:text-crimson hover:bg-crimson/10 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/krollkimdev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 flex items-center justify-center rounded-full border border-gray-700 text-[2rem] text-gray-400 hover:border-crimson hover:text-crimson hover:bg-crimson/10 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </div>

              {/* Primary CTA */}
              <a
                href="https://calendar.app.google/i5TALc1oJahNDeRw8"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('book_aria')}
                className="inline-flex items-center gap-4 px-8 py-4 text-[1.6rem] font-medium uppercase tracking-[0.2rem] text-white bg-crimson rounded-lg hover:bg-crimson/85 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
              >
                <FaCalendarAlt className="text-[1.8rem]" />
                <span>{t('book_cta')}</span>
              </a>

            </div>
          </div>

          {/* RIGHT — Terminal */}
          <div
            ref={rightContentRef}
            className="hidden lg:block w-full lg:w-1/2"
            style={{ opacity: 0, transform: isRTL ? 'translateX(-50px)' : 'translateX(50px)' }}
          >
            <ContactTerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
