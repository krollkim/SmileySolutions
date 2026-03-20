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
    key: 'yup',
    title: 'Yup.io',
    image: '/images/YupIO-project.png',
    liveLink: 'https://yup.io/',
    tags: ['React', 'TailwindCSS', 'SaaS', 'Figma'],
    period: '2023–2024',
  },
  bullshit: {
    key: 'bullshit',
    title: 'Bullshit Map',
    image: '/images/Bullshit-project.png',
    liveLink: 'https://globaloriginalart.com/',
    tags: ['Next.js 15', 'MapboxGL', 'Node.js', 'AWS'],
    period: '',
  },
  michal: {
    key: 'michal',
    title: 'Michal B',
    image: '/images/michalB-project.png',
    liveLink: 'https://michalberco.netlify.app/',
    tags: ['Next.js', 'TailwindCSS'],
    period: '',
  },
  better: {
    key: 'better',
    title: 'Better Together',
    image: "/images/Ofir's-Landing-Page-IMG.png",
    liveLink: 'https://betterhertogether.netlify.app/',
    tags: ['React 18', 'Vite', 'TailwindCSS', 'Decap CMS'],
    period: '2026',
  },
};
