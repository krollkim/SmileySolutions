"use client";
import { useRef, useLayoutEffect, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { useTranslations } from 'next-intl';

gsap.registerPlugin(ScrollTrigger);

// Auto-scroll speed: 0.3 px per frame ≈ 18 px/s at 60 fps - deliberately subtle
const SPEED = 0.3;
// Number of unique projects - kept at module level so useLayoutEffect deps stay stable
const PROJECT_COUNT = 4;

export default function Projects() {
  const t = useTranslations('projects');

  const PROJECTS = [
    {
      title: "Yup.io",
      description: t('yup_desc'),
      image: "/images/YupIO-project.png",
      alt: t('yup_alt'),
      liveLink: "https://yup.io/",
      tags: ["React", "TailwindCSS", "SaaS", "Figma"],
      role: t('yup_role'),
      period: "2023–2024",
    },
    {
      title: "Bullshit Map",
      description: t('bullshit_desc'),
      image: "/images/Bullshit-project.png",
      alt: t('bullshit_alt'),
      liveLink: "https://globaloriginalart.com/",
      tags: ["Next.js 15", "MapboxGL", "Node.js", "AWS"],
      role: t('bullshit_role'),
      period: "TBD",
    },
    {
      title: "Michal B",
      description: t('michal_desc'),
      image: "/images/michalB-project.png",
      alt: t('michal_alt'),
      liveLink: "https://michalberco.netlify.app/",
      tags: ["Next.js", "TailwindCSS"],
      role: t('michal_role'),
      period: "TBD",
    },
    {
      title: "Better Together",
      description: t('better_desc'),
      image: "/images/Ofir's-Landing-Page-IMG.png",
      alt: t('better_alt'),
      liveLink: "https://betterhertogether.netlify.app/",
      tags: ["React 18", "Vite", "TailwindCSS", "Framer Motion", "Decap CMS", "Netlify", "RTL"],
      role: t('better_role'),
      period: "2026",
    },
  ];

  // DOM refs
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);

  // Carousel state - refs so updates never trigger re-renders
  const offsetRef          = useRef(0);     // current translation in px
  const singleSetWidthRef  = useRef(0);     // width of one duplicated set
  const isHoveredRef       = useRef(false);
  const isDraggingRef      = useRef(false);
  const hasCapturedRef     = useRef(false);
  const wasDraggingRef     = useRef(false); // true when a real horizontal drag occurred this gesture
  const dragStartXRef      = useRef(0);
  const dragStartYRef      = useRef(0);
  const dragStartOffsetRef = useRef(0);

  // ─── GSAP: header entrance + ticker-based auto-scroll ───────────────────────
  useLayoutEffect(() => {
    const section  = sectionRef.current;
    const header   = headerRef.current;
    const title    = titleRef.current;
    const subtitle = subtitleRef.current;
    const track    = trackRef.current;
    if (!section || !header || !title || !subtitle || !track) return;

    // Header fade-in - scoped ScrollTrigger (no pin, no scrub)
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [title, subtitle],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, section);

    // Measure one full set so we know the seamless reset point.
    // We use the distance between card[0] and card[PROJECTS.length] via
    // getBoundingClientRect() rather than scrollWidth/2, because scrollWidth
    // does not account for gap/padding variations and may drift by tens of px.
    // This approach gives us the exact pixel distance to the start of the
    // duplicated set, guaranteeing a frame-perfect invisible loop.
    const measureTrack = () => {
      const firstCard      = track.children[0] as HTMLElement | undefined;
      const secondSetFirst = track.children[PROJECT_COUNT] as HTMLElement | undefined;
      if (firstCard && secondSetFirst) {
        const dist = secondSetFirst.getBoundingClientRect().left
                   - firstCard.getBoundingClientRect().left;
        if (dist > 0) singleSetWidthRef.current = dist;
      }
    };
    const measureTimer = setTimeout(measureTrack, 150);
    const ro = new ResizeObserver(measureTrack);
    ro.observe(section);

    // Ticker: increment offset each frame, reset silently at set boundary
    const tick = () => {
      if (isHoveredRef.current || isDraggingRef.current) return;
      const setWidth = singleSetWidthRef.current;
      if (setWidth === 0) return;

      offsetRef.current += SPEED;
      if (offsetRef.current >= setWidth) {
        offsetRef.current -= setWidth;
      }
      gsap.set(track, { x: -offsetRef.current, force3D: true });
    };

    gsap.ticker.add(tick);

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      ro.disconnect();
      clearTimeout(measureTimer);
    };
  }, []);

  // ─── Pointer drag handlers ───────────────────────────────────────────────────
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current  = false;
      hasCapturedRef.current = false;
      wasDraggingRef.current = false;
      dragStartXRef.current  = e.clientX;
      dragStartYRef.current  = e.clientY;
      dragStartOffsetRef.current = offsetRef.current;
    };

    const onPointerMove = (e: PointerEvent) => {
      const deltaX = e.clientX - dragStartXRef.current;
      const deltaY = e.clientY - dragStartYRef.current;

      // Gesture intent detection - wait for ≥8 px of movement
      if (!isDraggingRef.current && !hasCapturedRef.current) {
        if (Math.abs(deltaX) < 8 && Math.abs(deltaY) < 8) return;

        if (Math.abs(deltaX) >= Math.abs(deltaY)) {
          // Horizontal intent - claim the pointer for carousel drag
          isDraggingRef.current  = true;
          hasCapturedRef.current = true;
          wasDraggingRef.current = true; // flag so the click handler can cancel it
          track.setPointerCapture(e.pointerId);
          track.style.cursor = 'grabbing';
        } else {
          // Vertical intent - let the browser handle page scroll
          hasCapturedRef.current = true;
          return;
        }
      }

      if (!isDraggingRef.current) return;

      const setWidth = singleSetWidthRef.current;
      if (setWidth === 0) return;

      // Dragging left (negative deltaX) increases offset → cards move left
      let next = dragStartOffsetRef.current - deltaX;
      // Keep offset in [0, setWidth) for seamless looping
      next = ((next % setWidth) + setWidth) % setWidth;
      offsetRef.current = next;
      gsap.set(track, { x: -next, force3D: true });
    };

    const onPointerUp = (e: PointerEvent) => {
      if (isDraggingRef.current) {
        track.releasePointerCapture(e.pointerId);
        track.style.cursor = 'grab';
      }
      isDraggingRef.current  = false;
      hasCapturedRef.current = false;
      // Explicitly reset hover state: mouseleave is suppressed during pointer
      // capture, so isHoveredRef can remain true after a drag ends if the cursor
      // stays inside the container - this would prevent auto-scroll from resuming.
      isHoveredRef.current = false;
    };

    // Capture-phase click handler: if a horizontal drag just ended, the browser
    // still fires a click on whatever <a> element the pointer is over. Block it
    // for one event cycle, then reset the flag so normal clicks work again.
    const onClickCapture = (e: MouseEvent) => {
      if (wasDraggingRef.current) {
        e.stopPropagation();
        e.preventDefault();
        wasDraggingRef.current = false;
      }
    };

    track.addEventListener('pointerdown',   onPointerDown);
    track.addEventListener('pointermove',   onPointerMove);
    track.addEventListener('pointerup',     onPointerUp);
    track.addEventListener('pointercancel', onPointerUp);
    // useCapture=true ensures this fires before any bubbling click handlers on <a> links
    track.addEventListener('click', onClickCapture, true);

    return () => {
      track.removeEventListener('pointerdown',   onPointerDown);
      track.removeEventListener('pointermove',   onPointerMove);
      track.removeEventListener('pointerup',     onPointerUp);
      track.removeEventListener('pointercancel', onPointerUp);
      track.removeEventListener('click', onClickCapture, true);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="bg-[#0f0f0f] py-20 lg:py-28"
    >
      {/* ── Section header ──────────────────────────────────────────────────── */}
      <div ref={headerRef} className="container mx-auto px-6 lg:px-12 text-center mb-12 lg:mb-16">
        <h2
          ref={titleRef}
          className="section-title text-white inline-block"
          style={{ opacity: 0 }}
        >
          {t.rich('title', { highlight: (chunks) => <span>{chunks}</span> })}
        </h2>
        <p
          ref={subtitleRef}
          className="mt-6 text-[1.5rem] sm:text-[1.6rem] text-gray-400 max-w-2xl mx-auto leading-relaxed"
          style={{ opacity: 0 }}
        >
          {t('subtitle')}
        </p>
      </div>

      {/* ── Carousel viewport ───────────────────────────────────────────────── */}
      {/* dir="ltr" prevents RTL page context from anchoring overflow to the right,
          which would cause the track to start from the wrong end in Hebrew mode. */}
      <div
        dir="ltr"
        className="relative overflow-x-hidden"
        onMouseEnter={() => { isHoveredRef.current = true;  }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
      >
        {/* Edge fades - visual cue that more content exists beyond the frame */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24
                     bg-linear-to-r from-[#0f0f0f] to-transparent z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24
                     bg-linear-to-l from-[#0f0f0f] to-transparent z-10"
        />

        {/* Track - direction forced to LTR so card order is always intentional,
            independent of the page locale (he/en). The card content itself
            inherits the page dir for text rendering. */}
        <div
          ref={trackRef}
          className="flex gap-6 sm:gap-8 py-4 pl-8"
          style={{
            willChange:   'transform',
            cursor:       'grab',
            width:        'max-content',
            direction:    'ltr',
            userSelect:   'none',
            touchAction:  'pan-y',   // vertical scroll stays native on touch
          }}
        >
          {/* Duplicate the array once - the invisible seam creates the loop */}
          {[...PROJECTS, ...PROJECTS].map((project, index) => (
            <div
              key={`${project.title}-${index}`}
              className="shrink-0 w-[320px] sm:w-[400px] lg:w-[480px] xl:w-[520px]
                         bg-[#141414] rounded-3xl overflow-hidden
                         border border-gray-800/50 flex flex-col"
              style={{ minHeight: '420px' }}
            >
              {/* Project image */}
              <div className="relative w-full aspect-video overflow-hidden shrink-0">
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative w-full h-full group"
                  tabIndex={0}
                  draggable={false}
                >
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    draggable={false}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 520px"
                  />
                  <div className="absolute inset-0 bg-crimson/0 group-hover:bg-crimson/20
                                  transition-colors duration-500
                                  flex items-center justify-center">
                    <span className="text-white text-[1.2rem] sm:text-[1.4rem] font-medium
                                     uppercase tracking-[0.2rem]
                                     opacity-0 group-hover:opacity-100
                                     transition-all duration-500
                                     flex items-center gap-2">
                      <FaExternalLinkAlt />
                      {t('view_live_hover')}
                    </span>
                  </div>
                </a>
              </div>

              {/* Project info */}
              <div className="flex-1 p-4 sm:p-5 lg:p-6 flex flex-col overflow-hidden">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-crimson text-[1rem] sm:text-[1.1rem]
                                   uppercase tracking-[0.15rem] font-medium">
                    {project.role}
                  </span>
                  {project.period !== "TBD" && project.period !== "2026" && (
                    <span className="text-gray-500 text-[0.95rem] sm:text-[1rem]">
                      • {project.period}
                    </span>
                  )}
                </div>

                <h3 className="text-[1.8rem] sm:text-[2.2rem] font-bold text-white mb-2 line-clamp-1">
                  {project.title}
                </h3>

                <p
                  className="text-[1.2rem] sm:text-[1.3rem] text-gray-400 mb-3
                             leading-relaxed line-clamp-2 sm:line-clamp-3"
                  title={project.description}
                >
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[0.95rem] sm:text-[1rem] text-crimson/80
                                 rounded-full border border-crimson/20 bg-crimson/5 tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Live link */}
                <div className="mt-auto pt-2">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2
                               text-[1.1rem] sm:text-[1.2rem] text-white
                               hover:text-crimson transition-colors duration-300"
                    draggable={false}
                  >
                    <FaExternalLinkAlt className="text-crimson" />
                    {t('view_live')}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Drag affordance - minimal, clean ────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="mt-8 flex items-center justify-center gap-3
                   select-none pointer-events-none"
      >
        <span className="w-8 h-px bg-gray-700" />
        <span className="text-[1.1rem] text-gray-600 uppercase tracking-[0.3rem]">
          {t('drag_hint')}
        </span>
        <span className="w-8 h-px bg-gray-700" />
      </div>
    </section>
  );
}
