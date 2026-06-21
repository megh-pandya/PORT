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
        background: "var(--overlay-bg)",
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

  return (
    <>
      <section
        id="projects"
        style={{
          padding: "120px 24px",
          backgroundColor: "var(--surface)",
          position: "relative",
          overflow: "hidden",
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

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "72px" }}>
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
            </div>
          </motion.div>

          {/* Asymmetrical Grid */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "100px",
              marginTop: "40px",
              width: "100%",
            }}
          >
            {/* Project 1 (Left Aligned) */}
            {projectDossiers[0] && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  alignSelf: "flex-start",
                  width: "100%",
                  maxWidth: "600px",
                }}
              >
                <button
                  onClick={() => setActive(projectDossiers[0])}
                  aria-label={`Open case study for ${projectDossiers[0].title}`}
                  id={`dossier-${projectDossiers[0].id}`}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "48px",
                    borderRadius: "16px",
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--surface-alt)",
                    textAlign: "left",
                    cursor: "pointer",
                    position: "relative",
                    transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.4s, box-shadow 0.4s",
                    boxShadow: "0 4px 30px rgba(0,0,0,0.02)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "translateY(-8px)";
                    el.style.borderColor = "var(--accent)";
                    el.style.boxShadow = "0 20px 40px var(--accent-glow)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "translateY(0px)";
                    el.style.borderColor = "var(--border)";
                    el.style.boxShadow = "0 4px 30px rgba(0,0,0,0.02)";
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "var(--accent)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "20px",
                    }}
                  >
                    System · {projectDossiers[0].index}
                  </span>
                  <h3
                    className="font-serif"
                    style={{
                      fontSize: "clamp(26px, 4vw, 36px)",
                      fontWeight: 400,
                      color: "var(--text)",
                      lineHeight: 1.2,
                      marginBottom: "14px",
                    }}
                  >
                    {projectDossiers[0].title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-sec)",
                      lineHeight: 1.6,
                      marginBottom: "28px",
                    }}
                  >
                    {projectDossiers[0].tagline}
                  </p>
                  
                  {/* Tech stack */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "36px" }}>
                    {projectDossiers[0].techStack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "4px",
                          border: "1px solid var(--border)",
                          background: "var(--surface)",
                          fontSize: "11px",
                          color: "var(--text-sec)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA link */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text)", letterSpacing: "0.08em" }}>
                    <span>READ CASE STUDY</span>
                    <ArrowRight size={12} style={{ color: "var(--accent)" }} />
                  </div>
                </button>
              </motion.div>
            )}

            {/* Project 2 (Right Aligned, Offset down) */}
            {projectDossiers[1] && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.0, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  alignSelf: "flex-end",
                  width: "100%",
                  maxWidth: "540px",
                  marginTop: "20px",
                }}
              >
                <button
                  onClick={() => setActive(projectDossiers[1])}
                  aria-label={`Open case study for ${projectDossiers[1].title}`}
                  id={`dossier-${projectDossiers[1].id}`}
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "48px",
                    borderRadius: "16px",
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--surface-alt)",
                    textAlign: "left",
                    cursor: "pointer",
                    position: "relative",
                    transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.4s, box-shadow 0.4s",
                    boxShadow: "0 4px 30px rgba(0,0,0,0.02)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "translateY(-8px)";
                    el.style.borderColor = "var(--accent)";
                    el.style.boxShadow = "0 20px 40px var(--accent-glow)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "translateY(0px)";
                    el.style.borderColor = "var(--border)";
                    el.style.boxShadow = "0 4px 30px rgba(0,0,0,0.02)";
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "var(--accent)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "20px",
                    }}
                  >
                    System · {projectDossiers[1].index}
                  </span>
                  <h3
                    className="font-serif"
                    style={{
                      fontSize: "clamp(26px, 4vw, 36px)",
                      fontWeight: 400,
                      color: "var(--text)",
                      lineHeight: 1.2,
                      marginBottom: "14px",
                    }}
                  >
                    {projectDossiers[1].title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-sec)",
                      lineHeight: 1.6,
                      marginBottom: "28px",
                    }}
                  >
                    {projectDossiers[1].tagline}
                  </p>
                  
                  {/* Tech stack */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "36px" }}>
                    {projectDossiers[1].techStack.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "4px",
                          border: "1px solid var(--border)",
                          background: "var(--surface)",
                          fontSize: "11px",
                          color: "var(--text-sec)",
                          fontFamily: "var(--font-mono)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA link */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text)", letterSpacing: "0.08em" }}>
                    <span>READ CASE STUDY</span>
                    <ArrowRight size={12} style={{ color: "var(--accent)" }} />
                  </div>
                </button>
              </motion.div>
            )}
          </div>
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
