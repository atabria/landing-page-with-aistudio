import React, { useState } from 'react';
import { Search, Sliders, Download, Columns, AlignLeft, AlignCenter, AlignRight, AlignJustify, Type, BookOpen, Layers, Sparkles } from 'lucide-react';

export const GlyphicaScreen: React.FC = () => {
  const [activeFont, setActiveFont] = useState<'moneta' | 'inter' | 'ara' | 'lota'>('moneta');
  const [fontSize, setFontSize] = useState<number>(72);
  const [fontWeight, setFontWeight] = useState<number>(400);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [letterSpacing, setLetterSpacing] = useState<number>(0);
  const [lineHeight, setLineHeight] = useState<number>(1.15);
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right' | 'justify'>('left');
  const [customText, setCustomText] = useState<string>(
    'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. Portez ce vieux whisky au juge blond qui fume.'
  );
  const [isComparing, setIsComparing] = useState<boolean>(false);
  const [downloadNotice, setDownloadNotice] = useState<boolean>(false);

  const fonts = {
    moneta: {
      name: 'Moneta Serif',
      designer: 'Elara Type Co.',
      classification: 'High-Contrast Serif',
      styles: '7 Optical Cuts',
      languages: '90+ Latin Languages',
      fontClass: 'font-serif-display',
      headline: 'MONETA SERIF',
      description: 'A contemporary display serif with high contrast, sharp terminals, and architectural letterforms engineered for luxury editorial and digital publications.',
    },
    inter: {
      name: 'Inter Display',
      designer: 'Rasmus Andersson',
      classification: 'Geometric Display Sans',
      styles: '9 Weights + Variable',
      languages: '140+ Languages',
      fontClass: 'font-sans',
      headline: 'INTER DISPLAY',
      description: 'A tall x-height precision grotesk designed for hyper-legibility on ultra-dense interface screens and high-density typography.',
    },
    ara: {
      name: 'Ara Serif',
      designer: 'Atabria Foundry',
      classification: 'Renaissance Old Style',
      styles: '6 Styles',
      languages: '85 Languages',
      fontClass: 'font-serif-display',
      headline: 'ARA SERIF',
      description: 'Organic calligraphic tension inspired by Venetian incunabula with asymmetrical serifs and lyrical italic swashes.',
    },
    lota: {
      name: 'Lota Grotesk',
      designer: 'Studio Form',
      classification: 'Neo-Grotesque',
      styles: '8 Styles',
      languages: '110 Languages',
      fontClass: 'font-anton',
      headline: 'LOTA GROTESK',
      description: 'Heavy structural grotesque with brutalist vertical metrics and ink traps optimized for maximum scale impact.',
    },
  };

  const currentFontData = fonts[activeFont];

  const handleDownloadSpecimen = () => {
    const element = document.createElement('a');
    const file = new Blob([
      `GLYPHICA TYPE SPECIMEN\nTypeface: ${currentFontData.name}\nDesigner: ${currentFontData.designer}\nClassification: ${currentFontData.classification}\nStyles: ${currentFontData.styles}\n\nSample Text:\n${customText}\n\nSpecimen exported from Glyphica Lab by Atabria.`
    ], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${activeFont}-specimen-spec.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 3000);
  };

  return (
    <div className="flex flex-col min-h-full bg-[#1e1929] text-[#e9def6]">
      {/* Top Application Ribbon */}
      <div className="flex h-10 items-center justify-between border-b border-[#383244] bg-[#161021] px-4 text-xs">
        <div className="flex items-center gap-5 text-[#919095]">
          <span className="font-bold text-white tracking-wider">GLYPHICA</span>
          <span className="hover:text-white cursor-pointer transition-colors">File</span>
          <span className="hover:text-white cursor-pointer transition-colors">Edit</span>
          <span className="hover:text-white cursor-pointer transition-colors">View</span>
          <span className="hover:text-white cursor-pointer transition-colors">Help</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-[#b59df2]">Specimen Mode: Interactive</span>
          <div className="h-6 w-6 rounded-full bg-[#4f3886] flex items-center justify-center font-bold text-[10px] text-white">
            ER
          </div>
        </div>
      </div>

      {/* Main Workspace: 3-column workbench matching Image 2 */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Dark Sidebar: Foundry & Font Explorer */}
        <div className="lg:col-span-2 border-r border-[#383244] bg-[#161021] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 border-b border-[#383244] pb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#d0bcff] font-anton text-sm text-[#161021]">
                G
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-white">
                Foundry Lab
              </span>
            </div>

            {/* Navigation items */}
            <nav className="mt-4 space-y-1 text-xs">
              <div className="px-2 py-1.5 text-[#919095] hover:text-white cursor-pointer rounded">
                Explorer
              </div>
              <div className="px-2 py-1.5 text-[#919095] hover:text-white cursor-pointer rounded">
                Library
              </div>
              <div className="px-2 py-1.5 bg-[#4f3886]/40 text-[#d0bcff] font-semibold rounded border border-[#b59df2]/30 flex items-center justify-between">
                <span>Specimen</span>
                <span className="text-[9px] font-mono bg-[#d0bcff] text-[#161021] px-1 rounded">ACTIVE</span>
              </div>
              <div className="px-2 py-1.5 text-[#919095] hover:text-white cursor-pointer rounded">
                Settings
              </div>
            </nav>

            {/* Explore Fonts list */}
            <div className="mt-8 border-t border-[#383244] pt-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#919095] mb-2">
                Type Catalog
              </div>
              <div className="space-y-1">
                {(Object.keys(fonts) as (keyof typeof fonts)[]).map((fKey) => (
                  <button
                    key={fKey}
                    onClick={() => setActiveFont(fKey)}
                    className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                      activeFont === fKey
                        ? 'bg-[#2d2738] text-white font-semibold border-l-2 border-[#d0bcff]'
                        : 'text-[#c7c6cb] hover:bg-[#1e1929] hover:text-white'
                    }`}
                  >
                    <span>{fonts[fKey].name}</span>
                    {activeFont === fKey && <Sparkles className="h-3 w-3 text-[#d0bcff]" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-[#919095] pt-4 border-t border-[#383244]">
            Glyphica Engine v3.1<br />OpenType 1.9 Compliant
          </div>
        </div>

        {/* Center Canvas: Crisp Editorial Light Cream Testing Ground (matching Image 2) */}
        <div className="lg:col-span-7 flex flex-col bg-[#F6F3EC] text-[#17131f] overflow-y-auto">
          {/* Canvas Sub-header */}
          <div className="flex items-center justify-between border-b border-[#e2ddd1] px-8 py-4 bg-[#EDE8DE]/70">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#78716c]">
                GLYPHICA / SPECIMEN INSPECTOR
              </span>
              <h2 className="text-xl font-bold tracking-tight text-[#17131f]">
                {currentFontData.name}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCustomText('The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.')}
                className="text-[11px] font-mono px-2 py-1 rounded bg-[#DDD7CB] text-[#44403c] hover:bg-[#D0C9BA] transition-colors"
              >
                Pangram 1
              </button>
              <button
                onClick={() => setCustomText('Portez ce vieux whisky au juge blond qui fume. Voyez ce bon faquir qui boit un verre de bière.')}
                className="text-[11px] font-mono px-2 py-1 rounded bg-[#DDD7CB] text-[#44403c] hover:bg-[#D0C9BA] transition-colors"
              >
                Pangram 2
              </button>
            </div>
          </div>

          {/* Editable Display Specimen Container */}
          <div className="flex-1 p-8 sm:p-12">
            {/* Giant Title Headline */}
            <div className="border-b border-[#e2ddd1] pb-6">
              <span className="text-[11px] font-mono uppercase text-[#78716c]">
                214pt Optical Display Headline
              </span>
              <div
                className={`mt-2 font-bold tracking-tight text-[#17131f] leading-none ${currentFontData.fontClass}`}
                style={{ fontSize: `clamp(42px, 8vw, 110px)` }}
              >
                {currentFontData.headline}
              </div>
              <p className="mt-3 text-xs font-mono text-[#78716c]">
                {fontSize}pt, {currentFontData.name}, Weight {fontWeight} {isItalic ? 'Italic' : 'Roman'} • High Contrast Precision
              </p>
            </div>

            {/* Main Interactive Text Area */}
            <div className="mt-8">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#78716c] mb-2">
                Click text below to test live copy:
              </label>
              <div
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => setCustomText(e.currentTarget.textContent || '')}
                className={`outline-none transition-all ${currentFontData.fontClass}`}
                style={{
                  fontSize: `${fontSize}px`,
                  fontWeight: fontWeight,
                  fontStyle: isItalic ? 'italic' : 'normal',
                  letterSpacing: `${letterSpacing}px`,
                  lineHeight: lineHeight,
                  textAlign: alignment,
                  color: '#15121c',
                }}
              >
                {customText}
              </div>
            </div>

            {/* Split Comparison View when toggled */}
            {isComparing && (
              <div className="mt-12 border-t-2 border-dashed border-[#d5cfc2] pt-8">
                <span className="text-[11px] font-mono uppercase text-[#78716c]">
                  Comparison Reference: Inter Display
                </span>
                <div
                  className="mt-2 text-2xl font-sans text-[#44403c]"
                  style={{ lineHeight: 1.3 }}
                >
                  {customText}
                </div>
              </div>
            )}
          </div>

          {/* Floating Responsive Tool Dock at Bottom (matching Image 2) */}
          <div className="sticky bottom-0 z-10 border-t border-[#e2ddd1] bg-[#EDE8DE]/95 px-6 py-4 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#292524]">
              {/* Font Size Slider */}
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-[#78716c]">SIZE</span>
                <input
                  type="range"
                  min="24"
                  max="120"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-24 accent-[#4f3886]"
                />
                <span className="w-8 font-mono text-[11px]">{fontSize}px</span>
              </div>

              {/* Weight Selector */}
              <div className="flex items-center gap-1">
                <span className="font-mono text-[11px] font-bold text-[#78716c] mr-1">WEIGHT</span>
                <button
                  onClick={() => setFontWeight(400)}
                  className={`px-2 py-1 rounded text-[11px] font-mono ${fontWeight === 400 ? 'bg-[#17131f] text-white' : 'bg-[#DDD7CB] text-[#44403c]'}`}
                >
                  400
                </button>
                <button
                  onClick={() => setFontWeight(500)}
                  className={`px-2 py-1 rounded text-[11px] font-mono ${fontWeight === 500 ? 'bg-[#17131f] text-white' : 'bg-[#DDD7CB] text-[#44403c]'}`}
                >
                  500
                </button>
                <button
                  onClick={() => setFontWeight(700)}
                  className={`px-2 py-1 rounded text-[11px] font-mono font-bold ${fontWeight === 700 ? 'bg-[#17131f] text-white' : 'bg-[#DDD7CB] text-[#44403c]'}`}
                >
                  700
                </button>
                <button
                  onClick={() => setIsItalic(!isItalic)}
                  className={`px-2 py-1 rounded text-[11px] font-mono italic ${isItalic ? 'bg-[#17131f] text-white' : 'bg-[#DDD7CB] text-[#44403c]'}`}
                >
                  Italic
                </button>
              </div>

              {/* Leading & Tracking */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[11px] text-[#78716c]">TRACK</span>
                  <input
                    type="range"
                    min="-2"
                    max="8"
                    step="0.5"
                    value={letterSpacing}
                    onChange={(e) => setLetterSpacing(Number(e.target.value))}
                    className="w-16 accent-[#4f3886]"
                  />
                  <span className="font-mono text-[10px]">{letterSpacing}px</span>
                </div>
              </div>

              {/* Alignment Buttons */}
              <div className="flex items-center gap-1 bg-[#DDD7CB] p-1 rounded-md">
                <button
                  onClick={() => setAlignment('left')}
                  className={`p-1 rounded ${alignment === 'left' ? 'bg-[#17131f] text-white' : 'text-[#44403c]'}`}
                >
                  <AlignLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setAlignment('center')}
                  className={`p-1 rounded ${alignment === 'center' ? 'bg-[#17131f] text-white' : 'text-[#44403c]'}`}
                >
                  <AlignCenter className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setAlignment('right')}
                  className={`p-1 rounded ${alignment === 'right' ? 'bg-[#17131f] text-white' : 'text-[#44403c]'}`}
                >
                  <AlignRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setAlignment('justify')}
                  className={`p-1 rounded ${alignment === 'justify' ? 'bg-[#17131f] text-white' : 'text-[#44403c]'}`}
                >
                  <AlignJustify className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Typeface Details & Actions (matching Image 2) */}
        <div className="lg:col-span-3 border-l border-[#383244] bg-[#161021] p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#919095]">
                TYPEFACE DETAILS
              </div>
              <h3 className="mt-1 text-xl font-bold text-white">
                {currentFontData.name}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#c7c6cb]">
                {currentFontData.description}
              </p>
            </div>

            {/* Spec Attributes */}
            <div className="space-y-3 border-t border-[#383244] pt-4 text-xs">
              <div className="flex justify-between">
                <span className="text-[#919095]">Designer</span>
                <span className="font-medium text-white">{currentFontData.designer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#919095]">Styles</span>
                <span className="font-mono text-[#d0bcff]">{currentFontData.styles}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#919095]">Classification</span>
                <span className="font-medium text-white">{currentFontData.classification}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#919095]">Languages</span>
                <span className="font-medium text-white">{currentFontData.languages}</span>
              </div>
            </div>

            {/* OpenType Features */}
            <div className="border-t border-[#383244] pt-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#919095] mb-2">
                OpenType Features
              </div>
              <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                <span className="rounded bg-[#231d2e] border border-[#383244] px-2 py-1 text-[#d0bcff]">liga (Ligatures)</span>
                <span className="rounded bg-[#231d2e] border border-[#383244] px-2 py-1 text-[#d0bcff]">dlig (Discretionary)</span>
                <span className="rounded bg-[#231d2e] border border-[#383244] px-2 py-1 text-[#d0bcff]">frac (Fractions)</span>
                <span className="rounded bg-[#231d2e] border border-[#383244] px-2 py-1 text-[#d0bcff]">ss01 (Alternate Q)</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-6 border-t border-[#383244]">
            {downloadNotice && (
              <div className="rounded bg-emerald-950/80 border border-emerald-500/40 p-2 text-center text-xs text-emerald-300">
                Specimen file generated!
              </div>
            )}
            <button
              onClick={handleDownloadSpecimen}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#d0bcff] py-2.5 text-xs font-bold uppercase tracking-wider text-[#161021] transition-all hover:bg-white"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Specimen</span>
            </button>

            <button
              onClick={() => setIsComparing(!isComparing)}
              className={`w-full flex items-center justify-center gap-2 rounded-lg border py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                isComparing
                  ? 'border-[#d0bcff] bg-[#4f3886]/40 text-white'
                  : 'border-[#46464b] bg-[#231d2e] text-[#c7c6cb] hover:text-white'
              }`}
            >
              <Columns className="h-3.5 w-3.5" />
              <span>{isComparing ? 'Close Comparison' : 'Compare Fonts'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
