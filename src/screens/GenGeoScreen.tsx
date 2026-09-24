import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCw, Settings, Code, Terminal, Layers, Sparkles, Check } from 'lucide-react';

export const GenGeoScreen: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [strokeColor, setStrokeColor] = useState<string>('#d0bcff');
  const [recursionDepth, setRecursionDepth] = useState<number>(6);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1.2);
  const [wireframeMesh, setWireframeMesh] = useState<'icosahedron' | 'torus' | 'hypercube'>('icosahedron');
  const [fps, setFps] = useState<number>(60);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    '[WebGL 2.0] Context initialized: 1920x1080 (High-DPI 2x)',
    '[Shader] Vertex shader compiled without warnings in 1.4ms',
    '[Shader] Fragment harmonic bloom linked successfully',
    '[GenGeo] Active render pass: 60 FPS locked'
  ]);

  const colorOptions = [
    { name: 'Lilac Neon', value: '#d0bcff' },
    { name: 'Electric Cyan', value: '#38bdf8' },
    { name: 'Amber Gold', value: '#fde047' },
    { name: 'Emerald Ray', value: '#4ade80' },
    { name: 'Hot Crimson', value: '#fb7185' },
  ];

  // Dynamic 3D geometric polyhedral math rendering loop on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angleX = 0;
    let angleY = 0;
    let angleZ = 0;
    let lastTime = performance.now();
    let frameCount = 0;

    // Generate 3D vertices for Icosahedron / Polyhedra
    const phi = (1 + Math.sqrt(5)) / 2;
    const baseVertices = [
      [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
      [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
      [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
    ];

    const edges = [
      [0, 11], [0, 5], [0, 1], [0, 7], [0, 10],
      [1, 5], [5, 11], [11, 10], [10, 7], [7, 1],
      [3, 9], [3, 4], [3, 2], [3, 6], [3, 8],
      [2, 4], [4, 9], [9, 8], [8, 6], [6, 2],
      [4, 5], [5, 9], [8, 1], [1, 8], [7, 6],
      [6, 10], [2, 11], [11, 4], [0, 9], [3, 10]
    ];

    const render = (time: number) => {
      const delta = time - lastTime;
      frameCount++;
      if (delta >= 1000) {
        setFps(Math.round((frameCount * 1000) / delta));
        frameCount = 0;
        lastTime = time;
      }

      if (isPlaying) {
        angleX += 0.008 * rotationSpeed;
        angleY += 0.012 * rotationSpeed;
        angleZ += 0.005 * rotationSpeed;
      }

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Deep dark background
      ctx.fillStyle = '#0a0712';
      ctx.fillRect(0, 0, w, h);

      // Radial bloom in center
      const bloom = ctx.createRadialGradient(cx, cy, 10, cx, cy, 280);
      bloom.addColorStop(0, `${strokeColor}25`);
      bloom.addColorStop(0.5, '#4f388615');
      bloom.addColorStop(1, 'transparent');
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, w, h);

      // Coordinate axes
      ctx.strokeStyle = 'rgba(255,255,255,0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
      ctx.moveTo(0, cy); ctx.lineTo(w, cy);
      ctx.stroke();

      // Scale based on canvas size
      const scale = 110 + Math.sin(time * 0.002) * 8;

      // Project 3D to 2D
      const project = (x: number, y: number, z: number) => {
        // Rotation X
        let y1 = y * Math.cos(angleX) - z * Math.sin(angleX);
        let z1 = y * Math.sin(angleX) + z * Math.cos(angleX);

        // Rotation Y
        let x2 = x * Math.cos(angleY) + z1 * Math.sin(angleY);
        let z2 = -x * Math.sin(angleY) + z1 * Math.cos(angleY);

        // Rotation Z
        let x3 = x2 * Math.cos(angleZ) - y1 * Math.sin(angleZ);
        let y3 = x2 * Math.sin(angleZ) + y1 * Math.cos(angleZ);

        // Perspective division
        const distance = 4.2;
        const fov = 420;
        const pz = z2 + distance;
        const px = (x3 * fov) / pz + cx;
        const py = (y3 * fov) / pz + cy;

        return { x: px, y: py, z: pz };
      };

      // Draw recursive inner rings & harmonic circles
      for (let i = 1; i <= recursionDepth; i++) {
        const rad = (i * 32) + Math.sin(time * 0.002 + i) * 6;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rad, rad * 0.55, angleZ, 0, Math.PI * 2);
        ctx.strokeStyle = `${strokeColor}${Math.max(10, 35 - i * 4).toString(16)}`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw Polyhedral Edges
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.6;
      ctx.shadowColor = strokeColor;
      ctx.shadowBlur = 12;

      edges.forEach(([i, j]) => {
        const v1 = baseVertices[i];
        const v2 = baseVertices[j];
        if (!v1 || !v2) return;

        const p1 = project(v1[0], v1[1], v1[2]);
        const p2 = project(v2[0], v2[1], v2[2]);

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      });

      // Draw Vertices points
      ctx.shadowBlur = 16;
      ctx.fillStyle = '#ffffff';
      baseVertices.forEach((v) => {
        const p = project(v[0], v[1], v[2]);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, strokeColor, recursionDepth, rotationSpeed, wireframeMesh]);

  const handleRunCode = () => {
    setConsoleLogs((prev) => [
      ...prev,
      `[Compile] Parameters re-evaluated: depth=${recursionDepth}, color=${strokeColor}`,
      `[GenGeo Engine] Shaders relinked in ${Math.floor(Math.random() * 3 + 1)}ms`
    ]);
  };

  return (
    <div className="flex flex-col min-h-full bg-[#110b1b] text-[#e9def6]">
      {/* Top Application Ribbon matching Image 4 */}
      <div className="flex h-12 items-center justify-between border-b border-[#383244] bg-[#161021] px-4">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="font-anton text-xl tracking-wider text-white">GENGEO</span>
            <span className="text-[10px] font-mono text-[#d0bcff] bg-[#231d2e] px-1.5 py-0.5 rounded border border-[#383244]">
              Sandbox
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-5 text-xs text-[#919095]">
            <span className="text-white font-medium">Dashboard</span>
            <span className="hover:text-white cursor-pointer">Gallery</span>
            <span className="hover:text-white cursor-pointer">Learn</span>
            <span className="hover:text-white cursor-pointer">Profile</span>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-[#161021] border border-[#383244] px-2.5 py-1 rounded-md">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{fps} FPS</span>
          </div>
          <div className="h-7 w-7 rounded-full bg-[#4f3886] flex items-center justify-center font-bold text-xs text-white">
            E
          </div>
        </div>
      </div>

      {/* Main Workspace: 3 Columns (File Tree / Live Canvas / Code Editor) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Sidebar: Canvas Settings & Files */}
        <div className="lg:col-span-2 border-r border-[#383244] bg-[#161021] p-4 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#919095] mb-2">
                Project Files
              </div>
              <div className="space-y-1 text-xs">
                <div className="px-2.5 py-1.5 rounded bg-[#4f3886]/40 text-white font-mono flex items-center gap-2">
                  <Code className="h-3.5 w-3.5 text-[#d0bcff]" /> Index.js
                </div>
                <div className="px-2.5 py-1.5 rounded text-[#919095] hover:text-white font-mono flex items-center gap-2 cursor-pointer">
                  <Layers className="h-3.5 w-3.5" /> Style.css
                </div>
                <div className="px-2.5 py-1.5 rounded text-[#919095] hover:text-white font-mono flex items-center gap-2 cursor-pointer">
                  <Terminal className="h-3.5 w-3.5" /> Shader.vert
                </div>
              </div>
            </div>

            {/* Canvas Settings Panel */}
            <div className="border-t border-[#383244] pt-4">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#919095] mb-3">
                Canvas Parameters
              </div>

              {/* Stroke Color Dropdown */}
              <div>
                <label className="block text-[11px] font-mono text-[#c7c6cb] mb-1">
                  Neon Glow Color
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {colorOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setStrokeColor(opt.value)}
                      style={{ backgroundColor: opt.value }}
                      className={`h-6 rounded-md transition-transform ${strokeColor === opt.value ? 'scale-110 ring-2 ring-white' : 'opacity-70'}`}
                      title={opt.name}
                    />
                  ))}
                </div>
              </div>

              {/* Recursion Depth */}
              <div className="mt-4">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-[#919095]">Recursion Depth</span>
                  <span className="text-[#d0bcff] font-bold">{recursionDepth}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  value={recursionDepth}
                  onChange={(e) => setRecursionDepth(Number(e.target.value))}
                  className="mt-1 w-full accent-[#d0bcff]"
                />
              </div>

              {/* Rotation Velocity */}
              <div className="mt-4">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-[#919095]">Spin Velocity</span>
                  <span className="text-[#d0bcff] font-bold">{rotationSpeed.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={rotationSpeed}
                  onChange={(e) => setRotationSpeed(Number(e.target.value))}
                  className="mt-1 w-full accent-[#d0bcff]"
                />
              </div>
            </div>
          </div>

          <div className="text-[10px] font-mono text-[#919095] border-t border-[#383244] pt-3">
            Renderer: WebGL 2.0<br />Target: 1920x1080
          </div>
        </div>

        {/* Center: Live Generative Geometry Canvas */}
        <div className="lg:col-span-6 flex flex-col bg-[#0a0712] relative border-b lg:border-b-0 lg:border-r border-[#383244]">
          {/* Top Canvas Bar */}
          <div className="flex items-center justify-between border-b border-[#2d2738] bg-[#161021]/80 px-4 py-2">
            <div className="text-xs font-mono text-[#919095]">
              LIVE VIEWPORT: <span className="text-white">Icosahedral Harmonic Torus</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono ${
                  isPlaying ? 'bg-[#d0bcff] text-[#161021] font-bold' : 'bg-[#231d2e] text-[#d0bcff]'
                }`}
              >
                {isPlaying ? <Pause className="h-3 w-3 fill-current" /> : <Play className="h-3 w-3 fill-current" />}
                <span>{isPlaying ? 'Pause' : 'Animate'}</span>
              </button>
            </div>
          </div>

          {/* Canvas Component */}
          <div className="flex-1 flex items-center justify-center p-4">
            <canvas
              ref={canvasRef}
              width={640}
              height={520}
              className="w-full h-full max-h-[560px] object-contain rounded-xl border border-[#2d2738] shadow-2xl"
            />
          </div>

          {/* Canvas status overlay */}
          <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#d0bcff]/80 bg-[#161021]/80 px-2.5 py-1 rounded border border-[#383244]">
            POLYGON FACES: 20 • HARMONIC STRIPS: {recursionDepth * 4}
          </div>
        </div>

        {/* Right Sidebar: Code Editor & Console Output */}
        <div className="lg:col-span-4 flex flex-col bg-[#140f21]">
          {/* Code Editor Header */}
          <div className="flex items-center justify-between border-b border-[#383244] bg-[#1a1426] px-4 py-2.5 text-xs">
            <div className="flex items-center gap-2 font-mono text-white">
              <Code className="h-3.5 w-3.5 text-[#d0bcff]" />
              <span>Index.js (Live Script)</span>
            </div>
            <button
              onClick={handleRunCode}
              className="flex items-center gap-1 rounded bg-[#d0bcff] px-2.5 py-1 text-[11px] font-bold uppercase text-[#161021] hover:bg-white transition-colors"
            >
              <Sparkles className="h-3 w-3" />
              <span>Evaluate</span>
            </button>
          </div>

          {/* Simulated Monokai-styled Code Area */}
          <div className="flex-1 p-4 font-mono text-xs overflow-y-auto bg-[#100b1a] text-[#f4f2f7] leading-relaxed">
            <div className="text-[#919095]">// GenGeo Creative Coding Environment</div>
            <div className="text-[#919095]">// Dynamic Polyhedral Shader & WebGL Math</div>
            <br />
            <div>
              <span className="text-[#fb7185]">import</span> {'{'} WebGLRenderer, Vector3 {'}'} <span className="text-[#fb7185]">from</span> <span className="text-[#fde047]">'gengeo-core'</span>;
            </div>
            <br />
            <div>
              <span className="text-[#fb7185]">const</span> <span className="text-[#67e8f9]">config</span> = {'{'}
            </div>
            <div className="pl-4">
              recursionDepth: <span className="text-[#a78bfa]">{recursionDepth}</span>,
            </div>
            <div className="pl-4">
              rotationVelocity: <span className="text-[#a78bfa]">{rotationSpeed}</span>,
            </div>
            <div className="pl-4">
              glowColor: <span className="text-[#fde047]">'{strokeColor}'</span>,
            </div>
            <div className="pl-4">
              resolution: <span className="text-[#fde047]">'1920x1080'</span>,
            </div>
            <div>{'}'};</div>
            <br />
            <div>
              <span className="text-[#fb7185]">function</span> <span className="text-[#4ade80]">renderHarmonics</span>(<span className="text-[#67e8f9]">t</span>) {'{'}
            </div>
            <div className="pl-4 text-[#919095]">// Project icosahedral mesh onto camera space</div>
            <div className="pl-4">
              <span className="text-[#fb7185]">const</span> angle = t * config.rotationVelocity;
            </div>
            <div className="pl-4">
              matrix.rotateX(angle * 0.5);
            </div>
            <div className="pl-4">
              matrix.rotateY(angle * 0.8);
            </div>
            <div className="pl-4">
              <span className="text-[#fb7185]">return</span> pipeline.bloomPass(config.glowColor);
            </div>
            <div>{'}'}</div>
          </div>

          {/* Console Drawer */}
          <div className="border-t border-[#383244] bg-[#161021] p-3 text-[11px] font-mono">
            <div className="flex items-center justify-between text-[#919095] mb-1.5 pb-1 border-b border-[#2d2738]">
              <span className="flex items-center gap-1.5">
                <Terminal className="h-3 w-3" /> Output Console
              </span>
              <span className="text-[10px] text-emerald-400">READY</span>
            </div>
            <div className="space-y-1 max-h-24 overflow-y-auto text-[#c7c6cb]">
              {consoleLogs.slice(-3).map((log, idx) => (
                <div key={idx} className="truncate">{log}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
