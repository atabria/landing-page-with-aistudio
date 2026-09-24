import React from 'react';
import { ProjectItem, ScreenId } from '../types';
import { ExternalLink, Play, Sparkles } from 'lucide-react';

interface ProjectCardProps {
  project: ProjectItem;
  onOpenScreen: (screenId: ScreenId) => void;
  searchQuery?: string;
  onTagClick?: (tag: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenScreen,
  searchQuery = '',
  onTagClick,
}) => {
  const isEven = project.inverted;
  const cleanQuery = searchQuery.trim().toLowerCase();

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-[#383244]/80 bg-[#1e1929] p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:border-[#b59df2]/50 hover:shadow-2xl hover:shadow-[#4f3886]/10"
    >
      <div className={`grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center ${isEven ? 'lg:flex-row-reverse' : ''}`}>
        {/* Project Visual Container */}
        <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
          <div
            onClick={() => onOpenScreen(project.screenId)}
            className="group/img relative block aspect-16/10 cursor-pointer overflow-hidden rounded-xl border border-[#46464b]/60 bg-[#110b1b] shadow-inner transition-transform duration-300 group-hover:border-[#d0bcff]/40"
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              loading="lazy"
              className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover/img:scale-105"
            />
            {/* Ambient hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#110b1b]/80 via-transparent to-transparent opacity-60 transition-opacity group-hover/img:opacity-40" />

            {/* Live Interactive Badge Overlay */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full border border-white/20 bg-[#161021]/80 px-3.5 py-1.5 backdrop-blur-md transition-all group-hover/img:scale-105 group-hover/img:border-[#d0bcff] group-hover/img:bg-[#4f3886]/80">
              <Sparkles className="h-3.5 w-3.5 text-[#d0bcff]" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-white">
                Launch Live Screen
              </span>
            </div>
          </div>
        </div>

        {/* Project Content & Metadata */}
        <div className={`lg:col-span-5 flex flex-col justify-between ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
          <div>
            {/* Top index and category strip */}
            <div className="flex items-baseline justify-between border-b border-[#383244]/60 pb-3 font-mono text-xs">
              <span className="font-anton text-2xl tracking-wider text-[#d0bcff]">
                {project.number}
              </span>
              <span className="uppercase tracking-widest text-[#919095]">
                {project.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="mt-4 font-anton text-3xl sm:text-4xl tracking-wide text-white uppercase transition-colors group-hover:text-[#d0bcff]">
              {project.title}
            </h3>

            {/* Subtitle */}
            <p className="mt-1 text-sm font-medium text-[#b59df2]/90">
              {project.subtitle}
            </p>

            {/* Description */}
            <p className="mt-4 text-sm leading-relaxed text-[#c7c6cb]">
              {project.description}
            </p>

            {/* Technologies tags */}
            <div className="mt-6 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => {
                const isMatched = cleanQuery && tag.toLowerCase().includes(cleanQuery);
                return (
                  <button
                    key={tag}
                    onClick={() => onTagClick?.(tag)}
                    type="button"
                    title={`Filter projects by ${tag}`}
                    className={`rounded-md border px-2.5 py-1 text-[11px] font-mono transition-all ${
                      isMatched
                        ? 'border-[#d0bcff] bg-[#4f3886] text-white font-semibold shadow-[0_0_12px_rgba(208,188,255,0.4)] scale-105'
                        : 'border-[#383244] bg-[#231d2e] text-[#c7c6cb] hover:border-[#b59df2]/60 hover:text-white'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>

          </div>

          {/* Action Row */}
          <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 border-t border-[#383244]/60">
            <button
              onClick={() => onOpenScreen(project.screenId)}
              className="flex items-center gap-2 rounded-lg bg-[#d0bcff] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#161021] transition-all hover:bg-white hover:shadow-lg hover:shadow-[#d0bcff]/20"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Live Preview</span>
            </button>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-[#46464b] bg-[#231d2e] px-3.5 py-2 text-xs font-medium text-[#e9def6] transition-colors hover:border-[#b59df2] hover:bg-[#2d2738] hover:text-white"
            >
              <span>GitHub</span>
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>

            <a
              href={project.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg border border-[#46464b] bg-[#231d2e] px-3.5 py-2 text-xs font-medium text-[#e9def6] transition-colors hover:border-[#b59df2] hover:bg-[#2d2738] hover:text-white"
            >
              <span>YouTube</span>
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
