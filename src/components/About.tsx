"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaWhatsapp, FaDownload } from 'react-icons/fa';

export default function About() {
  const skills = ['React', 'Next.js', 'TypeScript', 'Node.js', 'TailwindCSS', 'MongoDB', 'Docker', 'AWS'];

  return (
    <section id="about" className="py-[10rem] lg:py-[12rem] bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-crimson/5 rounded-full blur-[200px]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-white">
            Abo<span>u</span>t Me
          </h2>
        </motion.div>

        {/* Content Container */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Profile Image with Crimson Offset Border */}
          <motion.div
            className="w-full lg:w-2/5 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              {/* Crimson offset border frame */}
              <motion.div
                className="absolute w-full h-full border-[4px] border-crimson rounded-2xl z-0"
                style={{ left: '-20px', top: '20px' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
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
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="w-full lg:w-3/5"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-[1.8rem] sm:text-[2.2rem] font-bold text-white mb-2 whitespace-nowrap">
              SMILEYSOLUTIONS | KIM KROLL
            </h3>

            <p className="text-[1.4rem] text-crimson uppercase tracking-[0.5rem] mb-6">
              Digital Nomad · Remote
            </p>

            <div className="w-16 h-[3px] bg-crimson mb-6 rounded-full" />

            <p className="text-[1.5rem] sm:text-[1.6rem] text-gray-300 leading-relaxed mb-8">
              I&apos;m a Full-Stack Developer working remotely, focused on building production-ready
              web applications. I&apos;ve worked on SaaS frontends (React/Next.js), improving UI structure,
              reliability, and code quality through reviews and testing. On the backend and infrastructure
              side, I build APIs and ship deployments with Docker and AWS.
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
                href="https://wa.me/972525890252?text=Hi%20Kim%2C%20I%20found%20your%20portfolio%20and%20I%27m%20interested%20in%20discussing%20a%20project%20opportunity."
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
              className="inline-flex items-center gap-3 px-6 py-3 text-[1.4rem] font-medium uppercase tracking-[0.2rem] text-white border-2 border-crimson rounded-lg hover:bg-crimson transition-all duration-300"
            >
              <FaDownload />
              Download CV
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
