import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgressBar from '@/components/ProgressBar';
import StudioHero from '@/components/studio/StudioHero';
import CaseStudyCard from '@/components/studio/CaseStudyCard';
import { getPillarBySlug, getPillarStaticParams } from '@/data/pillars';
import { PROJECT_DATA } from '@/data/projects';

const BASE_URL = 'https://smileysolution.com';

// ─── Static generation ─────────────────────────────────────────────────────────
export function generateStaticParams() {
  return getPillarStaticParams();
}

// ─── Metadata ──────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const pillar = getPillarBySlug(slug);
  if (!pillar) return {};

  const t = await getTranslations({ locale, namespace: 'pillars' });
  const title = `${t(pillar.titleKey)} | Smiley Solution`;
  const description = t(pillar.taglineKey);

  return {
    title,
    description,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${locale}/studio/${slug}`,
      languages: {
        he: `${BASE_URL}/he/studio/${slug}`,
        en: `${BASE_URL}/en/studio/${slug}`,
        'x-default': `${BASE_URL}/he/studio/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${locale}/studio/${slug}`,
      siteName: 'Smiley Solution',
      locale: locale === 'he' ? 'he_IL' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@smileysolution',
    },
  };
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default async function PillarPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const pillar = getPillarBySlug(slug);
  if (!pillar) notFound();

  const t     = await getTranslations({ locale, namespace: 'pillars' });
  const tp    = await getTranslations({ locale, namespace: 'projects' });
  const isRTL = locale === 'he';

  return (
    <>
      <ProgressBar />
      <Header />
      <main
        className="min-h-screen bg-[#0a0a0a] text-white"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        {/* Hero - continues the PillarGrid expansion motion */}
        <StudioHero
          pillar={pillar}
          title={t(pillar.titleKey)}
          tagline={t(pillar.taglineKey)}
          backLabel={t('back')}
        />

        {/* Case Studies */}
        <div className="container mx-auto px-6 lg:px-12 py-20 lg:py-28 flex flex-col gap-16">
          {pillar.projectKeys.map((key, index) => {
            const project = PROJECT_DATA[key];
            if (!project) return null;

            return (
              <CaseStudyCard
                key={key}
                title={project.title}
                challenge={t(`${key}_challenge`)}
                result={t(`${key}_result`)}
                image={project.image}
                imageAlt={tp(`${key}_alt`)}
                liveLink={project.liveLink}
                tags={project.tags}
                period={project.period}
                challengeLabel={t('challenge_label')}
                resultLabel={t('result_label')}
                liveDemoLabel={t('live_demo')}
                index={index}
              />
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
