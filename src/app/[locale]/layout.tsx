import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import AccessibilityMenu from "@/components/AccessibilityMenu";
import { locales } from "@/i18n/config";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const BASE_URL = "https://smileysolution.com";

// Locale-specific metadata values — shared fields (authors, robots, icons, etc.)
// are defined once inside generateMetadata below.
const localeMeta = {
  en: {
    title: "SmileySolutions | Kim Kroll | Full Stack Developer",
    description:
      "Full-Stack Developer building production-ready SaaS platforms and web applications with React, Next.js, TypeScript, and Node.js. Deployed and scaled with Docker and AWS.",
    keywords: [
      "Full Stack Developer",
      "SmileySolutions",
      "Kim Kroll",
      "React Developer",
      "Next.js Developer",
      "TypeScript",
      "Node.js",
      "TailwindCSS",
      "MongoDB",
      "Docker",
      "AWS",
      "Remote Developer",
      "Digital Nomad",
      "Web Development",
      "SaaS Development",
      "Frontend Developer",
      "Backend Developer",
    ],
    ogLocale: "en_US",
    ogImageAlt: "Kim Kroll - SmileySolutions Full Stack Developer",
  },
  he: {
    title: "SmileySolutions | קים קרול | מפתח Full Stack",
    description:
      "מפתח Full Stack המתמחה בבניית אפליקציות SaaS מוכנות לייצור עם React, Next.js, TailwindCSS ו-Node.js. פריסה וניהול בענן עם Docker ו-AWS.",
    keywords: [
      "מפתח Full Stack",
      "SmileySolutions",
      "קים קרול",
      "מפתח React",
      "מפתח Next.js",
      "TypeScript",
      "Node.js",
      "TailwindCSS",
      "MongoDB",
      "Docker",
      "AWS",
      "מפתח מרחוק",
      "בניית אתרים",
      "פיתוח אתרים",
      "פיתוח SaaS",
      "מפתח Frontend",
      "מפתח Backend",
    ],
    ogLocale: "he_IL",
    ogImageAlt: "קים קרול - SmileySolutions מפתח Full Stack",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = localeMeta[locale as keyof typeof localeMeta] ?? localeMeta.en;

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    authors: [{ name: "Kim Kroll", url: "https://github.com/krollkim" }],
    creator: "Kim Kroll",
    publisher: "SmileySolutions",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: `${BASE_URL}/${locale}`,
      siteName: "SmileySolutions",
      images: [
        {
          url: "/images/profile_picture_portfolio.png",
          width: 1200,
          height: 630,
          alt: t.ogImageAlt,
        },
      ],
      locale: t.ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: ["/images/profile_picture_portfolio.png"],
      creator: "@krollkim",
    },
    metadataBase: new URL(BASE_URL),
    icons: {
      icon: [
        { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      ],
      apple: "/favicon/apple-touch-icon.png",
      shortcut: "/favicon/favicon.ico",
    },
    manifest: "/favicon/site.webmanifest",
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        he: `${BASE_URL}/he`,
        en: `${BASE_URL}/en`,
        "x-default": `${BASE_URL}/he`,
      },
    },
    category: "technology",
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dir = locale === "he" ? "rtl" : "ltr";
  const messages = await getMessages();

  return (
    <html lang={locale} dir={dir} className={montserrat.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Kim Kroll",
              alternateName: "SmileySolutions",
              url: "https://smileysolution.com",
              image:
                "https://smileysolution.com/images/profile_picture_portfolio.png",
              jobTitle: "Full Stack Developer",
              description:
                "Full-Stack Developer building production-ready SaaS applications with React, Next.js, TailwindCSS, and Node.js. Deployed and scaled with Docker and AWS.",
              knowsAbout: [
                "React",
                "Next.js",
                "Node.js",
                "TypeScript",
                "TailwindCSS",
                "MongoDB",
                "Docker",
                "AWS",
                "SaaS Development",
                "Figma",
              ],
              sameAs: [
                "https://github.com/krollkim",
                "https://www.linkedin.com/in/krollkimdev/",
              ],
              worksFor: {
                "@type": "Organization",
                name: "SmileySolutions",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "SmileySolutions",
              url: "https://smileysolution.com",
              founder: { "@type": "Person", name: "Kim Kroll" },
              description:
                "Full-Stack development studio specializing in SaaS platforms and web application development with React, Next.js, and Node.js.",
              areaServed: "Worldwide",
              sameAs: [
                "https://github.com/krollkim",
                "https://www.linkedin.com/in/krollkimdev/",
              ],
            }),
          }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <AccessibilityMenu />
      </body>
    </html>
  );
}
