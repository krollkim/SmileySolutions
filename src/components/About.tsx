"use client";
import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useTranslations, useLocale } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const t = useTranslations('about');
  const locale = useLocale();
  const isRTL = locale === 'he';

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageBorderRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  const skills = ['React', 'Next.js', 'TypeScript', 'Node.js', 'TailwindCSS', 'MongoDB', 'Docker', 'AWS'];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          force3D: true,
          clearProps: "all",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Profile image animation
      gsap.fromTo(
        imageContainerRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          force3D: true,
          clearProps: "all",
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Crimson border animation (delayed)
      gsap.fromTo(
        imageBorderRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          delay: 0.3,
          ease: "power2.out",
          force3D: true,
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Text content animation - slides from the edge where text originates
      gsap.fromTo(
        textContentRef.current,
        { opacity: 0, x: isRTL ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
          force3D: true,
          clearProps: "all",
          scrollTrigger: {
            trigger: textContentRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
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
      id="about"
      className="py-40 lg:py-48 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-crimson/5 rounded-full blur-[200px]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="text-center mb-16 lg:mb-20"
        >
          <h2
            ref={titleRef}
            className="section-title text-white"
            style={{ opacity: 0, transform: "translateY(30px)" }}
          >
            {t.rich('title', { highlight: (chunks) => <span>{chunks}</span> })}
          </h2>
        </div>

        {/* Content Container */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-28 max-w-6xl mx-auto">
          {/* Profile Image with Crimson Offset Border */}
          <div
            ref={imageContainerRef}
            className="w-full lg:w-[30%] flex justify-center"
            style={{ opacity: 0, transform: "scale(0.9)" }}
          >
            <div className="relative">
              {/* Crimson offset border frame */}
              <div
                ref={imageBorderRef}
                className="absolute w-full h-full border-[4px] border-crimson rounded-2xl z-0"
                style={isRTL ? { right: '-20px', top: '20px', opacity: 0 } : { left: '-20px', top: '20px', opacity: 0 }}
              />
              {/* Image container */}
              <div className="relative z-10 w-[260px] sm:w-[300px] h-[320px] sm:h-[380px] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                <Image
                  src="/images/profile_picture.png"
                  alt={t('profile_alt')}
                  fill
                  className="object-cover"
                  sizes="300px"
                  priority
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div
            ref={textContentRef}
            className="w-full lg:w-[70%]"
            style={{ opacity: 0, transform: isRTL ? "translateX(-50px)" : "translateX(50px)" }}
          >
            <div className="flex items-baseline gap-3 mb-6 flex-wrap">
              <p className="text-[1.8rem] sm:text-[2.2rem] font-bold text-white">
                {t('founder_name')}
              </p>
              <span className="text-gray-600 font-light text-[1.6rem]">·</span>
              <p className="text-[1.4rem] text-crimson uppercase tracking-[0.3rem]">
                {t('tagline')}
              </p>
            </div>

            <div className="w-16 h-[3px] bg-crimson mb-6 rounded-full" />

            <p className="text-[1.5rem] sm:text-[1.6rem] text-gray-400 leading-relaxed mb-6">
              {t('bio1')}
            </p>

            <p className="text-[1.4rem] sm:text-[1.5rem] text-gray-400 leading-relaxed mb-6">
              {t('bio2')}
            </p>

            <p className="text-[1.4rem] sm:text-[1.5rem] text-gray-400 leading-relaxed mb-0">
              {t('bio3')}
            </p>

            {/* Metrics — 3 equal columns, vertical dividers, no wrapping */}
            <div className="grid grid-cols-3 my-10 lg:my-12">
              {[
                { value: '6',   label: t('metric_products') },
                { value: '3+',  label: t('metric_years') },
                { value: '15+', label: t('metric_tech') },
              ].map((m, i) => (
                <div
                  key={m.label}
                  className={`py-5 ${
                    i === 0
                      ? 'ltr:pr-6 lg:ltr:pr-10 rtl:pl-6 lg:rtl:pl-10'
                      : i === 1
                        ? 'ltr:pl-6 rtl:pr-6 ltr:border-l rtl:border-r border-white/10'
                        : 'ltr:pl-6 lg:ltr:pl-10 rtl:pr-6 lg:rtl:pr-10 ltr:border-l rtl:border-r border-white/10'
                  }`}
                >
                  <p className="text-[2rem] sm:text-[2.4rem] font-bold text-white leading-none">{m.value}</p>
                  <p className="text-[1rem] sm:text-[1.1rem] text-gray-400 uppercase tracking-[0.1rem] sm:tracking-[0.15rem] mt-1 leading-snug">{m.label}</p>
                </div>
              ))}
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 text-[1.2rem] text-crimson rounded-full border border-crimson/30 bg-crimson/5"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Social Links + CTA — one unified "reach me" row */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://github.com/krollkim"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-700 text-[1.8rem] text-gray-400 hover:border-crimson hover:text-crimson hover:bg-crimson/10 transition-all duration-300"
                aria-label="Smiley Solution on GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/krollkimdev/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-700 text-[1.8rem] text-gray-400 hover:border-crimson hover:text-crimson hover:bg-crimson/10 transition-all duration-300"
                aria-label="Smiley Solution on LinkedIn"
              >
                <FaLinkedin />
              </a>
              <span className="w-px h-8 bg-gray-700 mx-1" aria-hidden="true" />

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
        </div>
      </div>
    </section>
  );
}
