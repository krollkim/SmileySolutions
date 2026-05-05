"use client";
import { useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslations, useLocale } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isRTL = locale === 'he';

  const sectionRef = useRef<HTMLElement>(null);
  const bgScaleRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const titleLinesRef = useRef<HTMLSpanElement[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaArrowRef = useRef<HTMLSpanElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);

  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${(i * 17 + 5) % 100}%`,
      top: `${(i * 23 + 10) % 100}%`,
      duration: 5 + (i % 5),
      delay: i * 0.5,
    }));
  }, []);

  const h1Lines = [
    { text: t('line1'), isName: true },
    { text: t('line2'), isName: false },
    { text: t('line3'), isName: false },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!bgImageRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      gsap.to(bgImageRef.current, {
        x,
        y,
        duration: 0.8,
        ease: 'power2.out',
        force3D: true,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Background breathing — pauses when Hero is out of view
      const breathingTween = gsap.to(bgScaleRef.current, {
        scale: 1.15,
        duration: 4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        force3D: true,
        paused: true,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        anticipatePin: 1,
        onEnter: () => breathingTween.play(),
        onLeave: () => breathingTween.pause(),
        onEnterBack: () => breathingTween.play(),
        onLeaveBack: () => breathingTween.pause(),
      });

      // Particles — paused when Hero is out of view
      const particleTweens: gsap.core.Tween[] = [];
      particlesRef.current.forEach((particle, i) => {
        if (!particle) return;
        const tween = gsap.to(particle, {
          y: -100,
          opacity: 1,
          duration: particles[i].duration / 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: particles[i].delay,
          force3D: true,
          paused: true,
        });
        particleTweens.push(tween);
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        anticipatePin: 1,
        onEnter: () => particleTweens.forEach(tw => tw.play()),
        onLeave: () => particleTweens.forEach(tw => tw.pause()),
        onEnterBack: () => particleTweens.forEach(tw => tw.play()),
        onLeaveBack: () => particleTweens.forEach(tw => tw.pause()),
      });

      // Entrance — content is fully visible immediately; this is polish only.
      // No opacity:0, no clipPath. Just a subtle upward slide per element.
      const masterTl = gsap.timeline({ delay: 0.1 });

      titleLinesRef.current.forEach((line, i) => {
        if (!line) return;
        masterTl.fromTo(
          line,
          { y: 16 },
          { y: 0, duration: 0.5, ease: 'power2.out', force3D: true, clearProps: 'all' },
          i * 0.08
        );
      });

      masterTl.fromTo(
        subtitleRef.current,
        { y: 12 },
        { y: 0, duration: 0.5, ease: 'power3.out', force3D: true, clearProps: 'all' },
        0.28
      );

      masterTl.fromTo(
        ctaRef.current,
        { y: 10 },
        { y: 0, duration: 0.5, ease: 'power3.out', force3D: true, clearProps: 'all' },
        0.36
      );

      // CTA arrow bounce
      gsap.to(ctaArrowRef.current, {
        x: isRTL ? -5 : 5,
        duration: 0.75,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.8,
        force3D: true,
      });

      // Scroll line pulse
      gsap.to(scrollLineRef.current, {
        scaleY: 0.5,
        duration: 0.75,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 0.8,
        transformOrigin: 'top center',
        force3D: true,
      });

    }, sectionRef);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      ctx.revert();
    };
  }, [isRTL]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-dvh w-full flex items-center overflow-hidden isolate bg-[#0a0a0a]"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden isolate">
        <div
          ref={bgScaleRef}
          className="absolute inset-0"
          style={{
            transform: 'scale(1.1) translateZ(0.1px)',
            backfaceVisibility: 'hidden',
            willChange: 'transform',
          }}
        >
          <div
            ref={bgImageRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/hero-background.png')",
              backfaceVisibility: 'hidden',
            }}
          />
        </div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-[#0a0a0a] z-1" />
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent z-1" />

      {/* Floating Particles */}
      <div className="absolute inset-0 z-2 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <div
            key={particle.id}
            ref={(el) => { if (el) particlesRef.current[i] = el; }}
            className="absolute w-1 h-1 rounded-full bg-crimson/30"
            style={{ left: particle.left, top: particle.top, opacity: 0 }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="max-w-[900px]">
          {/* H1 Title */}
          <h1>
            {h1Lines.map((line, index) => (
              <div key={index} className="-mb-2 sm:-mb-3">
                <span
                  ref={(el) => { if (el) titleLinesRef.current[index] = el; }}
                  className={`inline-block text-[3.2rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] font-bold leading-[1.1] tracking-tight antialiased ${
                    line.isName ? 'text-crimson' : 'text-white'
                  }`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  {line.text}
                </span>
              </div>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-[1.6rem] sm:text-[1.8rem] text-gray-400 mt-8 max-w-[500px] leading-relaxed antialiased"
          >
            {t('subtitle')}
          </p>

          {/* CTAs */}
          <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row items-start gap-4">
            {/* Primary — Book a Consultation */}
            <a
              href="https://calendar.app.google/i5TALc1oJahNDeRw8"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('book_aria')}
              className="inline-flex items-center gap-3 px-6 py-3 text-[1.4rem] font-medium uppercase tracking-[0.15rem] text-white bg-crimson border-2 border-crimson rounded-md hover:bg-crimson/85 transition-colors duration-300"
            >
              <span>{t('book_cta')}</span>
              <span ref={ctaArrowRef}>{t('book_arrow')}</span>
            </a>

            {/* Secondary — View Our Work */}
            <a
              href="#projects"
              aria-label={t('cta_aria')}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center gap-3 px-6 py-3 text-[1.4rem] font-medium uppercase tracking-[0.15rem] text-white border-2 border-crimson/60 rounded-md overflow-hidden hover:border-crimson transition-colors duration-500"
            >
              <span className="absolute inset-0 bg-crimson transform ltr:-translate-x-full rtl:translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative">{t('cta')}</span>
              <span className="relative">{t('cta_arrow')}</span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="hidden sm:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2">
          <span className="text-[1.2rem] uppercase tracking-[0.3rem] text-gray-400">{t('scroll')}</span>
          <div
            ref={scrollLineRef}
            className="w-px h-[40px] bg-linear-to-b from-crimson to-transparent"
            style={{ transformOrigin: 'top center' }}
          />
        </div>
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-[100px] right-6 lg:right-12 w-[100px] h-[100px] border-t-2 border-r-2 border-crimson/20 z-2" />
      <div className="absolute bottom-10 left-6 lg:left-12 w-[100px] h-[100px] border-b-2 border-l-2 border-crimson/20 z-2" />
    </section>
  );
}
