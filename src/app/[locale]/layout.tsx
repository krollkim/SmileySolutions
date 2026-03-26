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
  display: "block",
});

const BASE_URL = "https://smileysolution.com";

// Locale-specific metadata values - shared fields (authors, robots, icons, etc.)
// are defined once inside generateMetadata below.
const localeMeta = {
  en: {
    title: "Smiley Solution | Tech Studio",
    description:
      "Smiley Solution | Tech Studio specializing in Digital Product Development. Expert Frontend, Backend, and SaaS solutions using React, Next.js, and Node.js.",
    keywords: [
      "Tech Studio",
      "Smiley Solution",
      "Digital Product Development",
      "SaaS Development",
      "Frontend Development",
      "Backend Development",
      "React Developer",
      "Next.js Developer",
      "TypeScript",
      "Node.js",
      "TailwindCSS",
      "MongoDB",
      "Docker",
      "AWS",
      "Web Development",
      "Full Stack Development",
    ],
    ogLocale: "en_US",
    ogImageAlt: "Smiley Solution - Tech Studio",
  },
  he: {
    title: "Smiley Solution | סטודיו לטכנולוגיה",
    description:
      "Smiley Solution - סטודיו לטכנולוגיה המתמחה בפיתוח מוצרים דיגיטליים ויישומי SaaS. פיתוח Full Stack מתקדם הכולל ארכיטקטורת Frontend ב-React/Next.js וניהול Backend ב-Node.js.",
    keywords: [
      "סטודיו לטכנולוגיה",
      "Smiley Solution",
      "פיתוח מוצרים דיגיטליים",
      "פיתוח SaaS",
      "פיתוח Frontend",
      "פיתוח Backend",
      "מפתח React",
      "מפתח Next.js",
      "TypeScript",
      "Node.js",
      "TailwindCSS",
      "MongoDB",
      "Docker",
      "AWS",
      "בניית אתרים",
      "פיתוח אתרים",
    ],
    ogLocale: "he_IL",
    ogImageAlt: "Smiley Solution - סטודיו לטכנולוגיה",
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
    authors: [{ name: "Smiley Solution", url: "https://smileysolution.com" }],
    creator: "Smiley Solution",
    publisher: "Smiley Solution",
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
      siteName: "Smiley Solution",
      images: [
        {
          url: "/images/profile_picture.png",
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
      images: ["/images/profile_picture.png"],
      creator: "@smileysolution",
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
              "@type": "Organization",
              name: "Smiley Solution",
              alternateName: "Smiley Solution Tech Studio",
              url: "https://smileysolution.com",
              logo: "https://smileysolution.com/images/profile_picture.png",
              description:
                "Tech Studio specializing in digital product development and scalable SaaS applications - built with React, Next.js, and Node.js, deployed on AWS with Docker and CI/CD automation.",
              areaServed: "Worldwide",
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
              ],
              sameAs: [
                "https://github.com/krollkim",
                "https://www.linkedin.com/in/krollkimdev/",
              ],
              founder: {
                "@type": "Person",
                name: "Kim Kroll",
                jobTitle: "Founder & Tech Lead",
                url: "https://smileysolution.com",
                image: "https://smileysolution.com/images/profile_picture.png",
                sameAs: [
                  "https://github.com/krollkim",
                  "https://www.linkedin.com/in/krollkimdev/",
                ],
              },
            }),
          }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
          <AccessibilityMenu />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
