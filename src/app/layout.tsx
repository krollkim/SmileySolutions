import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SmileySolutions | Kim Kroll | Full Stack Developer",
  description: "High-end web development solutions by Kim Kroll.",
  keywords: ["Full Stack Developer", "React", "Next.js", "Kim Kroll", "Web Development"],
  authors: [{ name: "Kim Kroll" }],
  openGraph: {
    title: "Kim Kroll | Full Stack Developer Portfolio",
    description: "Modern, scalable web applications built with passion and precision.",
    url: "https://kimkroll.netlify.app",
    siteName: "Kim Kroll Portfolio",
    images: [
      {
        url: "/images/profile_picture_portfolio.png",
        width: 1200,
        height: 630,
        alt: "Kim Kroll Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kim Kroll | Full Stack Developer",
    description: "Professional portfolio of Kim Kroll.",
    images: ["/images/hero-background.png"],
  },
  metadataBase: new URL("https://kimkroll.netlify.app"),
  icons: {
    icon: [
      { url: '/favicon/favicon-32x32.png', sizes: '32x32' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16' },
    ],
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Kim Kroll",
              "url": "https://kimkroll.netlify.app",
              "jobTitle": "Full Stack Developer",
              "knowsAbout": ["React", "Next.js", "Node.js", "TypeScript", "TailwindCSS"],
              "sameAs": [
                "https://github.com/krollkim",
                "https://www.linkedin.com/in/krollkimdev/"
              ]
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
