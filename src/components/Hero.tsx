"use client";
import { useEffect, useLayoutEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgScaleRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const titleLinesRef = useRef<HTMLSpanElement[]>([]);
  const titleCursorsRef = useRef<HTMLSpanElement[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaArrowRef = useRef<HTMLSpanElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);

  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${(i * 17 + 5) % 100}%`,
      top: `${(i * 23 + 10) % 100}%`,
      duration: 5 + (i % 5),
      delay: i * 0.5
    }));
  }, []);

  const h1Lines = [
    { text: 'Kim Kroll', isName: true, delay: 0.5 },
    { text: 'Full Stack', isName: false, delay: 1.1 },
    { text: 'Developer', isName: false, delay: 1.7 }
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
        ease: "power2.out",
        force3D: true,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Breathing animation - pauses when Hero is out of view
      const breathingTween = gsap.to(bgScaleRef.current, {
        scale: 1.15,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        force3D: true,
        paused: true,
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        anticipatePin: 1,
        onEnter: () => breathingTween.play(),
        onLeave: () => breathingTween.pause(),
        onEnterBack: () => breathingTween.play(),
        onLeaveBack: () => breathingTween.pause(),
      });

      // Particles - pause when Hero is out of view
      const particleTweens: gsap.core.Tween[] = [];
      particlesRef.current.forEach((particle, i) => {
        if (!particle) return;
        const tween = gsap.to(particle, {
          y: -100,
          opacity: 1,
          duration: particles[i].duration / 2,
          ease: "sine.inOut",
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
        start: "top bottom",
        end: "bottom top",
        anticipatePin: 1,
        onEnter: () => particleTweens.forEach(t => t.play()),
        onLeave: () => particleTweens.forEach(t => t.pause()),
        onEnterBack: () => particleTweens.forEach(t => t.play()),
        onLeaveBack: () => particleTweens.forEach(t => t.pause()),
      });

      const masterTl = gsap.timeline({ delay: 0.3 });

      titleLinesRef.current.forEach((line, i) => {
        if (!line) return;
        const cursor = titleCursorsRef.current[i];
        const lineDelay = h1Lines[i].delay;

        masterTl.fromTo(
          line,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.5,
            ease: "power2.out",
            force3D: true,
          },
          lineDelay
        );

        if (cursor) {
          masterTl.fromTo(
            cursor,
            { left: '0%' },
            {
              left: '100%',
              duration: 0.5,
              ease: "power2.out",
              force3D: true,
              clearProps: "all",
            },
            lineDelay
          );
        }
      });

      masterTl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          force3D: true,
          clearProps: "all",
        },
        2.5
      );

      masterTl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          force3D: true,
          clearProps: "all",
        },
        2.8
      );

      masterTl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          force3D: true,
        },
        3.2
      );

      gsap.to(ctaArrowRef.current, {
        x: 5,
        duration: 0.75,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 3.5,
        force3D: true,
      });

      gsap.to(scrollLineRef.current, {
        scaleY: 0.5,
        duration: 0.75,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 3.5,
        transformOrigin: "top center",
        force3D: true,
      });

    }, sectionRef);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

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
            transform: "scale(1.1) translateZ(0.1px)",
            backfaceVisibility: "hidden",
            willChange: "transform",
          }}
        >
          <div
            ref={bgImageRef}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/images/hero-background.png')",
              backfaceVisibility: "hidden",
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
            style={{
              left: particle.left,
              top: particle.top,
              opacity: 0,
            }}
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
                <span className="relative inline-block overflow-hidden">
                  <span
                    ref={(el) => { if (el) titleLinesRef.current[index] = el; }}
                    className={`inline-block text-[3.2rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] font-bold leading-[1.1] tracking-tight antialiased ${
                      line.isName ? 'text-crimson' : 'text-white'
                    }`}
                    style={{
                      clipPath: 'inset(0 100% 0 0)',
                      backfaceVisibility: "hidden",
                    }}
                  >
                    {line.text}
                  </span>
                  <span
                    ref={(el) => { if (el) titleCursorsRef.current[index] = el; }}
                    className="absolute top-0 h-full w-[4px] bg-crimson"
                    style={{
                      left: '0%',
                      backfaceVisibility: "hidden",
                    }}
                  />
                </span>
              </div>
            ))}
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-[1.6rem] sm:text-[1.8rem] text-gray-400 mt-8 max-w-[500px] leading-relaxed antialiased"
            style={{ opacity: 0, transform: "translateY(20px)" }}
          >
            Crafting modern, production-ready web experiences
          </p>

          {/* CTA Button */}
          <div
            ref={ctaRef}
            className="mt-10"
            style={{ opacity: 0, transform: "translateY(20px)" }}
          >
            <a
              href="#projects"
              aria-label="View my portfolio projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center gap-4 px-8 py-4 text-[1.6rem] font-medium uppercase tracking-[0.3rem] text-white border-2 border-crimson overflow-hidden transition-colors duration-500 hover:text-white"
            >
              <span className="absolute inset-0 bg-crimson transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative">View My Work</span>
              <span
                ref={ctaArrowRef}
                className="relative"
              >
                →
              </span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: 0 }}
        >
          <span className="text-[1.2rem] uppercase tracking-[0.3rem] text-gray-500">Scroll</span>
          <div
            ref={scrollLineRef}
            className="w-px h-[40px] bg-linear-to-b from-crimson to-transparent"
            style={{ transformOrigin: "top center" }}
          />
        </div>
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-[100px] right-6 lg:right-12 w-[100px] h-[100px] border-t-2 border-r-2 border-crimson/20 z-2" />
      <div className="absolute bottom-10 left-6 lg:left-12 w-[100px] h-[100px] border-b-2 border-l-2 border-crimson/20 z-2" />
    </section>
  );
}
