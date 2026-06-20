"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experience } from "@/data/portfolio";
import { motion } from "framer-motion";

export const Experience = () => {
  return (
    <section id="experience" className="py-24">
      <div className="container mx-auto max-w-4xl px-6">
        <SectionHeader label="Experience" title="Experience and education.">
          My professional internship and academic background from the resume.
        </SectionHeader>

        <div className="relative border-l border-white/10 ml-4 md:ml-6 py-6 space-y-12">
          {experience.map((item, index) => (
            <motion.div
              key={`${item.role}-${item.date}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-[#080c14] bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.15)]" />

              <div className="rounded-2xl border border-white/10 bg-[#0f1623] p-6 shadow-xl transition-all hover:border-white/20">
                <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div>
                    <h3 className="text-xl font-bold text-white">{item.role}</h3>
                    <p className="text-blue-500 font-bold mt-1">{item.company}</p>
                  </div>
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs font-semibold text-slate-400 whitespace-nowrap h-fit">
                    {item.date}
                  </span>
                </div>
                
                <p className="mb-6 text-slate-400 leading-relaxed">{item.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
