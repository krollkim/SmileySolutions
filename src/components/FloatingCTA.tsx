"use client";
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import WhatsAppCta from './WhatsAppCta';

export default function FloatingCTA() {
  const t = useTranslations('hero');
  const pathname = usePathname();
  const [scrolledPast, setScrolledPast] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledPast(window.scrollY > window.innerHeight);
    };
    handleScroll(); // set correct initial state (handles pre-scrolled pages)
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Re-observe footer on every navigation — the previous footer node is removed
  // from the DOM when the page changes, so the observer must be re-attached.
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [pathname]);

  const showCTA = scrolledPast && !footerVisible;

  return (
    <div
      className={`fixed bottom-16 rtl:right-8 ltr:left-8 z-40 transition-all duration-300 ${
        showCTA ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <WhatsAppCta
        source="floating"
        ariaLabel={t('book_aria')}
        className="flex items-center gap-2 px-5 py-3 bg-crimson text-white text-[1.2rem] font-medium uppercase tracking-[0.12rem] rounded-full shadow-lg shadow-black/40 hover:bg-crimson/85 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
      >
        <span>{t('book_cta')}</span>
      </WhatsAppCta>
    </div>
  );
}
