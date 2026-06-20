import React from "react";

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#080c14] py-8">
      <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <p className="text-sm text-slate-400">
          &copy; {new Date().getFullYear()} Megh Gopalbhai Pandya. Designed and built with care.
        </p>
        <div className="flex gap-6 text-sm font-medium text-slate-400">
          <a href="https://github.com/megh17" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/megh17/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            LinkedIn
          </a>
          <a href="mailto:meghpandya7788@gmail.com" className="hover:text-white transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};
