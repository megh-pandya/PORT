"use client";

import React from "react";
import { ArrowRight, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

export const Hero = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center pt-24 pb-20 overflow-hidden">
      {/* Background Animated Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            transform: ["translate(0px, 0px) scale(1)", "translate(50px, -50px) scale(1.1)", "translate(0px, 0px) scale(1)"],
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-blue-500/10 blur-[120px]"
        />
        <motion.div
          animate={{
            transform: ["translate(0px, 0px) scale(1)", "translate(-50px, 50px) scale(1.1)", "translate(0px, 0px) scale(1)"],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute -bottom-[10%] -right-[10%] w-[45vw] h-[45vw] rounded-full bg-green-500/10 blur-[120px]"
        />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-[1.1fr_0.75fr] gap-12 items-center">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
          <motion.div variants={item} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-bold text-slate-300 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.8)] animate-pulse" />
            Available for new opportunities
          </motion.div>
          
          <motion.h1 variants={item} className="mb-4 text-5xl font-bold tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Megh Pandya
          </motion.h1>
          
          <motion.h2 variants={item} className="mb-6 text-2xl font-bold text-blue-500 sm:text-3xl md:text-4xl h-[40px] sm:h-[48px]">
            <TypeAnimation
              sequence={[
                "Full Stack Developer",
                2000,
                "Next.js Enthusiast",
                2000,
                "Backend Engineer",
                2000,
                "React Specialist",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.h2>
          
          <motion.p variants={item} className="mb-10 text-lg text-slate-400 max-w-[600px] leading-relaxed">
            Full stack developer with hands-on experience building production-grade SaaS platforms using Next.js, React.js, Node.js, PHP, and PostgreSQL.
          </motion.p>
          
          <motion.div variants={item} className="flex flex-wrap items-center gap-4">
            <Button variant="primary" size="lg" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
              View Projects <ArrowRight size={18} />
            </Button>
            <Button variant="secondary" size="lg" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
              Contact Me <Mail size={18} />
            </Button>
            <Button variant="ghost" size="lg" onClick={() => window.open("/Megh_Pandya_Resume.pdf", "_blank")}>
              Resume <Download size={18} />
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="rounded-2xl border border-white/10 bg-[#0f1623]/80 p-8 shadow-2xl backdrop-blur-lg"
        >
          <div className="mb-8 flex items-center gap-2 border-b border-white/10 pb-4">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-blue-500">Current Focus</p>
          <h3 className="mb-8 text-2xl font-bold leading-tight text-white">Shipping full stack SaaS features with clean systems underneath.</h3>
          
          <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-white/5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "86%" }}
              transition={{ duration: 1.5, delay: 1 }}
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-green-500" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/5 bg-white/5 p-4">
              <strong className="block text-2xl text-white mb-1">Next.js</strong>
              <span className="text-xs font-bold text-slate-500">Main Stack</span>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/5 p-4">
              <strong className="block text-2xl text-white mb-1">8.53</strong>
              <span className="text-xs font-bold text-slate-500">MCA CGPA</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
