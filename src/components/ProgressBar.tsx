"use client";
import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    // Set initial state
    gsap.set(bar, {
      scaleX: 0,
      transformOrigin: "left center",
      force3D: true,
    });

    // Create ScrollTrigger for progress
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.1,
      anticipatePin: 1,
      onUpdate: (self) => {
        gsap.to(bar, {
          scaleX: self.progress,
          duration: 0.1,
          ease: "none",
          force3D: true,
          overwrite: true,
        });
        setProgress(Math.round(self.progress * 100));
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[3px] bg-crimson z-[100]"
      style={{
        transform: "scaleX(0)",
        transformOrigin: "left center",
        backfaceVisibility: "hidden",
      }}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
}
