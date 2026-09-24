import React, { useState } from 'react';
import { ScreenId } from '../types';
import { ExternalLink, Layers, Sparkles, ChevronDown, Check } from 'lucide-react';

interface HeaderProps {
  currentScreen: ScreenId;
  onSelectScreen: (screenId: ScreenId) => void;
  isLabMode: boolean;
  onToggleLabMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onSelectScreen,
  isLabMode,
  onToggleLabMode,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const screens: { id: ScreenId; label: string; tag: string }[] = [
    { id: 'portfolio', label: 'Atabria Master Portfolio', tag: 'Main Hub' },
    { id: 'aura-mixer', label: 'OSA — Orbital Spatial Audio', tag: '01 / Web Audio' },
    { id: 'glyphica', label: 'Glyphica — Moneta Specimen', tag: '02 / Typography' },
    { id: 'aethel-archive', label: 'Aethel — Digital Curation', tag: '03 / Archival' },
    { id: 'gengeo', label: 'GenGeo — Generative Shaders', tag: '04 / WebGL' },
    { id: 'verso-poetry', label: 'Verso — Algorithmic Poetry', tag: '05 / Typeset' },
    { id: 'sonic-habitats', label: 'Sonic Habitats — Soundscape', tag: '06 / Acoustics' },
    { id: 'lab-empty-state', label: 'In The Lab // Stage 00', tag: 'Draft State' },
  ];

  const scrollToSection = (id: string) => {
    if (currentScreen !== 'portfolio') {
      onSelectScreen('portfolio');
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#383244]/60 bg-[#161021]/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand & Kicker */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectScreen('portfolio')}
            className="group flex items-baseline gap-2 text-left focus:outline-none"
          >
            <span className="font-anton text-2xl tracking-wider text-white transition-colors group-hover:text-[#d0bcff]">
              ATABRIA
            </span>
            <span className="hidden sm:inline-block text-xs font-light tracking-wide text-[#b59df2]/80">
              “Let's make something with code.”
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7 text-xs font-medium uppercase tracking-widest text-[#c7c6cb]">
          <button
            onClick={() => scrollToSection('projects')}
            className="transition-colors hover:text-white hover:underline hover:underline-offset-8"
          >
            Projects
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="transition-colors hover:text-white hover:underline hover:underline-offset-8"
          >
            About
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="transition-colors hover:text-white hover:underline hover:underline-offset-8"
          >
            Contact
          </button>

          {/* Quick Screen Switcher Menu Trigger */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                currentScreen !== 'portfolio'
                  ? 'bg-[#4f3886]/40 text-[#e9ddff] border border-[#b59df2]/40'
                  : 'text-[#d0bcff] hover:bg-[#231d2e] hover:text-white'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Interactive Screens</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-80 rounded-xl border border-[#46464b]/80 bg-[#1e1929] p-2 shadow-2xl backdrop-blur-xl ring-1 ring-black/40"
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-[#919095] border-b border-[#383244]/60">
                  Select Screen Experience
                </div>
                <div className="mt-1 max-h-96 space-y-1 overflow-y-auto">
                  {screens.map((item) => {
                    const isActive = currentScreen === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onSelectScreen(item.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors ${
                          isActive
                            ? 'bg-[#4f3886]/40 text-white font-semibold'
                            : 'text-[#c7c6cb] hover:bg-[#2d2738] hover:text-white'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{item.label}</span>
                          <span className="text-[10px] text-[#b59df2]/80">{item.tag}</span>
                        </div>
                        {isActive && <Check className="h-4 w-4 text-[#d0bcff]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Zone 3: Primary Actions & View Mode */}
        <div className="flex items-center gap-3">
          {/* Lab View / Catalog View Toggle Button */}
          <button
            onClick={onToggleLabMode}
            title="Toggle between full Selected Works catalog and the 'In The Lab' empty state view"
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
              isLabMode
                ? 'border-[#d0bcff] bg-[#d0bcff] text-[#161021] font-semibold shadow-sm'
                : 'border-[#46464b] bg-[#231d2e] text-[#d0bcff] hover:bg-[#2d2738] hover:border-[#b59df2]/60'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{isLabMode ? 'Show Catalog' : 'Lab Mode'}</span>
            <span className="sm:hidden">{isLabMode ? 'Catalog' : 'Lab'}</span>
          </button>

          {/* External Social Links */}
          <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-[#383244]">
            <a
              href="https://youtube.com/@atabria"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-[#c7c6cb] hover:text-white transition-colors"
            >
              <span>YouTube</span>
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
            <span className="text-[#46464b]">•</span>
            <a
              href="https://github.com/atabria"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs text-[#c7c6cb] hover:text-white transition-colors"
            >
              <span>GitHub</span>
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
          </div>

          {/* Mobile Screen Switcher Toggle */}
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-lg bg-[#231d2e] text-[#d0bcff] border border-[#383244]"
            aria-label="Toggle screens menu"
          >
            <Layers className="h-4 w-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
