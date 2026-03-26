import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Hook from "@/components/Hook";
import Services from "@/components/Services";
import PillarGrid from "@/components/PillarGrid";
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

      {/* 1. Hero — North Star */}
      <Hero />

      {/* 2. Hook — Social proof bridge */}
      <Hook />

      {/* 3. Services — 4-phase narrative */}
      <Services />

      {/* 4. Evidence — Studio work triptych */}
      <PillarGrid />

      {/* 5. Architect — About */}
      <About />

      {/* 6. Invitation — Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}
