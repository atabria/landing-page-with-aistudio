import React, { useState } from 'react';
import { ScreenId } from '../types';
import { Layers, Sparkles, X, ChevronUp, ChevronDown, ExternalLink } from 'lucide-react';

interface ScreenSwitcherBarProps {
  currentScreen: ScreenId;
  onSelectScreen: (screenId: ScreenId) => void;
  isLabMode: boolean;
  onToggleLabMode: () => void;
}

export const ScreenSwitcherBar: React.FC<ScreenSwitcherBarProps> = ({
  currentScreen,
  onSelectScreen,
  isLabMode,
  onToggleLabMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const screens: { id: ScreenId; title: string; num: string; cat: string }[] = [
    { id: 'portfolio', title: 'Atabria Master Portfolio', num: 'HUB', cat: 'Main Studio' },
    { id: 'aura-mixer', title: 'OSA Orbital Mixer', num: '01', cat: 'Web Audio' },
    { id: 'glyphica', title: 'Glyphica Specimen', num: '02', cat: 'Typography' },
    { id: 'aethel-archive', title: 'Aethel Archive', num: '03', cat: 'Curatorial' },
    { id: 'gengeo', title: 'GenGeo Shaders', num: '04', cat: 'WebGL' },
    { id: 'verso-poetry', title: 'Verso Poetry', num: '05', cat: 'Typesetting' },
    { id: 'sonic-habitats', title: 'Sonic Habitats', num: '06', cat: 'Acoustics' },
    { id: 'lab-empty-state', title: 'In The Lab // Stage 00', num: '00', cat: 'Draft State' },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-4xl w-[94%] sm:w-auto">
      <div className="rounded-2xl border border-[#46464b] bg-[#1a1426]/95 p-2 shadow-2xl backdrop-blur-xl ring-1 ring-black/50">
        {/* Collapsed Bar */}
        <div className="flex items-center justify-between gap-3 px-2 py-1">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-xs font-mono text-[#d0bcff] hover:text-white"
          >
            <Layers className="h-4 w-4" />
            <span className="font-bold uppercase tracking-wider hidden sm:inline">Screen Navigator:</span>
            <span className="rounded bg-[#4f3886] px-2 py-0.5 text-white font-semibold">
              {screens.find((s) => s.id === currentScreen)?.title || 'Portfolio'}
            </span>
            {isOpen ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
          </button>

          {/* Direct quick pills on larger screens */}
          <div className="hidden md:flex items-center gap-1.5">
            {screens.slice(1, 7).map((s) => (
              <button
                key={s.id}
                onClick={() => onSelectScreen(s.id)}
                className={`rounded-lg px-2 py-1 text-[11px] font-mono transition-colors ${
                  currentScreen === s.id
                    ? 'bg-[#d0bcff] text-[#161021] font-bold shadow-sm'
                    : 'bg-[#231d2e] text-[#c7c6cb] hover:bg-[#2d2738] hover:text-white'
                }`}
              >
                {s.num}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-[#383244]">
            {currentScreen !== 'portfolio' ? (
              <button
                onClick={() => onSelectScreen('portfolio')}
                className="rounded-lg bg-[#2d2738] px-2.5 py-1 text-xs font-semibold text-[#e9def6] hover:bg-[#4f3886] hover:text-white"
              >
                Hub
              </button>
            ) : (
              <button
                onClick={onToggleLabMode}
                className="flex items-center gap-1 rounded-lg bg-[#2d2738] px-2.5 py-1 text-xs font-semibold text-[#d0bcff] hover:bg-[#4f3886] hover:text-white"
              >
                <Sparkles className="h-3 w-3" />
                <span>{isLabMode ? 'Show Catalog' : 'Lab Mode'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Expanded Grid Menu */}
        {isOpen && (
          <div className="mt-2 pt-2 border-t border-[#383244] grid grid-cols-2 sm:grid-cols-4 gap-2 p-1">
            {screens.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectScreen(item.id);
                    setIsOpen(false);
                  }}
                  className={`flex flex-col items-start rounded-xl p-2.5 text-left transition-all ${
                    isActive
                      ? 'bg-[#d0bcff] text-[#161021] font-bold shadow-md'
                      : 'bg-[#110b1b] text-[#c7c6cb] hover:bg-[#231d2e] hover:text-white border border-[#383244]'
                  }`}
                >
                  <div className="flex w-full items-center justify-between text-[10px] font-mono">
                    <span className={isActive ? 'text-[#161021]' : 'text-[#b59df2]'}>{item.num}</span>
                    <span className={isActive ? 'text-[#161021]/70' : 'text-[#919095]'}>{item.cat}</span>
                  </div>
                  <span className="mt-1 text-xs font-semibold truncate w-full">{item.title}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
