import React, { useState } from 'react';
import { ARCHIVE_ARTIFACTS } from '../data/projectsData';
import { CurationArtifact } from '../types';
import { Search, Plus, Bell, Eye, Clock, ShieldCheck, Bookmark, X, Filter, ChevronRight } from 'lucide-react';

export const AethelArchiveScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [activeArtifact, setActiveArtifact] = useState<CurationArtifact | null>(null);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const filteredArtifacts = ARCHIVE_ARTIFACTS.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.accessionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.period.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || art.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col min-h-full bg-[#120d1c] text-[#e9def6]">
      {/* Top Header Bar matching Image 3 */}
      <div className="flex h-16 items-center justify-between border-b border-[#383244] bg-[#1a1426] px-6">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="font-anton text-2xl tracking-wider text-white">AETHEL</span>
            <span className="font-mono text-xs uppercase tracking-widest text-[#d0bcff]">Archive</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-[#919095]">
            <span className="text-[#d0bcff] font-semibold border-b-2 border-[#d0bcff] pb-1 cursor-pointer">Dashboard</span>
            <span className="hover:text-white cursor-pointer transition-colors">Collections</span>
            <span className="hover:text-white cursor-pointer transition-colors">Exhibitions</span>
            <span className="hover:text-white cursor-pointer transition-colors">Preservation</span>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Bell className="h-4 w-4 text-[#c7c6cb] hover:text-white cursor-pointer" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#d0bcff] text-[9px] font-bold text-[#161021]">
              2
            </span>
          </div>

          <button
            onClick={() => setIsNewProjectModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-[#d0bcff] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#161021] transition-all hover:bg-white"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Create New Project</span>
          </button>

          <div className="flex items-center gap-2.5 pl-2 border-l border-[#383244]">
            <div className="h-8 w-8 rounded-full bg-[#4f3886] flex items-center justify-center font-bold text-xs text-white border border-[#b59df2]/40">
              OR
            </div>
            <div className="hidden sm:block text-left text-xs">
              <div className="font-medium text-white">Olivia R.</div>
              <div className="text-[10px] text-[#919095]">Head Curator</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Body: Sidebar + Artifact Curation Gallery */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Navigation Sidebar */}
        <div className="lg:col-span-2 hidden lg:flex flex-col justify-between border-r border-[#383244] bg-[#161021] p-4">
          <div className="space-y-6">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#919095] mb-3">
                Workspace
              </div>
              <div className="space-y-1 text-xs">
                <div className="px-3 py-2 rounded-lg bg-[#4f3886]/30 text-white font-medium flex items-center justify-between border border-[#b59df2]/20">
                  <span>Overview</span>
                  <span className="text-[10px] font-mono text-[#d0bcff]">6 active</span>
                </div>
                <div className="px-3 py-2 rounded-lg text-[#919095] hover:bg-[#231d2e] hover:text-white cursor-pointer transition-colors">
                  Provenance Vault
                </div>
                <div className="px-3 py-2 rounded-lg text-[#919095] hover:bg-[#231d2e] hover:text-white cursor-pointer transition-colors">
                  Exhibition Drafts
                </div>
                <div className="px-3 py-2 rounded-lg text-[#919095] hover:bg-[#231d2e] hover:text-white cursor-pointer transition-colors">
                  Conservation Log
                </div>
              </div>
            </div>

            {/* Filter by Status */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#919095] mb-2 flex items-center gap-1.5">
                <Filter className="h-3 w-3" /> Status Filter
              </div>
              <div className="space-y-1 text-xs">
                {['all', 'Provenance Verified', 'Exhibition Ready', 'Conservation Queue'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors ${
                      selectedStatus === status
                        ? 'bg-[#2d2738] text-[#d0bcff] font-medium'
                        : 'text-[#919095] hover:text-white'
                    }`}
                  >
                    {status === 'all' ? 'All Artifacts' : status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#383244] bg-[#1e1929] p-3 text-[11px] text-[#919095]">
            <span className="text-white font-semibold">Storage Health</span>
            <div className="mt-1.5 h-1.5 w-full bg-[#110b1b] rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-[#d0bcff]" />
            </div>
            <span className="text-[10px] font-mono mt-1 block">84.2 TB / 120 TB Archived</span>
          </div>
        </div>

        {/* Center Main Dashboard Content */}
        <div className="lg:col-span-10 p-6 sm:p-8 overflow-y-auto">
          {/* Welcome and Search Banner (matching Image 3) */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#383244] pb-6">
            <div>
              <h2 className="font-anton text-3xl sm:text-4xl uppercase tracking-wide text-white">
                Welcome, Olivia
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#919095]">
                Digital Archival & Curation Registry • Currently indexing 6 core acquisitions
              </p>
            </div>

            {/* Instant Filter Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#919095]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search artifacts, accession, period..."
                className="w-full rounded-xl border border-[#46464b] bg-[#1e1929] pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#919095] focus:border-[#d0bcff] focus:outline-none"
              />
            </div>
          </div>

          {/* Section Title */}
          <div className="mt-8 flex items-center justify-between">
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#d0bcff] flex items-center gap-2">
              <Bookmark className="h-3.5 w-3.5" /> My Curation Projects & Cataloged Holdings
            </h3>
            <span className="text-xs font-mono text-[#919095]">
              Showing {filteredArtifacts.length} artifacts
            </span>
          </div>

          {/* Artifact Cards Grid (matching Image 3) */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtifacts.map((artifact) => (
              <div
                key={artifact.id}
                onClick={() => setActiveArtifact(artifact)}
                className="group cursor-pointer rounded-2xl border border-[#383244] bg-[#1e1929] overflow-hidden transition-all duration-300 hover:border-[#b59df2]/60 hover:shadow-xl hover:shadow-[#4f3886]/20"
              >
                {/* Image Container */}
                <div className="relative aspect-4/3 overflow-hidden bg-[#110b1b]">
                  <img
                    src={artifact.imageUrl}
                    alt={artifact.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e1929] via-transparent to-transparent opacity-80" />

                  <span className="absolute top-3 left-3 rounded-md bg-[#161021]/80 backdrop-blur-md px-2 py-1 text-[10px] font-mono text-[#d0bcff] border border-[#383244]">
                    {artifact.accessionNumber}
                  </span>

                  <span className={`absolute top-3 right-3 rounded-md px-2 py-1 text-[10px] font-mono font-medium ${
                    artifact.status === 'Exhibition Ready'
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                      : artifact.status === 'Provenance Verified'
                      ? 'bg-[#4f3886]/80 text-[#e9ddff] border border-[#b59df2]/40'
                      : 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                  }`}>
                    {artifact.status}
                  </span>
                </div>

                {/* Body Details */}
                <div className="p-5">
                  <div className="text-[11px] font-mono text-[#919095]">
                    {artifact.period} • {artifact.date}
                  </div>
                  <h4 className="mt-1.5 text-base font-bold text-white group-hover:text-[#d0bcff] transition-colors line-clamp-1">
                    {artifact.title}
                  </h4>
                  <p className="mt-2 text-xs text-[#c7c6cb] line-clamp-2">
                    {artifact.notes}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-[#383244] pt-3 text-xs">
                    <span className="font-mono text-[10px] text-[#b59df2]">{artifact.resolution}</span>
                    <span className="flex items-center gap-1 font-semibold text-[#d0bcff] group-hover:translate-x-1 transition-transform">
                      Inspect <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Artifact Inspector Detail Drawer / Modal */}
      {activeArtifact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-3xl rounded-2xl border border-[#46464b] bg-[#1e1929] p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveArtifact(null)}
              className="absolute top-4 right-4 p-2 text-[#919095] hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-[#d0bcff]">
              <span>{activeArtifact.accessionNumber}</span>
              <span>•</span>
              <span>{activeArtifact.period}</span>
            </div>

            <h3 className="mt-2 font-anton text-2xl sm:text-3xl text-white uppercase tracking-wide">
              {activeArtifact.title}
            </h3>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-6">
                <div className="aspect-square rounded-xl overflow-hidden border border-[#383244] bg-[#110b1b]">
                  <img
                    src={activeArtifact.imageUrl}
                    alt={activeArtifact.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="md:col-span-6 space-y-4 text-xs">
                <div>
                  <span className="font-mono text-[#919095] uppercase">Medium & Physicality</span>
                  <p className="mt-1 text-white font-medium">{activeArtifact.medium}</p>
                </div>

                <div>
                  <span className="font-mono text-[#919095] uppercase">Acquisition & Provenance</span>
                  <p className="mt-1 text-[#c7c6cb] leading-relaxed">{activeArtifact.provenance}</p>
                </div>

                <div>
                  <span className="font-mono text-[#919095] uppercase">Curator Analytical Notes</span>
                  <p className="mt-1 text-[#c7c6cb] leading-relaxed">{activeArtifact.notes}</p>
                </div>

                <div className="pt-2 border-t border-[#383244] flex items-center justify-between">
                  <span className="font-mono text-[#919095]">Imaging Standard</span>
                  <span className="font-mono text-[#d0bcff] font-semibold">{activeArtifact.resolution}</span>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => setActiveArtifact(null)}
                    className="flex-1 rounded-lg bg-[#d0bcff] py-2.5 text-center font-bold text-xs uppercase text-[#161021] hover:bg-white transition-colors"
                  >
                    Close Record
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create New Project Modal */}
      {isNewProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-2xl border border-[#46464b] bg-[#1e1929] p-6 shadow-2xl">
            <button
              onClick={() => setIsNewProjectModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-[#919095] hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-lg font-bold text-white">Create New Curation Project</h3>
            <p className="mt-1 text-xs text-[#919095]">
              Initiate a high-resolution catalog registry for upcoming museum exhibitions.
            </p>

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#c7c6cb]">
                  Project Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Celestial Cartography 1450–1600"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-[#46464b] bg-[#161021] px-3.5 py-2 text-xs text-white placeholder-[#919095] focus:border-[#d0bcff] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => setIsNewProjectModalOpen(false)}
                  className="rounded-lg px-3.5 py-2 text-xs text-[#919095] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsNewProjectModalOpen(false);
                    setNewProjectName('');
                  }}
                  className="rounded-lg bg-[#d0bcff] px-4 py-2 text-xs font-bold uppercase text-[#161021] hover:bg-white"
                >
                  Initialize Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
