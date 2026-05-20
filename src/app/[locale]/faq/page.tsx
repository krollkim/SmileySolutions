import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import ProgressBar from '@/components/ProgressBar';

const BASE_URL = 'https://smileysolution.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'faq' });
  const isHe = locale === 'he';

  const title = isHe
    ? 'שאלות נפוצות | Smiley Solution'
    : 'FAQ — Frequently Asked Questions | Smiley Solution';

  return {
    title,
    description: t('meta_description'),
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${locale}/faq`,
      languages: {
        he: `${BASE_URL}/he/faq`,
        en: `${BASE_URL}/en/faq`,
      },
    },
    openGraph: {
      title,
      description: t('meta_description'),
      url: `${BASE_URL}/${locale}/faq`,
      siteName: 'Smiley Solution',
      locale: isHe ? 'he_IL' : 'en_US',
      type: 'website',
    },
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return (
    <>
      <ProgressBar />
      <Header />
      <main className="min-h-dvh bg-[#0a0a0a] text-white pt-[70px] lg:pt-[90px]">
        <FAQ asH1 />
      </main>
      <Footer />
    </>
  );
}
