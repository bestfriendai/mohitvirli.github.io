'use client';

import { Html, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import Projects2D from "./Projects2D";
import About from "./About";
import Contact from "./Contact";
import PortfolioFooter from "./PortfolioFooter";

const PortfolioContent = () => {
  const data = useScroll();
  const [visible, setVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);

  useFrame(() => {
    const scrollProgress = data.offset;

    // Show portfolio from 50% to 78% scroll
    const shouldBeVisible = scrollProgress > 0.5 && scrollProgress < 0.78;

    if (shouldBeVisible) {
      setVisible(true);
      // Fade in smoothly after 50% scroll
      const fadeInProgress = Math.min((scrollProgress - 0.5) / 0.05, 1);
      setOpacity(fadeInProgress);
    } else if (scrollProgress >= 0.78) {
      // Fade out before footer links
      const fadeOutProgress = Math.max(1 - (scrollProgress - 0.78) / 0.02, 0);
      setOpacity(fadeOutProgress);
      if (fadeOutProgress === 0) setVisible(false);
    } else {
      setVisible(false);
      setOpacity(0);
    }
  });

  return (
    <Html
      fullscreen
      style={{
        pointerEvents: visible ? 'auto' : 'none',
        opacity: opacity,
        transition: 'none', // Remove transition for smoother scroll-based animation
      }}
    >
      <div className="fixed bottom-0 left-0 right-0 w-screen bg-gradient-to-t from-background via-background to-background/95 overflow-y-auto max-h-screen backdrop-blur-sm">
        <div className="animate-in fade-in duration-500">
          <Projects2D/>
          <About/>
          <Contact/>
          <PortfolioFooter/>
        </div>
      </div>
    </Html>
  );
};

export default PortfolioContent;
