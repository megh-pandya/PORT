import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/utils/cn";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Megh Gopalbhai Pandya - Full Stack Developer",
  description:
    "Megh Gopalbhai Pandya is a full stack developer working with Next.js, React.js, Node.js, PHP, and PostgreSQL. View my portfolio, skills, projects, and experience.",
  keywords: [
    "Megh Gopalbhai Pandya",
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Web Development",
    "Portfolio",
    "Software Engineer"
  ],
  authors: [{ name: "Megh Gopalbhai Pandya" }],
  openGraph: {
    title: "Megh Gopalbhai Pandya - Full Stack Developer",
    description:
      "Full stack developer building production-grade SaaS platforms with Next.js, React.js, Node.js, PHP, and PostgreSQL.",
    type: "website",
    url: "https://meghpandya.dev",
    siteName: "Megh Pandya Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Megh Gopalbhai Pandya - Full Stack Developer",
    description: "Full stack developer building production-grade SaaS platforms.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.variable, "bg-[#080c14] font-sans text-slate-200 antialiased selection:bg-blue-500/30 selection:text-white")}>
        {children}
      </body>
    </html>
  );
}
