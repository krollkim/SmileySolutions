"use client";
import { useEffect, useState, useMemo } from 'react';
import { motion, Variants } from 'framer-motion';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Pre-generate particle positions to avoid Math.random() in render
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${(i * 17 + 5) % 100}%`,
      top: `${(i * 23 + 10) % 100}%`,
      duration: 5 + (i % 5),
      delay: i * 0.5
    }));
  }, []);

  // Subtle mouse parallax for background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Text reveal animation variants
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.8,
        delayChildren: 0.3
      }
    }
  };

  const lineVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.02
      }
    }
  };

  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Reveal box animation
  const boxVariants: Variants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: [0, 1, 1, 0],
      originX: [0, 0, 1, 1],
      transition: {
        duration: 1.2,
        ease: "easeInOut",
        times: [0, 0.4, 0.6, 1]
      }
    }
  };

  const lines = [
    { text: 'Hello,', isName: false },
    { text: 'My Name Is', isName: false },
    { text: 'Kim Kroll', isName: true }
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Animated Background with Breathing Effect */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero-background.png')",
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        />
      </motion.div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-[#0a0a0a] z-[1]" />
      <div className="absolute inset-0 bg-linear-to-r from-black/60 via-transparent to-transparent z-[1]" />

      {/* Floating Particles Effect - Using pre-generated values */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full bg-crimson/30"
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
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
        <motion.div
          className="max-w-[900px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {lines.map((line, lineIndex) => (
            <div key={lineIndex} className="relative overflow-hidden mb-2">
              {/* Text Line */}
              <motion.div
                className="relative"
                variants={lineVariants}
              >
                <h1
                  className={`text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] font-bold leading-[1.1] tracking-tight ${
                    line.isName ? 'text-crimson' : 'text-white'
                  }`}
                >
                  {line.text.split('').map((char, charIndex) => (
                    <motion.span
                      key={charIndex}
                      className="inline-block"
                      variants={letterVariants}
                      style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                  ))}
                </h1>

                {/* Crimson Reveal Box */}
                <motion.div
                  className="absolute top-0 left-0 h-full w-full bg-crimson z-10"
                  variants={boxVariants}
                />
              </motion.div>
            </div>
          ))}

          {/* Subtitle */}
          <motion.p
            className="text-[1.6rem] sm:text-[1.8rem] text-gray-400 mt-8 max-w-[500px] leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.8, ease: "easeOut" }}
          >
            Full Stack Developer crafting modern web experiences
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.3, duration: 0.8, ease: "easeOut" }}
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center gap-4 px-8 py-4 text-[1.6rem] font-medium uppercase tracking-[0.3rem] text-white border-2 border-crimson overflow-hidden transition-colors duration-500 hover:text-white"
            >
              {/* Button background animation */}
              <span className="absolute inset-0 bg-crimson transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative">View My Work</span>
              <motion.span
                className="relative"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, ease: "easeOut" }}
        >
          <span className="text-[1.2rem] uppercase tracking-[0.3rem] text-gray-500">Scroll</span>
          <motion.div
            className="w-[1px] h-[40px] bg-linear-to-b from-crimson to-transparent"
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
