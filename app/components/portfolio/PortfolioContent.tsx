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

  useFrame(() => {
    // Show portfolio after 50% scroll (after door) and before 78% (before footer links)
    const scrollProgress = data.range(0, 1);
    setVisible(scrollProgress > 0.5 && scrollProgress < 0.78);
  });

  return (
    <Html
      fullscreen
      style={{
        pointerEvents: visible ? 'auto' : 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
      }}
    >
      <div className="fixed bottom-0 left-0 right-0 w-screen bg-background overflow-y-auto max-h-screen">
        <Projects2D/>
        <About/>
        <Contact/>
        <PortfolioFooter/>
      </div>
    </Html>
  );
};

export default PortfolioContent;
