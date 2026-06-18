"use client";

import { useEffect, useState } from "react";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

const stats = [
  ["10+", "REST APIs Integrated"],
  ["~40%", "Duplicate Code Reduced"],
  ["8.53", "MCA CGPA"],
  ["3", "Role-Based Dashboards"],
];

const aboutCards = [
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

const services = [
  {
    icon: "🎨",
    title: "Full Stack Development",
    description: "End-to-end web application development with modern tech stack for scalable and performant solutions.",
  },
  {
    icon: "⚡",
    title: "Performance Optimization",
    description: "Speed up your applications with lazy loading, code splitting, SSR strategies, and Core Web Vitals improvements.",
  },
  {
    icon: "🔌",
    title: "API Integration",
    description: "Seamless REST API integration, authentication workflows, and real-time data synchronization.",
  },
  {
    icon: "📱",
    title: "Responsive Design",
    description: "Mobile-first design that looks perfect on all devices with intuitive user interfaces.",
  },
  {
    icon: "🧠",
    title: "Clean Code",
    description: "Maintainable, scalable code architecture with proper structure, documentation, and best practices.",
  },
  {
    icon: "🚀",
    title: "Quick Turnaround",
    description: "Fast delivery without compromising quality. Efficient project completion with proven methodologies.",
  },
];

const skillGroups = [
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

const projects = [
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

const experience = [
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

const achievements = [
  ["Internship", "Production Next.js platform", "Seaneb Technologies", "2025-2026"],
  ["API Work", "10+ REST API integrations", "Authentication, analytics, plans, and property data", "Live"],
  ["Optimization", "Core Web Vitals improvements", "Lazy loading, dynamic imports, and SSR strategies", "Next.js"],
  ["Refactor", "~40% duplicate code reduction", "Reusable shared UI component library", "Delivery"],
  ["Academic", "MCA CGPA 8.53", "ISTAR - CVM University", "2024-2026"],
  ["Academic", "BCA CGPA 8.32", "SEMCOM - CVM University", "2020-2023"],
];

const resumeHref = "/Megh_Pandya_Resume.pdf";

function ArrowIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 20h14" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.89.66 2.78a2 2 0 0 1-.45 2.11L8.09 9.84a16 16 0 0 0 6.07 6.07l1.23-1.23a2 2 0 0 1 2.11-.45c.89.31 1.82.53 2.78.66A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function SectionHeader({ label, title, children }) {
  return (
    <div className="section-header reveal">
      <p className="section-label">{label}</p>
      <h2 className="section-title">{title}</h2>
      {children && <p className="section-subtitle">{children}</p>}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal, .reveal-stagger");

    if (!("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav className="nav">
        <a href="#hero" className="nav-logo" onClick={() => setMenuOpen(false)}>
          megh<span>.</span>dev
        </a>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>

        <a href="#contact" className="nav-cta">
          Hire Me
        </a>

        <button
          className="nav-toggle"
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <MenuIcon />
        </button>
      </nav>

      <main>
        <section className="hero" id="hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="availability reveal">Available for new opportunities</p>
              <h1 className="hero-title reveal">Megh Pandya</h1>
              <p className="hero-role reveal">Full Stack Developer</p>
              <p className="hero-description reveal">
                Full stack developer with hands-on experience building
                production-grade SaaS platforms using Next.js, React.js, Node.js,
                PHP, and PostgreSQL.
              </p>
              <div className="hero-actions reveal">
                <a href="#projects" className="button button-primary">
                  View Projects <ArrowIcon />
                </a>
                <a href="#contact" className="button button-secondary">
                  Contact Me <MailIcon />
                </a>
                <a href={resumeHref} className="button button-ghost" download>
                  Resume <DownloadIcon />
                </a>
              </div>
            </div>

            <div className="hero-panel reveal" aria-label="Portfolio highlights">
              <div className="panel-topline">
                <span />
                <span />
                <span />
              </div>
              <div className="panel-body">
                <p className="panel-kicker">Current Focus</p>
                <h2>Shipping full stack SaaS features with clean systems underneath.</h2>
                <div className="panel-meter">
                  <span style={{ width: "86%" }} />
                </div>
                <div className="panel-grid">
                  <div>
                    <strong>Next.js</strong>
                    <span>Main Stack</span>
                  </div>
                  <div>
                    <strong>8.53</strong>
                    <span>MCA CGPA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section className="section" id="about">
          <div className="container">
            <SectionHeader label="About Me" title="Building practical web products with measurable delivery.">
              I work across frontend and backend layers, turning requirements
              into responsive interfaces, API integrations, and reliable
              full-stack workflows.
            </SectionHeader>

            <div className="about-layout">
              <div className="about-cards reveal-stagger">
                {aboutCards.map((card) => (
                  <article className="about-card" key={card.title}>
                    <span>{card.kicker}</span>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </article>
                ))}
              </div>

              <div className="stats-grid reveal-stagger">
                {stats.map(([number, label]) => (
                  <div className="stat-card" key={label}>
                    <strong>{number}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section className="section" id="services">
          <div className="container">
            <SectionHeader label="Services" title="What I bring to your project.">
              Comprehensive solutions covering frontend design, backend development, performance optimization, and architectural excellence.
            </SectionHeader>

            <div className="services-grid reveal-stagger">
              {services.map((service) => (
                <article className="service-card" key={service.title}>
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section className="section" id="skills">
          <div className="container">
            <SectionHeader label="Toolkit" title="Technologies I work with.">
              A resume-backed stack spanning frontend, backend, databases,
              tools, and software fundamentals.
            </SectionHeader>

            <div className="skills-grid reveal-stagger">
              {skillGroups.map((group) => (
                <article className="skill-card" key={group.label}>
                  <h3>{group.label}</h3>
                  <div className="skill-tags">
                    {group.skills.map((skill) => (
                      <span className={group.muted ? "skill-tag muted" : "skill-tag"} key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section className="section" id="projects">
          <div className="container">
            <SectionHeader label="Projects" title="Selected projects from my resume.">
              Real projects covering production real estate workflows,
              attendance automation, and my portfolio.
            </SectionHeader>

            <div className="projects-grid reveal-stagger">
              {projects.map((project) => (
                <article className={`project-card ${project.tone}`} key={project.title}>
                  <div className="project-preview">
                    <div className="project-window">
                      <div className="window-bar">
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className="window-lines">
                        <span />
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                  <div className="project-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-stack">
                      {project.stack.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo`}>
                          Live Demo <ArrowIcon />
                        </a>
                      )}
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code`}>
                          GitHub <ArrowIcon />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section className="section" id="experience">
          <div className="container">
            <SectionHeader label="Experience" title="Experience and education.">
              My professional internship and academic background from the
              resume.
            </SectionHeader>

            <div className="timeline reveal">
              {experience.map((item) => (
                <article className="timeline-item" key={`${item.role}-${item.date}`}>
                  <div className="timeline-dot" />
                  <div className="timeline-card">
                    <div className="timeline-header">
                      <div>
                        <h3>{item.role}</h3>
                        <p>{item.company}</p>
                      </div>
                      <span>{item.date}</span>
                    </div>
                    <p className="timeline-description">{item.description}</p>
                    <div className="timeline-tags">
                      {item.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section className="section" id="achievements">
          <div className="container">
            <SectionHeader label="Highlights" title="Resume highlights.">
              Delivery, optimization, API work, refactoring, and academic
              milestones.
            </SectionHeader>

            <div className="achievements-grid reveal-stagger">
              {achievements.map(([type, title, org, year]) => (
                <article className="achievement-card" key={title}>
                  <p>{type}</p>
                  <h3>{title}</h3>
                  <span>{org}</span>
                  <strong>{year}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container">
            <div className="contact-card reveal">
              <p className="section-label">Contact</p>
              <h2>Let&apos;s build something great together.</h2>
              <p>
                Open to full-time roles, internships, and freelance projects. I
                respond within 24 hours.
              </p>
              <div className="contact-links">
                <a href="mailto:meghpandya7788@gmail.com">
                  <MailIcon /> meghpandya7788@gmail.com
                </a>
                <a href="tel:+919726396207">
                  <PhoneIcon /> +91 9726396207
                </a>
                <a href="https://www.linkedin.com/in/megh17/" target="_blank" rel="noopener noreferrer">
                  LinkedIn <ArrowIcon />
                </a>
                <a href="https://github.com/megh17" target="_blank" rel="noopener noreferrer">
                  GitHub <ArrowIcon />
                </a>
                <a href={resumeHref} download>
                  Resume <DownloadIcon />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>(c) 2026 Megh Gopalbhai Pandya. Designed and built with care.</p>
        <div>
          <a href="https://github.com/megh17" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/megh17/" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="mailto:meghpandya7788@gmail.com">Email</a>
        </div>
      </footer>
    </>
  );
}
 