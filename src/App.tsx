import React, { useState } from 'react';
import { ScreenId } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectCard } from './components/ProjectCard';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { EmptyStateLab } from './components/EmptyStateLab';
import { ScreenSwitcherBar } from './components/ScreenSwitcherBar';
import { ScreenFrameModal } from './components/ScreenFrameModal';
import { AuraSpatialScreen } from './screens/AuraSpatialScreen';
import { GlyphicaScreen } from './screens/GlyphicaScreen';
import { AethelArchiveScreen } from './screens/AethelArchiveScreen';
import { GenGeoScreen } from './screens/GenGeoScreen';
import { VersoPoetryScreen } from './screens/VersoPoetryScreen';
import { SonicHabitatsScreen } from './screens/SonicHabitatsScreen';
import { PROJECTS_DATA } from './data/projectsData';
import { Filter, Layers, Sparkles } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('portfolio');
  const [isLabMode, setIsLabMode] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Works (06)' },
    { id: 'Web Audio', label: 'Web Audio' },
    { id: 'Typography', label: 'Typography' },
    { id: 'Archival Curation', label: 'Archival Systems' },
    { id: 'Shader Programming', label: 'WebGL Shaders' },
    { id: 'Literature & Code', label: 'Typesetting' },
    { id: 'Acoustic Ecology', label: 'Acoustics' },
  ];

  const filteredProjects = activeCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  // Screen configuration details for window chrome
  const screenDetails: Record<ScreenId, { title: string; url: string }> = {
    'portfolio': { title: 'Atabria Studio Portfolio', url: 'atabria.dev' },
    'aura-mixer': { title: 'OSA — Orbital Spatial Audio Mixer', url: 'osa.studio/spaces/orbital-mixer' },
    'glyphica': { title: 'Glyphica — Moneta Serif Type Specimen', url: 'glyphica.type/specimen/moneta-serif' },
    'aethel-archive': { title: 'Aethel Digital Archival Registry', url: 'aethel.archive/curation/collections' },
    'gengeo': { title: 'GenGeo — Generative Shaders & Polyhedra', url: 'gengeo.studio/sandbox/untitled-geometry' },
    'verso-poetry': { title: 'Verso — Algorithmic Poetry Apparatus', url: 'verso.typeset/apparatus/strophes' },
    'sonic-habitats': { title: 'Sonic Habitats — Acoustic Ecology Archive', url: 'sonichabitats.com/archive/coastal-gales' },
    'lab-empty-state': { title: 'Atabria Lab // Stage 00 (Empty State)', url: 'atabria.dev/lab/in-development' },
  };

  const activeScreenInfo = screenDetails[currentScreen];

  return (
    <div className="min-h-screen bg-[#161021] text-[#e9def6] selection:bg-[#4f3886] selection:text-white">
      {/* If viewing a dedicated interactive screen */}
      {currentScreen !== 'portfolio' ? (
        <ScreenFrameModal
          screenId={currentScreen}
          title={activeScreenInfo.title}
          urlAddress={activeScreenInfo.url}
          onBackToPortfolio={() => setCurrentScreen('portfolio')}
          onSelectScreen={(id) => setCurrentScreen(id)}
        >
          {currentScreen === 'aura-mixer' && <AuraSpatialScreen />}
          {currentScreen === 'glyphica' && <GlyphicaScreen />}
          {currentScreen === 'aethel-archive' && <AethelArchiveScreen />}
          {currentScreen === 'gengeo' && <GenGeoScreen />}
          {currentScreen === 'verso-poetry' && <VersoPoetryScreen />}
          {currentScreen === 'sonic-habitats' && <SonicHabitatsScreen />}
          {currentScreen === 'lab-empty-state' && (
            <div className="min-h-full flex items-center justify-center p-6 bg-[#161021]">
              <EmptyStateLab
                onSwitchToCatalog={() => {
                  setIsLabMode(false);
                  setCurrentScreen('portfolio');
                }}
                onOpenScreen={(id) => setCurrentScreen(id)}
              />
            </div>
          )}
        </ScreenFrameModal>
      ) : (
        /* Main Portfolio Experience */
        <div className="flex flex-col min-h-screen">
          <Header
            currentScreen={currentScreen}
            onSelectScreen={setCurrentScreen}
            isLabMode={isLabMode}
            onToggleLabMode={() => setIsLabMode(!isLabMode)}
          />

          <main className="flex-1">
            <Hero />

            {/* Selected Works Catalog / Lab Stage Section */}
            <section id="projects" className="border-b border-[#383244]/60 bg-[#161021] py-20 lg:py-28">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Catalog Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#383244]/60 pb-4">
                  <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#d0bcff]">
                    <span>01 // Selected Works</span>
                    <span className="text-[#46464b]">•</span>
                    <span>{isLabMode ? 'Catalog 00 — 00' : 'Catalog 01 — 06'}</span>
                  </div>

                  <div className="mt-2 sm:mt-0 flex items-center gap-3">
                    <button
                      onClick={() => setIsLabMode(!isLabMode)}
                      className="flex items-center gap-1.5 text-xs font-mono text-[#b59df2] hover:text-white transition-colors"
                    >
                      <Sparkles className="h-3.5 w-3.5 text-[#d0bcff]" />
                      <span>{isLabMode ? 'Switch to Completed Works' : 'View In-Development State (Image 9)'}</span>
                    </button>
                  </div>
                </div>

                {/* Lab Mode Toggle (Image 9 View) */}
                {isLabMode ? (
                  <EmptyStateLab
                    onSwitchToCatalog={() => setIsLabMode(false)}
                    onOpenScreen={setCurrentScreen}
                  />
                ) : (
                  <>
                    {/* Category Filter Pills */}
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="flex items-center gap-1.5 text-xs font-mono text-[#919095] mr-2">
                          <Filter className="h-3.5 w-3.5" /> Filter:
                        </span>
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`rounded-full px-3 py-1 text-xs font-mono transition-colors ${
                              activeCategory === cat.id
                                ? 'bg-[#d0bcff] text-[#161021] font-bold shadow-sm'
                                : 'bg-[#1e1929] text-[#c7c6cb] hover:bg-[#2d2738] hover:text-white border border-[#383244]'
                            }`}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>

                      <div className="text-xs font-mono text-[#919095]">
                        Live Screen Previews Available for all 6 Projects
                      </div>
                    </div>

                    {/* Responsive Asymmetric Project Cards (matching Image 7) */}
                    <div className="mt-10 space-y-12">
                      {filteredProjects.map((project) => (
                        <ProjectCard
                          key={project.id}
                          project={project}
                          onOpenScreen={setCurrentScreen}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </section>

            <AboutSection />
            <ContactSection />
          </main>

          <Footer />
        </div>
      )}

      {/* Persistent Global Screen Switcher Dock */}
      <ScreenSwitcherBar
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        isLabMode={isLabMode}
        onToggleLabMode={() => setIsLabMode(!isLabMode)}
      />
    </div>
  );
}
