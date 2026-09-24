import React from 'react';
import { Compass, Sparkles, Terminal, Cpu } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="border-b border-[#383244]/60 bg-[#161021] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#383244]/60 pb-4">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#b59df2]">
            <span>02 // Studio Practice</span>
            <span>•</span>
            <span>Ethos & Craft</span>
          </div>
          <span className="text-xs font-mono text-[#919095] mt-1 sm:mt-0">
            Frontend Architecture • Spatial UX • Systems
          </span>
        </div>

        {/* Big Editorial Quote */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="font-anton text-4xl sm:text-5xl lg:text-6xl uppercase tracking-wide text-white leading-tight">
              Designing, building, and learning in public.
            </h2>
            <p className="mt-6 text-base sm:text-lg leading-relaxed text-[#c7c6cb]">
              I am a frontend developer and interaction designer focused on high-retention user interfaces, dynamic soundscapes, creative coding, and micro-typography.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#919095]">
              My work bridges raw browser capabilities—Web Audio API, WebGL shaders, Canvas rendering, and modern component mechanics—with meticulous visual discipline.
            </p>
          </div>

          <div className="lg:col-span-6 space-y-4">
            {/* Pillar 01 */}
            <div className="rounded-xl border border-[#383244] bg-[#1e1929] p-6 transition-colors hover:border-[#b59df2]/40">
              <div className="flex items-center justify-between text-xs font-mono text-[#d0bcff]">
                <span className="font-bold">01 / Rhythm</span>
                <Compass className="h-4 w-4" />
              </div>
              <h3 className="mt-2 text-lg font-bold text-white">Spatial Poise & Harmonic Timing</h3>
              <p className="mt-1 text-sm text-[#c7c6cb]">
                Every motion curve, easing function, and spatial layout adheres to natural physics and acoustic resonance principles.
              </p>
            </div>

            {/* Pillar 02 */}
            <div className="rounded-xl border border-[#383244] bg-[#1e1929] p-6 transition-colors hover:border-[#b59df2]/40">
              <div className="flex items-center justify-between text-xs font-mono text-[#d0bcff]">
                <span className="font-bold">02 / Craft</span>
                <Terminal className="h-4 w-4" />
              </div>
              <h3 className="mt-2 text-lg font-bold text-white">Engineered Web Architecture</h3>
              <p className="mt-1 text-sm text-[#c7c6cb]">
                Zero decorative bloat. Clean TypeScript, resilient component abstractions, high frame rates, and accessible semantic structures.
              </p>
            </div>

            {/* Pillar 03 */}
            <div className="rounded-xl border border-[#383244] bg-[#1e1929] p-6 transition-colors hover:border-[#b59df2]/40">
              <div className="flex items-center justify-between text-xs font-mono text-[#d0bcff]">
                <span className="font-bold">03 / Open</span>
                <Cpu className="h-4 w-4" />
              </div>
              <h3 className="mt-2 text-lg font-bold text-white">Public Inquiry & Open Source</h3>
              <p className="mt-1 text-sm text-[#c7c6cb]">
                Documenting engineering hurdles, sharing exploratory code snippets, and publishing reusable web experiments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
