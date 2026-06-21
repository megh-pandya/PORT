"use client";

import React from "react";

interface SectionLabelProps {
  label: string;
  className?: string;
}

export function SectionLabel({ label, className = "" }: SectionLabelProps) {
  return (
    <div
      className={`flex items-center gap-3 mb-4 ${className}`}
      style={{ color: "var(--accent)" }}
    >
      <span
        style={{
          display: "block",
          width: "24px",
          height: "1px",
          backgroundColor: "var(--accent)",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          fontFamily: "var(--font-mono)",
        }}
      >
        {label}
      </span>
    </div>
  );
}
