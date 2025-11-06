import { Text, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";
import { MOBILE_APPS } from "../../constants/apps";

const AppCard = ({ app, index }: { app: any; index: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  return (
    <group
      ref={groupRef}
      position={[index * (isMobile ? 3 : 4), 0, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Card background */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[isMobile ? 2.5 : 3, isMobile ? 3.5 : 4]} />
        <meshStandardMaterial
          color={hovered ? app.color : "#1a1a1a"}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* App name */}
      <Text
        position={[0, isMobile ? 1.2 : 1.4, 0]}
        fontSize={isMobile ? 0.15 : 0.2}
        color="white"
        font="./Vercetti-Regular.woff"
        anchorX="center"
        anchorY="middle"
      >
        {app.name.toUpperCase()}
      </Text>

      {/* App description */}
      <Text
        position={[0, isMobile ? -0.8 : -1, 0]}
        fontSize={isMobile ? 0.08 : 0.1}
        color="#888"
        font="./Vercetti-Regular.woff"
        anchorX="center"
        anchorY="middle"
        maxWidth={isMobile ? 2 : 2.5}
        textAlign="center"
      >
        {app.description}
      </Text>
    </group>
  );
};

const MobileApps = () => {
  const groupRef = useRef<THREE.Group>(null);
  const titleRef = useRef<THREE.Group>(null);
  const cardsGroupRef = useRef<THREE.Group>(null);
  const data = useScroll();

  useFrame(() => {
    // Control visibility based on scroll position (appears before footer)
    // Adjust ranges to appear between portfolio and footer
    const visibilityRange = data.range(0.6, 0.2);
    const animationRange = data.range(0.6, 0.25);

    if (groupRef.current) {
      groupRef.current.visible = visibilityRange > 0;
    }

    // Animate title with scroll
    if (titleRef.current) {
      const titleY = -2 + animationRange * 2;
      titleRef.current.position.y = titleY;
      titleRef.current.scale.setScalar(0.3 + animationRange * 0.7);
    }

    // Animate cards with stagger effect
    if (cardsGroupRef.current) {
      cardsGroupRef.current.children.forEach((card, i) => {
        const staggerDelay = i * 0.05;
        const staggeredProgress = Math.max(0, Math.min(1, (animationRange - staggerDelay) / (1 - staggerDelay)));

        // Slide in from bottom with fade
        card.position.y = -2 + staggeredProgress * 2;
        card.scale.setScalar(0.3 + staggeredProgress * 0.7);

        // Apply opacity to all meshes and text in the card
        card.traverse((child: any) => {
          if (child.material) {
            if (!child.material.transparent) {
              child.material.transparent = true;
            }
            child.material.opacity = staggeredProgress;
          }
        });
      });
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, -30, 15]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      {/* Section Title */}
      <Text
        ref={titleRef}
        position={[0, 0, 0]}
        fontSize={isMobile ? 0.4 : 0.6}
        color="white"
        font="./Vercetti-Regular.woff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.1}
      >
        MOBILE APPS
      </Text>

      {/* Apps Grid */}
      <group
        ref={cardsGroupRef}
        position={[
          isMobile ? -MOBILE_APPS.length * 1.5 + 1.5 : -MOBILE_APPS.length * 2 + 2,
          -4,
          0
        ]}
      >
        {MOBILE_APPS.map((app, index) => (
          <AppCard key={index} app={app} index={index} />
        ))}
      </group>
    </group>
  );
};

export default MobileApps;
