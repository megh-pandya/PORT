"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  children?: React.ReactNode;
}

export const SectionHeader = ({ label, title, children }: SectionHeaderProps) => {
  return (
    <div className="mb-12 max-w-2xl">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-4 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-500"
      >
        <span className="h-px w-6 bg-blue-500" />
        {label}
      </motion.p>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>

      {children && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-slate-400"
        >
          {children}
        </motion.p>
      )}
    </div>
  );
};
