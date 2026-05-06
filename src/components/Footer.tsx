'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

export default function Footer() {
  const locale = useLocale();
  const tFooter = useTranslations('footer');

  const isHe = locale === 'he';

  const sectionTitle = isHe ? 'פתרונות בניית אתרים' : 'Website Solutions';

  const seoLinks = isHe
    ? [
        {
          label: 'בניית אתר למטפלים',
          href: `/he/website-for-therapists`,
        },
        {
          label: 'בניית אתר לעסקים קטנים',
          href: `/he/website-for-small-business`,
        },
      ]
    : [
        {
          label: 'Website for Therapists',
          href: `/en/website-for-therapists`,
        },
        {
          label: 'Website for Small Businesses',
          href: `/en/website-for-small-business`,
        },
      ];

  return (
    <footer className="py-10 bg-[#050505] border-t border-gray-900">
      <div className="container mx-auto px-6">

        {/* SEO landing page links */}
        <div className="mb-8 text-center">
          <p className="text-[1.2rem] uppercase tracking-[0.25rem] text-gray-400 mb-5">
            {sectionTitle}
          </p>
          <div className="flex justify-center flex-wrap gap-x-10 gap-y-3">
            {seoLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[1.3rem] text-gray-400 hover:text-crimson transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-900 pt-8 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[1.3rem] text-gray-400 text-center sm:text-start">
            © {new Date().getFullYear()}{' '}
            <span className="text-white">Smiley Solution</span>.{' '}
            {tFooter('rights')}
          </p>
          <div className="flex gap-6">
            <Link
              href={`/${locale}/privacy`}
              className="text-[1.2rem] text-gray-400 hover:text-white transition-colors duration-200"
            >
              {isHe ? 'מדיניות פרטיות' : 'Privacy Policy'}
            </Link>
            <Link
              href={`/${locale}/terms`}
              className="text-[1.2rem] text-gray-400 hover:text-white transition-colors duration-200"
            >
              {isHe ? 'תנאי שירות' : 'Terms of Service'}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
