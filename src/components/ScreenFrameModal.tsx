import React from 'react';
import { ArrowLeft, Maximize2, Minimize2, ExternalLink, RefreshCw, X } from 'lucide-react';
import { ScreenId } from '../types';

interface ScreenFrameModalProps {
  screenId: ScreenId;
  title: string;
  urlAddress: string;
  onBackToPortfolio: () => void;
  onSelectScreen: (screenId: ScreenId) => void;
  children: React.ReactNode;
}

export const ScreenFrameModal: React.FC<ScreenFrameModalProps> = ({
  screenId,
  title,
  urlAddress,
  onBackToPortfolio,
  onSelectScreen,
  children,
}) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const screens: { id: ScreenId; label: string; number: string }[] = [
    { id: 'aura-mixer', label: '01 Aura Mixer', number: '01' },
    { id: 'glyphica', label: '02 Glyphica', number: '02' },
    { id: 'aethel-archive', label: '03 Aethel Archive', number: '03' },
    { id: 'gengeo', label: '04 GenGeo', number: '04' },
    { id: 'verso-poetry', label: '05 Verso Poetry', number: '05' },
    { id: 'sonic-habitats', label: '06 Sonic Habitats', number: '06' },
  ];

  return (
    <div className="min-h-screen bg-[#0d0914] text-[#e9def6] flex flex-col">
      {/* Top Studio Control Bar */}
      <div className="sticky top-0 z-50 flex items-center justify-between border-b border-[#383244] bg-[#161021] px-4 py-2.5">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToPortfolio}
            className="flex items-center gap-2 rounded-lg bg-[#231d2e] border border-[#46464b] px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#d0bcff] transition-colors hover:bg-[#2d2738] hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Portfolio</span>
          </button>

          <span className="hidden sm:inline-block text-xs font-mono text-[#919095] border-l border-[#383244] pl-3">
            Screen View: <span className="text-white font-medium">{title}</span>
          </span>
        </div>

        {/* Screen Switcher Pills */}
        <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto py-1">
          {screens.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectScreen(item.id)}
              className={`rounded-md px-2.5 py-1 text-xs font-mono transition-colors ${
                screenId === item.id
                  ? 'bg-[#d0bcff] text-[#161021] font-bold shadow-sm'
                  : 'bg-[#1e1929] text-[#c7c6cb] hover:bg-[#2d2738] hover:text-white border border-[#383244]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-md text-[#919095] hover:text-white hover:bg-[#231d2e] transition-colors"
            title={isFullscreen ? 'Windowed mode' : 'Fullscreen preview'}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button
            onClick={onBackToPortfolio}
            className="p-1.5 rounded-md text-[#919095] hover:text-white hover:bg-[#231d2e] transition-colors"
            title="Close screen"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Screen Frame Container */}
      <div className={`flex-1 ${isFullscreen ? 'p-0' : 'p-2 sm:p-4 md:p-6'} flex flex-col`}>
        <div
          className={`flex-1 flex flex-col overflow-hidden rounded-xl border border-[#383244] bg-[#110b1b] shadow-2xl ${
            isFullscreen ? 'rounded-none border-none' : ''
          }`}
        >
          {/* OS Window Chrome Bar (matching Image 1, 4, 6) */}
          <div className="flex h-10 items-center justify-between border-b border-[#2d2738] bg-[#1a1426] px-4">
            {/* macOS traffic light window dots */}
            <div className="flex items-center gap-2">
              <button
                onClick={onBackToPortfolio}
                className="h-3 w-3 rounded-full bg-[#ff5f56] hover:opacity-80 transition-opacity"
                title="Close window"
              />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="h-3 w-3 rounded-full bg-[#27c93f] hover:opacity-80 transition-opacity"
                title="Maximize window"
              />
            </div>

            {/* URL Address Bar */}
            <div className="mx-4 flex max-w-md flex-1 items-center justify-center">
              <div className="flex w-full items-center justify-center gap-2 rounded-md bg-[#110b1b] px-3 py-1 text-[11px] font-mono text-[#b59df2]/80 border border-[#383244]/60">
                <span className="text-[#919095]">https://</span>
                <span className="text-[#e9def6] truncate">{urlAddress}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[#919095]">
              <RefreshCw className="h-3.5 w-3.5 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Render Actual Interactive Screen */}
          <div className="flex-1 overflow-auto bg-[#161021]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
