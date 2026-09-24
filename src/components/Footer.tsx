import React from 'react';
import { ArrowUp, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#383244]/60 bg-[#110b1b] py-12 text-[#919095]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs font-mono text-center sm:text-left">
          <span className="text-[#e9def6] font-semibold">Made by Atabria</span>
          <span className="hidden sm:inline text-[#46464b]">•</span>
          <span className="text-[#b59df2]">“Let's make something with code.”</span>
          <span className="hidden sm:inline text-[#46464b]">•</span>
          <span>© 2025 All rights reserved.</span>
        </div>

        <div className="flex items-center gap-6 text-xs font-medium">
          <a
            href="https://github.com/atabria"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <span>GitHub</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>
          <a
            href="https://youtube.com/@atabria"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <span>YouTube</span>
            <ExternalLink className="h-3 w-3 opacity-60" />
          </a>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 rounded-full border border-[#383244] bg-[#1e1929] px-3 py-1.5 text-xs text-[#d0bcff] transition-all hover:border-[#b59df2] hover:bg-[#2d2738] hover:text-white"
          >
            <span>Top</span>
            <ArrowUp className="h-3 w-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
