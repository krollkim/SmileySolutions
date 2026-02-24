"use client";
import { useRef, useLayoutEffect, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

// ===== PROJECT DATA =====
const PROJECTS = [
  {
    title: "Yup.io",
    description: "Contributed to the evolution of Yup.io, a growing SaaS platform, by redesigning the core architecture to transition the site into a high-performance web application. I specialized in delivering a production-ready frontend by refactoring legacy components into a modern React and TailwindCSS framework.",
    image: "/images/YupIO-project.png",
    alt: "Yup.io SaaS platform interface designed in Figma and built with React and TailwindCSS",
    liveLink: "https://yup.io/",
    codeLink: undefined,
    tags: ["React", "TailwindCSS", "SaaS", "Figma"],
    role: "Frontend Web Developer",
    period: "2023–2024"
  },
  {
    title: "Bullshit Map",
    description: "Full-stack platform transforming NFC interactions into a global map. Built with Next.js 15, React 19, and MapboxGL on the frontend. Backend powered by Node/Express/TypeScript with MongoDB 6 geospatial queries.",
    image: "/images/Bullshit-project.png",
    alt: "Full-stack geospatial web application built with Next.js, MapboxGL, and Node.js",
    liveLink: "https://globaloriginalart.com/",
    codeLink: undefined,
    tags: ["Next.js 15", "MapboxGL", "Node.js", "AWS"],
    role: "Full Stack & DevOps",
    period: "TBD"
  },
  {
    title: "Michal B",
    description: "Portfolio website for an artist featuring a clean, minimal design with smooth animations and responsive layouts. Built with modern web technologies to showcase artwork in an elegant gallery format.",
    image: "/images/michalB-project.png",
    alt: "Artist portfolio website built with Next.js and TailwindCSS",
    liveLink: "https://michalberco.netlify.app/",
    codeLink: undefined,
    tags: ["Next.js", "TailwindCSS"],
    role: "Developer",
    period: "TBD"
  },
  {
    title: "Better Together",
    description: "Custom landing page and portfolio for Ofir, a personal coach and soulful events organizer based in Tel Aviv. Built as a fully Hebrew RTL experience for women seeking personal development coaching and community events. Features a one-page scrolling layout with sections for coaching services, workshops, photo gallery, client testimonials, and contact. Includes a custom WCAG 2.1 AA accessibility widget and Decap CMS integration — so Ofir can update her own content, images, and events independently without touching code.",
    image: "/images/Ofir's-Landing-Page-IMG.png",
    alt: "Hebrew RTL landing page for personal coach Ofir — built with React, Vite, TailwindCSS, and Decap CMS with full WCAG 2.1 AA accessibility",
    liveLink: "https://betterhertogether.netlify.app/",
    codeLink: undefined,
    tags: ["React 18", "Vite", "TailwindCSS", "Framer Motion", "Decap CMS", "Netlify", "RTL"],
    role: "Full Stack Developer",
    period: "2026"
  }
] as const;

// ===== Main Projects Section - Horizontal Scroll =====
export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    const header = headerRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;

    if (!section || !wrapper || !container || !header || !title || !subtitle) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        [title, subtitle],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            once: true,
          },
        }
      );

      // Calculate the total width to scroll
      const getScrollAmount = () => {
        return container.scrollWidth - wrapper.offsetWidth;
      };

      // Horizontal scroll using xPercent for better scaling
      gsap.to(container, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

    }, section);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  // Robust resize handler with debounce
  useEffect(() => {
    let resizeTimeout: ReturnType<typeof setTimeout>;
    let lastWidth = window.innerWidth;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Only refresh if width actually changed (ignore height-only changes)
        if (Math.abs(window.innerWidth - lastWidth) > 10) {
          lastWidth = window.innerWidth;
          ScrollTrigger.refresh(true);
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', () => {
      setTimeout(() => ScrollTrigger.refresh(true), 200);
    });

    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="bg-[#0f0f0f] relative"
      style={{ overflow: "hidden", width: "100%" }}
    >
      {/* Header Section */}
      <div ref={headerRef} className="pt-20 pb-8 lg:pt-24 lg:pb-10">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <h2
            ref={titleRef}
            className="section-title text-white inline-block"
            style={{ opacity: 0 }}
          >
            Pro<span>j</span>ects
          </h2>
          <p
            ref={subtitleRef}
            className="mt-6 text-[1.5rem] sm:text-[1.6rem] text-gray-400 max-w-2xl mx-auto leading-relaxed"
            style={{ opacity: 0 }}
          >
            A selection of my recent work. Each project reflects my commitment to clean code and user-centered design.
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Wrapper - contains overflow */}
      <div 
        ref={wrapperRef}
        className="h-[calc(100vh-200px)] min-h-[450px] max-h-[700px] flex items-center"
        style={{ overflow: "hidden", width: "100%" }}
      >
        {/* Scrolling Container */}
        <div 
          ref={containerRef}
          className="flex items-center gap-6 sm:gap-8 pl-6 lg:pl-12"
        >
          {PROJECTS.map((project) => {
            return (
              <div
                key={project.title}
                className="shrink-0 w-[320px] sm:w-[400px] lg:w-[480px] xl:w-[540px] bg-[#141414] rounded-3xl overflow-hidden border border-gray-800/50"
                style={{
                  height: "auto",
                  maxHeight: "calc(100vh - 260px)",
                  minHeight: "380px",
                }}
              >
                <div className="flex flex-col h-full">
                  {/* Project Image */}
                  <div className="relative w-full aspect-video overflow-hidden shrink-0">
                    <a
                      href={project.liveLink}
                      target={project.liveLink ? "_blank" : undefined}
                      rel={project.liveLink ? "noopener noreferrer" : undefined}
                      className="block relative w-full h-full group"
                    >
                      <Image
                        src={project.image}
                        alt={project.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 540px"
                      />
                      {project.liveLink && (
                        <div className="absolute inset-0 bg-crimson/0 group-hover:bg-crimson/20 transition-colors duration-500 flex items-center justify-center">
                          <span className="text-white text-[1.2rem] sm:text-[1.4rem] font-medium uppercase tracking-[0.2rem] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-2">
                            <FaExternalLinkAlt />
                            View Live
                          </span>
                        </div>
                      )}
                    </a>
                  </div>

                  {/* Project Info */}
                  <div className="flex-1 p-4 sm:p-5 lg:p-6 flex flex-col overflow-hidden">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-crimson text-[1rem] sm:text-[1.1rem] uppercase tracking-[0.15rem] font-medium">
                        {project.role}
                      </span>
                      {project.period !== "TBD" && project.period !== "2026" && (
                        <span className="text-gray-500 text-[0.95rem] sm:text-[1rem]">
                          • {project.period}  
                        </span>
                      )}
                    </div>

                    <h3 className="text-[1.8rem] sm:text-[2.2rem] font-bold text-white mb-2 line-clamp-1">
                      {project.title}
                    </h3>

                    <p 
                      className="text-[1.2rem] sm:text-[1.3rem] text-gray-400 mb-3 leading-relaxed line-clamp-2 sm:line-clamp-3"
                      title={project.description}
                    >
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-[0.95rem] sm:text-[1rem] text-gray-300 rounded-full border border-gray-700 bg-gray-800/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="mt-auto pt-2">
                      {(project.liveLink) && (
                        <div className="flex items-center gap-4">
                          {project.liveLink && (
                            <a
                              href={project.liveLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-[1.1rem] sm:text-[1.2rem] text-white hover:text-crimson transition-colors duration-300"
                            >
                              <FaExternalLinkAlt className="text-crimson" />
                              Live Demo
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* End spacer - ensures last card is fully visible */}
          <div className="shrink-0 w-[calc(100vw-540px)] min-w-[60px]" />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-500 text-[1.2rem] uppercase tracking-[0.2rem] pointer-events-none">
        <span>Scroll</span>
        <span className="text-crimson ml-2">→</span>
      </div>
    </section>
  );
}
