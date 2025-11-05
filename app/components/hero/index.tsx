'use client';

import { Text } from "@react-three/drei";

import { useProgress } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import CloudContainer from "../models/Cloud";
import StarsContainer from "../models/Stars";
import WindowModel from "../models/WindowModel";
import TextWindow from "./TextWindow";

const Hero = () => {
  const titleRef = useRef<THREE.Mesh>(null);
  const { progress } = useProgress();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (progress === 100 && titleRef.current) {
      gsap.fromTo(titleRef.current.position, {
        y: -10,
        duration: 1,
      }, {
        y: 0,
        duration: 3
      });
    }
  }, [progress]);

  // Update positions on resize
  useEffect(() => {
    if (titleRef.current && progress === 100) {
      const newY = isMobile ? 3.5 : 5;
      gsap.to(titleRef.current.position, {
        y: newY,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, [isMobile, progress]);

  const fontProps = {
    font: "./soria-font.ttf",
    fontSize: isMobile ? 0.7 : 1.6,
  };

  // Responsive positioning - title higher and bigger
  const titlePosition: [number, number, number] = [0, isMobile ? 3.5 : 5, -10];

  return (
    <>
      <Text position={titlePosition} {...fontProps} ref={titleRef} maxWidth={isMobile ? 10 : 20}>Hi, I am Patrick Francis.</Text>
      <StarsContainer />
      <CloudContainer/>
      <group position={[0, -25, 5.69]}>
        <pointLight castShadow position={[1, 1, -2.5]} intensity={60} distance={10}/>
        <WindowModel receiveShadow/>
        <TextWindow/>
      </group>
    </>
  );
};

export default Hero;
