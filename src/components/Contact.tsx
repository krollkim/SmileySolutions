"use client";
import { motion, Variants } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaWhatsapp, FaArrowRight } from 'react-icons/fa';

interface ContactCard {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string | undefined;
  clickable: boolean;
}

export default function Contact() {
  const contactCards: ContactCard[] = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: 'krollkimdev@gmail.com',
      href: 'mailto:krollkimdev@gmail.com',
      clickable: true
    },
    {
      icon: <FaPhone />,
      label: 'Phone',
      value: '+972 52-876-9566',
      href: 'tel:+972528769566',
      clickable: true
    },
    {
      icon: <FaMapMarkerAlt />,
      label: 'Location',
      value: 'Tel Aviv | Koh Phangan | Remote',
      href: undefined,
      clickable: false
    }
  ];

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.15,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <section id="contact" className="py-[12rem] bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-crimson/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-crimson/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.h2
            className="section-title text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Cont<span>a</span>ct
          </motion.h2>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 max-w-6xl mx-auto items-center">

          {/* LEFT SIDE - Bold CTA */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="lg:pr-8">
              <h3 className="text-[3rem] sm:text-[4rem] lg:text-[4.5rem] font-bold text-white leading-[1.1] mb-6">
                Ready to build
                <br />
                <span className="text-crimson">something amazing?</span>
              </h3>

              <p className="text-[1.6rem] sm:text-[1.8rem] text-gray-400 mb-10 leading-relaxed max-w-[450px]">
                I&apos;m currently available for freelance projects and full-time opportunities.
                Let&apos;s create something extraordinary together.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4 mb-10">
                <a
                  href="https://github.com/krollkim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-14 h-14 flex items-center justify-center rounded-full border border-gray-700 text-[2rem] text-gray-400 hover:border-crimson hover:text-crimson hover:bg-crimson/10 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/krollkimdev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-14 h-14 flex items-center justify-center rounded-full border border-gray-700 text-[2rem] text-gray-400 hover:border-crimson hover:text-crimson hover:bg-crimson/10 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://wa.me/972525890252?text=Hi%20Kim%2C%20I%20found%20your%20portfolio%20and%20I%27m%20interested%20in%20discussing%20a%20project%20opportunity."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-14 h-14 flex items-center justify-center rounded-full border border-gray-700 text-[2rem] text-gray-400 hover:border-crimson hover:text-crimson hover:bg-crimson/10 transition-all duration-300"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp />
                </a>
              </div>

              {/* CTA Button */}
              <a
                href="https://wa.me/972525890252?text=Hi%20Kim%2C%20I%20found%20your%20portfolio%20and%20I%27m%20interested%20in%20discussing%20a%20project%20opportunity."
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 px-8 py-4 text-[1.6rem] font-medium uppercase tracking-[0.2rem] text-white bg-crimson rounded-lg overflow-hidden transition-all duration-300 hover:bg-crimson/90 hover:gap-6"
              >
                <span>Get In Touch</span>
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>

          {/* RIGHT SIDE - Staggered Contact Cards */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="space-y-5">
              {contactCards.map((card, i) => {
                const cardContent = (
                  <>
                    <div className={`w-14 h-14 flex items-center justify-center rounded-xl bg-crimson/10 text-[2.2rem] text-crimson transition-all duration-300 ${
                      card.clickable ? 'group-hover:bg-crimson group-hover:text-white' : ''
                    }`}>
                      {card.icon}
                    </div>
                    <div>
                      <p className="text-[1.3rem] text-gray-500 uppercase tracking-wider mb-1">
                        {card.label}
                      </p>
                      <p className="text-[1.7rem] text-white font-medium">
                        {card.value}
                      </p>
                    </div>
                  </>
                );

                const cardClassName = `group flex items-center gap-6 p-6 rounded-2xl border border-gray-800 bg-linear-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm transition-all duration-300 ${
                  card.clickable ? 'hover:border-crimson/50 hover:bg-gray-800/50 cursor-pointer' : ''
                }`;

                return (
                  <motion.div
                    key={card.label}
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    style={{ marginLeft: i % 2 === 1 ? '30px' : '0' }}
                  >
                    {card.clickable && card.href ? (
                      <a href={card.href} className={cardClassName}>
                        {cardContent}
                      </a>
                    ) : (
                      <div className={cardClassName}>
                        {cardContent}
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Decorative Line */}
            <motion.div
              className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-[200px] bg-linear-to-b from-transparent via-crimson/30 to-transparent"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
