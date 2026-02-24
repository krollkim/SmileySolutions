"use client";
import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

// ===== PROJECT DATA - Based on verified facts =====
const PROJECTS = [
  {
    title: "Yup.io",
    description: "Contributed to the evolution of Yup.io, a growing SaaS platform, by redesigning the core architecture to transition the site into a high-performance web application. I specialized in delivering a production-ready frontend by refactoring legacy components into a modern React and TailwindCSS framework, significantly improving site speed and maintainability. Working within a dynamic team, I ensured software reliability through rigorous unit testing, while collaborating closely with designers via Figma to maintain high visual standards. My focus was on optimizing the codebase through consistent refactoring and code reviews to meet the scaling needs of the application.",
    image: "/images/YupIO-project.png",
    alt: "Yup.io SaaS platform interface designed in Figma and built with React and TailwindCSS",
    liveLink: "https://yup.io/",
    codeLink: undefined,
    tags: ["React", "TailwindCSS", "SaaS", "Figma", "Testing"],
    role: "Frontend Web Developer",
    period: "2023–2024"
  },
  {
    title: "Bullshit Map",
    description: "Full-stack platform transforming NFC interactions into a global map. Built with Next.js 15, React 19, and MapboxGL on the frontend. Backend powered by Node/Express/TypeScript with MongoDB 6 geospatial queries and Cloudinary. Includes admin dashboard with RBAC. Deployed via Docker/Traefik/GitHub Actions on AWS EC2 + Route53.",
    image: "/images/Bullshit-project.png",
    alt: "Full-stack geospatial web application built with Next.js, MapboxGL, and Node.js, deployed on AWS with Docker",
    liveLink: "https://globaloriginalart.com/",
    codeLink: undefined,
    tags: ["Next.js 15", "React 19", "MapboxGL", "Node.js", "MongoDB", "AWS", "Docker"],
    role: "Full Stack & DevOps",
    period: "TBD"
  },
  {
    title: "Michal B",
    description: "Portfolio website for an artist. Additional details TBD.",
    image: "/images/michalB-project.png",
    alt: "Artist portfolio website built with Next.js and TailwindCSS featuring responsive design",
    liveLink: "https://michalberco.netlify.app/",
    codeLink: undefined,
    tags: ["Next.js", "TailwindCSS"],
    role: "Developer",
    period: "TBD"
  }
] as const;

// ===== ProjectCard with GSAP ScrollTrigger =====
interface ProjectCardProps {
  project: typeof PROJECTS[number];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isEven = index % 2 === 0;

  useLayoutEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 50,
          rotateZ: 0.01,
        },
        {
          opacity: 1,
          y: 0,
          rotateZ: 0,
          duration: 0.7,
          ease: "power2.out",
          force3D: true,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none none",
            once: true,
          },
          clearProps: "all",
        }
      );
    }, card);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 lg:gap-16`}
      style={{
        opacity: 0,
        transform: "translateY(50px) rotateZ(0.01deg)",
        willChange: "transform, opacity",
      }}
    >
      {/* Project Image */}
      <div className="w-full lg:w-[55%] group">
        <a
          href={project.liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative aspect-[16/10] rounded-2xl overflow-hidden bg-gray-900 shadow-2xl shadow-black/50"
        >
          <Image
            src={project.image}
            alt={project.alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-crimson/0 group-hover:bg-crimson/20 transition-colors duration-500 flex items-center justify-center">
            <span className="text-white text-[1.6rem] font-medium uppercase tracking-[0.3rem] opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 flex items-center gap-3">
              <FaExternalLinkAlt />
              View Live
            </span>
          </div>
          {/* Border Glow Effect */}
          <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-crimson/30 transition-colors duration-500 pointer-events-none" />
        </a>
      </div>

      {/* Project Info */}
      <div className={`w-full lg:w-[45%] ${isEven ? 'lg:pl-4' : 'lg:pr-4'}`}>
        {/* Role & Period Badge */}
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-crimson text-[1.3rem] uppercase tracking-[0.3rem] font-medium">
            {project.role}
          </span>
          {project.period !== "TBD" && (
            <span className="text-gray-500 text-[1.2rem]">
              • {project.period}
            </span>
          )}
        </div>

        <h3 className="text-[2.8rem] sm:text-[3.2rem] font-bold text-white mb-5">
          {project.title}
        </h3>

        <p className="text-[1.5rem] sm:text-[1.6rem] text-gray-400 mb-6 leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 text-[1.2rem] text-gray-300 rounded-full border border-gray-700 bg-gray-800/50"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-[1.4rem] text-white hover:text-crimson transition-colors duration-300 group/link"
          >
            <FaExternalLinkAlt className="text-crimson" />
            <span className="relative">
              Live Demo
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-crimson group-hover/link:w-full transition-all duration-300" />
            </span>
          </a>
          {project.codeLink && (
            <a
              href={project.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[1.4rem] text-white hover:text-crimson transition-colors duration-300 group/link"
            >
              <FaGithub className="text-crimson" />
              <span className="relative">
                Source Code
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-crimson group-hover/link:w-full transition-all duration-300" />
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ===== Main Projects Section =====
export default function Projects() {
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const header = headerRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    if (!header || !title || !subtitle) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      tl.fromTo(
        title,
        { opacity: 0, y: 30, rotateZ: 0.01 },
        { 
          opacity: 1, 
          y: 0, 
          rotateZ: 0, 
          duration: 0.6, 
          ease: "power2.out",
          force3D: true,
          clearProps: "all",
        }
      ).fromTo(
        subtitle,
        { opacity: 0, y: 30, rotateZ: 0.01 },
        { 
          opacity: 1, 
          y: 0, 
          rotateZ: 0, 
          duration: 0.6, 
          ease: "power2.out",
          force3D: true,
          clearProps: "all",
        },
        "-=0.4"
      );
    }, header);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="py-40 lg:py-48 bg-[#0f0f0f] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-800 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-800 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16 lg:mb-20">
          <h2
            ref={titleRef}
            className="section-title text-white inline-block"
            style={{ opacity: 0, transform: "translateY(30px)" }}
          >
            Pro<span>j</span>ects
          </h2>
          <p
            ref={subtitleRef}
            className="mt-6 text-[1.5rem] sm:text-[1.6rem] text-gray-400 max-w-2xl mx-auto leading-relaxed"
            style={{ opacity: 0, transform: "translateY(30px)" }}
          >
            A selection of my recent work. Each project reflects my commitment to clean code and user-centered design.
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-20 lg:space-y-32">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
