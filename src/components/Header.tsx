import React, { useState, useEffect, useRef } from 'react';
import { ScreenId } from '../types';
import { ExternalLink, Layers, Sparkles, ChevronDown, Check, Search, X, Command } from 'lucide-react';

interface HeaderProps {
  currentScreen: ScreenId;
  onSelectScreen: (screenId: ScreenId) => void;
  isLabMode: boolean;
  onToggleLabMode: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filteredCount?: number;
  totalCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onSelectScreen,
  isLabMode,
  onToggleLabMode,
  searchQuery,
  onSearchChange,
  filteredCount,
  totalCount = 6,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const mobileSearchInputRef = useRef<HTMLInputElement | null>(null);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

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

  const popularTags = [
    'TypeScript',
    'WebGL',
    'React',
    'GLSL',
    'Web Audio',
    'Tailwind',
    'Next.js',
    'GraphQL',
    'Vue 3',
  ];

  // Global keyboard shortcut to focus search (/ or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid overriding when user is typing in another input or textarea
      if (
        (e.target instanceof HTMLInputElement && e.target !== searchInputRef.current && e.target !== mobileSearchInputRef.current) ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchFocused(true);
      } else if (e.key === '/' && document.activeElement !== searchInputRef.current && document.activeElement !== mobileSearchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
        setIsSearchFocused(true);
      } else if (e.key === 'Escape') {
        setIsSearchFocused(false);
        setIsDropdownOpen(false);
        setIsMobileSearchOpen(false);
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close search suggestion popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchInputChange = (val: string) => {
    onSearchChange(val);
    if (isLabMode) {
      onToggleLabMode(); // Switch back to project catalog so user sees matches immediately
    }
    if (currentScreen !== 'portfolio') {
      onSelectScreen('portfolio');
    }
  };

  const handleSelectSuggestedTag = (tag: string) => {
    onSearchChange(tag);
    setIsSearchFocused(false);
    if (isLabMode) {
      onToggleLabMode();
    }
    if (currentScreen !== 'portfolio') {
      onSelectScreen('portfolio');
    }
    // Scroll to projects section to see the filtered list
    setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

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
    <header className="sticky top-0 z-50 w-full border-b border-[#383244]/60 bg-[#161021]/95 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand & Kicker */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectScreen('portfolio')}
            className="group flex items-baseline gap-2 text-left focus:outline-none"
          >
            <span className="font-anton text-2xl tracking-wider text-white transition-colors group-hover:text-[#d0bcff]">
              ATABRIA
            </span>
            <span className="hidden xl:inline-block text-xs font-light tracking-wide text-[#b59df2]/80">
              “Let's make something with code.”
            </span>
          </button>
        </div>

        {/* Zone 2: Real-time Search Box in Header */}
        <div ref={searchContainerRef} className="relative hidden sm:block flex-1 max-w-md mx-2">
          <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-3 h-4 w-4 text-[#919095]" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchInputChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search projects, stack (React, GLSL, WebGL...)"
              className="w-full rounded-xl border border-[#383244] bg-[#1e1929]/90 py-2 pl-9 pr-24 text-xs text-white placeholder-[#919095] shadow-inner transition-all focus:border-[#d0bcff] focus:bg-[#231d2e] focus:outline-none focus:ring-1 focus:ring-[#d0bcff]/40"
            />

            {/* Quick Actions inside Search Input */}
            <div className="absolute right-2 flex items-center gap-1.5">
              {searchQuery ? (
                <>
                  {filteredCount !== undefined && (
                    <span className="rounded bg-[#4f3886]/60 px-1.5 py-0.5 text-[10px] font-mono text-[#d0bcff]">
                      {filteredCount} {filteredCount === 1 ? 'match' : 'matches'}
                    </span>
                  )}
                  <button
                    onClick={() => {
                      onSearchChange('');
                      searchInputRef.current?.focus();
                    }}
                    className="p-1 rounded-md text-[#919095] hover:bg-[#383244] hover:text-white transition-colors"
                    title="Clear search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </>
              ) : (
                <div className="hidden lg:flex items-center gap-0.5 rounded border border-[#383244] bg-[#161021]/80 px-1.5 py-0.5 text-[10px] font-mono text-[#919095]">
                  <Command className="h-2.5 w-2.5" />
                  <span>K</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Tech Stack Suggestion Popover on Focus */}
          {isSearchFocused && (
            <div className="absolute left-0 right-0 top-full mt-2 rounded-xl border border-[#46464b] bg-[#1e1929] p-3 shadow-2xl backdrop-blur-xl ring-1 ring-black/50 z-50">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#919095] mb-2">
                <span>Filter by Technology Stack</span>
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="text-[#d0bcff] hover:underline"
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {popularTags.map((tag) => {
                  const isSelected = searchQuery.toLowerCase() === tag.toLowerCase();
                  return (
                    <button
                      key={tag}
                      onMouseDown={(e) => {
                        e.preventDefault(); // Prevent input blur
                        handleSelectSuggestedTag(tag);
                      }}
                      className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-colors ${
                        isSelected
                          ? 'bg-[#d0bcff] text-[#161021] font-bold shadow-sm'
                          : 'bg-[#231d2e] text-[#c7c6cb] hover:bg-[#2d2738] hover:text-white border border-[#383244]'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
              <div className="mt-2.5 pt-2 border-t border-[#383244]/60 flex items-center justify-between text-[10px] font-mono text-[#919095]">
                <span>Type any keyword, title or stack</span>
                <span>ESC to close</span>
              </div>
            </div>
          )}
        </div>

        {/* Zone 3: Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs font-medium uppercase tracking-widest text-[#c7c6cb] shrink-0">
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
              <span>Screens</span>
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-80 rounded-xl border border-[#46464b]/80 bg-[#1e1929] p-2 shadow-2xl backdrop-blur-xl ring-1 ring-black/40 z-50"
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

        {/* Zone 4: Primary Actions & View Mode */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Mobile Search Toggle Button */}
          <button
            onClick={() => {
              setIsMobileSearchOpen(!isMobileSearchOpen);
              setTimeout(() => mobileSearchInputRef.current?.focus(), 100);
            }}
            className={`sm:hidden flex items-center justify-center p-2 rounded-lg border transition-colors ${
              searchQuery || isMobileSearchOpen
                ? 'bg-[#4f3886] text-white border-[#b59df2]'
                : 'bg-[#231d2e] text-[#d0bcff] border-[#383244]'
            }`}
            aria-label="Toggle search"
            title="Search projects & stack"
          >
            <Search className="h-4 w-4" />
          </button>

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
            <span className="hidden md:inline">{isLabMode ? 'Show Catalog' : 'Lab Mode'}</span>
            <span className="md:hidden">{isLabMode ? 'Catalog' : 'Lab'}</span>
          </button>

          {/* External Social Links */}
          <div className="hidden xl:flex items-center gap-2 pl-2 border-l border-[#383244]">
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
            className="lg:hidden flex items-center justify-center p-2 rounded-lg bg-[#231d2e] text-[#d0bcff] border border-[#383244]"
            aria-label="Toggle screens menu"
          >
            <Layers className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Dropdown on small viewports */}
      {isMobileSearchOpen && (
        <div className="sm:hidden border-t border-[#383244] bg-[#1a1426] px-4 py-3">
          <div className="relative flex items-center">
            <Search className="pointer-events-none absolute left-3 h-4 w-4 text-[#919095]" />
            <input
              ref={mobileSearchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchInputChange(e.target.value)}
              placeholder="Search stack (e.g. React, GLSL, WebGL)..."
              className="w-full rounded-xl border border-[#383244] bg-[#1e1929] py-2 pl-9 pr-16 text-xs text-white placeholder-[#919095] focus:border-[#d0bcff] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2 p-1 text-[#919095] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {/* Mobile quick chips */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {popularTags.slice(0, 6).map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  handleSelectSuggestedTag(tag);
                  setIsMobileSearchOpen(false);
                }}
                className={`rounded-md px-2 py-0.5 text-[11px] font-mono ${
                  searchQuery.toLowerCase() === tag.toLowerCase()
                    ? 'bg-[#d0bcff] text-[#161021] font-bold'
                    : 'bg-[#231d2e] text-[#c7c6cb] border border-[#383244]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

