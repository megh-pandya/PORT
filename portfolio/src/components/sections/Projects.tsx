"use client";

import React, { useRef, useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { projectDossiers } from "@/data/portfolio";
import { ProjectDossier } from "@/types";
import { ArrowUpRight, Code2, X, ExternalLink, Lock } from "lucide-react";
import { ScrambledHeading } from "@/components/ui/ScrambledHeading";

/* ── Case Study Overlay ──────────────────────────────────── */
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
        style={{ maxWidth: "740px", margin: "0 auto", position: "relative" }}
      >
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

        <p style={{ color: "var(--text-sec)", fontSize: "16px", marginBottom: "36px" }}>
          {project.tagline}
        </p>

        <div style={{ height: "1px", background: "var(--border)", marginBottom: "40px" }} />

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
            <p style={{ color: "var(--text)", lineHeight: 1.75, fontSize: "15px" }}>{text}</p>
          </div>
        ))}

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

/* ── Project card action buttons ─────────────────────────── */
function ProjectActions({ project }: { project: ProjectDossier }) {
  const btnBase: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    letterSpacing: "0.08em",
    textDecoration: "none",
    padding: "6px 13px",
    borderRadius: "6px",
    border: "1px solid var(--border)",
    background: "var(--surface)",
    transition: "border-color 0.2s, color 0.2s",
    color: "var(--text)",
    cursor: "pointer",
  };

  const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.borderColor = "var(--accent)";
    e.currentTarget.style.color = "var(--accent)";
  };
  const handleLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.borderColor = "var(--border)";
    e.currentTarget.style.color = "var(--text)";
  };

  // Attendance — private, no links
  if (!project.live && !project.github) {
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          letterSpacing: "0.08em",
          padding: "6px 13px",
          borderRadius: "6px",
          border: "1px solid var(--border)",
          background: "var(--surface-alt)",
          color: "var(--text-muted)",
          cursor: "default",
          userSelect: "none",
        }}
      >
        <Lock size={10} />
        Private Project
      </span>
    );
  }

  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={btnBase}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          View Live <ExternalLink size={11} />
        </a>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          style={btnBase}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          GitHub <Code2 size={11} />
        </a>
      )}
    </div>
  );
}

/* ── 3D Tilt Card ────────────────────────────────────────── */
function TiltCard({
  project,
  onOpenDossier,
  align,
}: {
  project: ProjectDossier;
  onOpenDossier: (p: ProjectDossier) => void;
  align: "left" | "right";
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const springRotX = useSpring(rotateX, { stiffness: 300, damping: 30, mass: 0.5 });
  const springRotY = useSpring(rotateY, { stiffness: 300, damping: 30, mass: 0.5 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      rotateX.set(-dy * 8);
      rotateY.set(dx * 8);
      glowX.set(((e.clientX - rect.left) / rect.width) * 100);
      glowY.set(((e.clientY - rect.top) / rect.height) * 100);
    },
    [isMobile, rotateX, rotateY, glowX, glowY]
  );

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
    setIsHovered(false);
  };

  const glowBackground = useTransform(
    [glowX, glowY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(196,106,61,0.13) 0%, transparent 60%)`
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      style={{
        alignSelf: align === "right" ? "flex-end" : "flex-start",
        width: "100%",
        maxWidth: align === "right" ? "540px" : "600px",
        marginTop: align === "right" ? "20px" : "0",
        perspective: "1000px",
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isMobile ? 0 : springRotX,
          rotateY: isMobile ? 0 : springRotY,
          transformStyle: "preserve-3d",
          borderRadius: "16px",
          position: "relative",
          willChange: "transform",
        }}
        className="project-card"
      >
        {/* Mouse glow */}
        {!isMobile && (
          <motion.div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "16px",
              background: glowBackground,
              pointerEvents: "none",
              zIndex: 2,
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          />
        )}

        <motion.div
          animate={{
            borderColor: isHovered ? "var(--accent)" : "var(--border)",
            boxShadow: isHovered
              ? "0 24px 48px rgba(196,106,61,0.11), 0 8px 16px rgba(0,0,0,0.25)"
              : "0 4px 30px rgba(0,0,0,0.04)",
          }}
          transition={{ duration: 0.3 }}
          style={{
            padding: "48px",
            borderRadius: "16px",
            border: "1px solid",
            backgroundColor: "var(--surface-alt)",
            position: "relative",
            overflow: "hidden",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Index */}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--accent)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "20px",
              transform: "translateZ(0px)",
            }}
          >
            System · {project.index}
          </span>

          {/* Title */}
          <h3
            className="font-serif"
            style={{
              fontSize: "clamp(24px, 3.5vw, 34px)",
              fontWeight: 400,
              color: "var(--text)",
              lineHeight: 1.2,
              marginBottom: "12px",
              transform: isMobile ? "none" : "translateZ(20px)",
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              fontSize: "14px",
              color: "var(--text-sec)",
              lineHeight: 1.65,
              marginBottom: "24px",
              transform: isMobile ? "none" : "translateZ(12px)",
            }}
          >
            {project.tagline}
          </p>

          {/* Tech tags */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "7px",
              marginBottom: "32px",
              transform: isMobile ? "none" : "translateZ(10px)",
            }}
          >
            {project.techStack.map((tech) => (
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

          {/* Action buttons */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              alignItems: "center",
              transform: isMobile ? "none" : "translateZ(15px)",
            }}
          >
            <ProjectActions project={project} />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ── Projects section ────────────────────────────────────── */
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
            background: "linear-gradient(90deg, transparent, var(--border), transparent)",
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
              <ScrambledHeading text="Projects I've built " as="span" />
              <em style={{ color: "var(--accent)" }}> for real users.</em>
            </h2>

            <div style={{ marginBottom: "72px" }}>
              <p
                style={{
                  fontSize: "15px",
                  color: "var(--text-sec)",
                  maxWidth: "460px",
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Hover cards to explore the 3D effect. Click{" "}
                <em style={{ fontStyle: "normal", color: "var(--text)" }}>Case Study</em>{" "}
                for the full engineering breakdown.
              </p>
            </div>
          </motion.div>

          {/* Cards */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "80px",
              marginTop: "40px",
              width: "100%",
            }}
          >
            {projectDossiers.map((project, i) => (
              <TiltCard
                key={project.id}
                project={project}
                onOpenDossier={setActive}
                align={i % 2 === 0 ? "left" : "right"}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active && <DossierOverlay project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  );
}
