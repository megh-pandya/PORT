import "./globals.css";

export const metadata = {
  title: "Megh Gopalbhai Pandya - Full Stack Developer",
  description:
    "Megh Gopalbhai Pandya is a full stack developer working with Next.js, React.js, Node.js, PHP, and PostgreSQL.",
  keywords: [
    "Megh Gopalbhai Pandya",
    "Full Stack Developer",
    "Next.js",
    "React",
    "Node.js",
    "PHP",
    "PostgreSQL",
    "JavaScript",
    "Web Development",
    "Portfolio",
  ],
  authors: [{ name: "Megh Gopalbhai Pandya" }],
  openGraph: {
    title: "Megh Gopalbhai Pandya - Full Stack Developer",
    description:
      "Full stack developer building production-grade SaaS platforms with Next.js, React.js, Node.js, PHP, and PostgreSQL.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
