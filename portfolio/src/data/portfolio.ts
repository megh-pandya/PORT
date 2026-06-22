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
    github: "https://github.com/megh-pandya/attendance-system",
  },

  {
    id: "uno",
    index: "03",
    title: "UNO Card Game",
    tagline: "A real-time multiplayer UNO game with an AI opponent for Android & iOS.",
    problem:
      "Card game apps are either too simple with no AI challenge, or overly complex with poor mobile UX. Players wanted a polished UNO experience that works offline with an AI, and online with friends — all in one app.",
    challenge:
      "Implementing game logic for UNO's complex rule set (wild cards, draw-two chains, skip sequences) while also building a reactive turn-based AI that feels intelligent without being unfair. Cross-platform state sync for multiplayer added another layer of complexity.",
    approach:
      "Built in React Native for cross-platform (Android & iOS) reach. Designed a state machine for game flow, with the AI opponent using a weighted decision tree to prioritize card plays. Used a socket-based approach for real-time multiplayer game sync.",
    solution:
      "A fully playable UNO app with: single-player vs AI mode, local multiplayer, complete UNO rule enforcement (special cards, draw stacks, reverse, skip), animated card dealing and turn transitions, and a clean mobile-first UI.",
    result:
      "Fully functional cross-platform UNO game running on both Android and iOS. AI opponent provides a genuine challenge. Multiplayer mode allows real-time play between devices on the same session.",
    lessons:
      "Game development in React Native requires careful management of re-renders — every state change in a card game triggers UI updates that can cause jank. Batching state updates and memoizing components was essential for smooth 60fps gameplay.",
    techStack: ["React Native", "JavaScript", "Android", "iOS", "Game Logic", "AI"],
    github: "https://github.com/megh-pandya/UNO",
  },
  {
    id: "portfolio",
    index: "04",
    title: "Personal Portfolio",
    tagline: "A premium, animated, and interactive personal web portfolio.",
    problem:
      "A standard text-based resume isn't enough to showcase modern web development skills. I needed a standout digital presence that demonstrates my ability to build highly interactive, beautiful, and performant user interfaces.",
    challenge:
      "Balancing heavy SVG animations, 3D CSS transforms, and canvas effects (like a realistic night sky and raining mountain backgrounds) without sacrificing page load performance or responsiveness across mobile devices.",
    approach:
      "Built with Next.js and React. Leveraged Framer Motion for complex scroll-linked animations and page transitions. Implemented strict component modularity to keep the codebase maintainable and clean.",
    solution:
      "Developed a custom-built, premium dark-themed portfolio featuring a command palette, interactive digital constellation of my skills, a 3D folded-paper resume modal, and an immersive divine Lord Shiva blessing / mountain rain intro sequence.",
    result:
      "A lightning-fast, visually stunning portfolio that acts as a living demonstration of my frontend capabilities and attention to detail.",
    lessons:
      "Mastered the orchestration of multiple concurrent Framer Motion animations and learned how to optimize complex canvas-based backgrounds so they don't block the main thread.",
    techStack: ["Next.js", "React.js", "Framer Motion", "TypeScript", "Tailwind CSS"],
    live: "https://megh-portfolio-ten.vercel.app",
    github: "https://github.com/megh-pandya/portfolio",
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
