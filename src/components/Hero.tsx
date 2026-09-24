import React from 'react';
import { ArrowDown, Code2, Headphones, Box, Cpu } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToWorks = () => {
    const el = document.getElementById('projects');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden border-b border-[#383244]/60 bg-[#161021] pt-12 pb-16 lg:pt-20 lg:pb-24">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#4f3886]/15 blur-[120px] rounded-full" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top metadata strip
        <div className="flex flex-wrap items-center justify-between border-b border-[#383244]/60 pb-4 text-xs tracking-widest text-[#b59df2]/90 uppercase font-mono">
          <div className="flex items-center gap-3">
            <span className="inline-block h-2 w-2 rounded-full bg-[#d0bcff] animate-pulse" />
            <span>Editorial Dev Log • Portfolio 2025</span>
          </div>
          <div className="hidden sm:block text-[#919095]">
            Index / 01 — 06 Selected Works
          </div>
          <div className="text-right">
            Active Status: Available for Roles
          </div>
        </div> */}

        {/* Massive Display Title with Rotating Starburst Doodle */}
        <div className="relative mt-8 sm:mt-12">
          <div className="flex items-center justify-between">
            <h1 className="font-anton text-7xl sm:text-9xl md:text-[11rem] lg:text-[13rem] leading-none tracking-tight text-white select-none">
              ATABRIA
            </h1>

            {/* Rotating 8-point geometric starburst doodle matching design */}
            <div className="hidden md:flex flex-col items-center justify-center pl-6">
              <div className="relative flex items-center justify-center">
                <svg
                  className="w-24 h-24 sm:w-32 sm:h-32 text-[#d0bcff] animate-spin-slow opacity-90"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="50" cy="50" r="4" fill="currentColor" />
                  <path d="M 50 10 L 50 90" />
                  <path d="M 10 50 L 90 50" />
                  <path d="M 22 22 L 78 78" />
                  <path d="M 22 78 L 78 22" />
                  <circle cx="50" cy="50" r="28" strokeDasharray="3 3" strokeWidth="1.2" opacity="0.6" />
                </svg>
                {/*<div className="absolute text-[10px] font-mono uppercase tracking-widest text-[#d0bcff]/70 text-center">
                  Lab • 2025
                </div>*/}
              </div>
            </div>
          </div>

          {/* Subtitle & Quote Kicker */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-baseline gap-3 text-lg sm:text-2xl font-light text-[#f4f2f7]">
            <span className="font-medium tracking-wide text-white">Frontend Developer & UX/UI Designer</span>
            <span className="text-[#b59df2] italic font-serif-display">“Let's make something with code.”</span>
          </div>
        </div>

        {/* Lower Split: Manifesto Statement & Action */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end border-t border-[#383244]/60 pt-8">
          <div className="md:col-span-8">
            <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-[#c7c6cb]">
              Synthesizing engineering fidelity, typographic rigor, and interaction craft without decorative noise. Exploring the intersections of real-time Web Audio, reactive 3D WebGL, archival systems, and algorithmic literature.
            </p>

            {/* Disciplines highlight pills */}
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-mono text-[#d0bcff]">
              <span className="flex items-center gap-1.5 rounded-full border border-[#383244] bg-[#1e1929] px-3 py-1">
                <Headphones className="h-3 w-3 text-[#b59df2]" /> Spatial Audio
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-[#383244] bg-[#1e1929] px-3 py-1">
                <Box className="h-3 w-3 text-[#b59df2]" /> WebGL Shaders
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-[#383244] bg-[#1e1929] px-3 py-1">
                <Code2 className="h-3 w-3 text-[#b59df2]" /> Type Mechanics
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-[#383244] bg-[#1e1929] px-3 py-1">
                <Cpu className="h-3 w-3 text-[#b59df2]" /> Design Systems
              </span>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col md:items-end justify-between">
            <button
              onClick={scrollToWorks}
              className="group flex items-center gap-3 rounded-full border border-[#46464b] bg-[#231d2e] px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#e9def6] transition-all hover:border-[#d0bcff] hover:bg-[#2d2738] hover:text-white"
            >
              <span>Scroll to Works</span>
              <ArrowDown className="h-4 w-4 text-[#d0bcff] transition-transform group-hover:translate-y-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
