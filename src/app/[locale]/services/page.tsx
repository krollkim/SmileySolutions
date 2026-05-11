import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Services from '@/components/Services';
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
  const t = await getTranslations({ locale, namespace: 'services' });
  const isHe = locale === 'he';

  const title = isHe
    ? 'שירותים — איך אנחנו בונים | Smiley Solution'
    : 'Services — How We Build | Smiley Solution';

  return {
    title,
    description: t('subtitle'),
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${locale}/services`,
      languages: {
        he: `${BASE_URL}/he/services`,
        en: `${BASE_URL}/en/services`,
      },
    },
    openGraph: {
      title,
      description: t('subtitle'),
      url: `${BASE_URL}/${locale}/services`,
      siteName: 'Smiley Solution',
      locale: isHe ? 'he_IL' : 'en_US',
      type: 'website',
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return (
    <>
      <ProgressBar />
      <Header />
      <main className="min-h-dvh bg-[#0a0a0a] text-white">
        <Services />
        <FAQ category="services" />
      </main>
      <Footer />
    </>
  );
}
