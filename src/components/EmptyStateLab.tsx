import React from 'react';
import { Sparkles, ArrowRight, Play, Layers } from 'lucide-react';
import { ScreenId } from '../types';

interface EmptyStateLabProps {
  onSwitchToCatalog: () => void;
  onOpenScreen: (screenId: ScreenId) => void;
}

export const EmptyStateLab: React.FC<EmptyStateLabProps> = ({
  onSwitchToCatalog,
  onOpenScreen,
}) => {
  return (
    <div className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Sub-header banner matching Image 9 */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#383244]/60 pb-4 font-mono text-xs">
          <div className="flex items-center gap-3 text-[#d0bcff]">
            <span>01 // Selected Works</span>
            <span className="text-[#46464b]">•</span>
            <span>Catalog 00 — 00</span>
          </div>
          <div className="mt-2 sm:mt-0 flex items-center gap-2 text-[#b59df2]">
            <span className="inline-block h-2 w-2 rounded-full bg-[#d0bcff] animate-ping" />
            <span className="uppercase tracking-widest font-semibold">In The Lab // Stage 00</span>
          </div>
        </div>

        {/* Central Empty State Container */}
        <div className="mt-16 flex flex-col items-center justify-center rounded-3xl border border-[#383244]/80 bg-[#1e1929]/70 py-24 px-6 text-center shadow-2xl backdrop-blur-xl">
          {/* Delicate rotating 8-point geometric starburst doodle */}
          <div className="relative mb-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#4f3886]/20 blur-2xl rounded-full" />
            <svg
              className="relative h-28 w-28 text-[#d0bcff] animate-spin-slow opacity-95"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="50" cy="50" r="4" fill="currentColor" />
              <path d="M 50 8 L 50 92" />
              <path d="M 8 50 L 92 50" />
              <path d="M 21 21 L 79 79" />
              <path d="M 21 79 L 79 21" />
              <circle cx="50" cy="50" r="30" strokeDasharray="4 4" strokeWidth="1" opacity="0.6" />
            </svg>
          </div>

          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#b59df2] bg-[#2d2738] px-3.5 py-1.5 rounded-full border border-[#46464b]">
            Work in Progress
          </span>

          <h2 className="mt-6 font-anton text-4xl sm:text-6xl uppercase tracking-wide text-white max-w-2xl leading-tight">
            No projects yet. I'm building something.
          </h2>

          <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-[#c7c6cb]">
            Currently drafting prototypes across spatial audio, WebGL shaders, typography mechanics, and design systems. Curations will appear here upon completion.
          </p>

          {/* Quick buttons to switch or jump to screens */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onSwitchToCatalog}
              className="flex items-center gap-2 rounded-xl bg-[#d0bcff] px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#161021] transition-all hover:bg-white hover:shadow-xl hover:shadow-[#d0bcff]/20"
            >
              <Sparkles className="h-4 w-4" />
              <span>Reveal Catalog (6 Works)</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => onOpenScreen('aura-mixer')}
              className="flex items-center gap-2 rounded-xl border border-[#46464b] bg-[#231d2e] px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-[#e9def6] transition-colors hover:border-[#b59df2] hover:bg-[#2d2738] hover:text-white"
            >
              <Play className="h-3.5 w-3.5 fill-current text-[#d0bcff]" />
              <span>Launch First Screen (OSA)</span>
            </button>
          </div>

          {/* Direct Screen Chips */}
          <div className="mt-12 border-t border-[#383244]/60 pt-6 max-w-lg w-full">
            <div className="text-[11px] font-mono uppercase tracking-widest text-[#919095] mb-3">
              Explore Available Live Prototypes:
            </div>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              <button
                onClick={() => onOpenScreen('aura-mixer')}
                className="rounded-lg bg-[#161021] border border-[#383244] px-3 py-1.5 text-[#d0bcff] hover:border-[#d0bcff]"
              >
                01 Aura Mixer
              </button>
              <button
                onClick={() => onOpenScreen('glyphica')}
                className="rounded-lg bg-[#161021] border border-[#383244] px-3 py-1.5 text-[#d0bcff] hover:border-[#d0bcff]"
              >
                02 Glyphica
              </button>
              <button
                onClick={() => onOpenScreen('aethel-archive')}
                className="rounded-lg bg-[#161021] border border-[#383244] px-3 py-1.5 text-[#d0bcff] hover:border-[#d0bcff]"
              >
                03 Aethel Archive
              </button>
              <button
                onClick={() => onOpenScreen('gengeo')}
                className="rounded-lg bg-[#161021] border border-[#383244] px-3 py-1.5 text-[#d0bcff] hover:border-[#d0bcff]"
              >
                04 GenGeo
              </button>
              <button
                onClick={() => onOpenScreen('verso-poetry')}
                className="rounded-lg bg-[#161021] border border-[#383244] px-3 py-1.5 text-[#d0bcff] hover:border-[#d0bcff]"
              >
                05 Verso
              </button>
              <button
                onClick={() => onOpenScreen('sonic-habitats')}
                className="rounded-lg bg-[#161021] border border-[#383244] px-3 py-1.5 text-[#d0bcff] hover:border-[#d0bcff]"
              >
                06 Sonic Habitats
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
