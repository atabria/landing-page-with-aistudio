import React, { useState } from 'react';
import { RefreshCw, Bookmark, Share2, ChevronLeft, ChevronRight, BookOpen, Sparkles, Check, Sliders } from 'lucide-react';

interface PoemItem {
  id: string;
  title: string;
  author: string;
  type: string;
  date: string;
  length: string;
  stanzas: string[];
}

export const VersoPoetryScreen: React.FC = () => {
  const POEMS: PoemItem[] = [
    {
      id: 'p1',
      title: 'SPECTRAL INTERFERENCE',
      author: 'Aethelred v1.3',
      type: 'Procedural Generation',
      date: 'Nov 12, 2023',
      length: '14 lines',
      stanzas: [
        'Static in the static',
        'The algorithm hums a requiem',
        'To what we might have been.',
        'Echoes of a future past',
        'Colliding in digital space.',
        '',
        'Data // Become // Dirt // And // Dreams.',
        '',
        'Silent now,',
        'The machine waits.',
        'In cold silicate slumber',
        'Where numbers dream of rain.'
      ]
    },
    {
      id: 'p2',
      title: 'CHRONO-SYNTAX',
      author: 'Aethelred v1.3',
      type: 'Markov Cadence',
      date: 'Today',
      length: '11 lines',
      stanzas: [
        'We traded shadows for clock cycles,',
        'The sundial cracked beneath neon dawn.',
        'A single byte forgotten in the cache',
        'Weeps for lost analog afternoons.',
        '',
        'Pulse // Recurse // Dissolve // Awaken.',
        '',
        'The screen flickers blue,',
        'Then swallows the horizon whole.'
      ]
    },
    {
      id: 'p3',
      title: 'GLITCH IN THE LOOM',
      author: 'Aethelred v1.2',
      type: 'Recursive Weaver',
      date: 'Oct 28, 2023',
      length: '12 lines',
      stanzas: [
        'Threads of fiber optic spun into wool,',
        'Jacquard punchcards ticking against the stars.',
        'An error in column forty-four',
        'Becomes an accidental blossom.',
        '',
        'Every knot is a decision,',
        'Every severed thread a poem.'
      ]
    }
  ];

  const [currentPoemIndex, setCurrentPoemIndex] = useState(0);
  const [fontSizePt, setFontSizePt] = useState(20);
  const [trackingEm, setTrackingEm] = useState(0.04);
  const [anthologyCount, setAnthologyCount] = useState(3);
  const [savedNotice, setSavedNotice] = useState(false);
  const [copiedNotice, setCopiedNotice] = useState(false);

  const currentPoem = POEMS[currentPoemIndex];

  const handleNext = () => {
    setCurrentPoemIndex((prev) => (prev + 1) % POEMS.length);
  };

  const handlePrev = () => {
    setCurrentPoemIndex((prev) => (prev - 1 + POEMS.length) % POEMS.length);
  };

  const handleSaveToAnthology = () => {
    setAnthologyCount((prev) => prev + 1);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2400);
  };

  const handleShare = () => {
    const text = `${currentPoem.title}\nBy ${currentPoem.author}\n\n${currentPoem.stanzas.join('\n')}\n\nGenerated via Verso Algorithmic Typesetting by Atabria`;
    navigator.clipboard.writeText(text);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2400);
  };

  return (
    <div className="flex flex-col min-h-full bg-[#100c17] text-[#e9def6]">
      {/* Top Navigation Bar matching Image 5 */}
      <div className="flex h-12 items-center justify-between border-b border-[#2d2738] bg-[#161021] px-6">
        <div className="flex items-center gap-8">
          <span className="font-anton text-2xl tracking-wider text-white">VERSO</span>
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-widest text-[#919095]">
            <span className="text-[#d0bcff] font-semibold border-b border-[#d0bcff] pb-0.5">Workshop</span>
            <span className="hover:text-white cursor-pointer">Archive</span>
            <span className="hover:text-white cursor-pointer">Anthology ({anthologyCount})</span>
            <span className="hover:text-white cursor-pointer">Manifesto</span>
            <span className="hover:text-white cursor-pointer">Settings</span>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-full bg-[#4f3886] flex items-center justify-center font-bold text-xs text-white">
            D
          </div>
        </div>
      </div>

      {/* 3-Column Layout matching Image 5 */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Column: Metadata & Typesetting Controls */}
        <div className="lg:col-span-3 border-r border-[#2d2738] bg-[#140f21] p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#919095]">
                APPARATUS METRICS
              </div>
              <div className="mt-4 space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-[#2d2738] pb-2">
                  <span className="text-[#919095]">AUTHOR</span>
                  <span className="text-white font-medium">{currentPoem.author}</span>
                </div>
                <div className="flex justify-between border-b border-[#2d2738] pb-2">
                  <span className="text-[#919095]">TYPE</span>
                  <span className="text-[#d0bcff]">{currentPoem.type}</span>
                </div>
                <div className="flex justify-between border-b border-[#2d2738] pb-2">
                  <span className="text-[#919095]">DATE</span>
                  <span className="text-white">{currentPoem.date}</span>
                </div>
                <div className="flex justify-between border-b border-[#2d2738] pb-2">
                  <span className="text-[#919095]">LENGTH</span>
                  <span className="text-white">{currentPoem.length}</span>
                </div>
                <div className="flex justify-between border-b border-[#2d2738] pb-2">
                  <span className="text-[#919095]">FONT</span>
                  <span className="text-white">Editorial Serif</span>
                </div>
              </div>
            </div>

            {/* Typography Sliders */}
            <div className="border-t border-[#2d2738] pt-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#919095] mb-3">
                Typesetting Adjustments
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#919095]">Optical Size</span>
                  <span className="text-[#d0bcff]">{fontSizePt}pt</span>
                </div>
                <input
                  type="range"
                  min="16"
                  max="32"
                  value={fontSizePt}
                  onChange={(e) => setFontSizePt(Number(e.target.value))}
                  className="mt-1 w-full accent-[#d0bcff]"
                />
              </div>

              <div className="mt-3">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#919095]">Tracking</span>
                  <span className="text-[#d0bcff]">{(trackingEm * 10).toFixed(1)}em</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.15"
                  step="0.01"
                  value={trackingEm}
                  onChange={(e) => setTrackingEm(Number(e.target.value))}
                  className="mt-1 w-full accent-[#d0bcff]"
                />
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-[#919095] pt-4 border-t border-[#2d2738]">
            Verso Natural Language Pipeline<br />Temperature: 0.72 • Cadence: Iambic
          </div>
        </div>

        {/* Center Column: Big Literary Typography Display (matching Image 5) */}
        <div className="lg:col-span-6 flex flex-col justify-between p-8 sm:p-14 bg-[#0d0914] overflow-y-auto">
          {/* Poem Title */}
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#919095]">
              STROPHE {currentPoemIndex + 1} OF {POEMS.length}
            </span>
            <h2 className="mt-2 font-serif-display text-3xl sm:text-5xl tracking-wide uppercase text-white font-bold">
              {currentPoem.title}
            </h2>

            {/* Poem Verses */}
            <div
              className="mt-10 font-serif-display leading-relaxed text-[#f4f2f7] space-y-2 transition-all duration-300"
              style={{
                fontSize: `${fontSizePt}px`,
                letterSpacing: `${trackingEm}em`,
              }}
            >
              {currentPoem.stanzas.map((line, idx) => (
                <p key={idx} className={line === '' ? 'h-4' : ''}>
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Action Row matching Image 5 */}
          <div className="mt-12 flex flex-wrap items-center gap-4 pt-6 border-t border-[#2d2738] font-mono text-xs uppercase">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 text-[#919095] hover:text-white transition-colors"
            >
              <span>&lt; PREV</span>
            </button>

            <span className="text-[#383244]">/</span>

            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 text-[#d0bcff] hover:text-white font-bold transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>REGENERATE</span>
            </button>

            <span className="text-[#383244]">/</span>

            <button
              onClick={handleSaveToAnthology}
              className="flex items-center gap-1.5 text-[#919095] hover:text-white transition-colors"
            >
              <Bookmark className="h-3.5 w-3.5" />
              <span>SAVE TO ANTHOLOGY</span>
            </button>

            <span className="text-[#383244]">/</span>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-[#919095] hover:text-white transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>SHARE</span>
            </button>

            {/* Status alerts */}
            {savedNotice && (
              <span className="ml-auto text-emerald-400 font-bold">Saved to Anthology!</span>
            )}
            {copiedNotice && (
              <span className="ml-auto text-emerald-400 font-bold">Copied to Clipboard!</span>
            )}
          </div>
        </div>

        {/* Right Column: Daily Fragment & Recent Work (matching Image 5) */}
        <div className="lg:col-span-3 border-l border-[#2d2738] bg-[#140f21] p-6 flex flex-col justify-between">
          <div className="space-y-6">
            {/* The Daily Fragment */}
            <div className="rounded-xl border border-[#2d2738] bg-[#1e1929] p-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#d0bcff]">
                THE DAILY FRAGMENT
              </div>
              <p className="mt-3 font-serif-display italic text-sm text-[#c7c6cb] leading-relaxed">
                “A short algorithmic fragment hums a requiem for all the analog hours we left behind.”
              </p>
              <span className="mt-2 block font-mono text-[10px] text-[#919095]">
                Aethelred Seed #891
              </span>
            </div>

            {/* Recent Work List */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#919095] mb-3">
                RECENT WORK ARCHIVE
              </div>
              <div className="space-y-2">
                {POEMS.map((p, idx) => (
                  <div
                    key={p.id}
                    onClick={() => setCurrentPoemIndex(idx)}
                    className={`cursor-pointer rounded-lg p-3 text-xs transition-colors border ${
                      currentPoemIndex === idx
                        ? 'border-[#d0bcff] bg-[#4f3886]/30 text-white'
                        : 'border-[#2d2738] bg-[#161021] text-[#919095] hover:text-white hover:border-[#383244]'
                    }`}
                  >
                    <div className="font-serif-display font-semibold text-white">{p.title}</div>
                    <div className="mt-1 flex justify-between font-mono text-[10px] text-[#b59df2]/80">
                      <span>{p.author}</span>
                      <span>{p.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#383244] bg-[#1e1929] p-4 text-center">
            <span className="font-mono text-xs text-[#919095]">ANTHOLOGY TOTAL</span>
            <div className="font-anton text-3xl text-[#d0bcff] mt-1">{anthologyCount} POEMS</div>
          </div>
        </div>
      </div>
    </div>
  );
};
