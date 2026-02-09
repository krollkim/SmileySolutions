import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import AccessibilityMenu from "@/components/AccessibilityMenu";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SmileySolutions | Kim Kroll | Full Stack Developer",
  description: "Full-Stack Developer building production-ready SaaS applications with React, Next.js, TailwindCSS, and Node.js. Deployed and scaled with Docker and AWS for high-performance web experiences.",
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
    "Backend Developer"
  ],
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
    title: "SmileySolutions | Kim Kroll | Full Stack Developer",
    description: "Full-Stack Developer building production-ready SaaS applications with React, Next.js, TailwindCSS, and Node.js. Deployed and scaled with Docker and AWS.",
    url: "https://smileysolutions.netlify.app",
    siteName: "SmileySolutions",
    images: [
      {
        url: "/images/profile_picture_portfolio.png",
        width: 1200,
        height: 630,
        alt: "Kim Kroll - SmileySolutions Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SmileySolutions | Kim Kroll | Full Stack Developer",
    description: "Full-Stack Developer building production-ready SaaS applications with React, Next.js, TailwindCSS, and Node.js. Deployed and scaled with Docker and AWS.",
    images: ["/images/profile_picture_portfolio.png"],
    creator: "@krollkim",
  },
  metadataBase: new URL("https://smileysolutions.netlify.app"),
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
    canonical: "https://smileysolutions.netlify.app",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Kim Kroll",
              "alternateName": "SmileySolutions",
              "url": "https://smileysolutions.netlify.app",
              "image": "https://smileysolutions.netlify.app/images/profile_picture_portfolio.png",
              "jobTitle": "Full Stack Developer",
              "description": "Full-Stack Developer building production-ready SaaS applications with React, Next.js, TailwindCSS, and Node.js. Deployed and scaled with Docker and AWS.",
              "knowsAbout": [
                "React",
                "Next.js",
                "Node.js",
                "TypeScript",
                "TailwindCSS",
                "MongoDB",
                "Docker",
                "AWS",
                "SaaS Development",
                "Figma"
              ],
              "sameAs": [
                "https://github.com/krollkim",
                "https://www.linkedin.com/in/krollkimdev/"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "SmileySolutions"
              }
            }),
          }}
        />
        {children}
        <AccessibilityMenu />
      </body>
    </html>
  );
}
