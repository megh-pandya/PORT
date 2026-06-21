import { ReactNode } from "react";

/* ── Navigation ──────────────────────────────────────────── */
export interface NavItem {
  href: string;
  label: string;
}

/* ── Project Dossier ─────────────────────────────────────── */
export interface ProjectDossier {
  id: string;
  index: string;
  title: string;
  tagline: string;
  problem: string;
  challenge: string;
  approach: string;
  solution: string;
  result: string;
  lessons: string;
  techStack: string[];
  live?: string;
  github?: string;
}

/* ── Tech Arsenal ────────────────────────────────────────── */
export interface TechItem {
  name: string;
  category: "frontend" | "backend" | "database" | "tools" | "deployment" | "exploring";
  note: string;
}

/* ── Experience / Education ──────────────────────────────── */
export interface JourneyEntry {
  type: "work" | "education";
  role: string;
  org: string;
  period: string;
  summary: string;
  highlights: string[];
  tags: string[];
}

/* ── Command Palette ─────────────────────────────────────── */
export interface CommandAction {
  id: string;
  label: string;
  description: string;
  icon: ReactNode;
  action: () => void;
}

/* ── Legacy types kept for compatibility ─────────────────── */
export interface Stat {
  value: string;
  label: string;
}

export interface SkillGroup {
  label: string;
  skills: string[];
  muted?: boolean;
}
