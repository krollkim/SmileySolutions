'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  const locale = useLocale();
  const t      = useTranslations('footer');
  const isRTL  = locale === 'he';

  const servicesLinks = [
    { label: t('link_fullstack'),  href: `/${locale}#services` },
    { label: t('link_saas'),       href: `/${locale}#services` },
    { label: t('link_therapists'), href: `/${locale}/website-for-therapists` },
    { label: t('link_small_biz'),  href: `/${locale}/website-for-small-business` },
  ];

  const workLinks = [
    { label: t('link_high_end_web'), href: `/${locale}/studio/high-end-web` },
    { label: t('link_tech_engines'), href: `/${locale}/studio/tech-engines` },
    { label: t('link_alignment'),    href: `/${locale}/studio/strategic-alignment` },
  ];

  const companyLinks = [
    { label: t('link_about'),   href: `/${locale}#about` },
    { label: t('link_contact'), href: `/${locale}#contact` },
    { label: t('link_faq'),     href: `/${locale}#faq` },
  ];

  const navLinkClass = 'text-[1.3rem] text-gray-400 hover:text-white transition-colors duration-200';

  return (
    <footer className="bg-[#050505] border-t border-white/[0.06]">

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0">

          {/* Left — editorial tagline + primary CTA */}
          <div className="lg:w-2/5 ltr:lg:pr-20 rtl:lg:pl-20">
            <p className="text-[1.8rem] lg:text-[2rem] font-light text-gray-300 leading-relaxed mb-8 max-w-[280px]">
              {t('tagline')}
            </p>
            <a
              href="https://calendar.app.google/i5TALc1oJahNDeRw8"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('book_aria')}
              className="inline-flex items-center gap-3 px-6 py-3 text-[1.3rem] font-medium uppercase tracking-[0.15rem] text-white bg-crimson border-2 border-crimson rounded-md hover:bg-crimson/85 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              <span>{t('book_cta')}</span>
              <span aria-hidden="true">{isRTL ? '←' : '→'}</span>
            </a>
          </div>

          {/* Right — 3 navigation columns */}
          <div className="lg:w-3/5 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-6">

            {/* Services */}
            <div>
              <h4 className="text-[1.1rem] font-bold text-white uppercase tracking-[0.2rem] mb-5">
                {t('services_heading')}
              </h4>
              <ul className="space-y-3">
                {servicesLinks.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className={navLinkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Work */}
            <div>
              <h4 className="text-[1.1rem] font-bold text-white uppercase tracking-[0.2rem] mb-5">
                {t('work_heading')}
              </h4>
              <ul className="space-y-3">
                {workLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={navLinkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-[1.1rem] font-bold text-white uppercase tracking-[0.2rem] mb-5">
                {t('company_heading')}
              </h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={navLinkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <div className="border-t border-white/[0.06]">
        <div className="container mx-auto px-6 lg:px-12 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">

          <p className="text-[1.2rem] text-gray-400 text-center sm:text-start">
            © {new Date().getFullYear()}{' '}
            <span className="text-white">Smiley Solution</span>.{' '}
            {t('rights')}
          </p>

          <div className="flex items-center gap-5">
            <Link href={`/${locale}/privacy`} className="text-[1.2rem] text-gray-400 hover:text-white transition-colors duration-200">
              {t('privacy')}
            </Link>
            <span className="text-gray-700" aria-hidden="true">·</span>
            <Link href={`/${locale}/terms`} className="text-[1.2rem] text-gray-400 hover:text-white transition-colors duration-200">
              {t('terms')}
            </Link>
            <span className="w-px h-4 bg-gray-700 mx-1" aria-hidden="true" />
            <a
              href="https://github.com/krollkim"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[1.6rem] text-gray-400 hover:text-white transition-colors duration-200"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/krollkimdev/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[1.6rem] text-gray-400 hover:text-white transition-colors duration-200"
            >
              <FaLinkedin />
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
}
