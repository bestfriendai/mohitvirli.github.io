'use client';

import { useProgress } from "@react-three/drei";
import { useScrollStore } from "@/app/stores/scrollStore";
import { useThemeStore } from "@/app/stores/themeStore";
import gsap from "gsap";
import { useEffect, useRef } from "react";

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
      icon: '/icons/instagram.svg',
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@dontfollowpat',
      icon: '/icons/tiktok.svg',
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/@dontfollowpat',
      icon: '/icons/youtube.svg',
    },
    {
      name: 'Books',
      url: 'https://www.amazon.com/Secret-Life-Stop-tching-Self-Help-ebook/dp/B0F2JDZQFP',
      icon: '/icons/book.svg',
    },
  ];

  return (
    <div
      ref={iconsRef}
      className="fixed top-[60vh] left-1/2 transform -translate-x-1/2 z-10 opacity-0"
      style={{ pointerEvents: 'auto' }}
    >
      <div className="flex gap-6 md:gap-8">
        {socialLinks.map((link, index) => (
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
                  ? 'bg-white/5 border-2 border-white/20 group-hover:bg-white/15 group-hover:border-white/40 group-hover:shadow-white/20'
                  : 'bg-black/5 border-2 border-black/15 group-hover:bg-black/10 group-hover:border-black/30 group-hover:shadow-black/20'
                }
              `}
            >
              <img
                src={link.icon}
                alt={link.name}
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
