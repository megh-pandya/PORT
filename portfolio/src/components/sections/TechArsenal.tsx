"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import { motion, useAnimationFrame, AnimatePresence } from "framer-motion";
import { ScrambledHeading } from "@/components/ui/ScrambledHeading";

/* ── Node definitions ────────────────────────────────────── */
interface ConNode {
  id: string;
  label: string;
  category: string;
  proficiency: "Proficient" | "Familiar" | "Exploring";
  x: number; 
  y: number;
  r: number; 
  isCenter?: boolean;
}

interface ConEdge {
  from: string;
  to: string;
}

// ViewBox: 0 0 1000 850 — Large canvas to enforce 90px minimum gap and sizes
const NODES: ConNode[] = [
  // CENTER
  { id: "nextjs",      label: "Next.js",        category: "Frontend",        proficiency: "Proficient",  x: 500, y: 425, r: 52, isCenter: true },
  
  // Inner ring (Radius ~160)
  { id: "react",       label: "React.js",        category: "Frontend",        proficiency: "Proficient",  x: 500, y: 265, r: 32 },
  { id: "nodejs",      label: "Node.js",         category: "Backend",         proficiency: "Proficient",  x: 652, y: 376, r: 32 },
  { id: "javascript",  label: "JavaScript",      category: "Frontend",        proficiency: "Proficient",  x: 594, y: 554, r: 32 },
  { id: "postgresql",  label: "PostgreSQL",      category: "Database",        proficiency: "Proficient",  x: 406, y: 554, r: 32 },
  { id: "php",         label: "PHP",             category: "Backend",         proficiency: "Proficient",  x: 348, y: 376, r: 32 },
  
  // Middle ring (Radius ~280)
  { id: "reactnative", label: "React Native",    category: "Mobile",          proficiency: "Proficient",  x: 500, y: 145, r: 32 },
  { id: "express",     label: "Express.js",      category: "Backend",         proficiency: "Proficient",  x: 719, y: 251, r: 32 },
  { id: "tailwind",    label: "Tailwind CSS",    category: "Frontend",        proficiency: "Proficient",  x: 773, y: 487, r: 32 },
  { id: "mysql",       label: "MySQL",           category: "Database",        proficiency: "Proficient",  x: 621, y: 677, r: 32 },
  { id: "restapi",     label: "REST APIs",       category: "Backend",         proficiency: "Proficient",  x: 379, y: 677, r: 32 },
  { id: "git",         label: "Git",             category: "Tools",           proficiency: "Proficient",  x: 227, y: 487, r: 32 },
  { id: "html5",       label: "HTML5",           category: "Frontend",        proficiency: "Proficient",  x: 281, y: 251, r: 32 },

  // Outer ring (Radius ~380)
  { id: "mongodb",     label: "MongoDB",         category: "Database",        proficiency: "Familiar",    x: 664, y: 83,  r: 24 },
  { id: "css3",        label: "CSS3",            category: "Frontend",        proficiency: "Proficient",  x: 870, y: 341, r: 32 },
  { id: "bootstrap",   label: "Bootstrap",       category: "Frontend",        proficiency: "Familiar",    x: 797, y: 661, r: 24 },
  { id: "framer",      label: "Framer Motion",   category: "Frontend",        proficiency: "Familiar",    x: 500, y: 805, r: 24 },
  { id: "github",      label: "GitHub",          category: "Tools",           proficiency: "Proficient",  x: 203, y: 661, r: 32 },
  { id: "vercel",      label: "Vercel",          category: "Infra",           proficiency: "Familiar",    x: 130, y: 341, r: 24 },
  { id: "postman",     label: "Postman",         category: "Tools",           proficiency: "Familiar",    x: 336, y: 83,  r: 24 },
];

const EDGES: ConEdge[] = [
  // Core to Inner
  { from: "nextjs", to: "react" },
  { from: "nextjs", to: "nodejs" },
  { from: "nextjs", to: "javascript" },
  { from: "nextjs", to: "postgresql" },
  { from: "nextjs", to: "php" },
  // Inner to Middle
  { from: "react", to: "reactnative" },
  { from: "react", to: "tailwind" },
  { from: "javascript", to: "html5" },
  { from: "nodejs", to: "express" },
  { from: "nodejs", to: "restapi" },
  { from: "php", to: "mysql" },
  // Middle to Outer
  { from: "html5", to: "css3" },
  { from: "css3", to: "bootstrap" },
  { from: "react", to: "framer" },
  { from: "git", to: "github" },
  { from: "vercel", to: "nextjs" },
  { from: "vercel", to: "git" },
  { from: "express", to: "mongodb" },
  { from: "restapi", to: "postman" },
  // Cross connections for a web
  { from: "javascript", to: "react" },
  { from: "javascript", to: "nodejs" },
  { from: "postgresql", to: "nodejs" },
  { from: "postgresql", to: "php" },
  { from: "mysql", to: "nodejs" },
  { from: "tailwind", to: "css3" },
  { from: "restapi", to: "express" },
];

// Category → accent colour
const CAT_COLOR: Record<string, string> = {
  Frontend: "#C46A3D",
  Backend:  "#60a5fa",
  Database: "#34d399",
  Mobile:   "#a78bfa",
  Tools:    "#f472b6",
  Infra:    "#facc15",
};

const DESCRIPTIONS: Record<string, string> = {
  "nextjs": "Framework & SSR — core of every web project",
  "react": "Component-based UI library",
  "reactnative": "Cross-platform mobile (Android + iOS)",
  "javascript": "Primary language — ES6+ daily driver",
  "html5": "Semantic markup foundation",
  "css3": "Styling and layout",
  "tailwind": "Utility-first styling system",
  "bootstrap": "Rapid UI component library",
  "framer": "Animation and interaction layer",
  "nodejs": "Server-side JavaScript runtime",
  "express": "Minimal API framework",
  "php": "Server-side scripting",
  "restapi": "System communication layer",
  "postgresql": "Primary relational database",
  "mysql": "Relational database",
  "mongodb": "Document-based NoSQL database",
  "git": "Version control",
  "github": "Remote repository and collaboration",
  "vercel": "Edge deployment platform",
  "postman": "API testing and debugging"
};

/* ── Tooltip ─────────────────────────────────────────────── */
interface TooltipData {
  node: ConNode;
  svgX: number; // page-absolute px
  svgY: number;
}

function Tooltip({ data }: { data: TooltipData }) {
  const color = CAT_COLOR[data.node.category] ?? "var(--accent)";
  
  // Determine pill color
  let pillColor = "#3b82f6"; // default blue
  if (data.node.proficiency === "Proficient") pillColor = "#22c55e"; // green
  if (data.node.proficiency === "Familiar") pillColor = "#f59e0b"; // amber

  return (
    <motion.div
      key={data.node.id}
      initial={{ opacity: 0, scale: 0.92, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 6 }}
      transition={{ duration: 0.15 }}
      style={{
        position: "fixed",
        left: data.svgX,
        top: data.svgY - (data.node.r * 0.75) - 80, // scale down r slightly since it's logical svg pixels
        transform: "translateX(-50%)",
        background: "var(--surface)",
        border: `1px solid ${color}55`,
        borderRadius: "10px",
        padding: "12px 16px",
        pointerEvents: "none",
        zIndex: 200,
        boxShadow: `0 12px 32px rgba(0,0,0,0.4), 0 0 0 1px ${color}22`,
        minWidth: "240px",
        maxWidth: "320px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
        <div>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "15px", color: "var(--text)", margin: 0, fontWeight: 700 }}>
            {data.node.label}
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-sec)", margin: "4px 0 0 0" }}>
            {data.node.category}
          </p>
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: pillColor,
            border: `1px solid ${pillColor}55`,
            background: `${pillColor}15`,
            borderRadius: "6px",
            padding: "3px 8px",
            whiteSpace: "nowrap",
            flexShrink: 0,
            fontWeight: 600,
          }}
        >
          {data.node.proficiency}
        </span>
      </div>
      
      <div style={{ marginTop: "12px", paddingTop: "10px", borderTop: "1px dashed var(--border-alt)" }}>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "var(--text-muted)", margin: 0, lineHeight: 1.4 }}>
          {DESCRIPTIONS[data.node.id] || "Technology node"}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Travelling dot along edge ───────────────────────────── */
function TravelDot({
  x1, y1, x2, y2,
  duration,
  delay,
}: {
  x1: number; y1: number; x2: number; y2: number;
  duration: number; delay: number;
}) {
  return (
    <motion.circle
      r={3.5}
      fill="var(--accent)"
      opacity={0.8}
      animate={{
        cx: [x1, x2, x1],
        cy: [y1, y2, y1],
        opacity: [0, 0.8, 0.8, 0.8, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.45, 0.5, 0.95, 1],
      }}
    />
  );
}

/* ── Main Constellation ──────────────────────────────────── */
function Constellation({ svgRef }: { svgRef: React.RefObject<SVGSVGElement | null> }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const driftRef = useRef<Record<string, { ax: number; ay: number; px: number; py: number; spd: number }>>({});
  const [drift, setDrift] = useState<Record<string, { x: number; y: number }>>({});

  useEffect(() => {
    NODES.forEach((n) => {
      driftRef.current[n.id] = {
        ax: (Math.random() - 0.5) * 8.0,
        ay: (Math.random() - 0.5) * 8.0,
        px: Math.random() * Math.PI * 2,
        py: Math.random() * Math.PI * 2,
        spd: 0.35 + Math.random() * 0.3,
      };
    });
  }, []);

  useAnimationFrame((t) => {
    const s = t * 0.001;
    const next: Record<string, { x: number; y: number }> = {};
    NODES.forEach((n) => {
      const d = driftRef.current[n.id];
      if (!d) return;
      next[n.id] = {
        x: Math.sin(s * d.spd + d.px) * d.ax,
        y: Math.cos(s * d.spd + d.py) * d.ay,
      };
    });
    setDrift(next);
  });

  const pos = useCallback(
    (node: ConNode) => ({
      x: node.x + (drift[node.id]?.x ?? 0),
      y: node.y + (drift[node.id]?.y ?? 0),
    }),
    [drift]
  );

  const connectedIds = hovered
    ? new Set(
        EDGES.filter((e) => e.from === hovered || e.to === hovered).flatMap((e) => [e.from, e.to])
      )
    : null;

  const handleNodeHover = (node: ConNode, enter: boolean) => {
    if (!enter) {
      setHovered(null);
      setTooltip(null);
      return;
    }
    setHovered(node.id);
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const vb = svgRef.current.viewBox.baseVal;
      const p = pos(node);
      const px = svgRect.left + (p.x / vb.width) * svgRect.width;
      const py = svgRect.top + (p.y / vb.height) * svgRect.height;
      setTooltip({ node, svgX: px, svgY: py });
    }
  };

  return (
    <>
      <svg
        ref={svgRef}
        viewBox="0 0 1000 850"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      >
        <defs>
          <filter id="glow-c" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {EDGES.map((edge, ei) => {
          const fn = NODES.find((n) => n.id === edge.from)!;
          const tn = NODES.find((n) => n.id === edge.to)!;
          if (!fn || !tn) return null;
          const fp = pos(fn);
          const tp = pos(tn);
          const isLit =
            connectedIds &&
            (edge.from === hovered || edge.to === hovered) &&
            (connectedIds.has(edge.from) || connectedIds.has(edge.to));
          const isDimmed = hovered && !isLit;

          return (
            <g key={`e-${ei}`}>
              <motion.line
                x1={fp.x} y1={fp.y} x2={tp.x} y2={tp.y}
                stroke={isLit ? "var(--accent)" : "var(--border-alt)"}
                strokeWidth={isLit ? 3.0 : 1.5}
                strokeOpacity={isDimmed ? 0.1 : isLit ? 0.85 : 0.5}
                animate={{
                  strokeOpacity: isDimmed ? 0.1 : isLit ? 0.85 : 0.5,
                }}
                transition={{ duration: 0.2 }}
              />
              {/* Pulsing travel dot on each edge */}
              {!hovered && (
                <TravelDot
                  x1={fp.x} y1={fp.y} x2={tp.x} y2={tp.y}
                  duration={3 + (ei % 5) * 0.8}
                  delay={(ei * 0.6) % 4}
                />
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {NODES.map((node) => {
          const p = pos(node);
          const isHov = hovered === node.id;
          const isDim = hovered && !connectedIds?.has(node.id);
          const color = CAT_COLOR[node.category] ?? "#C46A3D";

          return (
            <g
              key={node.id}
              transform={`translate(${p.x},${p.y})`}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => handleNodeHover(node, true)}
              onMouseLeave={() => handleNodeHover(node, false)}
            >
              {/* Breathing pulse ring */}
              <motion.circle
                r={node.r * 1.5}
                fill={`${color}18`}
                animate={{ r: [node.r * 1.5, node.r * 1.8, node.r * 1.5] }}
                transition={{ duration: 3.5 + Math.random(), repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Hover outer ring */}
              <motion.circle
                r={node.r + 12}
                fill="none"
                stroke={color}
                strokeWidth={2}
                animate={{ opacity: isHov ? 0.55 : 0, r: isHov ? node.r + 18 : node.r + 12 }}
                transition={{ duration: 0.25 }}
              />

              {/* Main dot */}
              <motion.circle
                r={node.r}
                fill={node.isCenter ? color : "var(--surface-alt)"}
                stroke={node.isCenter ? color : isHov ? color : "var(--border-alt)"}
                strokeWidth={node.isCenter ? 4 : 2}
                animate={{
                  opacity: isDim ? 0.18 : 1,
                  scale: isHov ? 1.15 : 1,
                }}
                transition={{ duration: 0.22 }}
                filter={isHov || node.isCenter ? "url(#glow-c)" : undefined}
              />

              {/* Label */}
              <motion.text
                dy={node.r + 20}
                textAnchor="middle"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: node.isCenter ? "18px" : "14px",
                  fontWeight: node.isCenter ? 700 : 500,
                  fill: isHov ? color : "var(--text)",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
                animate={{ opacity: isDim ? 0.18 : 1 }}
                transition={{ duration: 0.2 }}
              >
                {node.label}
              </motion.text>
            </g>
          );
        })}
      </svg>

      {/* Floating tooltip portal */}
      <AnimatePresence>
        {tooltip && <Tooltip data={tooltip} />}
      </AnimatePresence>
    </>
  );
}

/* ── Mobile fallback ─────────────────────────────────────── */
const MOBILE_GROUPS = [
  { category: "Frontend",       items: ["Next.js", "React.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Framer Motion"] },
  { category: "Mobile",         items: ["React Native"] },
  { category: "Backend",        items: ["Node.js", "Express.js", "PHP", "REST APIs"] },
  { category: "Database",       items: ["PostgreSQL", "MySQL", "MongoDB"] },
  { category: "Tools",          items: ["Git", "GitHub", "Postman"] },
  { category: "Infra",          items: ["Vercel"] },
];

/* ── TechArsenal section ─────────────────────────────────── */
export function TechArsenal() {
  const [isMobile, setIsMobile] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const h = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, []);

  return (
    <section id="stack" style={{ padding: "120px 24px", position: "relative" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <ScrambledHeading
            text="Digital ecosystem."
            className="font-serif"
            style={{
               fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 400,
              color: "var(--text)",
              marginBottom: "16px",
              lineHeight: 1.1,
            }}
          />

          <p
            style={{
              fontSize: "15px",
              color: "var(--text-sec)",
              marginBottom: "52px",
              maxWidth: "480px",
              lineHeight: 1.65,
            }}
          >
            {isMobile
              ? "Technologies are tools, not badges — here's how they connect."
              : "Hover any node to explore connections and proficiency. Watch the data flow through the circuit."}
          </p>
        </motion.div>

        {/* Desktop constellation */}
        {!isMobile ? (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0 }}
            style={{
              width: "100%",
              aspectRatio: "10/8", // Matches the 1000x850 viewBox shape
              maxHeight: "850px",
              position: "relative",
              borderRadius: "20px",
              border: "1px solid var(--border)",
              background: "var(--surface)",
              overflow: "visible",
              padding: "48px",
            }}
          >
            <Constellation svgRef={svgRef} />
          </motion.div>
        ) : (
          /* Mobile list fallback */
          <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
            {MOBILE_GROUPS.map((g, i) => (
              <motion.div
                key={g.category}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    color: CAT_COLOR[g.category] ?? "var(--accent)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: "12px",
                  }}
                >
                  {g.category}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {g.items.map((item) => (
                    <span
                      key={item}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "6px",
                        border: "1px solid var(--border)",
                        background: "var(--surface)",
                        fontSize: "13px",
                        color: "var(--text-sec)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
