"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import Image from 'next/image';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuNavRef = useRef<HTMLElement>(null);
  const menuItemsRef = useRef<HTMLDivElement[]>([]);
  const logoRef = useRef<HTMLDivElement>(null);
  const bottomDecoRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const setMenuItemRef = useCallback((el: HTMLDivElement | null, index: number) => {
    if (el) menuItemsRef.current[index] = el;
  }, []);

  useEffect(() => {
    const overlay = menuOverlayRef.current;
    const nav = menuNavRef.current;
    const items = menuItemsRef.current;
    const logo = logoRef.current;
    const bottomDeco = bottomDecoRef.current;

    if (!overlay || !nav || items.length === 0) return;

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline({ paused: true });
    timelineRef.current = tl;

    gsap.set(overlay, { 
      visibility: "hidden", 
      opacity: 0,
    });
    gsap.set(items, { 
      opacity: 0, 
      y: 80,
    });
    gsap.set(logo, { 
      opacity: 0, 
      scale: 0.9,
    });
    gsap.set(bottomDeco, { 
      opacity: 0, 
      y: 10,
    });

    tl.to(overlay, {
      visibility: "visible",
      opacity: 1,
      duration: 0.3,
      ease: "power2.inOut",
      force3D: true,
    })
    .to(items, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.06,
      ease: "power2.out",
      force3D: true,
    }, "-=0.1")
    .to(logo, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
      force3D: true,
    }, "-=0.2")
    .to(bottomDeco, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
      force3D: true,
    }, "-=0.2");

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;

    if (isOpen) {
      tl.timeScale(1).play();
    } else {
      tl.timeScale(2.5).reverse().eventCallback("onReverseComplete", () => {
        if (menuOverlayRef.current) {
          gsap.set(menuOverlayRef.current, { visibility: "hidden" });
        }
      });
    }
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  const navItems = [
    { label: 'Home', id: 'hero', ariaLabel: 'Home — Kim Kroll Full Stack Developer' },
    { label: 'Services', id: 'services', ariaLabel: 'Full Stack Development and SaaS services' },
    { label: 'Projects', id: 'projects', ariaLabel: 'View Full Stack Development projects and SaaS portfolio' },
    { label: 'About', id: 'about', ariaLabel: 'About Kim Kroll — Remote Full Stack Developer' },
    { label: 'Contact', id: 'contact', ariaLabel: 'Contact Kim Kroll for development projects' },
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl shadow-black/30'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-[70px] lg:h-[90px]">

            {/* Logo - SmileySolutions */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, 'hero')}
              className="group relative z-50"
            >
              <span className="text-[2.2rem] lg:text-[2.6rem] tracking-[0.1rem] text-white">
                <span className="font-bold">Smiley</span>
                <span className="font-light">Solutions</span>
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-crimson transition-all duration-500 ease-out group-hover:w-full" />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-12">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  aria-label={item.ariaLabel}
                  className="group relative text-[1.4rem] font-medium uppercase tracking-[0.25rem] text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-crimson transition-all duration-300 ease-out group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Hamburger Icon - Two lines transforming to X */}
            <button
              className="lg:hidden relative z-50 w-[50px] h-[50px] flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <div className="relative w-[28px] h-[14px]">
                {/* Top line */}
                <motion.span
                  className="absolute left-0 w-full h-[2px] bg-white rounded-full origin-center"
                  initial={false}
                  animate={{
                    top: isOpen ? '50%' : '0%',
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? '-50%' : '0%'
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                {/* Bottom line */}
                <motion.span
                  className="absolute left-0 w-full h-[2px] bg-white rounded-full origin-center"
                  initial={false}
                  animate={{
                    bottom: isOpen ? '50%' : '0%',
                    top: isOpen ? '50%' : 'auto',
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? '-50%' : '0%'
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-Screen Mobile Menu Overlay - GSAP Animated */}
      <div
        ref={menuOverlayRef}
        className="fixed inset-0 z-40 lg:hidden"
        style={{ visibility: "hidden", opacity: 0 }}
      >
        {/* Dark translucent background with heavy blur */}
        <div className="absolute inset-0 bg-[#050505]/98 backdrop-blur-2xl" />

        {/* Menu Content */}
        <nav
          ref={menuNavRef}
          className="relative h-full flex flex-col items-center justify-center"
        >
          {navItems.map((item, index) => (
            <div
              key={item.label}
              ref={(el) => setMenuItemRef(el, index)}
              className="relative group"
              style={{ opacity: 0, transform: "translateY(80px)" }}
            >
              {/* Ghost Background Number */}
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] sm:text-[20rem] font-extralight text-white/[0.02] leading-none select-none pointer-events-none transition-all duration-500 group-hover:text-crimson/[0.06]">
                {String(index + 1).padStart(2, '0')}
              </span>

              {/* Main Navigation Link */}
              <a
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                aria-label={item.ariaLabel}
                className="relative z-10 block py-4 sm:py-6 text-[4rem] sm:text-[5rem] md:text-[6rem] font-extralight uppercase tracking-[0.5rem] text-white/80 hover:text-white transition-all duration-300"
              >
                <span className="relative">
                  {item.label}
                  <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-crimson transition-all duration-500 ease-out group-hover:w-full" />
                </span>
              </a>
            </div>
          ))}

          {/* Logo Icon - centered below nav items */}
          <div
            ref={logoRef}
            className="mt-16"
            style={{ opacity: 0, transform: "scale(0.9)" }}
          >
            <div className="animate-pulse-slow">
              <Image
                src="/favicon/apple-touch-icon.png"
                alt="SmileySolutions Logo"
                width={64}
                height={64}
                className="drop-shadow-[0_0_15px_rgba(220,20,60,0.4)]"
              />
            </div>
          </div>

          {/* MENU label - absolute bottom, centered horizontally */}
          <div
            ref={bottomDecoRef}
            className="absolute bottom-10 left-0 right-0 flex items-center justify-center gap-4"
            style={{ opacity: 0, transform: "translateY(10px)" }}
          >
            <span className="w-12 h-px bg-crimson/50" />
            <span className="text-[1.2rem] uppercase tracking-[0.3rem] text-gray-500">Menu</span>
            <span className="w-12 h-px bg-crimson/50" />
          </div>

          {/* Corner accents */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-crimson/20" />
          <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-crimson/20" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-crimson/20" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-crimson/20" />
        </nav>
      </div>
    </>
  );
};

export default Header;
