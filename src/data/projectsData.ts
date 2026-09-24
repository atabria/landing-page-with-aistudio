import { ProjectItem, CurationArtifact, SoundscapeTrack } from '../types';

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'aura-spatial',
    screenId: 'aura-mixer',
    number: '01',
    category: 'Web Audio',
    title: 'AURA SPATIAL AUDIO',
    subtitle: 'Orbital Spatial Audio Engine',
    description: 'An interactive 3D audio spatialization canvas mapping sound sources across celestial orbital coordinates with real-time convolver reverberation and binaural panning algorithms.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrjqyApiBI81cl4Egep5BH8JeKbAi8VxBpXTeB3JYEiFA4EHAjkhLSU7VkeUAUW6N5zDGkQDrgYUK3b02pj2estTXNU9tiuSCQI_c-C9UdL1vyC2w_lNAA66RaMYc__RjP50eeuMU1cBo3bJrwCoUatuhWlaUu8NeD08y3NXVwkLy_Exnktx6Y-FFeLSKCvVXrVNsJoP31zk9oMtoERQU56Zobv0pJuuXqcA_xxE79_oZRedjsy29N',
    tags: ['Web Audio API', 'Canvas', 'TypeScript', 'Tailwind'],
    githubUrl: 'https://github.com/atabria/aura-spatial-audio',
    youtubeUrl: 'https://youtube.com/@atabria',
    previewName: 'OSA Orbital Mixer',
    inverted: false
  },
  {
    id: 'glyphica-type',
    screenId: 'glyphica',
    number: '02',
    category: 'Typography',
    title: 'GLYPHICA TYPE SPECIMEN',
    subtitle: 'Precision Font Testing Workbench',
    description: 'A contemporary editorial type tester exploring variable axes, optical sizing, and OpenType ligatures for high-contrast serif typography in responsive digital environments.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCm3xoaum9em0yFfiMrcvDcWRdtWKUPOfbN5N2C9Mo9zNIlrKamrfttLJlDkKDvoKwo50V14n4tW_MSrKZ6lB3COgzu83hmblaNkjli90LSKR7_mVh3DeqLoFRJTHeNYZxsYhHblMGO8TSkjA3AY1Fc8Z6Pdv9bWMT-lbXmotHn9WkaW6wNqNIlyb8QLDGe5lIugGqSDUIvHiytCLov1U3mFVIPLpLC52s0MYs_OGirQNPM4klHzYO_',
    tags: ['Next.js', 'OpenType.js', 'CSS Grid', 'Radix UI'],
    githubUrl: 'https://github.com/atabria/glyphica-specimen',
    youtubeUrl: 'https://youtube.com/@atabria',
    previewName: 'Moneta Serif Specimen',
    inverted: true
  },
  {
    id: 'aethel-archive',
    screenId: 'aethel-archive',
    number: '03',
    category: 'Archival Curation',
    title: 'AETHEL DIGITAL ARCHIVE',
    subtitle: 'Institutional Provenance Platform',
    description: 'A museum-grade digital collection registry cataloging historical artifacts, manuscripts, and iconography with deep metadata inspection and conservation workflows.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUKKGEvL14MQiGMOKmG1DCRmHDHJ32f1oy-jIXaoFEc91RbU44ldCTBV4yF6u0AQVPsmpmvAarImcj_n1mHWcacp4nNdmVtMWw85i_zAnD8DViNW4rsxpPokuKSo2qE-7wEc3_KNVFkVYQ3tjKyhRPWDJ7daCZ1ZWuDeqeM15U_vNlRmqvkpTPndilpa8DoC3TKsI-hdyuaS0kQSNMBhZWn1j6vSAxDGbLn4p-iADZIOgwse1SmXYK',
    tags: ['React', 'GraphQL', 'Tailwind CSS', 'Algolia'],
    githubUrl: 'https://github.com/atabria/aethel-archive',
    youtubeUrl: 'https://youtube.com/@atabria',
    previewName: 'Aethel Curation Workspace',
    inverted: false
  },
  {
    id: 'gengeo-sandbox',
    screenId: 'gengeo',
    number: '04',
    category: 'Shader Programming',
    title: 'GENGEO GENERATIVE SANDBOX',
    subtitle: 'Creative Coding Polyhedra Lab',
    description: 'A live WebGL and GLSL mathematical playground generating reactive 3D wireframe polyhedra, recursive harmonics, and interactive vector shader configurations.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrlOP928GxxPEfg5XObKTLumcnRxGiHC1s1ljvHmje9D3CoCZ-LwrwL2ewvv3DrxCnGlbvXDtq9e7RUvfYtOV0fo5tEw27NEu9ZRPSdPDeqKc9ANRoX8acGVEqdE1wmfFMLUak40PWITyeFcwAL2zcGu2naKy3iBP4jhfvpO0PeOw5A_wQoy-zhKNweQ27l2brVX04BVTDdcUulh-XSi1Fkfo3AUcmzalDkogqJvZBRnw92LvdikIS',
    tags: ['WebGL', 'GLSL', 'Vanilla JS', 'SVG'],
    githubUrl: 'https://github.com/atabria/gengeo-sandbox',
    youtubeUrl: 'https://youtube.com/@atabria',
    previewName: 'GenGeo Shaders',
    inverted: true
  },
  {
    id: 'verso-poetry',
    screenId: 'verso-poetry',
    number: '05',
    category: 'Literature & Code',
    title: 'VERSO ALGORITHMIC POETRY',
    subtitle: 'Generative Typography & Stanza Engine',
    description: 'A procedural typesetting apparatus parsing natural language corpora and cadence algorithms into minimalist poetic verses rendered in stark editorial layouts.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAU2gZw84gR08HmkS2IWkZ8rdTsI3aJ8IZTsL6yUiPuNs2CUNfX3ocF_ji6-UAjvIZWzNjG65CKD-YR6Q7qL34cRd1vnI9CF0-Lfu-0xeGupx13paMSJhhuBnpqYgCfMxc-0k3HU6Q3jTGoUdcwDoehuN1yo6-obsZG1pHn125Vo2ibXlfNx3TLvj7IHc9ylhJtQjTnpsbNc33293RL09G3EXpuSOdLZSe58v60f-rolj7E39QJZi32',
    tags: ['Vue 3', 'Typography API', 'Node.js'],
    githubUrl: 'https://github.com/atabria/verso-poetry',
    youtubeUrl: 'https://youtube.com/@atabria',
    previewName: 'Verso Typeset Engine',
    inverted: false
  },
  {
    id: 'sonic-habitats',
    screenId: 'sonic-habitats',
    number: '06',
    category: 'Acoustic Ecology',
    title: 'SONIC HABITATS SOUNDSCAPE',
    subtitle: 'Atmospheric Field Recording Archive',
    description: 'An acoustic ecology archive cataloging spatial field recordings with interactive spectrograms, dynamic ambient synthesis, and geolocated biome tags.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrToG_YpJMeKl3w6XrPR0pI0PWw1CGkJH-yIdsFXpSZALKSspJ_VhWBpbRrQ4XMvF29gLg4bMse9ZIjmBpwyVsYpqzZrKH_crAurD_tZ2tI1LngVJdAQqZRBWM03TEaK4_VqcOur6Nuq9LRu_nGJYato0Oqm5tyaJC9bmyxamBcwhSymRCL0fcGAzT68IRLOagfFCg6yb3hnzeL9eW0At3rLC7Ro8yJGxuV0srG984wzlOtdINk514',
    tags: ['Web Audio', 'HTML5 Canvas', 'Svelte'],
    githubUrl: 'https://github.com/atabria/sonic-habitats',
    youtubeUrl: 'https://youtube.com/@atabria',
    previewName: 'Sonic Habitats Archive',
    inverted: true
  }
];

export const ARCHIVE_ARTIFACTS: CurationArtifact[] = [
  {
    id: 'aet452',
    accessionNumber: 'AET-452-90',
    title: 'Mesopotamia Cylinder Seal & Impression',
    period: 'Early Dynastic III',
    date: 'c. 2500 BCE',
    medium: 'Lapis lazuli, carved intaglio',
    provenance: 'Excavated Ur Archaeological Expedition, 1928. Cataloged into Aethel Vault 1964.',
    status: 'Provenance Verified',
    resolution: '16K Ultra-Res Multispectral',
    imageUrl: 'https://images.unsplash.com/photo-1599827056326-1604a2123765?auto=format&fit=crop&w=800&q=80',
    notes: 'Depicts banquet scene and celestial lion heraldry with cuneiform inscriptions dedicating vessel to Inanna.'
  },
  {
    id: 'bot901',
    accessionNumber: 'BOT-901-14',
    title: 'Victorian Botanical Folio: Orchidaceae',
    period: 'Late Victorian',
    date: '1881 CE',
    medium: 'Hand-tinted copperplate engraving on vellum',
    provenance: 'Acquired from Royal Horticultural Society private bequest.',
    status: 'Exhibition Ready',
    resolution: '8K Master Scan',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    notes: 'Exceptional pigment retention in madder root and indigo pigments; minor foxing on margin edge.'
  },
  {
    id: 'mss314',
    accessionNumber: 'MSS-314-72',
    title: 'Renaissance Astrolabe Manuscript Fragment',
    period: 'Florentine Quattrocento',
    date: 'c. 1490 CE',
    medium: 'Iron gall ink and gold leaf on calfskin parchment',
    provenance: 'Medici Collection Dispersal, Florence; acquired 1971.',
    status: 'Provenance Verified',
    resolution: '12K High Dynamic Infrared',
    imageUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    notes: 'Contains geometric astronomical projections with annotations attributed to Fra Luca Pacioli studio.'
  },
  {
    id: 'pho128',
    accessionNumber: 'PHO-128-02',
    title: 'Daguerreotype Portrait: Anonymous Astronomer',
    period: 'Early Photographic Era',
    date: 'c. 1848 CE',
    medium: 'Silver-plated copper sheet, leather presentation case',
    provenance: 'Found in Boston antiquarian observatory archive.',
    status: 'Exhibition Ready',
    resolution: '10K Direct Surface Reflected',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    notes: 'Subject holds brass celestial globe; plate preserves pristine mirror finish without tarnishing.'
  },
  {
    id: 'eng762',
    accessionNumber: 'ENG-762-41',
    title: 'Industrial Atmospheric Steam Engine Schematic',
    period: 'Second Industrial Revolution',
    date: '1893 CE',
    medium: 'Cyanotype blueprint on linen-backed drafting stock',
    provenance: 'Transferred from Glasgow Shipbuilding Registry.',
    status: 'Exhibition Ready',
    resolution: '8K Technical Orthographic',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    notes: 'Complete sectional cutaways of dual-expansion cylinder system with hand-drafted engineering callouts.'
  },
  {
    id: 'rel119',
    accessionNumber: 'REL-119-88',
    title: 'Canterbury Cathedral Lead Pilgrimage Badge',
    period: 'Medieval England',
    date: 'c. 1400 CE',
    medium: 'Cast pewter-lead alloy with suspension loop',
    provenance: 'Thames foreshore archaeological recovery, London, 1984.',
    status: 'Conservation Queue',
    resolution: '4K Microscopic Photogrammetry',
    imageUrl: 'https://images.unsplash.com/photo-1569683795645-b62e50fbf103?auto=format&fit=crop&w=800&q=80',
    notes: 'Bears effigy of St. Thomas Becket with traces of original gilding intact inside relief folds.'
  }
];

export const SOUNDSCAPE_TRACKS: SoundscapeTrack[] = [
  {
    id: 'track-1',
    title: 'Wandering Waves: Coastal Ambience',
    location: 'Point Reyes National Seashore, CA',
    duration: '04:21',
    tags: ['Coastal', 'Hydrophone', 'Wind'],
    mood: 'Immersive',
    frequency: '24Hz — 18kHz',
    playbackDurationSec: 261
  },
  {
    id: 'track-2',
    title: 'Morning Mist in the Redwood Forest',
    location: 'Muir Woods Biosphere, CA',
    duration: '08:12',
    tags: ['Forest', 'Avian', 'Canopy'],
    mood: 'Calm',
    frequency: '40Hz — 16kHz',
    playbackDurationSec: 492
  },
  {
    id: 'track-3',
    title: 'Urban Night Rain & Bamboo Waterpipe',
    location: 'Gion District, Kyoto',
    duration: '06:21',
    tags: ['Urban', 'Precipitation', 'Resonant'],
    mood: 'Subtle',
    frequency: '32Hz — 20kHz',
    playbackDurationSec: 381
  },
  {
    id: 'track-4',
    title: 'Meadow Cicadas & Lavender Breezes',
    location: 'Plateau de Valensole, Provence',
    duration: '09:33',
    tags: ['Entomology', 'Heat Haze', 'Acoustic'],
    mood: 'Atmospheric',
    frequency: '1.2kHz — 22kHz',
    playbackDurationSec: 573
  },
  {
    id: 'track-5',
    title: 'Desert Wind & Obsidian Dunes',
    location: 'Kelso Dunes, Mojave Wilderness',
    duration: '07:18',
    tags: ['Arid', 'Sub-Bass', 'Singing Sands'],
    mood: 'Meditative',
    frequency: '18Hz — 12kHz',
    playbackDurationSec: 438
  }
];
