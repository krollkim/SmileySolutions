"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Image from 'next/image';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const navItems = [
    { label: 'Home', id: 'hero', ariaLabel: 'Home — Kim Kroll Full Stack Developer' },
    { label: 'Services', id: 'services', ariaLabel: 'Full Stack Development and SaaS services' },
    { label: 'Projects', id: 'projects', ariaLabel: 'View Full Stack Development projects and SaaS portfolio' },
    { label: 'About', id: 'about', ariaLabel: 'About Kim Kroll — Remote Full Stack Developer' },
    { label: 'Contact', id: 'contact', ariaLabel: 'Contact Kim Kroll for development projects' },
  ];

  // Full-screen menu animation variants
  const overlayVariants: Variants = {
    closed: {
      opacity: 0,
      transition: { duration: 0.4, ease: "easeInOut" }
    },
    open: {
      opacity: 1,
      transition: { duration: 0.4, ease: "easeInOut" }
    }
  };

  const menuContainerVariants: Variants = {
    closed: {},
    open: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const menuItemVariants: Variants = {
    closed: {
      opacity: 0,
      y: 80,
      transition: { duration: 0.3, ease: "easeInOut" }
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 motion-gpu ${
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
              {/* Crimson underline - expands from 0% to 100% on hover */}
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
                  className="absolute left-0 w-full h-[2px] bg-white rounded-full origin-center motion-gpu"
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
                  className="absolute left-0 w-full h-[2px] bg-white rounded-full origin-center motion-gpu"
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

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden motion-gpu"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Dark translucent background with heavy blur */}
            <div className="absolute inset-0 bg-[#050505]/98 backdrop-blur-2xl" />

            {/* Menu Content */}
            <motion.nav
              className="relative h-full flex flex-col items-center justify-center motion-gpu"
              variants={menuContainerVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="relative group motion-gpu"
                  variants={menuItemVariants}
                >
                  {/* Ghost Background Number - subtle watermark */}
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[15rem] sm:text-[20rem] font-extralight text-white/[0.02] leading-none select-none pointer-events-none transition-all duration-500 group-hover:text-crimson/[0.06]">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Main Navigation Link - original clean typography */}
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
                </motion.div>
              ))}

              {/* Logo Icon - Centered with spacious margin */}
              <motion.div
                className="mt-26 motion-gpu"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3, ease: "easeIn" } }}
                transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
              >
                <motion.div
                  className="motion-gpu"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/favicon/apple-touch-icon.png"
                    alt="SmileySolutions Logo"
                    width={64}
                    height={64}
                    className="drop-shadow-[0_0_15px_rgba(220,20,60,0.4)]"
                  />
                </motion.div>
              </motion.div>

              {/* Bottom decorative element */}
              <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 motion-gpu"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.3, ease: "easeIn" } }}
                transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
              >
                <div className="flex items-center gap-4">
                  <span className="w-12 h-[1px] bg-crimson/50" />
                  <span className="text-[1.2rem] uppercase tracking-[0.3rem] text-gray-500">Menu</span>
                  <span className="w-12 h-[1px] bg-crimson/50" />
                </div>
              </motion.div>

              {/* Corner accents */}
              <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-crimson/20" />
              <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-crimson/20" />
              <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-crimson/20" />
              <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-crimson/20" />
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
