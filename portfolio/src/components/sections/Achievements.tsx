"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { achievements } from "@/data/portfolio";
import { motion } from "framer-motion";

export const Achievements = () => {
  return (
    <section id="achievements" className="py-24 bg-[#0a0f1a]">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionHeader label="Highlights" title="Resume highlights.">
          Delivery, optimization, API work, refactoring, and academic milestones.
        </SectionHeader>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full group">
                <p className="mb-3 text-[11px] font-black uppercase tracking-widest text-blue-500">
                  {item.type}
                </p>
                <h3 className="mb-3 text-lg font-bold text-white leading-tight">
                  {item.title}
                </h3>
                <span className="mb-4 block text-sm text-slate-400">
                  {item.org}
                </span>
                <strong className="mt-auto inline-block rounded-full bg-white/5 px-3 py-1 text-xs font-bold text-slate-300 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                  {item.year}
                </strong>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
