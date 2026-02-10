"use client";
import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Pre-generate particle positions
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${(i * 17 + 5) % 100}%`,
      top: `${(i * 23 + 10) % 100}%`,
      duration: 5 + (i % 5),
      delay: i * 0.5
    }));
  }, []);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const h1Lines = [
    { text: 'Kim Kroll', isName: true, delay: 0.5 },
    { text: 'Full Stack', isName: false, delay: 1.1 },
    { text: 'Developer', isName: false, delay: 1.7 }
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center overflow-hidden isolate bg-[#0a0a0a]"
    >
      {/* Animated Background — isolated stacking context to prevent sub-pixel bleeding */}
      <div className="absolute inset-0 z-0 overflow-hidden isolate">
        <motion.div
          className="absolute inset-0 motion-gpu"
          style={{
            scale: 1.1,
            outline: "1px solid transparent",
            backfaceVisibility: "hidden",
            willChange: "transform",
          }}
          animate={{ scale: [1.1, 1.15, 1.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="absolute inset-0 bg-cover bg-center motion-gpu"
            style={{
              backgroundImage: "url('/images/hero-background.png')",
              x: mousePosition.x,
              y: mousePosition.y,
            }}
            transition={{ type: 'spring', stiffness: 50, damping: 30 }}
          />
        </motion.div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-[#0a0a0a] z-[1]" />
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent z-[1]" />

      {/* Floating Particles */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full bg-crimson/30"
            style={{ left: particle.left, top: particle.top }}
            animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="max-w-[900px]">
          {/* H1 — primary SEO heading */}
          <h1>
            {h1Lines.map((line, index) => (
              <div key={index} className="-mb-2 sm:-mb-3">
                {/* Inline-block wrapper ensures box matches text width exactly */}
                <span className="relative inline-block overflow-hidden">
                  {/* The text - clips from left to right */}
                  <motion.span
                    className={`inline-block text-[3.2rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] font-bold leading-[1.1] tracking-tight motion-gpu ${
                      line.isName ? 'text-crimson' : 'text-white'
                    }`}
                    initial={{ clipPath: 'inset(0 100% 0 0)' }}
                    animate={{ clipPath: 'inset(0 0% 0 0)' }}
                    transition={{
                      delay: line.delay,
                      duration: 0.5,
                      ease: "easeOut"
                    }}
                  >
                    {line.text}
                  </motion.span>

                  {/* Crimson reveal bar - follows the clip edge */}
                  <motion.span
                    className="absolute top-0 h-full w-[4px] bg-crimson motion-gpu"
                    initial={{ left: '0%' }}
                    animate={{ left: '100%' }}
                    transition={{
                      delay: line.delay,
                      duration: 0.5,
                      ease: "easeOut"
                    }}
                  />
                </span>
              </div>
            ))}
          </h1>

          {/* Subtitle — reinforces meta description keywords */}
          <motion.p
            className="text-[1.6rem] sm:text-[1.8rem] text-gray-400 mt-8 max-w-[500px] leading-relaxed motion-gpu"
            style={{ backfaceVisibility: "hidden" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.999, y: 0.01 }}
            transition={{ delay: 2.5, duration: 0.6, ease: "easeOut" }}
          >
            Crafting modern, production-ready web experiences
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="mt-10 motion-gpu"
            style={{ backfaceVisibility: "hidden" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.999, y: 0.01 }}
            transition={{ delay: 2.8, duration: 0.6, ease: "easeOut" }}
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center gap-4 px-8 py-4 text-[1.6rem] font-medium uppercase tracking-[0.3rem] text-white border-2 border-crimson overflow-hidden transition-colors duration-500 hover:text-white"
            >
              <span className="absolute inset-0 bg-crimson transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative">View My Work</span>
              <motion.span
                className="relative motion-gpu"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 motion-gpu"
          style={{ backfaceVisibility: "hidden" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.999 }}
          transition={{ delay: 3.2, ease: "easeOut" }}
        >
          <span className="text-[1.2rem] uppercase tracking-[0.3rem] text-gray-500">Scroll</span>
          <motion.div
            className="w-[1px] h-[40px] bg-linear-to-b from-crimson to-transparent motion-gpu"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-[100px] right-6 lg:right-12 w-[100px] h-[100px] border-t-2 border-r-2 border-crimson/20 z-[2]" />
      <div className="absolute bottom-10 left-6 lg:left-12 w-[100px] h-[100px] border-b-2 border-l-2 border-crimson/20 z-[2]" />
    </section>
  );
}
