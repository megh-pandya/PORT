"use client";

import React, { useRef } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  strength?: number;
  as?: "button" | "a";
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  target,
  rel,
  type = "button",
  disabled = false,
  strength = 0.3,
  as = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0px, 0px)";
  };

  const innerStyle: React.CSSProperties = {
    transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const content =
    as === "a" && href ? (
      <a
        href={href}
        target={target}
        rel={rel}
        className={className}
        style={innerStyle}
      >
        {children}
      </a>
    ) : (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={className}
        style={innerStyle}
      >
        {children}
      </button>
    );

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-flex", transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)" }}
    >
      {content}
    </div>
  );
}
