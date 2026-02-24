"use client";
import { useRef, useLayoutEffect } from 'react';
import { FaCode, FaPaintBrush, FaRocket, FaTools } from 'react-icons/fa';
import { ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  title: string;
  icon: ReactNode;
  description: string;
}

const services: Service[] = [
  {
    title: "Full Stack",
    icon: <FaCode />,
    description: "Building dynamic applications with React, Node.js/Express, and MongoDB for seamless full-stack solutions."
  },
  {
    title: "Web Design",
    icon: <FaPaintBrush />,
    description: "Crafting responsive, visually stunning designs using TailwindCSS, MaterialUI, Figma, and modern UI principles."
  },
  {
    title: "Deployment",
    icon: <FaRocket />,
    description: "Expert deployment via Vercel and Netlify with CI/CD automation using GitHub Actions."
  },
  {
    title: "Technologies",
    icon: <FaTools />,
    description: "Proficient in TypeScript, Next.js, and WordPress. Experienced with ClickUp, Slack, and agile workflows."
  }
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Header animations
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      headerTl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          force3D: true,
          clearProps: "all",
        }
      ).fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          force3D: true,
          clearProps: "all",
        },
        "-=0.4"
      );

      // Cards animation with stagger
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          force3D: true,
          clearProps: "all",
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

    }, sectionRef);

    return () => {
      // Cleanup ScrollTrigger instances to prevent memory leaks
      ScrollTrigger.getAll().forEach(t => t.kill());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-40 lg:py-48 bg-[#0a0a0a] relative overflow-hidden isolate"
      style={{ marginTop: "-1px", paddingTop: "1px" }}
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-crimson/5 rounded-full blur-[200px]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="text-center mb-16 lg:mb-20 isolate"
        >
          <h2
            ref={titleRef}
            className="section-title text-white antialiased inline-block"
            style={{ opacity: 0, transform: "translateY(30px)" }}
          >
            Serv<span>i</span>ces
          </h2>
          <p
            ref={subtitleRef}
            className="mt-6 text-[1.5rem] sm:text-[1.6rem] text-gray-400 max-w-2xl mx-auto leading-relaxed antialiased"
            style={{ opacity: 0, transform: "translateY(30px)" }}
          >
            I build modern, scalable applications with full-stack expertise and deliver pixel-perfect designs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              className="service-card group p-8 rounded-2xl text-center flex flex-col items-center"
              style={{ opacity: 0, transform: "translateY(40px)" }}
            >
              {/* Icon */}
              <div className="mb-6 w-20 h-20 flex items-center justify-center rounded-2xl bg-crimson/10 text-[3rem] text-crimson transition-all duration-300 group-hover:bg-crimson group-hover:text-white group-hover:scale-110">
                {service.icon}
              </div>

              <h3 className="text-[2rem] font-semibold mb-4 text-white group-hover:text-crimson transition-colors duration-300">
                {service.title}
              </h3>

              <p className="text-[1.4rem] text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
