"use client";

import { Github, Heart, Linkedin, Mail, Twitter, Instagram, Youtube } from "lucide-react";
import { motion } from "motion/react";

const PortfolioFooter = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/patrickfrancis",
      label: "GitHub",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/dontfollowpat",
      label: "Instagram",
    },
    {
      icon: Youtube,
      href: "https://www.youtube.com/@dontfollowpat",
      label: "YouTube",
    },
    {
      icon: Mail,
      href: "mailto:contact@dontfollowpat.com",
      label: "Email",
    },
  ];

  return (
    <footer className="border-t px-4 py-8 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-foreground/70 flex flex-col items-center justify-between gap-6 text-sm md:flex-row">
          {/* Copyright */}
          <div className="inline-flex items-center gap-2">
            <span>© {currentYear} Patrick Francis. All rights reserved.</span>
          </div>

          {/* Made with love */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2"
          >
            <span className="text-foreground/60 text-sm">Made with</span>
            <Heart className="h-4 w-4 fill-red-400 text-red-400" />
            <span className="text-foreground/60 text-sm">in Next.js</span>
          </motion.div>

          {/* Social Links */}
          <div className="inline-flex items-center gap-4">
            <div className="inline-flex overflow-hidden rounded-md border">
              {socialLinks.map((link, index) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className={`text-foreground/60 hover:bg-muted/30 hover:text-foreground inline-flex items-center justify-center size-10 transition-colors ${
                    index < socialLinks.length - 1 ? "border-r" : ""
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Back to top */}
            <motion.a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="hover:bg-foreground/5 rounded-md border px-3 py-1.5 transition-all text-sm"
            >
              Back to top
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PortfolioFooter;
