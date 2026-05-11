import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import About from '@/components/About';
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
  const t = await getTranslations({ locale, namespace: 'about' });
  const isHe = locale === 'he';

  const title = isHe
    ? 'הסטודיו | Smiley Solution'
    : 'About — The Studio | Smiley Solution';

  return {
    title,
    description: t('bio1'),
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${locale}/about`,
      languages: {
        he: `${BASE_URL}/he/about`,
        en: `${BASE_URL}/en/about`,
      },
    },
    openGraph: {
      title,
      description: t('bio1'),
      url: `${BASE_URL}/${locale}/about`,
      siteName: 'Smiley Solution',
      locale: isHe ? 'he_IL' : 'en_US',
      type: 'website',
    },
  };
}

export default async function AboutPage({
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
        <About />
        <FAQ category="about" />
      </main>
      <Footer />
    </>
  );
}
