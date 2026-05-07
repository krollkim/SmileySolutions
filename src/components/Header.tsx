"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

const Header = () => {
  const t = useTranslations('nav');
  const locale   = useLocale();
  const router   = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const targetLocale = locale === 'he' ? 'en' : 'he';

  const switchLocale = () => {
    // Persist choice so the proxy uses it on future visits
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;
    // Swap the locale segment in the current path (/he → /en or vice-versa)
    const newPath = pathname.replace(`/${locale}`, `/${targetLocale}`) || `/${targetLocale}`;
    router.push(newPath);
  };

  const headerRef = useRef<HTMLElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuNavRef = useRef<HTMLElement>(null);
  const menuItemsRef = useRef<HTMLDivElement[]>([]);
  const logoRef = useRef<HTMLDivElement>(null);
  const bottomDecoRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(headerRef.current, { y: '-100%' }, { y: '0%', duration: 0.4, ease: 'power2.inOut', force3D: true });
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const wasOpen = isOpen;
    setIsOpen(false);
    setTimeout(() => router.push(href), wasOpen ? 300 : 0);
  };

  const navItems = [
    { labelKey: 'home' as const,     ariaKey: 'home_aria' as const,     href: `/${locale}` },
    { labelKey: 'services' as const, ariaKey: 'services_aria' as const, href: `/${locale}/services` },
    { labelKey: 'projects' as const, ariaKey: 'projects_aria' as const, href: `/${locale}/work` },
    { labelKey: 'about' as const,    ariaKey: 'about_aria' as const,    href: `/${locale}/about` },
    { labelKey: 'faq' as const,      ariaKey: 'faq_aria' as const,      href: `/${locale}/faq` },
    { labelKey: 'contact' as const,  ariaKey: 'contact_aria' as const,  href: `/${locale}/contact` },
  ];

  return (
    <>
      <header
        ref={headerRef}
        style={{ transform: 'translateY(-100%)' }}
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
          isScrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl shadow-black/30'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-[70px] lg:h-[90px]">

            {/* Logo - SmileySolutions */}
            <a
              href={`/${locale}`}
              onClick={(e) => handleNavClick(e, `/${locale}`)}
              className="group relative z-50"
            >
              <span className="text-[2.2rem] lg:text-[2.6rem] tracking-[0.1rem] text-white">
                <span className="font-bold">Smiley</span>
                <span className="font-light"> Solution</span>
              </span>
              <span className="absolute -bottom-1 left-0 rtl:left-auto rtl:right-0 w-0 h-[2px] bg-crimson transition-all duration-500 ease-out group-hover:w-full" />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-12">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  aria-label={t(item.ariaKey)}
                  className={`group relative text-[1.4rem] font-medium uppercase tracking-[0.25rem] transition-colors duration-300 ${
                    pathname === item.href || (item.href !== `/${locale}` && pathname.startsWith(item.href))
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {t(item.labelKey)}
                  <span className={`absolute -bottom-1 left-0 rtl:left-auto rtl:right-0 h-[1px] bg-crimson transition-all duration-300 ease-out ${
                    pathname === item.href || (item.href !== `/${locale}` && pathname.startsWith(item.href))
                      ? 'w-full'
                      : 'w-0 group-hover:w-full'
                  }`} />
                </a>
              ))}
            </nav>

            {/* Language switcher — desktop */}
            <button
              onClick={switchLocale}
              aria-label={`Switch to ${targetLocale === 'en' ? 'English' : 'Hebrew'}`}
              className="hidden lg:flex items-center gap-[6px] text-[1.3rem] font-medium uppercase tracking-[0.2rem] select-none"
            >
              <span className={locale === 'en' ? 'text-white' : 'text-gray-400 hover:text-white transition-colors duration-200'}>
                EN
              </span>
              <span className="text-gray-700">/</span>
              <span className={locale === 'he' ? 'text-white' : 'text-gray-400 hover:text-white transition-colors duration-200'}>
                HE
              </span>
            </button>

            {/* Hamburger Icon - Two lines transforming to X */}
            <button
              className="lg:hidden relative z-50 w-[50px] h-[50px] flex items-center justify-center"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <div className="relative w-[28px] h-[14px]">
                {/* Top line */}
                <span
                  className="absolute left-0 w-full h-[2px] bg-white rounded-full origin-center transition-all duration-300 ease-in-out"
                  style={{
                    top: isOpen ? '50%' : '0%',
                    transform: isOpen ? 'translateY(-50%) rotate(45deg)' : 'none',
                  }}
                />
                {/* Bottom line */}
                <span
                  className="absolute left-0 w-full h-[2px] bg-white rounded-full origin-center transition-all duration-300 ease-in-out"
                  style={{
                    top: isOpen ? '50%' : 'auto',
                    bottom: isOpen ? 'auto' : '0%',
                    transform: isOpen ? 'translateY(-50%) rotate(-45deg)' : 'none',
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

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
              key={item.href}
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
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                aria-label={t(item.ariaKey)}
                className="relative z-10 block py-4 sm:py-6 text-[4rem] sm:text-[5rem] md:text-[6rem] font-extralight uppercase tracking-[0.5rem] text-white/80 hover:text-white transition-all duration-300"
              >
                <span className="relative">
                  {t(item.labelKey)}
                  <span className="absolute -bottom-2 left-0 rtl:left-auto rtl:right-0 w-0 h-[2px] bg-crimson transition-all duration-500 ease-out group-hover:w-full" />
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
            <div>
              <Image
                src="/favicon/apple-touch-icon.png"
                alt="Smiley Solution Logo"
                width={64}
                height={64}
                className="drop-shadow-[0_0_15px_rgba(220,20,60,0.4)]"
              />
            </div>
          </div>

          {/* Language switcher — mobile */}
          <button
            onClick={() => { setIsOpen(false); switchLocale(); }}
            aria-label={`Switch to ${targetLocale === 'en' ? 'English' : 'Hebrew'}`}
            className="mt-10 flex items-center gap-3 text-[1.8rem] font-medium uppercase tracking-[0.3rem] select-none"
          >
            <span className={locale === 'en' ? 'text-white' : 'text-gray-600 hover:text-gray-300 transition-colors duration-200'}>
              EN
            </span>
            <span className="text-gray-700">/</span>
            <span className={locale === 'he' ? 'text-white' : 'text-gray-600 hover:text-gray-300 transition-colors duration-200'}>
              HE
            </span>
          </button>

          {/* MENU label - absolute bottom, centered horizontally */}
          <div
            ref={bottomDecoRef}
            className="absolute bottom-10 left-0 right-0 flex items-center justify-center gap-4"
            style={{ opacity: 0, transform: "translateY(10px)" }}
          >
            <span className="w-12 h-px bg-crimson/50" />
            <span className="text-[1.2rem] uppercase tracking-[0.3rem] text-gray-400">
              {t('menu')}
            </span>
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
