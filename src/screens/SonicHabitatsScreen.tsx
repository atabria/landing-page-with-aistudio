import React, { useState, useEffect, useRef } from 'react';
import { SOUNDSCAPE_TRACKS } from '../data/projectsData';
import { SoundscapeTrack } from '../types';
import { Play, Pause, Volume2, Share2, Download, Search, Radio, Compass, Filter, MapPin } from 'lucide-react';

export const SonicHabitatsScreen: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSec, setPlaybackSec] = useState<number>(75); // 01:15
  const [volume, setVolume] = useState<number>(80);
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeMood, setActiveMood] = useState<string>('All');

  const currentTrack: SoundscapeTrack = SOUNDSCAPE_TRACKS[currentTrackIndex];

  // Web Audio Context for realistic ambient sound synthesis (Oceanic swell / wave generator)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const waveNodesRef = useRef<{ gain?: GainNode; filter?: BiquadFilterNode; lfo?: OscillatorNode } | null>(null);

  // Play/Pause ambient sound synthesis
  const togglePlay = () => {
    if (!isPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Create white noise buffer for realistic surf/wind wash
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Resonant lowpass filter to mimic rolling coastal surf
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        // LFO to slowly sweep the surf filter (swell in and out)
        const lfo = ctx.createOscillator();
        lfo.frequency.setValueAtTime(0.12, ctx.currentTime); // ~8 sec wave period
        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(240, ctx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(filter.frequency);

        // Master Gain
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime((volume / 100) * 0.25, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(masterGain);
        masterGain.connect(ctx.destination);

        whiteNoise.start();
        lfo.start();

        waveNodesRef.current = { gain: masterGain, filter, lfo };
      } catch (err) {
        console.warn('AudioContext not allowed without gesture', err);
      }
      setIsPlaying(true);
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
      setIsPlaying(false);
    }
  };

  // Adjust volume on the fly
  useEffect(() => {
    if (waveNodesRef.current?.gain && audioCtxRef.current) {
      waveNodesRef.current.gain.gain.setValueAtTime((volume / 100) * 0.25, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  // Cleanup audio
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // Timer increment
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setPlaybackSec((prev) => (prev >= currentTrack.playbackDurationSec ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  const formatSec = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const filteredTracks = SOUNDSCAPE_TRACKS.filter((track) => {
    const matchesSearch =
      track.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      track.location.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesTag = selectedTag === 'All' || track.tags.includes(selectedTag);
    const matchesMood = activeMood === 'All' || track.mood === activeMood;
    return matchesSearch && matchesTag && matchesMood;
  });

  return (
    <div className="flex flex-col min-h-full bg-[#120d1c] text-[#e9def6]">
      {/* Top Application Bar matching Image 6 */}
      <div className="flex h-14 items-center justify-between border-b border-[#2d2738] bg-[#161021] px-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-anton text-xl tracking-wider text-white">SONIC HABITATS</span>
            <span className="text-[#383244]">|</span>
            <span className="font-mono text-xs text-[#d0bcff] uppercase tracking-widest">ARCHIVE</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-[#919095]">
            <span className="text-white font-medium hover:text-[#d0bcff] cursor-pointer">Explore</span>
            <span className="hover:text-white cursor-pointer">Collections</span>
            <span className="hover:text-white cursor-pointer">Acoustic Map</span>
            <span className="hover:text-white cursor-pointer">About</span>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-lg bg-[#231d2e] border border-[#383244] px-3 py-1.5 text-xs font-mono text-[#d0bcff] hover:text-white">
            Log In
          </button>
        </div>
      </div>

      {/* Main Content: Hero Waveform Player + Playlist + Filter Sidebar */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left/Center Player & Track Catalog (matching Image 6) */}
        <div className="lg:col-span-8 p-6 sm:p-8 overflow-y-auto border-b lg:border-b-0 lg:border-r border-[#2d2738]">
          {/* Big Track Title & Geographic Callout */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#2d2738] pb-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#b59df2]">
                <MapPin className="h-3.5 w-3.5 text-[#d0bcff]" />
                <span>{currentTrack.location}</span>
              </div>
              <h2 className="mt-2 font-anton text-3xl sm:text-5xl uppercase tracking-wide text-white">
                {currentTrack.title}
              </h2>
            </div>
            <div className="text-right font-mono text-xs text-[#919095]">
              <span className="text-[#d0bcff] font-semibold">{currentTrack.frequency}</span>
            </div>
          </div>

          {/* Dynamic Interactive Waveform Player Card */}
          <div className="mt-8 rounded-2xl border border-[#383244] bg-[#1e1929] p-6 shadow-xl">
            {/* Waveform Visualization Bars */}
            <div className="flex items-end justify-between h-28 gap-1 py-2 px-1">
              {Array.from({ length: 48 }).map((_, idx) => {
                // Generate natural terrain/sound wave heights
                const progressRatio = playbackSec / currentTrack.playbackDurationSec;
                const isPast = idx / 48 <= progressRatio;
                const heightSeed = Math.sin(idx * 0.28) * 40 + Math.cos(idx * 0.5) * 20 + 45;
                const animatedBoost = isPlaying ? Math.sin(Date.now() * 0.005 + idx) * 12 : 0;
                const heightPercent = Math.max(12, Math.min(100, heightSeed + animatedBoost));

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setPlaybackSec(Math.floor((idx / 48) * currentTrack.playbackDurationSec));
                    }}
                    className={`flex-1 rounded-full cursor-pointer transition-all ${
                      isPast
                        ? 'bg-[#d0bcff] shadow-[0_0_8px_#d0bcff]'
                        : 'bg-[#383244] hover:bg-[#5e536f]'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                );
              })}
            </div>

            {/* Scrubber & Time */}
            <div className="mt-4 flex items-center justify-between font-mono text-xs text-[#919095]">
              <span className="text-white font-semibold">{formatSec(playbackSec)}</span>
              <span>{currentTrack.duration}</span>
            </div>

            {/* Audio Controls Toolbar */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#383244] pt-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d0bcff] text-[#161021] transition-transform hover:scale-105 hover:bg-white shadow-lg"
                >
                  {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
                </button>

                <div>
                  <div className="text-xs font-semibold text-white">{currentTrack.title}</div>
                  <div className="text-[10px] font-mono text-[#b59df2]">Spatial Binaural Field Recording</div>
                </div>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-[#919095]" />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-24 accent-[#d0bcff]"
                />
                <span className="font-mono text-xs text-[#919095] w-8">{volume}%</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Share link for ${currentTrack.title} copied!`)}
                  className="p-2 rounded-lg bg-[#231d2e] border border-[#383244] text-[#c7c6cb] hover:text-white"
                  title="Share recording"
                >
                  <Share2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => alert(`Downloading FLAC 24-bit stem for ${currentTrack.title}`)}
                  className="p-2 rounded-lg bg-[#231d2e] border border-[#383244] text-[#c7c6cb] hover:text-white"
                  title="Download FLAC master"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Playlist Section matching Image 6 */}
          <div className="mt-10">
            <div className="flex items-center justify-between border-b border-[#2d2738] pb-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#d0bcff]">
                HABITAT PLAYLIST ARCHIVE
              </h3>
              <span className="font-mono text-xs text-[#919095]">
                {filteredTracks.length} Field Recordings
              </span>
            </div>

            <div className="mt-4 space-y-2.5">
              {filteredTracks.map((track, idx) => {
                const isSelected = SOUNDSCAPE_TRACKS.indexOf(track) === currentTrackIndex;
                return (
                  <div
                    key={track.id}
                    onClick={() => {
                      setCurrentTrackIndex(SOUNDSCAPE_TRACKS.indexOf(track));
                      setPlaybackSec(0);
                    }}
                    className={`group cursor-pointer rounded-xl border p-4 transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#d0bcff] bg-[#4f3886]/30 shadow-md'
                        : 'border-[#2d2738] bg-[#161021] hover:border-[#383244] hover:bg-[#1e1929]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                        isSelected ? 'bg-[#d0bcff] text-[#161021]' : 'bg-[#231d2e] text-[#d0bcff]'
                      }`}>
                        {isSelected && isPlaying ? (
                          <Radio className="h-4 w-4 animate-pulse" />
                        ) : (
                          <Play className="h-4 w-4 fill-current ml-0.5" />
                        )}
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-white group-hover:text-[#d0bcff] transition-colors">
                          {track.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-[#919095] mt-0.5">
                          <span>{track.location}</span>
                          <span>•</span>
                          <span className="font-mono text-[11px] text-[#b59df2]">{track.mood}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Miniature preview waveform */}
                      <div className="hidden sm:flex items-end gap-0.5 h-6 w-20">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div
                            key={i}
                            className={`flex-1 rounded-full ${isSelected ? 'bg-[#d0bcff]' : 'bg-[#383244]'}`}
                            style={{ height: `${(Math.sin(i * 0.8 + idx) * 0.4 + 0.6) * 100}%` }}
                          />
                        ))}
                      </div>

                      <span className="font-mono text-xs text-white">{track.duration}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Filters, Tags & Collections (matching Image 6) */}
        <div className="lg:col-span-4 p-6 bg-[#161021] flex flex-col justify-between">
          <div className="space-y-6">
            {/* Search Input */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#919095]" />
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Filter by biome or location..."
                  className="w-full rounded-xl border border-[#383244] bg-[#1e1929] pl-9 pr-3 py-2 text-xs text-white placeholder-[#919095] focus:outline-none focus:border-[#d0bcff]"
                />
              </div>
            </div>

            {/* Tag Filters */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#919095] mb-2.5 flex items-center gap-1.5">
                <Filter className="h-3 w-3" /> Biome Tags
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['All', 'Coastal', 'Forest', 'Urban', 'Entomology', 'Arid'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`rounded-md px-2.5 py-1 text-xs font-mono transition-colors ${
                      selectedTag === tag
                        ? 'bg-[#d0bcff] text-[#161021] font-bold'
                        : 'bg-[#231d2e] text-[#c7c6cb] hover:text-white border border-[#383244]'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Mood Filters */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#919095] mb-2.5">
                Acoustic Character
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['All', 'Immersive', 'Calm', 'Subtle', 'Atmospheric', 'Meditative'].map((mood) => (
                  <button
                    key={mood}
                    onClick={() => setActiveMood(mood)}
                    className={`rounded-md px-2.5 py-1 text-xs font-mono transition-colors ${
                      activeMood === mood
                        ? 'bg-[#4f3886] text-white font-bold border border-[#b59df2]'
                        : 'bg-[#1e1929] text-[#919095] hover:text-white border border-[#383244]'
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Collection Banner */}
            <div className="rounded-2xl border border-[#383244] bg-[#1e1929] p-5">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#d0bcff]">
                CURATED SERIES
              </div>
              <h4 className="mt-2 text-base font-bold text-white">
                Sonic Cartography Vol. I: Pacific Rim
              </h4>
              <p className="mt-1 text-xs text-[#c7c6cb] leading-relaxed">
                Hydrophones and ambisonic microphones deployed across rugged coastal shelves and tide pools.
              </p>
              <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-[#b59df2]">
                <span>5 Tracks • 38 Mins</span>
                <span className="text-[#d0bcff] font-bold">Listen Collection →</span>
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-[#919095] border-t border-[#383244] pt-4">
            Field Unit: Sound Devices MixPre-6 II<br />Mic: Sennheiser AMBEO VR
          </div>
        </div>
      </div>
    </div>
  );
};
