"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { projectDossiers } from "@/data/portfolio";
import { ProjectDossier } from "@/types";
import { ArrowUpRight, Code2, X, ArrowRight } from "lucide-react";

function DossierOverlay({
  project,
  onClose,
}: {
  project: ProjectDossier;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(245,243,238,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        zIndex: 80,
        overflowY: "auto",
        padding: "48px 24px",
      }}
      onClick={onClose}
    >
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "740px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close case study"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "36px",
            height: "36px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            background: "var(--surface)",
            cursor: "pointer",
            color: "var(--text-sec)",
          }}
        >
          <X size={16} />
        </button>

        {/* Header */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--accent)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          Project Dossier — {project.index}
        </p>

        <h2
          className="font-serif"
          style={{
            fontSize: "clamp(28px, 5vw, 46px)",
            fontWeight: 400,
            color: "var(--text)",
            lineHeight: 1.1,
            marginBottom: "10px",
            paddingRight: "48px",
          }}
        >
          {project.title}
        </h2>

        <p
          style={{
            color: "var(--text-sec)",
            fontSize: "16px",
            marginBottom: "36px",
          }}
        >
          {project.tagline}
        </p>

        <div
          style={{
            height: "1px",
            background: "var(--border)",
            marginBottom: "40px",
          }}
        />

        {/* Case Study Sections */}
        {[
          { label: "Problem", text: project.problem },
          { label: "Challenge", text: project.challenge },
          { label: "Approach", text: project.approach },
          { label: "Solution", text: project.solution },
          { label: "Result", text: project.result },
          { label: "Lessons Learned", text: project.lessons },
        ].map(({ label, text }) => (
          <div key={label} style={{ marginBottom: "36px" }}>
            <h3
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "10px",
              }}
            >
              {label}
            </h3>
            <p
              style={{
                color: "var(--text)",
                lineHeight: 1.75,
                fontSize: "15px",
              }}
            >
              {text}
            </p>
          </div>
        ))}

        {/* Tech Stack */}
        <div style={{ marginBottom: "40px" }}>
          <h3
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--accent)",
              marginBottom: "12px",
            }}
          >
            Tech Stack
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {project.techStack.map((tech) => (
              <span
                key={tech}
                style={{
                  padding: "5px 12px",
                  borderRadius: "4px",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  fontSize: "13px",
                  color: "var(--text)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 20px",
                background: "var(--text)",
                color: "var(--bg)",
                borderRadius: "6px",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Live Demo <ArrowUpRight size={14} />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 20px",
                background: "var(--surface)",
                color: "var(--text)",
                borderRadius: "6px",
                border: "1px solid var(--border)",
                fontSize: "13px",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              GitHub <Code2 size={14} />
            </a>
          )}
        </div>
      </motion.article>
    </motion.div>
  );
}

export function Projects() {
  const [active, setActive] = useState<ProjectDossier | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <>
      <section
        id="projects"
        style={{
          padding: "120px 24px",
          backgroundColor: "var(--surface)",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "5%",
            right: "5%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, var(--border), transparent)",
          }}
        />

        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel label="Selected Work" />

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
              Projects I&apos;ve built
              <em style={{ color: "var(--accent)" }}> for real users.</em>
            </h2>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "64px" }}>
              <p
                style={{
                  fontSize: "15px",
                  color: "var(--text-sec)",
                  maxWidth: "460px",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Each project below has a full case study. Click any entry to read
                the problem, approach, and what I learned.
              </p>

              <button
                onClick={() => setIsRevealed(!isRevealed)}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  color: isRevealed ? "var(--text-muted)" : "var(--accent)",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  transition: "color 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {isRevealed ? "Hide Systems" : `${projectDossiers.length} Systems Built`}
                <motion.div animate={{ rotate: isRevealed ? 180 : 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                  <ArrowRight size={14} style={{ transform: "rotate(90deg)" }} />
                </motion.div>
              </button>
            </div>
          </motion.div>

          {/* Dossier List */}
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: "hidden" }}
              >
                {projectDossiers.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <button
                      onClick={() => setActive(project)}
                      aria-label={`Open case study for ${project.title}`}
                      id={`dossier-${project.id}`}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "60px 1fr auto",
                        alignItems: "center",
                        gap: "24px",
                        width: "100%",
                        padding: "32px 0",
                        borderTop: "1px solid var(--border)",
                        background: "none",
                        border: "none",
                        borderTopWidth: "1px",
                        borderTopStyle: "solid",
                        borderTopColor: "var(--border)",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget;
                        el.style.paddingLeft = "16px";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget;
                        el.style.paddingLeft = "0px";
                      }}
                    >
                      {/* Index */}
                      <span
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "12px",
                          color: "var(--text-muted)",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {project.index}
                      </span>

                      {/* Title + tagline */}
                      <div>
                        <span
                          className="font-serif"
                          style={{
                            display: "block",
                            fontSize: "clamp(20px, 3vw, 28px)",
                            fontWeight: 400,
                            color: "var(--text)",
                            marginBottom: "8px",
                            lineHeight: 1.2,
                          }}
                        >
                          {project.title}
                        </span>
                        <span
                          style={{
                            fontSize: "14px",
                            color: "var(--text-sec)",
                          }}
                        >
                          {project.tagline}
                        </span>

                        {/* Tech chips */}
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "8px",
                            marginTop: "16px",
                          }}
                        >
                          {project.techStack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              style={{
                                padding: "4px 10px",
                                borderRadius: "4px",
                                border: "1px solid var(--border)",
                                fontSize: "11px",
                                color: "var(--text-sec)",
                                fontFamily: "var(--font-mono)",
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Arrow */}
                      <span
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          border: "1px solid var(--border)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "var(--text-sec)",
                          flexShrink: 0,
                          transition: "background 0.3s, color 0.3s, border-color 0.3s",
                        }}
                        onMouseEnter={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = "var(--text)";
                          el.style.color = "var(--bg)";
                          el.style.borderColor = "var(--text)";
                        }}
                        onMouseLeave={(e) => {
                          const el = e.currentTarget as HTMLElement;
                          el.style.background = "transparent";
                          el.style.color = "var(--text-sec)";
                          el.style.borderColor = "var(--border)";
                        }}
                      >
                        <ArrowRight size={16} />
                      </span>
                    </button>

                    {/* Last border */}
                    {i === projectDossiers.length - 1 && (
                      <div
                        style={{
                          borderTop: "1px solid var(--border)",
                        }}
                      />
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Case Study Overlay */}
      <AnimatePresence>
        {active && (
          <DossierOverlay project={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
