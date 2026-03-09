import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/ProgressBar";
import { type Locale } from "@/i18n/config";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  await params;

  return (
    <main className="min-h-dvh bg-[#0a0a0a] overflow-x-hidden w-full max-w-[100vw]">
      {/* Scroll Progress Bar */}
      <ProgressBar />

      {/* Header */}
      <Header />

      {/* Sections */}
      <Hero />
      <Services />
      <Projects />
      <About />
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}
