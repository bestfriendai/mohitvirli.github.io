'use client';

import { Html, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { motion } from "motion/react";

const MobileApps = () => {
  const groupRef = useRef<THREE.Group>(null);
  const data = useScroll();
  const [visible, setVisible] = useState(false);

  // Your apps data
  const apps = [
    {
      name: "DontFollowPat",
      icon: "📱",
      color: "#FF6B6B",
      description: "Social Media App"
    },
    {
      name: "Fitness Tracker",
      icon: "💪",
      color: "#4ECDC4",
      description: "Health & Fitness"
    },
    {
      name: "Task Manager",
      icon: "✅",
      color: "#45B7D1",
      description: "Productivity"
    },
    {
      name: "Music Player",
      icon: "🎵",
      color: "#F7B731",
      description: "Entertainment"
    },
    {
      name: "Photo Editor",
      icon: "📸",
      color: "#5F27CD",
      description: "Photography"
    },
    {
      name: "Weather Pro",
      icon: "🌤️",
      color: "#00D2D3",
      description: "Weather"
    },
  ];

  useFrame(() => {
    if (!groupRef.current) return;

    const scrollOffset = data.offset;

    // Show between 40% and 65% scroll (after door, before portfolio)
    if (scrollOffset > 0.4 && scrollOffset < 0.65) {
      setVisible(true);
      groupRef.current.visible = true;
    } else {
      setVisible(false);
      groupRef.current.visible = false;
    }
  });

  return (
    <group ref={groupRef} position={[0, -30, 0]}>
      <Html
        fullscreen
        style={{
          pointerEvents: visible ? 'auto' : 'none',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      >
        <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-background/50 to-background">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -50 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold text-center mb-16 text-foreground"
            >
              Mobile Apps
            </motion.h2>

            {/* iPhone 17 Pro Max mockups with floating apps */}
            <div className="relative h-[600px] flex items-center justify-center">
              {/* Floating phones in the background */}
              {apps.map((app, index) => {
                const angle = (index / apps.length) * Math.PI * 2;
                const radius = 300;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={app.name}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: visible ? 0.6 : 0,
                      scale: visible ? 1 : 0,
                      x: visible ? x : 0,
                      y: visible ? y : 0,
                    }}
                    transition={{
                      duration: 1,
                      delay: index * 0.1,
                      repeat: Infinity,
                      repeatType: "reverse",
                      repeatDelay: 1,
                    }}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                  >
                    {/* iPhone 17 Pro Max Mockup */}
                    <div className="relative w-[160px] h-[320px]">
                      {/* Phone body */}
                      <div
                        className="absolute inset-0 rounded-[32px] shadow-2xl border-4 border-gray-800 overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
                        }}
                      >
                        {/* Dynamic Island */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-7 bg-black rounded-full" />

                        {/* Screen */}
                        <div className="absolute inset-3 bg-white rounded-[24px] overflow-hidden">
                          {/* App Icon */}
                          <div className="flex items-center justify-center h-full flex-col gap-4 p-6">
                            <div
                              className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl shadow-lg"
                              style={{ backgroundColor: app.color }}
                            >
                              {app.icon}
                            </div>
                            <div className="text-center">
                              <p className="font-semibold text-gray-900 text-sm">{app.name}</p>
                              <p className="text-xs text-gray-600">{app.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Phone buttons */}
                      <div className="absolute right-0 top-20 w-1 h-12 bg-gray-800 rounded-l" />
                      <div className="absolute right-0 top-36 w-1 h-6 bg-gray-800 rounded-l" />
                      <div className="absolute right-0 top-44 w-1 h-6 bg-gray-800 rounded-l" />
                      <div className="absolute left-0 top-24 w-1 h-8 bg-gray-800 rounded-r" />
                    </div>
                  </motion.div>
                );
              })}

              {/* Center featured phone */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: visible ? 1 : 0,
                  scale: visible ? 1 : 0.8,
                  y: [0, -10, 0],
                }}
                transition={{
                  opacity: { duration: 0.8 },
                  scale: { duration: 0.8 },
                  y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                }}
                className="relative z-10"
              >
                {/* iPhone 17 Pro Max - Large center */}
                <div className="relative w-[220px] h-[440px]">
                  {/* Phone body */}
                  <div
                    className="absolute inset-0 rounded-[44px] shadow-2xl border-[6px] border-gray-900 overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #1a1a1a 0%, #3a3a3a 100%)',
                    }}
                  >
                    {/* Dynamic Island */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-9 bg-black rounded-full" />

                    {/* Screen - App Grid */}
                    <div className="absolute inset-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-[32px] overflow-hidden">
                      <div className="p-6 grid grid-cols-3 gap-4">
                        {apps.map((app, i) => (
                          <motion.div
                            key={i}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{
                              duration: 2,
                              delay: i * 0.2,
                              repeat: Infinity,
                            }}
                            className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-lg"
                            style={{ backgroundColor: app.color }}
                          >
                            {app.icon}
                          </motion.div>
                        ))}
                      </div>

                      {/* Dock */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-xl rounded-2xl p-3 flex gap-3">
                        {apps.slice(0, 4).map((app, i) => (
                          <div
                            key={i}
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-lg"
                            style={{ backgroundColor: app.color }}
                          >
                            {app.icon}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Phone buttons */}
                  <div className="absolute right-0 top-28 w-1 h-16 bg-gray-900 rounded-l" />
                  <div className="absolute right-0 top-48 w-1 h-8 bg-gray-900 rounded-l" />
                  <div className="absolute right-0 top-60 w-1 h-8 bg-gray-900 rounded-l" />
                  <div className="absolute left-0 top-32 w-1 h-10 bg-gray-900 rounded-r" />
                </div>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-center text-xl md:text-2xl text-foreground/80 mt-12"
            >
              Building innovative mobile experiences
            </motion.p>
          </div>
        </div>
      </Html>
    </group>
  );
};

export default MobileApps;
