"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { journeyEntries } from "@/data/portfolio";
import { Briefcase, GraduationCap } from "lucide-react";
import { ScrambledHeading } from "@/components/ui/ScrambledHeading";

/* ── Milestone dot ───────────────────────────────────────── */
function MilestoneDot({ isWork }: { isWork: boolean }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
      style={{
        width: 14,
        height: 14,
        borderRadius: "50%",
        backgroundColor: isWork ? "var(--accent)" : "var(--surface-alt)",
        border: `2px solid ${isWork ? "var(--accent)" : "var(--border-alt)"}`,
        flexShrink: 0,
        position: "relative",
        zIndex: 2,
        marginTop: 4,
      }}
    >
      {isWork && (
        <motion.div
          animate={{ scale: [1, 2.4, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
          style={{
            position: "absolute",
            inset: -4,
            borderRadius: "50%",
            border: "1px solid var(--accent)",
          }}
        />
      )}
    </motion.div>
  );
}

/* ── Journey section ─────────────────────────────────────── */
export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 30%"],
  });

  const lineProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 18 });
  const lineScaleY = useTransform(lineProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="experience"
      style={{
        padding: "120px 24px",
        backgroundColor: "var(--surface)",
        position: "relative",
      }}
    >
      {/* Top divider */}
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionLabel label="Journey" />

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
            <ScrambledHeading text="Experience & " as="span" />
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>education.</em>
          </h2>

          <p
            style={{
              fontSize: "15px",
              color: "var(--text-sec)",
              marginBottom: "72px",
              maxWidth: "460px",
              lineHeight: 1.65,
            }}
          >
            The honest record — one internship, two degrees.
          </p>
        </motion.div>

        {/* Timeline layout */}
        <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>

          {/* Draw-on-scroll vertical line */}
          <div
            style={{
              width: 2,
              flexShrink: 0,
              position: "relative",
              alignSelf: "stretch",
            }}
          >
            {/* Track */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 2,
                background: "var(--border)",
                borderRadius: 2,
              }}
            />
            {/* Animated fill — scale from top as user scrolls */}
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 2,
                height: "100%",
                background: "linear-gradient(to bottom, var(--accent), rgba(196,106,61,0.3))",
                borderRadius: 2,
                transformOrigin: "top center",
                scaleY: lineScaleY,
              }}
            />
          </div>

          {/* Entries */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 0,
              marginLeft: "-29px", // Pull dot over the line
            }}
          >
            {journeyEntries.map((entry, i) => (
              <div
                key={`${entry.role}-${i}`}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "22px",
                  marginBottom: i < journeyEntries.length - 1 ? "52px" : 0,
                }}
              >
                <MilestoneDot isWork={entry.type === "work"} />

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    flex: 1,
                    padding: "28px 32px",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    background: "var(--bg)",
                    transition: "background 0.3s ease, border-color 0.3s ease",
                  }}
                  whileHover={{
                    backgroundColor: "var(--surface)",
                    borderColor: "var(--border-alt)",
                  }}
                >
                  {/* Period + badge row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "8px",
                      marginBottom: "16px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "var(--text-muted)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {entry.period}
                    </span>

                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "4px 10px",
                        borderRadius: "20px",
                        border: "1px solid var(--border)",
                        background: "var(--bg)",
                        fontSize: "11px",
                        color: entry.type === "work" ? "var(--accent)" : "var(--text-sec)",
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {entry.type === "work" ? <Briefcase size={10} /> : <GraduationCap size={10} />}
                      {entry.type === "work" ? "Work" : "Education"}
                    </span>
                  </div>

                  {/* Role */}
                  <h3
                    className="font-serif"
                    style={{
                      fontSize: "clamp(19px, 2.8vw, 26px)",
                      fontWeight: 400,
                      color: "var(--text)",
                      marginBottom: "4px",
                      lineHeight: 1.25,
                    }}
                  >
                    {entry.role}
                  </h3>

                  {/* Org */}
                  <p
                    style={{
                      fontSize: "13px",
                      color: "var(--accent)",
                      fontWeight: 500,
                      marginBottom: "14px",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {entry.org}
                  </p>

                  {/* Summary */}
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--text-sec)",
                      lineHeight: 1.7,
                      marginBottom: entry.highlights.length > 0 ? "16px" : 0,
                      maxWidth: "580px",
                    }}
                  >
                    {entry.summary}
                  </p>

                  {/* Highlights */}
                  {entry.highlights.length > 0 && (
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "0 0 20px 0",
                        display: "flex",
                        flexDirection: "column",
                        gap: "7px",
                      }}
                    >
                      {entry.highlights.map((h) => (
                        <li
                          key={h}
                          style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "10px",
                            fontSize: "13px",
                            color: "var(--text)",
                            lineHeight: 1.6,
                          }}
                        >
                          <span
                            style={{
                              color: "var(--accent)",
                              flexShrink: 0,
                              fontFamily: "var(--font-mono)",
                              marginTop: "1px",
                            }}
                          >
                            →
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Tags */}
                  {entry.tags.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            padding: "3px 9px",
                            borderRadius: "4px",
                            border: "1px solid var(--border)",
                            background: "var(--bg)",
                            fontSize: "11px",
                            color: "var(--text-muted)",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
