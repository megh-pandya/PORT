"use client";

import React from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects } from "@/data/portfolio";
import { motion } from "framer-motion";
import { ArrowUpRight, Code2 } from "lucide-react";
import { cn } from "@/utils/cn";

const toneColors = {
  blue: "from-blue-500/20 to-blue-500/0 border-blue-500/20",
  green: "from-green-500/20 to-green-500/0 border-green-500/20",
  orange: "from-orange-500/20 to-orange-500/0 border-orange-500/20",
  purple: "from-purple-500/20 to-purple-500/0 border-purple-500/20",
};

export const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-[#0a0f1a]">
      <div className="container mx-auto max-w-6xl px-6">
        <SectionHeader label="Projects" title="Selected projects from my resume.">
          Real projects covering production real estate workflows, attendance automation, and my portfolio.
        </SectionHeader>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f1623] shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            >
              {/* Image / Browser Window Placeholder */}
              <div
                className={cn(
                  "relative h-48 w-full border-b bg-gradient-to-br p-6 transition-opacity duration-300 group-hover:opacity-90",
                  toneColors[project.tone as keyof typeof toneColors]
                )}
              >
                <div className="flex h-full w-full flex-col overflow-hidden rounded-lg border border-white/10 bg-[#080c14]/50 shadow-lg backdrop-blur-sm">
                  <div className="flex h-8 items-center gap-1.5 border-b border-white/10 px-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
                  </div>
                  <div className="flex flex-1 flex-col justify-center gap-3 p-4 opacity-30">
                    <span className="h-2 w-1/3 rounded-full bg-white/50" />
                    <span className="h-2 w-full rounded-full bg-white/20" />
                    <span className="h-2 w-3/4 rounded-full bg-white/20" />
                    <span className="h-2 w-1/2 rounded-full bg-white/20" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6 lg:p-8">
                <h3 className="mb-3 text-2xl font-bold text-white">{project.title}</h3>
                <p className="mb-6 flex-1 text-slate-400 leading-relaxed">{project.description}</p>
                
                <div className="mb-8 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-300 border border-white/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-auto">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-blue-400 transition-colors hover:text-blue-300"
                    >
                      Live Demo <ArrowUpRight size={16} />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-slate-300 transition-colors hover:text-white"
                    >
                      GitHub <Code2 size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
