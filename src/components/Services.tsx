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
    // 2026 Premium 3D transforms - enhanced wobble, depth, and layered overlap
    const cardTransforms = [
      {
        // Card 1: Drifts up, overlaps right, clockwise wobble
        from: { y: 45, x: 25, rotation: 4, scale: 0.93 },
        to: { y: -45, x: -20, rotation: -4, scale: 1.05 },
      },
      {
        // Card 2: Drifts down, overlaps left, counter-clockwise wobble
        from: { y: -50, x: -30, rotation: -5, scale: 0.92 },
        to: { y: 50, x: 25, rotation: 5, scale: 1.06 },
      },
      {
        // Card 3: Large vertical drift, subtle overlap, gentle wobble
        from: { y: 60, x: 20, rotation: 3.5, scale: 0.91 },
        to: { y: -60, x: -15, rotation: -3.5, scale: 1.07 },
      },
      {
        // Card 4: Opposite direction, strong overlap, dramatic wobble
        from: { y: -40, x: -25, rotation: -4.5, scale: 0.94 },
        to: { y: 40, x: 30, rotation: 4.5, scale: 1.05 },
      },
    ];

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
        },
        "-=0.4"
      );

      // Cards entry animation with stagger (opacity only)
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          force3D: true,
          scrollTrigger: {
            trigger: cardsRef.current[0],
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );

      // 2026 Premium 3D scroll-scrub floating effect
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const transform = cardTransforms[index] || cardTransforms[0];

        // Main 3D floating animation
        gsap.fromTo(
          card,
          {
            y: transform.from.y,
            x: transform.from.x,
            rotation: transform.from.rotation,
            scale: transform.from.scale,
          },
          {
            y: transform.to.y,
            x: transform.to.x,
            rotation: transform.to.rotation,
            scale: transform.to.scale,
            ease: "sine.inOut",
            force3D: true,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 2.5,
            },
          }
        );

        // Dynamic z-index based on scale for proper layering
        gsap.to(card, {
          zIndex: index % 2 === 0 ? 2 : 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 2.5,
            onUpdate: (self) => {
              const progress = self.progress;
              const centerDistance = Math.abs(progress - 0.5);
              card.style.zIndex = centerDistance < 0.2 ? '3' : (index % 2 === 0 ? '2' : '1');
            },
          },
        });
      });

    }, sectionRef);

    return () => {
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
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          style={{ perspective: "1000px" }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => { if (el) cardsRef.current[index] = el; }}
              className="service-card p-8 rounded-2xl text-center flex flex-col items-center"
              style={{
                opacity: 0,
                transform: "translateZ(0)",
                willChange: "transform, opacity",
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Icon */}
              <div className="mb-6 w-20 h-20 flex items-center justify-center rounded-2xl bg-crimson/10 text-[3rem] text-crimson">
                {service.icon}
              </div>

              <h3 className="text-[2rem] font-semibold mb-4 text-white">
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
