import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Megh Pandya — Full Stack Developer",
  description:
    "Megh Pandya is a full stack developer building production-grade web platforms with Next.js, React.js, Node.js, PHP, PostgreSQL, and MySQL.",
  keywords: [
    "Megh Pandya",
    "Megh Gopalbhai Pandya",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "Node.js",
    "Web Development",
    "Portfolio",
    "MCA",
    "ISTAR CVM University",
    "Seaneb Technologies",
  ],
  authors: [{ name: "Megh Gopalbhai Pandya" }],
  creator: "Megh Gopalbhai Pandya",
  openGraph: {
    title: "Megh Pandya — Full Stack Developer",
    description:
      "Full stack developer building production-grade web platforms with Next.js, React.js, Node.js, and PHP.",
    type: "website",
    url: "https://meghpandya.dev",
    siteName: "Megh Pandya",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Megh Pandya — Full Stack Developer",
    description:
      "Full stack developer building production-grade web platforms with Next.js, React.js, Node.js, and PHP.",
    creator: "@meghpandya",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://meghpandya.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSerif.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                let theme = localStorage.getItem('megh-theme');
                if (!theme) {
                  theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
                }
                document.documentElement.setAttribute('data-theme', theme);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        className="font-sans antialiased"
        style={{
          backgroundColor: "var(--bg)",
          color: "var(--text)",
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        {children}
      </body>
    </html>

  );
}
