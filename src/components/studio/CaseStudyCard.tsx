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
  const cardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
          delay: index * 0.1,
          clearProps: 'transform',
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 85%',
            once: true,
          },
        },
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group flex flex-col sm:flex-row border border-white/[0.06] rounded-xl overflow-hidden
                 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50 transition-all duration-300"
      style={{ opacity: 0 }}
    >
      {/* Thumbnail — small, crops from top, masks any pixelation */}
      <div className="relative w-full h-[180px] sm:w-[210px] sm:h-auto sm:self-stretch shrink-0 overflow-hidden bg-[#111]">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, 210px"
          className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
          draggable={false}
        />
        {/* Right-edge fade on desktop blends thumbnail into content */}
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/70" />
      </div>

      {/* Content */}
      <div className="flex-1 p-6 lg:p-8 flex flex-col min-w-0">

        {/* Title + Live Demo */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h2 className="text-[1.8rem] lg:text-[2rem] font-bold text-white leading-tight">
              {title}
            </h2>
            {period && (
              <span className="text-[1rem] text-gray-400 font-mono tracking-[0.1rem] mt-0.5 block">
                {period}
              </span>
            )}
          </div>

          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${liveDemoLabel} — ${title}`}
            className="shrink-0 flex items-center gap-1.5 text-[1.1rem] text-crimson
                       uppercase tracking-[0.15rem] hover:text-white transition-colors duration-300"
          >
            <span>{liveDemoLabel}</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        {/* Challenge / Result — line-clamped to keep cards compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 flex-1">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[1.5px] bg-crimson/60 shrink-0" aria-hidden="true" />
              <span className="text-[1rem] text-crimson uppercase tracking-[0.15rem] font-semibold">
                {challengeLabel}
              </span>
            </div>
            <p className="text-[1.3rem] text-gray-400 leading-relaxed line-clamp-3">
              {challenge}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-5 h-[1.5px] bg-crimson/60 shrink-0" aria-hidden="true" />
              <span className="text-[1rem] text-crimson uppercase tracking-[0.15rem] font-semibold">
                {resultLabel}
              </span>
            </div>
            <p className="text-[1.3rem] text-gray-400 leading-relaxed line-clamp-3">
              {result}
            </p>
          </div>
        </div>

        {/* Tech stack — plain dot-separated, sits at the bottom */}
        <p className="text-[1.1rem] text-gray-400 tracking-wide mt-auto">
          {tags.join(' · ')}
        </p>

      </div>
    </div>
  );
}
