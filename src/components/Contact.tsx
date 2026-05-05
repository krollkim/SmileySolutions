"use client";
import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaWhatsapp, FaCalendarAlt } from 'react-icons/fa';
import { useTranslations, useLocale } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

interface ContactCard {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string | undefined;
  clickable: boolean;
}

export default function Contact() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const isRTL = locale === 'he';

  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const rightContentRef = useRef<HTMLDivElement>(null);
  const contactCardsRef = useRef<HTMLDivElement[]>([]);
  const decorativeLineRef = useRef<HTMLDivElement>(null);

  const contactCards: ContactCard[] = [
    {
      icon: <FaEnvelope />,
      label: t('email_label'),
      value: 'krollkimdev@gmail.com',
      href: 'mailto:krollkimdev@gmail.com?subject=SmileySolutions%20Inquiry&body=Hi%20Kim!%20I%20found%20SmileySolutions%20and%20I%27m%20interested%20in%20your%20Full-Stack%20development%20services.%20Let%27s%20connect!',
      clickable: true,
    },
    {
      icon: <FaPhone />,
      label: t('phone_label'),
      value: '+972 52-876-9566',
      href: 'tel:+972528769566',
      clickable: true,
    },
    {
      icon: <FaMapMarkerAlt />,
      label: t('location_label'),
      value: t('location_value'),
      href: undefined,
      clickable: false,
    },
  ];

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
          overwrite: "auto",
          clearProps: "all",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
            anticipatePin: 1,
          },
        }
      );

      // Left content animation — in RTL this column is on the right, so slide from opposite edge
      gsap.fromTo(
        leftContentRef.current,
        { opacity: 0, x: isRTL ? 50 : -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          force3D: true,
          overwrite: "auto",
          clearProps: "all",
          scrollTrigger: {
            trigger: leftContentRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
            anticipatePin: 1,
          },
        }
      );

      // Right content animation — in RTL this column is on the left, so slide from opposite edge
      gsap.fromTo(
        rightContentRef.current,
        { opacity: 0, x: isRTL ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
          force3D: true,
          overwrite: "auto",
          clearProps: "all",
          scrollTrigger: {
            trigger: rightContentRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
            anticipatePin: 1,
          },
        }
      );

      // Contact cards stagger animation - using native GSAP stagger
      const validCards = contactCardsRef.current.filter(Boolean);
      if (validCards.length > 0) {
        gsap.fromTo(
          validCards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.15,
            delay: 0.2,
            ease: "power2.out",
            force3D: true,
            overwrite: "auto",
            clearProps: "all",
            scrollTrigger: {
              trigger: rightContentRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
              once: true,
              anticipatePin: 1,
            },
          }
        );
      }

      // Decorative line animation
      gsap.fromTo(
        decorativeLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 0.8,
          delay: 0.5,
          ease: "power2.out",
          force3D: true,
          overwrite: "auto",
          clearProps: "all",
          scrollTrigger: {
            trigger: rightContentRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
            anticipatePin: 1,
          },
        }
      );

    }, sectionRef);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      ctx.revert();
    };
  }, [isRTL]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-48 bg-[#0a0a0a] relative overflow-hidden"
      style={{
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-crimson/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-crimson/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20">
          <h2
            ref={titleRef}
            className="section-title text-white"
            style={{ opacity: 0, transform: "translateY(30px)" }}
          >
            {t.rich('title', { highlight: (chunks) => <span>{chunks}</span> })}
          </h2>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 max-w-6xl mx-auto items-center">

          {/* LEFT SIDE - Bold CTA */}
          <div
            ref={leftContentRef}
            className="w-full lg:w-1/2"
            style={{ opacity: 0, transform: isRTL ? "translateX(50px)" : "translateX(-50px)" }}
          >
            <div className="lg:pr-8">
              <h3 className="text-[3rem] sm:text-[4rem] lg:text-[4.5rem] font-bold text-white leading-[1.1] mb-6">
                {t('heading')}
                <br />
                <span className="text-crimson">{t('heading_accent')}</span>
              </h3>

              <p className="text-[1.6rem] sm:text-[1.8rem] text-gray-400 mb-10 leading-relaxed max-w-[450px]">
                {t('subtext')}
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
                  href={`https://wa.me/972525890252?text=${encodeURIComponent(t('whatsapp_text'))}`}
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
                href="https://calendar.app.google/i5TALc1oJahNDeRw8"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('book_aria')}
                className="inline-flex items-center gap-4 px-8 py-4 text-[1.6rem] font-medium uppercase tracking-[0.2rem] text-white bg-crimson rounded-lg hover:bg-crimson/85 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
              >
                <FaCalendarAlt className="text-[1.8rem]" />
                <span>{t('book_cta')}</span>
              </a>
            </div>
          </div>

          {/* RIGHT SIDE - Staggered Contact Cards */}
          <div
            ref={rightContentRef}
            className="w-full lg:w-1/2"
            style={{ opacity: 0, transform: isRTL ? "translateX(-50px)" : "translateX(50px)" }}
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
                      {/* Phone numbers (index 1) start with + and digits — all neutral
                          Unicode characters. In RTL context they inherit the paragraph
                          direction and can display reversed. dir="ltr" locks them LTR. */}
                      <p className="text-[1.7rem] text-white font-medium" dir={i === 1 ? 'ltr' : undefined}>
                        {card.value}
                      </p>
                    </div>
                  </>
                );

                const cardClassName = `group flex items-center gap-6 p-6 rounded-2xl border border-gray-800 bg-gray-900/80 transition-all duration-300 ${
                  card.clickable ? 'hover:border-crimson/50 hover:bg-gray-800/70 cursor-pointer' : ''
                }`;

                return (
                  <div
                    key={card.label}
                    ref={(el) => { if (el) contactCardsRef.current[i] = el; }}
                    className={i % 2 === 1 ? (isRTL ? 'lg:mr-[30px]' : 'lg:ml-[30px]') : ''}
                    style={{
                      opacity: 0,
                      transform: "translateY(30px) translateZ(0)",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    {card.clickable && card.href ? (
                      <a href={card.href} className={cardClassName} aria-label={`${t('contact_via')} ${card.label}`}>
                        {cardContent}
                      </a>
                    ) : (
                      <div className={cardClassName}>
                        {cardContent}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Decorative Line */}
            <div
              ref={decorativeLineRef}
              className="hidden lg:block absolute ltr:right-0 rtl:left-0 top-1/2 -translate-y-1/2 w-px h-[200px] bg-linear-to-b from-transparent via-crimson/30 to-transparent"
              style={{ transform: "translateY(-50%) scaleY(0)", transformOrigin: "center" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
