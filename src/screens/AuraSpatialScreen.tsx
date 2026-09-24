import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Headphones, Volume2, Search, Sliders, Disc, Radio, RotateCcw } from 'lucide-react';

interface SoundNode {
  id: string;
  label: string;
  orbitRadius: number;
  angle: number; // in radians
  speed: number;
  color: string;
  size: number;
  distance: number;
}

export const AuraSpatialScreen: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(84); // 01:24
  const duration = 278; // 04:38

  // Rotary knobs state (0 to 100)
  const [reverb, setReverb] = useState(64);
  const [width, setWidth] = useState(82);
  const [depth, setDepth] = useState(75);

  // Mix level sliders
  const [vocals, setVocals] = useState(85);
  const [drums, setDrums] = useState(72);
  const [synths, setSynths] = useState(69);

  // Output selection
  const [outputMode, setOutputMode] = useState<'headphones' | 'atmos'>('headphones');

  // Web Audio synth context
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{ osc1?: OscillatorNode; osc2?: OscillatorNode; filter?: BiquadFilterNode; gain?: GainNode }>({});

  // Canvas ref for orbital 3D celestial rendering
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [nodes, setNodes] = useState<SoundNode[]>([
    { id: '1', label: 'Lead Vocal', orbitRadius: 90, angle: 0.4, speed: 0.008, color: '#d0bcff', size: 8, distance: 0.3 },
    { id: '2', label: 'Stage Left', orbitRadius: 150, angle: 2.1, speed: 0.005, color: '#a78bfa', size: 6, distance: 0.6 },
    { id: '3', label: 'Ambient Room', orbitRadius: 210, angle: 4.2, speed: 0.003, color: '#818cf8', size: 7, distance: 0.8 },
    { id: '4', label: 'Rear Effects', orbitRadius: 170, angle: 5.3, speed: -0.004, color: '#c084fc', size: 5, distance: 0.7 },
    { id: '5', label: 'Echo Chamber', orbitRadius: 240, angle: 1.2, speed: 0.0025, color: '#38bdf8', size: 6, distance: 0.95 },
  ]);

  // Handle Play/Pause with Web Audio API sound synthesis
  const togglePlay = () => {
    if (!isPlaying) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Master Gain
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.2, ctx.currentTime);

        // Lowpass filter
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450 + depth * 8, ctx.currentTime);

        // Oscillators for ambient pad chord
        const osc1 = ctx.createOscillator();
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(146.83, ctx.currentTime); // D3

        const osc2 = ctx.createOscillator();
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(220.00, ctx.currentTime); // A3

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(masterGain);
        masterGain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        synthNodesRef.current = { osc1, osc2, filter, gain: masterGain };
      } catch (err) {
        console.warn('Web Audio synthesis initialised in silent mode', err);
      }
      setIsPlaying(true);
    } else {
      if (synthNodesRef.current.osc1) {
        try {
          synthNodesRef.current.osc1.stop();
          synthNodesRef.current.osc2?.stop();
        } catch {
          // ignore
        }
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
      setIsPlaying(false);
    }
  };

  // Timer simulation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => (prev >= duration ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Update filter frequency when depth/reverb changes
  useEffect(() => {
    if (synthNodesRef.current.filter && audioCtxRef.current) {
      synthNodesRef.current.filter.frequency.setValueAtTime(300 + depth * 9, audioCtxRef.current.currentTime);
    }
  }, [depth]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // 3D Orbital Canvas Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let localNodes = [...nodes];

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Background subtle grid & radial glow
      const radialGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, width / 2);
      radialGlow.addColorStop(0, 'rgba(79, 56, 134, 0.25)');
      radialGlow.addColorStop(0.6, 'rgba(30, 25, 41, 0.15)');
      radialGlow.addColorStop(1, 'rgba(17, 11, 27, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // Coordinate axes
      ctx.strokeStyle = 'rgba(70, 70, 75, 0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(cx, 20);
      ctx.lineTo(cx, height - 20);
      ctx.moveTo(20, cy);
      ctx.lineTo(width - 20, cy);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw celestial concentric orbital ellipses (projected 3D tilt)
      const tilt = 0.52; // isometric tilt factor
      const orbitRadii = [90, 150, 170, 210, 240];

      orbitRadii.forEach((r, idx) => {
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * tilt, 0, 0, Math.PI * 2);
        ctx.strokeStyle = idx % 2 === 0 ? 'rgba(208, 188, 255, 0.22)' : 'rgba(94, 83, 111, 0.35)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Central listener listener head / core sphere
      const coreGrad = ctx.createRadialGradient(cx, cy, 2, cx, cy, 22);
      coreGrad.addColorStop(0, '#ffffff');
      coreGrad.addColorStop(0.4, '#d0bcff');
      coreGrad.addColorStop(1, '#4f3886');
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.shadowColor = '#d0bcff';
      ctx.shadowBlur = 18;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Label listener core
      ctx.font = '10px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#b59df2';
      ctx.textAlign = 'center';
      ctx.fillText('LISTENER CORE', cx, cy + 28);

      // Update and draw planetary sound nodes
      localNodes = localNodes.map((node) => {
        const newAngle = node.angle + node.speed * (isPlaying ? 1.6 : 0.6);
        const x = cx + Math.cos(newAngle) * node.orbitRadius;
        const y = cy + Math.sin(newAngle) * (node.orbitRadius * tilt);

        // Line connecting to core
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(181, 157, 242, 0.18)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Node circle with glow
        ctx.beginPath();
        ctx.arc(x, y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label
        ctx.font = '11px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#f4f2f7';
        ctx.textAlign = 'left';
        ctx.fillText(node.label, x + 10, y + 4);

        return { ...node, angle: newAngle };
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col min-h-full bg-[#110b1b] text-white">
      {/* App Header (OSA) matching Image 1 */}
      <div className="flex h-14 items-center justify-between border-b border-[#2d2738] bg-[#161021] px-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="font-anton text-2xl tracking-wider text-white">OSA</span>
            <span className="rounded bg-[#4f3886]/60 px-1.5 py-0.5 text-[10px] font-mono text-[#d0bcff]">v2.4</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-[#919095]">
            <span className="hover:text-white cursor-pointer transition-colors">Home</span>
            <span className="text-[#d0bcff] border-b-2 border-[#d0bcff] pb-1 cursor-pointer">Spaces</span>
            <span className="hover:text-white cursor-pointer transition-colors">Library</span>
            <span className="hover:text-white cursor-pointer transition-colors">Account</span>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#919095]" />
            <input
              type="text"
              placeholder="Search spaces, sources..."
              className="h-8 w-44 rounded-full bg-[#231d2e] pl-8 pr-3 text-xs text-white placeholder-[#919095] border border-[#383244] focus:outline-none focus:border-[#d0bcff]"
            />
          </div>
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#d0bcff] to-[#4f3886] flex items-center justify-center font-bold text-xs text-[#161021]">
            AR
          </div>
        </div>
      </div>

      {/* Main Content: Split 3D Celestial Mixer & Settings */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left/Center Orbital Spatial Canvas Area */}
        <div className="lg:col-span-8 flex flex-col border-b lg:border-b-0 lg:border-r border-[#2d2738] p-6">
          {/* Header Strip inside mixer */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-[#919095]">
                24-Channel B-Format
              </div>
              <h2 className="font-anton text-2xl sm:text-3xl tracking-wide uppercase text-white">
                ORBITAL SPATIAL MIXER
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 rounded-full bg-[#231d2e] px-3 py-1 text-xs font-mono text-[#d0bcff] border border-[#383244]">
                <Radio className={`h-3 w-3 ${isPlaying ? 'text-emerald-400 animate-pulse' : 'text-[#919095]'}`} />
                {isPlaying ? 'Live Spatialization' : 'Idle Engine'}
              </span>

              <button
                onClick={() => {
                  setReverb(50);
                  setWidth(75);
                  setDepth(60);
                }}
                className="flex items-center gap-1 rounded-md bg-[#231d2e] p-1.5 text-[#919095] hover:text-white hover:bg-[#2d2738] border border-[#383244]"
                title="Reset dials"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Interactive 3D Canvas */}
          <div className="relative mt-4 flex-1 min-h-[360px] rounded-2xl border border-[#383244] bg-[#0c0814] overflow-hidden flex items-center justify-center shadow-inner">
            <canvas
              ref={canvasRef}
              width={700}
              height={440}
              className="w-full h-full object-contain cursor-crosshair"
            />

            <div className="absolute top-3 left-3 text-[10px] font-mono text-[#919095]/80 bg-[#161021]/80 px-2.5 py-1 rounded-md border border-[#383244]/40">
              POLAR GRID: X/Y/Z ORTHOGRAPHIC • ROTATION: 0.52 rad
            </div>

            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-[#d0bcff] bg-[#161021]/80 px-2.5 py-1 rounded-md border border-[#383244]/40 flex items-center gap-1.5">
              <Disc className={`h-3 w-3 ${isPlaying ? 'animate-spin' : ''}`} />
              <span>5 Active Emitters</span>
            </div>
          </div>

          {/* Interactive Rotary Knobs Section (matching Image 1) */}
          <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl border border-[#383244] bg-[#1e1929] p-4 text-center">
            {/* Reverb Dial */}
            <div className="flex flex-col items-center">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#919095]">
                REVERB
              </span>
              <div className="relative mt-2 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#4f3886] bg-[#110b1b] shadow-inner">
                {/* Simulated pointer needle */}
                <div
                  className="absolute h-6 w-0.5 bg-[#d0bcff] origin-bottom rounded"
                  style={{ transform: `rotate(${(reverb / 100) * 270 - 135}deg)` }}
                />
                <span className="font-mono text-xs font-bold text-white z-10">{reverb}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={reverb}
                onChange={(e) => setReverb(Number(e.target.value))}
                className="mt-2 w-20 accent-[#d0bcff]"
              />
            </div>

            {/* Width Dial */}
            <div className="flex flex-col items-center">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#919095]">
                WIDTH
              </span>
              <div className="relative mt-2 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#4f3886] bg-[#110b1b] shadow-inner">
                <div
                  className="absolute h-6 w-0.5 bg-[#d0bcff] origin-bottom rounded"
                  style={{ transform: `rotate(${(width / 100) * 270 - 135}deg)` }}
                />
                <span className="font-mono text-xs font-bold text-white z-10">{width}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="mt-2 w-20 accent-[#d0bcff]"
              />
            </div>

            {/* Depth Dial */}
            <div className="flex flex-col items-center">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#919095]">
                DEPTH
              </span>
              <div className="relative mt-2 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#4f3886] bg-[#110b1b] shadow-inner">
                <div
                  className="absolute h-6 w-0.5 bg-[#d0bcff] origin-bottom rounded"
                  style={{ transform: `rotate(${(depth / 100) * 270 - 135}deg)` }}
                />
                <span className="font-mono text-xs font-bold text-white z-10">{depth}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={depth}
                onChange={(e) => setDepth(Number(e.target.value))}
                className="mt-2 w-20 accent-[#d0bcff]"
              />
            </div>
          </div>
        </div>

        {/* Right Sidebar: Track Details & Mix Levels (matching Image 1) */}
        <div className="lg:col-span-4 flex flex-col justify-between p-6 bg-[#161021]">
          <div className="space-y-6">
            {/* Track Details Card */}
            <div className="rounded-xl border border-[#383244] bg-[#1e1929] p-5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#919095]">
                TRACK DETAILS
              </div>
              <div className="mt-3">
                <h3 className="font-anton text-2xl uppercase tracking-wider text-white">
                  ELYSIAN
                </h3>
                <p className="text-sm font-medium text-[#d0bcff]">AURA</p>
                <div className="mt-2 flex items-center justify-between text-xs text-[#919095] border-t border-[#383244] pt-2">
                  <span>Genre: Ambient Electronica</span>
                  <span className="font-mono">48kHz / 24-bit</span>
                </div>
              </div>
            </div>

            {/* Mix Settings Sliders */}
            <div className="rounded-xl border border-[#383244] bg-[#1e1929] p-5">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#919095]">
                <span>MIX SETTINGS</span>
                <Sliders className="h-3.5 w-3.5 text-[#d0bcff]" />
              </div>

              <div className="mt-4 space-y-4">
                {/* Vocals */}
                <div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#c7c6cb]">Vocals</span>
                    <span className="text-[#d0bcff] font-bold">{vocals}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={vocals}
                    onChange={(e) => setVocals(Number(e.target.value))}
                    className="mt-1.5 w-full accent-[#d0bcff] h-1.5 rounded-lg bg-[#110b1b]"
                  />
                </div>

                {/* Drums */}
                <div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#c7c6cb]">Drums</span>
                    <span className="text-[#d0bcff] font-bold">{drums}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={drums}
                    onChange={(e) => setDrums(Number(e.target.value))}
                    className="mt-1.5 w-full accent-[#d0bcff] h-1.5 rounded-lg bg-[#110b1b]"
                  />
                </div>

                {/* Synths */}
                <div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-[#c7c6cb]">Synths</span>
                    <span className="text-[#d0bcff] font-bold">{synths}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={synths}
                    onChange={(e) => setSynths(Number(e.target.value))}
                    className="mt-1.5 w-full accent-[#d0bcff] h-1.5 rounded-lg bg-[#110b1b]"
                  />
                </div>
              </div>
            </div>

            {/* Output Selector Toggles */}
            <div className="rounded-xl border border-[#383244] bg-[#1e1929] p-5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[#919095]">
                MONITORING OUTPUT
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setOutputMode('headphones')}
                  className={`flex flex-col items-center justify-center rounded-lg border p-3 text-xs transition-all ${
                    outputMode === 'headphones'
                      ? 'border-[#d0bcff] bg-[#4f3886]/40 text-white font-bold'
                      : 'border-[#383244] bg-[#161021] text-[#919095] hover:text-white'
                  }`}
                >
                  <Headphones className="h-5 w-5 mb-1.5 text-[#d0bcff]" />
                  <span>Headphones</span>
                  <span className="text-[9px] font-mono text-[#b59df2]/70 mt-0.5">Binaural HRTF</span>
                </button>

                <button
                  onClick={() => setOutputMode('atmos')}
                  className={`flex flex-col items-center justify-center rounded-lg border p-3 text-xs transition-all ${
                    outputMode === 'atmos'
                      ? 'border-[#d0bcff] bg-[#4f3886]/40 text-white font-bold'
                      : 'border-[#383244] bg-[#161021] text-[#919095] hover:text-white'
                  }`}
                >
                  <Volume2 className="h-5 w-5 mb-1.5 text-[#d0bcff]" />
                  <span>Dolby Atmos</span>
                  <span className="text-[9px] font-mono text-[#b59df2]/70 mt-0.5">7.1.4 Bed</span>
                </button>
              </div>
            </div>
          </div>

          {/* Audio Engine Notice */}
          <div className="mt-6 rounded-lg bg-[#110b1b] p-3 text-[11px] text-[#919095] border border-[#2d2738]">
            <p className="flex items-center gap-1.5 text-[#d0bcff]">
              <Radio className="h-3 w-3" /> Web Audio Engine Active
            </p>
            <p className="mt-1">
              Press Play to engage synthesized harmonic drone and observe binaural panning response in real time.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Transport Playback Bar */}
      <div className="flex h-16 items-center justify-between border-t border-[#2d2738] bg-[#161021] px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#d0bcff] text-[#161021] transition-transform hover:scale-105 shadow-md hover:bg-white"
          >
            {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
          </button>
          <div>
            <div className="text-xs font-semibold text-white">ELYSIAN — Master Stems</div>
            <div className="text-[10px] font-mono text-[#b59df2]">AURA Spatial Audio Lab</div>
          </div>
        </div>

        {/* Timeline Scrubber */}
        <div className="flex flex-1 max-w-xl items-center gap-3 px-6">
          <span className="text-xs font-mono text-[#919095]">{formatTime(currentTime)}</span>
          <div
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = (e.clientX - rect.left) / rect.width;
              setCurrentTime(Math.floor(pos * duration));
            }}
            className="relative h-1.5 flex-1 rounded-full bg-[#2d2738] cursor-pointer overflow-hidden"
          >
            <div
              className="absolute left-0 top-0 h-full bg-[#d0bcff] transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
          <span className="text-xs font-mono text-[#919095]">{formatTime(duration)}</span>
        </div>

        <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-[#919095]">
          <span>OUTPUT: {outputMode.toUpperCase()}</span>
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
        </div>
      </div>
    </div>
  );
};
