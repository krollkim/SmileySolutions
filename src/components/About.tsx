"use client";
import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaLinkedin, FaWhatsapp, FaDownload } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageBorderRef = useRef<HTMLDivElement>(null);
  const textContentRef = useRef<HTMLDivElement>(null);

  const skills = ['React', 'Next.js', 'TypeScript', 'Node.js', 'TailwindCSS', 'MongoDB', 'Docker', 'AWS'];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          force3D: true,
          clearProps: "all",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Profile image animation
      gsap.fromTo(
        imageContainerRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          force3D: true,
          clearProps: "all",
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Crimson border animation (delayed)
      gsap.fromTo(
        imageBorderRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          delay: 0.3,
          ease: "power2.out",
          force3D: true,
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // Text content animation
      gsap.fromTo(
        textContentRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
          force3D: true,
          clearProps: "all",
          scrollTrigger: {
            trigger: textContentRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

    }, sectionRef);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-40 lg:py-48 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-crimson/5 rounded-full blur-[200px]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="text-center mb-16 lg:mb-20"
        >
          <h2
            ref={titleRef}
            className="section-title text-white"
            style={{ opacity: 0, transform: "translateY(30px)" }}
          >
            Abo<span>u</span>t Me
          </h2>
        </div>

        {/* Content Container */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Profile Image with Crimson Offset Border */}
          <div
            ref={imageContainerRef}
            className="w-full lg:w-2/5 flex justify-center"
            style={{ opacity: 0, transform: "scale(0.9)" }}
          >
            <div className="relative">
              {/* Crimson offset border frame */}
              <div
                ref={imageBorderRef}
                className="absolute w-full h-full border-[4px] border-crimson rounded-2xl z-0"
                style={{ left: '-20px', top: '20px', opacity: 0 }}
              />
              {/* Image container */}
              <div className="relative z-10 w-[260px] sm:w-[300px] h-[320px] sm:h-[380px] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
                <Image
                  src="/images/profile_picture_portfolio.png"
                  alt="Kim Kroll - Full Stack Developer professional headshot"
                  fill
                  className="object-cover"
                  sizes="300px"
                  priority
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div
            ref={textContentRef}
            className="w-full lg:w-3/5"
            style={{ opacity: 0, transform: "translateX(50px)" }}
          >
            <h3 className="text-[1.8rem] sm:text-[2.2rem] font-bold text-white mb-2 whitespace-nowrap">
              SMILEYSOLUTIONS | KIM KROLL
            </h3>

            <p className="text-[1.4rem] text-crimson uppercase tracking-[0.5rem] mb-6">
              Digital Nomad · Remote
            </p>

            <div className="w-16 h-[3px] bg-crimson mb-6 rounded-full" />

            <p className="text-[1.5rem] sm:text-[1.6rem] text-gray-300 leading-relaxed mb-4">
              I&apos;m a Full-Stack Developer working remotely, focused on building production-ready
              web applications. I&apos;ve worked on SaaS frontends (React/Next.js), improving UI structure,
              reliability, and code quality through reviews and testing. On the backend and infrastructure
              side, I build APIs and ship deployments with Docker and AWS.
            </p>

            <p className="text-[1.4rem] sm:text-[1.5rem] text-gray-400 italic leading-relaxed mb-8">
              Currently deepening my knowledge of scalable architecture patterns to help
              SaaS platforms handle rapid user growth and complex data states.
            </p>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 text-[1.2rem] text-crimson rounded-full border border-crimson/30 bg-crimson/5"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-5 mb-8">
              <a
                href="https://github.com/krollkim"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-700 text-[1.8rem] text-gray-400 hover:border-crimson hover:text-crimson hover:bg-crimson/10 transition-all duration-300"
                aria-label="GitHub Profile"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/krollkimdev/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-700 text-[1.8rem] text-gray-400 hover:border-crimson hover:text-crimson hover:bg-crimson/10 transition-all duration-300"
                aria-label="LinkedIn Profile"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://wa.me/972525890252?text=Hi%20Kim!%20I%20found%20SmileySolutions%20and%20I'm%20interested%20in%20your%20Full-Stack%20development%20services.%20Let's%20connect!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-700 text-[1.8rem] text-gray-400 hover:border-crimson hover:text-crimson hover:bg-crimson/10 transition-all duration-300"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>

            {/* Download CV Button */}
            <a
              href="/CV-KIM-KROLL-2025.pdf"
              download
              aria-label="Download Kim Kroll CV"
              className="inline-flex items-center gap-3 px-6 py-3 text-[1.4rem] font-medium uppercase tracking-[0.2rem] text-white border-2 border-crimson rounded-lg hover:bg-crimson transition-all duration-300"
            >
              <FaDownload />
              Download CV
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
