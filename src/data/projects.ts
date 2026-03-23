export interface ProjectData {
  key: string;
  title: string;
  image: string;
  liveLink: string;
  tags: string[];
  period: string;
}

export const PROJECT_DATA: Record<string, ProjectData> = {
  yup: {
    key: 'Yup-io',
    title: 'Yup.io',
    image: '/images/YupIO-project.png',
    liveLink: 'https://yup.io/',
    tags: ['React', 'TailwindCSS', 'SaaS', 'Figma'],
    period: '2023–2024',
  },
  bullshit: {
    key: 'Bullshit-Map',
    title: 'Bullshit Map',
    image: '/images/Bullshit-project.png',
    liveLink: 'https://globaloriginalart.com/',
    tags: ['Next.js 15', 'MapboxGL', 'Node.js', 'AWS'],
    period: '2025',
  },
  michal: {
    key: 'Michal-B',
    title: 'Michal B',
    image: '/images/michalB-project.png',
    liveLink: 'https://michalberco.netlify.app/',
    tags: ['Next.js', 'TailwindCSS'],
    period: '2025',
  },
  better: {
    key: 'Better-Together',
    title: 'Better Together',
    image: "/images/Ofir's-Landing-Page-IMG.png",
    liveLink: 'https://betterhertogether.netlify.app/',
    tags: ['React 18', 'typescript', 'Vite', 'TailwindCSS', 'Decap CMS'],
    period: '2026',
  },
  sanctuary: {
    key: 'The-Digital-Sanctuary',
    title: 'The Digital Sanctuary',
    image: '/images/thedigitalsanctuary-heroSection.png ',
    liveLink: 'https://thedigitalsanctuary.netlify.app/',
    tags: ['Next.js', 'React', 'typescript', 'TailwindCSS', 'RTL'],
    period: '2026',
  },
  pic: {
    key: 'PIC-Events',
    title: 'PIC Events',
    image: '/images/PIC-LandingPage.png',
    liveLink: 'https://pic-events.netlify.app/',
    tags: ['Next.js', 'React', 'typescript', 'TailwindCSS', 'Landing Page', 'Netlify'],
    period: '2026',
  },
};
