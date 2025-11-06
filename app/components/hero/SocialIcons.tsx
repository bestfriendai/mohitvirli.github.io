'use client';

import { useProgress } from "@react-three/drei";
import { useScrollStore } from "@/app/stores/scrollStore";
import { useThemeStore } from "@/app/stores/themeStore";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import Image from "next/image";

const SocialIcons = () => {
  const iconsRef = useRef<HTMLDivElement>(null);
  const { progress } = useProgress();
  const scrollProgress = useScrollStore((state) => state.scrollProgress);
  const isDarkTheme = useThemeStore((state) => state.theme.type === 'dark');

  useEffect(() => {
    if (progress === 100 && iconsRef.current) {
      const icons = iconsRef.current.querySelectorAll('.social-icon');

      gsap.fromTo(iconsRef.current, {
        opacity: 0,
        y: 30,
      }, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 2.5,
        ease: "power3.out"
      });

      // Stagger animation for individual icons
      gsap.fromTo(icons, {
        scale: 0,
        rotation: -180,
      }, {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        delay: 2.7,
        stagger: 0.1,
        ease: "back.out(1.7)"
      });
    }
  }, [progress]);

  useEffect(() => {
    if (iconsRef.current && scrollProgress > 0.1) {
      gsap.to(iconsRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.5,
      });
    } else if (iconsRef.current && scrollProgress <= 0.1 && progress === 100) {
      gsap.to(iconsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
      });
    }
  }, [scrollProgress, progress]);

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://instagram.com/dontfollowpat',
      icon: '/icons/instagram-color.svg',
      color: '#E4405F', // Instagram brand color
    },
    {
      name: 'X',
      url: 'https://x.com/dontfollowpat',
      icon: '/icons/x-color.svg',
      color: '#000000', // X (Twitter) brand color
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@dontfollowpat',
      icon: '/icons/tiktok-color.svg',
      color: '#00F2EA', // TikTok brand color
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@dontfollowpat',
      icon: '/icons/youtube-color.svg',
      color: '#FF0000', // YouTube brand color
    },
    {
      name: 'Books',
      url: 'https://www.amazon.com/Secret-Life-Stop-tching-Self-Help-ebook/dp/B0F2JDZQFP',
      icon: '/icons/book-color.svg',
      color: '#FF9900', // Amazon brand color
    },
  ];

  return (
    <div
      ref={iconsRef}
      className="fixed top-[60vh] left-1/2 transform -translate-x-1/2 z-10 opacity-0"
      style={{ pointerEvents: 'auto' }}
    >
      <div className="flex gap-6 md:gap-8">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon group transition-all duration-300 hover:scale-110 hover:-translate-y-2"
            aria-label={link.name}
            style={{ transformOrigin: 'center' }}
          >
            <div
              className={`
                w-12 h-12 md:w-14 md:h-14
                flex items-center justify-center
                rounded-full
                backdrop-blur-md
                transition-all duration-300
                shadow-lg
                group-hover:shadow-2xl
                ${isDarkTheme
                  ? 'bg-white/10 border-2 border-white/30 group-hover:bg-white/20 group-hover:border-white/50'
                  : 'bg-white/80 border-2 border-gray-200 group-hover:bg-white group-hover:border-gray-300'
                }
              `}
              style={{
                boxShadow: `0 0 0 0 ${link.color}20`,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 0 20px 5px ${link.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 0 0 ${link.color}20`;
              }}
            >
              <Image
                src={link.icon}
                alt={link.name}
                width={28}
                height={28}
                className="w-6 h-6 md:w-7 md:h-7 transition-all duration-300 group-hover:scale-110"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialIcons;
