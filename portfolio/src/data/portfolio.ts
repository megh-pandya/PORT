import { Code2, Zap, Plug, Smartphone, Brain, Rocket } from "lucide-react";
import React from "react";
import {
  NavItem,
  Stat,
  AboutCard,
  Service,
  SkillGroup,
  Project,
  Experience,
  Achievement,
} from "../types";

export const navItems: NavItem[] = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export const stats: Stat[] = [
  { value: "10+", label: "REST APIs Integrated" },
  { value: "~40%", label: "Duplicate Code Reduced" },
  { value: "8.53", label: "MCA CGPA" },
  { value: "3", label: "Role-Based Dashboards" },
];

export const aboutCards: AboutCard[] = [
  {
    kicker: "01",
    title: "Production-Focused Builder",
    body: "I build and ship full stack features for real users, from role-based dashboards and REST API integrations to responsive UI workflows.",
  },
  {
    kicker: "02",
    title: "Performance Minded",
    body: "I use lazy loading, dynamic imports, SSR strategies, and cleaner component structure to improve page speed and Core Web Vitals.",
  },
  {
    kicker: "03",
    title: "Clean Architecture",
    body: "I focus on reusable components, maintainable code, API integration, and measurable delivery across frontend and backend layers.",
  },
];

export const services: Service[] = [
  {
    icon: React.createElement(Code2),
    title: "Full Stack Development",
    description:
      "End-to-end web application development with modern tech stack for scalable and performant solutions.",
  },
  {
    icon: React.createElement(Zap),
    title: "Performance Optimization",
    description:
      "Speed up your applications with lazy loading, code splitting, SSR strategies, and Core Web Vitals improvements.",
  },
  {
    icon: React.createElement(Plug),
    title: "API Integration",
    description:
      "Seamless REST API integration, authentication workflows, and real-time data synchronization.",
  },
  {
    icon: React.createElement(Smartphone),
    title: "Responsive Design",
    description:
      "Mobile-first design that looks perfect on all devices with intuitive user interfaces.",
  },
  {
    icon: React.createElement(Brain),
    title: "Clean Code",
    description:
      "Maintainable, scalable code architecture with proper structure, documentation, and best practices.",
  },
  {
    icon: React.createElement(Rocket),
    title: "Quick Turnaround",
    description:
      "Fast delivery without compromising quality. Efficient project completion with proven methodologies.",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: "Primary Stack",
    skills: ["Next.js", "React.js", "Node.js", "Express.js", "PHP", "PostgreSQL"],
  },
  {
    label: "Frontend & APIs",
    skills: ["HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "REST APIs", "AJAX"],
  },
  {
    label: "Databases & Tools",
    skills: ["MongoDB", "MySQL", "Git", "GitHub", "VS Code", "Postman", "Vercel"],
  },
  {
    label: "Languages",
    skills: ["JavaScript (ES6+)", "PHP", "Python", "Java", "C++"],
  },
  {
    label: "Concepts",
    skills: ["OOP", "DSA", "MVC", "Responsive Design", "API Integration", "Performance"],
  },
  {
    label: "Exploring",
    skills: ["TypeScript", "Docker", "AWS Basics"],
    muted: true,
  },
];

export const projects: Project[] = [
  {
    title: "Seaneb Real Estate Platform",
    description:
      "Live multi-role web platform for property search, listing management, business operations, dashboards, and real-time property data.",
    stack: ["Next.js", "React.js", "Tailwind CSS", "REST APIs", "MySQL"],
    tone: "blue",
    live: "https://seaneb.com",
    github: "https://github.com/megh-pandya/SEANEB-REAL-ESTATE-1",
  },
  {
    title: "Attendance Management System",
    description:
      "Role-based attendance application for Admin, Faculty, and Student users with reports, data management, and export modules.",
    stack: ["PHP", "MySQL", "phpMyAdmin"],
    tone: "green",
    github: "https://github.com/megh17/attendance-system",
  },
  {
    title: "Personal Portfolio",
    description:
      "Modern responsive portfolio built with the Next.js App Router to centralize projects, skills, experience, and contact details.",
    stack: ["Next.js", "Tailwind CSS", "Vercel"],
    tone: "purple",
    live: "https://meghpandya.dev",
  },
];

export const experience: Experience[] = [
  {
    role: "Full Stack Developer Intern",
    company: "Seaneb Technologies",
    date: "Dec 2025 - Apr 2026",
    description:
      "Built and shipped property listing, dashboard, and user-profile modules for a live Next.js platform. Integrated 10+ REST APIs, improved perceived page-load time with lazy loading, dynamic imports, and SSR strategies, and refactored shared UI components to cut duplicate code by about 40%.",
    tags: ["Next.js", "React.js", "Tailwind CSS", "REST APIs", "MySQL", "Git"],
  },
  {
    role: "Master of Computer Application (MCA)",
    company: "ISTAR - CVM University",
    date: "2024 - 2026",
    description:
      "Current MCA student with CGPA 8.53. Semester scores: SEM-1 7.50, SEM-2 8.40, and SEM-3 8.70.",
    tags: ["MCA", "CGPA 8.53", "Software Development", "Web Technologies"],
  },
  {
    role: "Bachelor of Computer Application (BCA)",
    company: "SEMCOM - CVM University",
    date: "2020 - 2023",
    description:
      "Completed BCA with CGPA 8.32, building a strong foundation in programming, databases, and web application development.",
    tags: ["BCA", "CGPA 8.32", "Programming", "Databases"],
  },
];

export const achievements: Achievement[] = [
  { type: "Internship", title: "Production Next.js platform", org: "Seaneb Technologies", year: "2025-2026" },
  { type: "API Work", title: "10+ REST API integrations", org: "Authentication, analytics, plans, and property data", year: "Live" },
  { type: "Optimization", title: "Core Web Vitals improvements", org: "Lazy loading, dynamic imports, and SSR strategies", year: "Next.js" },
  { type: "Refactor", title: "~40% duplicate code reduction", org: "Reusable shared UI component library", year: "Delivery" },
  { type: "Academic", title: "MCA CGPA 8.53", org: "ISTAR - CVM University", year: "2024-2026" },
  { type: "Academic", title: "BCA CGPA 8.32", org: "SEMCOM - CVM University", year: "2020-2023" },
];
