"use client";
import { FaCode, FaPaintBrush, FaRocket, FaTools } from 'react-icons/fa';
import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

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

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    z: 0.1
  },
  visible: {
    opacity: 1,
    y: -0.01,
    z: 0.1,
    transition: {
      duration: 0.6,
      ease: [0.2, 0, 0.2, 1]
    }
  }
};

export default function Services() {
  return (
    <section
      id="services"
      className="py-[10rem] lg:py-[12rem] bg-[#0a0a0a] relative overflow-hidden isolate"
      style={{ marginTop: "-1px", paddingTop: "1px" }}
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-crimson/5 rounded-full blur-[200px]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header — isolated GPU layer */}
        <div
          className="text-center mb-16 lg:mb-20 isolate"
          style={{ perspective: 1000, transformStyle: "preserve-3d" }}
        >
          <motion.h2
            className="section-title text-white transform-gpu antialiased inline-block"
            style={{
              backfaceVisibility: "hidden",
              willChange: "transform, opacity",
              WebkitFontSmoothing: "antialiased",
            }}
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Serv<span>i</span>ces
          </motion.h2>
          <motion.p
            className="mt-6 text-[1.5rem] sm:text-[1.6rem] text-gray-400 max-w-2xl mx-auto leading-relaxed transform-gpu antialiased"
            style={{
              backfaceVisibility: "hidden",
              willChange: "transform, opacity",
              WebkitFontSmoothing: "antialiased",
            }}
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            I build modern, scalable applications with full-stack expertise and deliver pixel-perfect designs.
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card group p-8 rounded-2xl text-center flex flex-col items-center transform-gpu"
              style={{
                backfaceVisibility: "hidden",
                perspective: 1000,
              }}
              variants={cardVariants}
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
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
