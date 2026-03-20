"use client";
import { useRef, useLayoutEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CaseStudyCardProps {
  title: string;
  challenge: string;
  result: string;
  image: string;
  imageAlt: string;
  liveLink: string;
  tags: string[];
  period?: string;
  challengeLabel: string;
  resultLabel: string;
  liveDemoLabel: string;
  index: number;
}

export default function CaseStudyCard({
  title,
  challenge,
  result,
  image,
  imageAlt,
  liveLink,
  tags,
  period,
  challengeLabel,
  resultLabel,
  liveDemoLabel,
  index,
}: CaseStudyCardProps) {
  const cardRef      = useRef<HTMLDivElement>(null);
  const imageWrapRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Card entry
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          delay: index * 0.12,
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 82%',
            once: true,
          },
        },
      );

      // Parallax: image moves upward as card scrolls through viewport
      gsap.to(imageWrapRef.current, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="border border-white/[0.06] bg-white/[0.015] group"
    >
      {/* Image — overflow-hidden clips the parallax travel */}
      <div className="relative w-full aspect-[16/9] overflow-hidden border-b border-white/[0.06]">
        <div ref={imageWrapRef} className="absolute inset-0 scale-[1.15]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-8 lg:p-10">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <h2 className="text-[2.4rem] lg:text-[2.8rem] font-bold text-white leading-tight">
              {title}
            </h2>
            {period && (
              <span className="text-[1.1rem] text-gray-600 font-mono tracking-[0.15rem]">
                {period}
              </span>
            )}
          </div>

          {/* Live Demo — crimson glow on hover */}
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5
                       border border-crimson/30 text-crimson text-[1.1rem]
                       uppercase tracking-[0.2rem] shrink-0
                       hover:bg-crimson/10 hover:border-crimson/60
                       hover:shadow-[0_0_22px_rgba(220,38,38,0.28)]
                       hover:scale-[1.04]
                       transition-all duration-300"
          >
            {liveDemoLabel}
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        {/* Problem / Solution two-column */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8">
          {/* Challenge */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-[1.5px] bg-crimson/60" aria-hidden="true" />
              <span className="text-[1.15rem] text-crimson uppercase tracking-[0.2rem] font-semibold">
                {challengeLabel}
              </span>
            </div>
            <p className="text-[1.35rem] text-gray-400 leading-relaxed">
              {challenge}
            </p>
          </div>

          {/* Result */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-[1.5px] bg-crimson/60" aria-hidden="true" />
              <span className="text-[1.15rem] text-crimson uppercase tracking-[0.2rem] font-semibold">
                {resultLabel}
              </span>
            </div>
            <p className="text-[1.35rem] text-gray-400 leading-relaxed">
              {result}
            </p>
          </div>
        </div>

        {/* Tags */}
        <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
          {tags.map((tag) => (
            <li
              key={tag}
              className="px-3 py-1 text-[1rem] text-crimson/80 rounded-full
                         border border-crimson/20 bg-crimson/5 tracking-wide"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
