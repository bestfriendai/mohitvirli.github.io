"use client";

import SectionHeading from "@/app/components/ui/section-heading";
import { Badge } from "@/app/components/ui/badge";
import HeadingLine from "@/app/components/ui/heading-line";
import { motion } from "motion/react";

const About = () => {
  return (
    <SectionHeading text="About" id="about" className="overflow-hidden">
      <div className="flex items-center lg:min-h-[60vh]">
        <div className="relative flex-1 px-4 py-12 md:px-12 lg:px-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-2xl font-semibold md:text-5xl lg:text-4xl"
          >
            Meet the Developer,
            <br />
            Not Just the Code
          </motion.h2>

          <HeadingLine className="mt-6" lineWidth={40} />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-foreground/70 bg-muted/20 relative z-10 mx-auto mt-8 max-w-3xl rounded-lg border-2 border-dotted text-sm leading-relaxed backdrop-blur-3xl md:text-base"
          >
            <div className="p-6 space-y-4">
              <p>
                I&apos;m <strong>Patrick Francis</strong>, a full-stack developer and entrepreneur building apps that impact millions of lives worldwide.
              </p>

              <p>
                Creator of <strong>PrayAi.org</strong> (faith-based AI companion) and <strong>FakeFlex.app</strong> (social fitness platform). Stack: React Native, Next.js, TypeScript, Node.js.
              </p>

              <p>
                I specialize in mobile-first experiences, scalable APIs, and products that solve real problems for real people.
              </p>

              <p>
                From concept to launch, I build products with clean code, thoughtful design, and a focus on user delight.
              </p>

              <div className="pt-4 flex flex-wrap gap-2">
                <Badge variant="outline" className="border font-mono text-xs bg-blue-500/10 text-blue-600 border-blue-500/30">
                  React Native
                </Badge>
                <Badge variant="outline" className="border font-mono text-xs bg-cyan-500/10 text-cyan-600 border-cyan-500/30">
                  Next.js
                </Badge>
                <Badge variant="outline" className="border font-mono text-xs bg-violet-500/10 text-violet-600 border-violet-500/30">
                  TypeScript
                </Badge>
                <Badge variant="outline" className="border font-mono text-xs bg-green-500/10 text-green-600 border-green-500/30">
                  Node.js
                </Badge>
                <Badge variant="outline" className="border font-mono text-xs bg-orange-500/10 text-orange-600 border-orange-500/30">
                  Mobile Development
                </Badge>
                <Badge variant="outline" className="border font-mono text-xs bg-pink-500/10 text-pink-600 border-pink-500/30">
                  API Design
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionHeading>
  );
};

export default About;
