"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { journeyEntries } from "@/data/portfolio";
import { Briefcase, GraduationCap } from "lucide-react";

export function Journey() {
  return (
    <section
      id="experience"
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
            Experience &
            <em style={{ color: "var(--accent)" }}> education.</em>
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
            The honest record — one internship, two degrees, all directly from
            the resume.
          </p>
        </motion.div>

        {/* Journey Entries */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {journeyEntries.map((entry, i) => (
            <motion.div
              key={`${entry.role}-${entry.period}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{
                padding: "32px",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                background: "var(--bg)",
                position: "relative",
                transition: "background 0.3s ease",
              }}
              whileHover={{ backgroundColor: "var(--surface)" } as { backgroundColor: string }}
            >
              {/* Top row: Period + type icon */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
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
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "5px 12px",
                    borderRadius: "20px",
                    border: "1px solid var(--border)",
                    background: "var(--bg)",
                    fontSize: "11px",
                    color:
                      entry.type === "work" ? "var(--accent)" : "var(--text-sec)",
                    fontFamily: "var(--font-mono)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  {entry.type === "work" ? (
                    <Briefcase size={10} />
                  ) : (
                    <GraduationCap size={10} />
                  )}
                  {entry.type === "work" ? "Work" : "Education"}
                </span>
              </div>

              {/* Role */}
              <h3
                className="font-serif"
                style={{
                  fontSize: "clamp(22px, 3vw, 30px)",
                  fontWeight: 400,
                  color: "var(--text)",
                  marginBottom: "4px",
                  lineHeight: 1.2,
                }}
              >
                {entry.role}
              </h3>

              {/* Organisation */}
              <p
                style={{
                  fontSize: "14px",
                  color: "var(--accent)",
                  fontWeight: 500,
                  marginBottom: "16px",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {entry.org}
              </p>

              {/* Summary */}
              <p
                style={{
                  fontSize: "15px",
                  color: "var(--text-sec)",
                  lineHeight: 1.7,
                  marginBottom: "20px",
                  maxWidth: "620px",
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
                    margin: "0 0 24px 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  {entry.highlights.map((h) => (
                    <li
                      key={h}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "10px",
                        fontSize: "14px",
                        color: "var(--text)",
                        lineHeight: 1.5,
                      }}
                    >
                      <span
                        style={{
                          color: "var(--accent)",
                          marginTop: "2px",
                          flexShrink: 0,
                          fontFamily: "var(--font-mono)",
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
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      padding: "4px 10px",
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
