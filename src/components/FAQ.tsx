import { useTranslations } from 'next-intl';
import FAQAccordion from './FAQAccordion';
import { FAQ_ITEMS, type FAQCategory } from '@/data/faq';

interface FAQProps {
  category?: FAQCategory;
  showCTA?: boolean;
}

export default function FAQ({ category = 'general', showCTA = true }: FAQProps) {
  const t = useTranslations('faq');

  const items = FAQ_ITEMS
    .filter(item => item.categories.includes(category))
    .map(item => ({ q: t(item.qKey as Parameters<typeof t>[0]), a: t(item.aKey as Parameters<typeof t>[0]) }));

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <section
      id="faq"
      className="py-40 lg:py-48 bg-[#0a0a0a] relative overflow-hidden"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-crimson/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="section-title text-white inline-block">
            {t.rich('title', { highlight: (chunks) => <span>{chunks}</span> })}
          </h2>
        </div>

        <div className="max-w-3xl mx-auto border-t border-gray-800">
          <FAQAccordion items={items} />
        </div>

        {showCTA && (
          <div className="mt-16 flex flex-col items-center gap-4">
            <p className="text-[1.4rem] text-gray-400">{t('cta_label')}</p>
            <a
              href="https://calendar.app.google/i5TALc1oJahNDeRw8"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('cta_aria')}
              className="inline-flex items-center gap-3 px-6 py-3 text-[1.4rem] font-medium uppercase tracking-[0.15rem] text-white bg-crimson border-2 border-crimson rounded-md hover:bg-crimson/85 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
            >
              <span>{t('cta')}</span>
              <span>{t('cta_arrow')}</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
