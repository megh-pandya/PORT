"use client";

import React from "react";
import { motion } from "framer-motion";

const ecosystem = [
  {
    core: "Frontend Architecture",
    technologies: [
      { name: "React.js", desc: "Core view library" },
      { name: "Next.js", desc: "Framework & SSR" },
      { name: "TypeScript", desc: "Type safety" },
      { name: "Tailwind CSS", desc: "Styling system" },
      { name: "Framer Motion", desc: "Interaction & animation" }
    ]
  },
  {
    core: "Backend Services",
    technologies: [
      { name: "Node.js", desc: "Runtime environment" },
      { name: "Express.js", desc: "API framework" },
      { name: "PHP", desc: "Legacy & traditional server logic" },
      { name: "REST APIs", desc: "System communication" }
    ]
  },
  {
    core: "Data Layer",
    technologies: [
      { name: "PostgreSQL", desc: "Relational database" },
      { name: "MySQL", desc: "Relational database" },
      { name: "MongoDB", desc: "Document database" }
    ]
  },
  {
    core: "Infrastructure",
    technologies: [
      { name: "Git", desc: "Version control" },
      { name: "Docker", desc: "Containerization" },
      { name: "Vercel", desc: "Edge deployment" },
      { name: "Linux", desc: "Server environment" }
    ]
  }
];

export function TechArsenal() {
  return (
    <section
      id="stack"
      style={{ padding: "120px 24px", position: "relative" }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="font-serif"
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 400,
              color: "var(--text)",
              marginBottom: "16px",
              lineHeight: 1.1,
            }}
          >
            Digital ecosystem.
          </h2>

          <p
            style={{
              fontSize: "15px",
              color: "var(--text-sec)",
              marginBottom: "64px",
              maxWidth: "480px",
              lineHeight: 1.65,
            }}
          >
            Technologies are tools, not badges. Here is how they connect within the systems I build.
          </p>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "64px" }}>
          {ecosystem.map((node, i) => (
            <motion.div
              key={node.core}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "relative" }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "24px" }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--accent)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase"
                  }}
                >
                  Layer 0{i + 1}
                </span>
                <h3
                  className="font-serif"
                  style={{
                    fontSize: "24px",
                    color: "var(--text)",
                    margin: 0,
                    fontWeight: 400
                  }}
                >
                  {node.core}
                </h3>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                  gap: "24px",
                  paddingLeft: "24px",
                  borderLeft: "1px solid var(--border)",
                  marginLeft: "12px",
                }}
              >
                {node.technologies.map((tech, j) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: (i * 0.15) + (j * 0.1) + 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{ position: "relative" }}
                  >
                    {/* Connecting line to the left border */}
                    <div 
                      style={{
                        position: "absolute",
                        left: "-24px",
                        top: "12px",
                        width: "16px",
                        height: "1px",
                        background: "var(--border)",
                      }}
                    />
                    
                    <span
                      style={{
                        display: "block",
                        fontFamily: "var(--font-mono)",
                        fontSize: "13px",
                        color: "var(--text)",
                        marginBottom: "4px",
                      }}
                    >
                      {tech.name}
                    </span>
                    <span
                      style={{
                        display: "block",
                        fontSize: "13px",
                        color: "var(--text-sec)",
                      }}
                    >
                      {tech.desc}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
