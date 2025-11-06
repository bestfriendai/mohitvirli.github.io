"use client";

import { useState } from "react";
import SectionHeading from "@/app/components/ui/section-heading";
import { Button } from "@/app/components/ui/button";
import { Send, Mail, Github, Linkedin } from "lucide-react";
import { motion } from "motion/react";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const canSend = email.trim().length > 3 && message.trim().length > 4;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend) return;
    try {
      setStatus("sending");
      window.location.href = `mailto:contact@dontfollowpat.com?subject=Portfolio%20Contact%20from%20${encodeURIComponent(
        name || "Anonymous",
      )}&body=${encodeURIComponent(message)}%0A%0Afrom:%20${encodeURIComponent(email)}`;
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/patrickfrancis",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/patrickfrancis",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:contact@dontfollowpat.com",
      label: "Email",
    },
  ];

  return (
    <SectionHeading
      id="contact"
      text="Contact"
      className="px-4 py-12 md:px-8 md:py-16 lg:px-20"
    >
      {/* Cross pattern background */}
      <div className="absolute inset-0 size-full">
        <div className="before:bg-border after:bg-border relative h-full w-full before:absolute before:top-1/2 before:left-0 before:h-0.5 before:w-full after:absolute after:top-0 after:left-1/2 after:h-full after:w-0.5" />
      </div>

      {/* Gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Let&apos;s Build Something Together</h2>
          <p className="text-muted-foreground text-lg">
            Have a project in mind? Drop me a message and let&apos;s make it happen.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={onSubmit}
          className="bg-background/50 backdrop-blur-sm border-2 rounded-lg p-6 md:p-8 space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={status === "sending" || status === "sent"}
                className="w-full px-4 py-2 rounded-md border-2 bg-background/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email *
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "sending" || status === "sent"}
                className="w-full px-4 py-2 rounded-md border-2 bg-background/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2">
              Message *
            </label>
            <textarea
              id="message"
              required
              placeholder="Tell me about your project..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={status === "sending" || status === "sent"}
              rows={6}
              className="w-full px-4 py-2 rounded-md border-2 bg-background/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="p-2 rounded-md border-2 hover:border-primary hover:bg-primary/10 transition-all"
                >
                  <link.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={!canSend || status === "sending" || status === "sent"}
              className="group"
            >
              {status === "sending" ? (
                "Sending..."
              ) : status === "sent" ? (
                "Sent!"
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </>
              )}
            </Button>
          </div>

          {status === "sent" && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-600 text-center text-sm"
            >
              Message sent! I&apos;ll get back to you soon.
            </motion.p>
          )}

          {status === "error" && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-600 text-center text-sm"
            >
              Something went wrong. Please try again.
            </motion.p>
          )}
        </motion.form>
      </div>
    </SectionHeading>
  );
}
