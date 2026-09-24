export type ScreenId = 
  | 'portfolio' 
  | 'aura-mixer' 
  | 'glyphica' 
  | 'aethel-archive' 
  | 'gengeo' 
  | 'verso-poetry' 
  | 'sonic-habitats'
  | 'lab-empty-state';

export interface ProjectItem {
  id: string;
  screenId: ScreenId;
  number: string;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  tags: string[];
  githubUrl: string;
  youtubeUrl: string;
  previewName: string;
  inverted?: boolean;
}

export interface CurationArtifact {
  id: string;
  accessionNumber: string;
  title: string;
  period: string;
  date: string;
  medium: string;
  provenance: string;
  status: 'Provenance Verified' | 'Exhibition Ready' | 'Conservation Queue';
  resolution: string;
  imageUrl: string;
  notes: string;
}

export interface SoundscapeTrack {
  id: string;
  title: string;
  location: string;
  duration: string;
  tags: string[];
  mood: string;
  frequency: string;
  playbackDurationSec: number;
}
