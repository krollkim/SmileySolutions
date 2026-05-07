import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import PillarGrid from '@/components/PillarGrid';
import Footer from '@/components/Footer';
import ProgressBar from '@/components/ProgressBar';

const BASE_URL = 'https://smileysolution.com';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });
  const isHe = locale === 'he';

  const title = isHe
    ? 'עבודות הסטודיו | Smiley Solution'
    : 'Studio Work | Smiley Solution';

  return {
    title,
    description: t('subtitle'),
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${locale}/work`,
      languages: {
        he: `${BASE_URL}/he/work`,
        en: `${BASE_URL}/en/work`,
      },
    },
    openGraph: {
      title,
      description: t('subtitle'),
      url: `${BASE_URL}/${locale}/work`,
      siteName: 'Smiley Solution',
      locale: isHe ? 'he_IL' : 'en_US',
      type: 'website',
    },
  };
}


export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isHe = locale === 'he';

  const heading = isHe ? 'עבודות הסטודיו' : 'Studio Work';

  return (
    <>
      <ProgressBar />
      <Header />
      <main className="min-h-dvh bg-[#0a0a0a] text-white" dir={isHe ? 'rtl' : 'ltr'}>
        {/* Page heading — top clearance accounts for fixed header */}
        <div className="container mx-auto px-6 lg:px-12 pt-[140px] pb-16 lg:pb-20">
          <h1 className="section-title text-white">{heading}</h1>
        </div>

        {/* Studio triptych — three expandable pillar cards with built-in CTA */}
        <PillarGrid />
      </main>
      <Footer />
    </>
  );
}
