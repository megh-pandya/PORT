import { ReactNode } from "react";

export interface NavItem {
  href: string;
  label: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface AboutCard {
  kicker: string;
  title: string;
  body: string;
}

export interface Service {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface SkillGroup {
  label: string;
  skills: string[];
  muted?: boolean;
}

export interface Project {
  title: string;
  description: string;
  stack: string[];
  tone: "blue" | "green" | "orange" | "purple";
  live?: string;
  github?: string;
}

export interface Experience {
  role: string;
  company: string;
  date: string;
  description: string;
  tags: string[];
}

export interface Achievement {
  type: string;
  title: string;
  org: string;
  year: string;
}
