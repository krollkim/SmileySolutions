"use client";
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function FloatingCTA() {
  const t = useTranslations('hero');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-16 rtl:right-8 ltr:left-8 z-40 transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <a
        href="https://calendar.app.google/i5TALc1oJahNDeRw8"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('book_aria')}
        className="flex items-center gap-2 px-5 py-3 bg-crimson text-white text-[1.2rem] font-medium uppercase tracking-[0.12rem] rounded-full shadow-lg shadow-black/40 hover:bg-crimson/85 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
      >
        <span>{t('book_cta')}</span>
      </a>
    </div>
  );
}
