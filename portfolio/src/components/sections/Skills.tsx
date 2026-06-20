"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Card } from "@/components/ui/Card";
import { skillGroups } from "@/data/portfolio";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export const Skills = () => {
  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionHeader label="Toolkit" title="Technologies I work with.">
          A resume-backed stack spanning frontend, backend, databases, tools, and software fundamentals.
        </SectionHeader>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <h3 className="mb-6 text-xs font-bold uppercase tracking-widest text-slate-500">
                  {group.label}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className={cn(
                        "rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold transition-colors hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400",
                        group.muted ? "border-dashed text-slate-500" : "text-slate-300"
                      )}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
