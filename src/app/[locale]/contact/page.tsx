import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Contact from '@/components/Contact';
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
    description: t('subtext'),
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
      description: t('subtext'),
      url: `${BASE_URL}/${locale}/contact`,
      siteName: 'Smiley Solution',
      locale: isHe ? 'he_IL' : 'en_US',
      type: 'website',
    },
  };
}

export default async function ContactPage({
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
        <Contact />
      </main>
      <Footer />
    </>
  );
}
