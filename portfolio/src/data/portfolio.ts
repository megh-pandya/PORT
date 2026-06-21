import { NavItem, ProjectDossier, TechItem, JourneyEntry } from "../types";

/* ── Navigation ──────────────────────────────────────────── */
export const navItems: NavItem[] = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#stack", label: "Stack" },
  { href: "/resume.pdf", label: "Resume" },
];

/* ── Project Dossiers ────────────────────────────────────── */
export const projectDossiers: ProjectDossier[] = [
  {
    id: "seaneb",
    index: "01",
    title: "Seaneb Real Estate Platform",
    tagline: "A live multi-role property platform built for real users.",
    problem:
      "A real estate business needed a unified web platform that let buyers search properties, agents manage listings, and admins oversee business operations — all in one place, live in production.",
    challenge:
      "Coordinating multiple user roles (buyer, agent, admin) with distinct dashboards, real-time property data, and secure authentication while maintaining fast page load times and mobile responsiveness under live traffic.",
    approach:
      "Adopted Next.js App Router with role-based routing and server-side data fetching. Built a shared reusable component library to minimize duplication across the three dashboards. Used lazy loading and dynamic imports to improve perceived performance.",
    solution:
      "Delivered property search, listing management, business operations, and three role-based dashboards. Integrated 10+ REST APIs covering property data, authentication, analytics, and subscription plans. Improved Core Web Vitals through SSR strategies, lazy loading, and image optimization.",
    result:
      "Platform is live at seaneb.com. Achieved significant reduction in duplicate code (~40%) through shared UI components. Improved mobile responsiveness and production bug fixes shipped under live traffic.",
    lessons:
      "Working on a live production codebase taught me to prioritize stability before speed — small, well-tested changes over sweeping rewrites. Real-world API integration has many edge cases that documentation never covers.",
    techStack: ["Next.js", "React.js", "Tailwind CSS", "REST APIs", "MySQL", "Git"],
    live: "https://seaneb.com",
    github: "https://github.com/megh-pandya/SEANEB-REAL-ESTATE-1",
  },
  {
    id: "attendance",
    index: "02",
    title: "Attendance Management System",
    tagline: "A role-based attendance platform for academic institutions.",
    problem:
      "Manual attendance tracking in academic institutions is error-prone, time-consuming, and makes report generation difficult. There was no centralized system for admins, faculty, and students to manage and view attendance data.",
    challenge:
      "Designing a clear separation of concerns between three user roles (Admin, Faculty, Student) with appropriate access controls, while keeping the interface simple enough for daily use by non-technical staff.",
    approach:
      "Built a PHP/MySQL backend with session-based authentication and role routing. Designed separate dashboard views for each role. Implemented report generation with export functionality for admins and faculty.",
    solution:
      "A complete web-based attendance system with: Admin dashboard (manage users, view all reports), Faculty dashboard (mark attendance, generate reports), Student dashboard (view own attendance records). Secure authentication, export modules, and data management tools.",
    result:
      "Fully functional system covering the complete attendance workflow from marking to reporting. Clean separation of admin, faculty, and student roles with secure login.",
    lessons:
      "This project reinforced the importance of user role separation at the routing and data layer, not just the UI level. Clean database schema design pays dividends when building reports.",
    techStack: ["PHP", "MySQL", "phpMyAdmin", "HTML5", "CSS3", "Bootstrap"],
    github: "https://github.com/megh17/attendance-system",
  },
  {
    id: "portfolio",
    index: "03",
    title: "Personal Portfolio v2",
    tagline: "A bespoke, premium, and recruiter-focused digital experience.",
    problem:
      "Traditional developer portfolios are often generic templates or over-designed OS simulations that distract recruiters from evaluating core software engineering skills and credentials.",
    challenge:
      "Designing a fast, high-performance, dark-mode-first digital product with smooth custom micro-animations (like a morphing trailing cursor and page loaders) while ensuring perfect SEO, accessibility, and zero hydration layout shifts.",
    approach:
      "Developed a custom Next.js App Router project leveraging Framer Motion for premium micro-animations. Styled with vanilla CSS variables for immediate rendering and layout stability. Curated a clean, focused, content-driven experience.",
    solution:
      "A fast, responsive, modern digital showcase featuring a custom count-up preloader, experiential section indicators, a responsive morphing trailing cursor, a unified command palette, and dark/light theme switching with seamless local storage persistence.",
    result:
      "A bespoke portfolio that successfully passes all Lighthouse audits, scores 100% build ready, and clearly showcases professional Next.js/React experience.",
    lessons:
      "Micro-animations require careful performance budgeting and device checks to avoid causing frame drops or poor mobile user experiences. Clean typography structure creates a stronger impact than heavy graphical features.",
    techStack: ["Next.js", "React.js", "Framer Motion", "TypeScript", "Vanilla CSS", "Git"],
    github: "https://github.com/megh-pandya/Portfolio",
  },
];

/* ── Tech Arsenal ────────────────────────────────────────── */
export const techArsenal: TechItem[] = [
  // Frontend
  { name: "Next.js", category: "frontend", note: "App Router, SSR, ISR — primary production stack at Seaneb" },
  { name: "React.js", category: "frontend", note: "Component architecture, hooks, state management" },
  { name: "Tailwind CSS", category: "frontend", note: "Utility-first styling, responsive design systems" },
  { name: "JavaScript ES6+", category: "frontend", note: "Core language — async/await, modules, destructuring" },
  { name: "HTML5", category: "frontend", note: "Semantic markup, accessibility, structure" },
  { name: "CSS3", category: "frontend", note: "Flexbox, Grid, animations, responsive design" },
  { name: "Bootstrap", category: "frontend", note: "Used in academic projects and legacy interfaces" },

  // Backend
  { name: "Node.js", category: "backend", note: "Server-side JavaScript, runtime environment" },
  { name: "Express.js", category: "backend", note: "REST API development, routing, middleware" },
  { name: "PHP", category: "backend", note: "Server-side scripting, used in Attendance Management System" },
  { name: "REST APIs", category: "backend", note: "Integrated 10+ APIs — auth, analytics, property data" },
  { name: "AJAX", category: "backend", note: "Async data fetching in legacy/PHP projects" },

  // Database
  { name: "MySQL", category: "database", note: "Relational DB — used at Seaneb and in academic projects" },
  { name: "PostgreSQL", category: "database", note: "Studied and used in coursework" },
  { name: "MongoDB", category: "database", note: "NoSQL — used in Node.js API projects" },
  { name: "phpMyAdmin", category: "database", note: "Database administration for PHP/MySQL systems" },

  // Tools
  { name: "Git", category: "tools", note: "Version control, branching, collaborative workflows" },
  { name: "GitHub", category: "tools", note: "Code hosting, pull requests, project management" },
  { name: "VS Code", category: "tools", note: "Primary development environment" },
  { name: "Postman", category: "tools", note: "API testing and documentation" },

  // Deployment
  { name: "Vercel", category: "deployment", note: "Next.js deployments, edge functions, preview URLs" },

  // Exploring
  { name: "TypeScript", category: "exploring", note: "Actively learning — strong typing, interfaces, generics" },
  { name: "Docker", category: "exploring", note: "Containerization basics, development environments" },
  { name: "AWS Basics", category: "exploring", note: "S3, EC2 fundamentals — in progress" },
];

/* ── Journey (Experience + Education) ───────────────────── */
export const journeyEntries: JourneyEntry[] = [
  {
    type: "work",
    role: "Full Stack Developer Intern",
    org: "Seaneb Technologies",
    period: "Dec 2025 – Apr 2026",
    summary:
      "Built and shipped full stack features for a live Next.js real estate platform serving real users.",
    highlights: [
      "Built property listing, dashboard, and user-profile modules",
      "Integrated 10+ REST APIs (authentication, analytics, subscription plans, property data)",
      "Improved Core Web Vitals with lazy loading, dynamic imports, and SSR strategies",
      "Refactored shared UI components — reduced duplicate code by ~40%",
      "Improved mobile responsiveness across the platform",
      "Fixed production bugs under live traffic",
    ],
    tags: ["Next.js", "React.js", "Tailwind CSS", "REST APIs", "MySQL", "Git"],
  },
  {
    type: "education",
    role: "Master of Computer Application (MCA)",
    org: "ISTAR — CVM University",
    period: "2024 – 2026",
    summary:
      "Postgraduate program in computer applications with a focus on software development and web technologies.",
    highlights: [
      "Current CGPA: 8.53",
      "SEM-1: 7.50 · SEM-2: 8.40 · SEM-3: 8.70",
    ],
    tags: ["MCA", "Software Development", "Web Technologies", "Databases"],
  },
  {
    type: "education",
    role: "Bachelor of Computer Application (BCA)",
    org: "SEMCOM — CVM University",
    period: "2020 – 2023",
    summary:
      "Undergraduate program building a strong foundation in programming, databases, and web application development.",
    highlights: ["Graduated with CGPA: 8.32"],
    tags: ["BCA", "Programming", "Databases", "Web Development"],
  },
];
