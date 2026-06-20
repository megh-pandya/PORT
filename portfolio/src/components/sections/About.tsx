"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { aboutCards, stats } from "@/data/portfolio";
import { motion } from "framer-motion";

export const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionHeader label="About Me" title="Building practical web products with measurable delivery.">
          I work across frontend and backend layers, turning requirements into responsive interfaces, API integrations, and reliable full-stack workflows.
        </SectionHeader>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.8fr]">
          <div className="grid gap-6">
            {aboutCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <span className="mb-4 inline-block font-mono text-xs font-bold text-blue-500">{card.kicker}</span>
                  <h3 className="mb-2 text-xl font-bold text-white">{card.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{card.body}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6 content-start">
            {stats.map(({ value, label }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="flex flex-col items-start justify-center h-full">
                  <strong className="mb-2 block bg-gradient-to-br from-blue-400 to-green-400 bg-clip-text text-4xl font-bold text-transparent">
                    {value}
                  </strong>
                  <span className="text-sm font-bold text-slate-500">{label}</span>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
