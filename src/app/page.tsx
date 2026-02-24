import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';
import ProgressBar from '@/components/ProgressBar';

export default function Home() {
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
      <footer className="py-8 bg-[#050505] text-center border-t border-gray-900">
        <div className="container mx-auto px-6">
          <p className="text-[1.3rem] text-gray-500">
            © {new Date().getFullYear()} <span className="text-white">Kim Kroll</span>. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
