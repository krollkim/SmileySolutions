import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Contact from '@/components/Contact';
import FAQAccordion from '@/components/FAQAccordion';
import Footer from '@/components/Footer';
import ProgressBar from '@/components/ProgressBar';

const BASE_URL = 'https://smileysolution.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  const isHe = locale === 'he';

  const title = isHe
    ? 'צור קשר | Smiley Solution'
    : 'Contact | Smiley Solution';

  return {
    title,
    description: t('meta_description'),
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${locale}/contact`,
      languages: {
        he: `${BASE_URL}/he/contact`,
        en: `${BASE_URL}/en/contact`,
      },
    },
    openGraph: {
      title,
      description: t('meta_description'),
      url: `${BASE_URL}/${locale}/contact`,
      siteName: 'Smiley Solution',
      locale: isHe ? 'he_IL' : 'en_US',
      type: 'website',
    },
  };
}

const faqEn = [
  {
    q: 'How do I start a project with Smiley Solution?',
    a: "Book a free consultation through our online calendar. We'll discuss your project goals, timeline, and budget. Within 48 hours, you'll receive a detailed proposal with a clear scope and pricing.",
  },
  {
    q: 'What happens after I book a consultation?',
    a: "We'll have a 30-minute video call to understand your project. After the call, we prepare a detailed proposal including technical approach, timeline, and pricing. No commitment required.",
  },
  {
    q: 'Do you work with clients outside of Israel?',
    a: 'Yes. We work with clients worldwide. All communication is in English or Hebrew, and we use modern collaboration tools for seamless remote work across time zones.',
  },
];

const faqHe = [
  {
    q: 'איך מתחילים פרויקט עם Smiley Solution?',
    a: 'קבעו שיחת ייעוץ חינם דרך היומן המקוון. נדון במטרות הפרויקט, לוח הזמנים והתקציב. תוך 48 שעות תקבלו הצעה מפורטת עם היקף ברור ומחיר.',
  },
  {
    q: 'מה קורה אחרי שקובעים שיחה?',
    a: 'נקיים שיחת וידאו של 30 דקות כדי להבין את הפרויקט. אחרי השיחה, נכין הצעה מפורטת הכוללת גישה טכנית, לוח זמנים ותמחור. ללא התחייבות.',
  },
  {
    q: 'האם אתם עובדים עם לקוחות מחוץ לישראל?',
    a: 'כן. אנחנו עובדים עם לקוחות מכל העולם. כל התקשורת היא באנגלית או עברית, ואנחנו משתמשים בכלי שיתוף פעולה מודרניים לעבודה מרחוק חלקה על פני אזורי זמן.',
  },
];

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isHe = locale === 'he';
  const faq = isHe ? faqHe : faqEn;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ProgressBar />
      <Header />
      <main className="min-h-dvh bg-[#0a0a0a] text-white">
        <Contact standalone />
        <section
          className="pb-24 lg:pb-32 bg-[#0a0a0a]"
          dir={isHe ? 'rtl' : 'ltr'}
        >
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-3xl mx-auto border-t border-gray-800">
              <FAQAccordion items={faq} />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
