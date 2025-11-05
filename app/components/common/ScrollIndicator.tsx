'use client';

import { useProgress } from "@react-three/drei";
import { useScrollStore } from "@/app/stores/scrollStore";
import gsap from "gsap";
import { useEffect, useRef } from "react";

const ScrollIndicator = () => {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const { progress } = useProgress();
  const scrollProgress = useScrollStore((state) => state.scrollProgress);

  useEffect(() => {
    if (progress === 100 && indicatorRef.current) {
      gsap.fromTo(indicatorRef.current, {
        opacity: 0,
        y: -20,
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 2,
      });
    }
  }, [progress]);

  useEffect(() => {
    if (indicatorRef.current && scrollProgress > 0.05) {
      gsap.to(indicatorRef.current, {
        opacity: 0,
        duration: 0.5,
      });
    } else if (indicatorRef.current && scrollProgress <= 0.05 && progress === 100) {
      gsap.to(indicatorRef.current, {
        opacity: 1,
        duration: 0.5,
      });
    }
  }, [scrollProgress, progress]);

  return (
    <div
      ref={indicatorRef}
      className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 opacity-0"
    >
      <div className="flex flex-col items-center gap-2">
        <p className="text-white text-sm md:text-base font-light tracking-[0.3em] uppercase">
          Scroll
        </p>
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default ScrollIndicator;
