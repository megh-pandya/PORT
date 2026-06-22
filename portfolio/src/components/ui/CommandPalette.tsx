"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderOpen,
  FileText,
  Mail,
  Layers,
  Code2,
  Link,
  Home,
  Search,
  Sun,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface CommandItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toggle: toggleTheme, theme } = useTheme();

  const commands: CommandItem[] = [
    {
      id: "home",
      label: "Go Home",
      description: "Return to the top of the page",
      icon: <Home size={15} />,
      action: () => { window.scrollTo({ top: 0, behavior: "smooth" }); onClose(); },
    },
    {
      id: "experience",
      label: "Show Experience",
      description: "Jump to the Journey section",
      icon: <FolderOpen size={15} />,
      action: () => { scrollTo("experience"); onClose(); },
    },
    {
      id: "projects",
      label: "Show Projects",
      description: "Jump to Selected Work section",
      icon: <FolderOpen size={15} />,
      action: () => { scrollTo("projects"); onClose(); },
    },
    {
      id: "skills",
      label: "Tech Stack",
      description: "View the full technology toolkit",
      icon: <Layers size={15} />,
      action: () => { scrollTo("stack"); onClose(); },
    },
    {
      id: "resume",
      label: "Download Resume",
      description: "Open resume PDF in a new tab",
      icon: <FileText size={15} />,
      action: () => { window.dispatchEvent(new CustomEvent('open-resume')); onClose(); },
    },
    {
      id: "contact",
      label: "Contact",
      description: "Jump to the terminal contact section",
      icon: <Mail size={15} />,
      action: () => { scrollTo("contact"); onClose(); },
    },
    {
      id: "github",
      label: "Open GitHub",
      description: "Visit github.com/megh17",
      icon: <Code2 size={15} />,
      action: () => { window.open("https://github.com/megh17", "_blank"); onClose(); },
    },
    {
      id: "linkedin",
      label: "Open LinkedIn",
      description: "Visit linkedin.com/in/megh17",
      icon: <Link size={15} />,
      action: () => { window.open("https://www.linkedin.com/in/megh17/", "_blank"); onClose(); },
    },
    {
      id: "theme",
      label: theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode",
      description: "Toggle between light and dark theme",
      icon: <Sun size={15} />,
      action: () => { toggleTheme(); onClose(); },
    },
  ];

  const filtered = query.trim()
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        filtered[activeIndex]?.action();
      }
    },
    [filtered, activeIndex]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="cmd-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "560px",
              background: "#1A1A1A",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.1)",
              overflow: "hidden",
              boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
            }}
          >
            {/* Search Input */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "16px 18px",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <Search size={16} style={{ color: "#78716C", flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Search commands…"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#F5F3EE",
                  fontSize: "15px",
                  fontFamily: "inherit",
                }}
                aria-label="Command search"
                id="command-palette-input"
              />
              <button
                onClick={onClose}
                style={{
                  background: "rgba(255,255,255,0.07)",
                  border: "none",
                  borderRadius: "5px",
                  color: "#78716C",
                  padding: "3px 8px",
                  fontSize: "11px",
                  fontFamily: "inherit",
                  cursor: "pointer",
                }}
                aria-label="Close command palette"
              >
                ESC
              </button>
            </div>

            {/* Command List */}
            <div style={{ padding: "6px", maxHeight: "340px", overflowY: "auto" }}>
              {filtered.length === 0 ? (
                <div
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "#78716C",
                    fontSize: "14px",
                  }}
                >
                  No commands found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                filtered.map((cmd, i) => (
                  <button
                    key={cmd.id}
                    id={`cmd-item-${cmd.id}`}
                    onClick={cmd.action}
                    onMouseEnter={() => setActiveIndex(i)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      width: "100%",
                      padding: "10px 12px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      background: i === activeIndex ? "rgba(196,106,61,0.12)" : "transparent",
                      color: i === activeIndex ? "#C46A3D" : "#A8A29E",
                      transition: "background 0.1s, color 0.1s",
                      fontFamily: "inherit",
                    }}
                  >
                    <span
                      style={{
                        width: "28px",
                        height: "28px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "6px",
                        background:
                          i === activeIndex
                            ? "rgba(196,106,61,0.18)"
                            : "rgba(255,255,255,0.05)",
                        flexShrink: 0,
                        color: i === activeIndex ? "#C46A3D" : "#78716C",
                      }}
                    >
                      {cmd.icon}
                    </span>
                    <span style={{ flex: 1 }}>
                      <span
                        style={{
                          display: "block",
                          fontSize: "14px",
                          fontWeight: 500,
                          color: i === activeIndex ? "#F5F3EE" : "#D6D3CE",
                        }}
                      >
                        {cmd.label}
                      </span>
                      <span
                        style={{
                          display: "block",
                          fontSize: "12px",
                          color: i === activeIndex ? "#C46A3D" : "#78716C",
                          marginTop: "1px",
                        }}
                      >
                        {cmd.description}
                      </span>
                    </span>
                    {i === activeIndex && (
                      <span
                        style={{
                          fontSize: "11px",
                          color: "#78716C",
                          background: "rgba(255,255,255,0.05)",
                          borderRadius: "4px",
                          padding: "2px 6px",
                          flexShrink: 0,
                        }}
                      >
                        ↵
                      </span>
                    )}
                  </button>
                ))
              )}
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "10px 18px",
                borderTop: "1px solid rgba(255,255,255,0.07)",
                display: "flex",
                gap: "16px",
                fontSize: "11px",
                color: "#78716C",
              }}
            >
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>ESC close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
