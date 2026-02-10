"use client";
import { FaCode, FaPaintBrush, FaRocket, FaTools } from 'react-icons/fa';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

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
  return (
    <section id="services" className="py-[10rem] lg:py-[12rem] bg-[#0a0a0a] relative overflow-hidden" style={{ marginTop: "-1px", paddingTop: "1px" }}>
      {/* Background Glow — disabled for flicker stress test */}
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-crimson/5 rounded-full blur-[200px]" /> */}

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header — static, no animation */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="section-title text-white">
            Serv<span>i</span>ces
          </h2>
          <p className="mt-6 text-[1.5rem] sm:text-[1.6rem] text-gray-400 max-w-2xl mx-auto leading-relaxed">
            I build modern, scalable applications with full-stack expertise and deliver pixel-perfect designs.
          </p>
        </div>

        {/* Services Grid — STATIC-FIRST TEST: opacity-only fade, no transforms, no whileInView */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card group p-8 text-center flex flex-col items-center"
              style={{ transform: "translateZ(0)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.5, delay: index * 0.15 }}
            >
              {/* Icon */}
              <div className="mb-6 w-20 h-20 flex items-center justify-center bg-crimson/10 text-[3rem] text-crimson">
                {service.icon}
              </div>

              <h3 className="text-[2rem] font-semibold mb-4 text-white">
                {service.title}
              </h3>

              <p className="text-[1.4rem] text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
