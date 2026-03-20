import { locales } from '@/i18n/config';

// ─── Slug type ─────────────────────────────────────────────────────────────────
export const PILLAR_SLUGS = [
  'high-end-web',
  'tech-engines',
  'strategic-alignment',
] as const;

export type PillarSlug = (typeof PILLAR_SLUGS)[number];

// ─── Pillar schema ─────────────────────────────────────────────────────────────
export interface Pillar {
  /** URL segment - drives the [slug] route */
  slug: PillarSlug;
  /** Display number shown in the UI: '01', '02', '03' */
  number: string;
  /** Key in the 'pillars' i18n namespace */
  titleKey: string;
  /** Key in the 'pillars' i18n namespace */
  taglineKey: string;
  /**
   * Project identifiers that belong to this pillar.
   * Each entry corresponds to a key prefix in the 'projects' i18n namespace
   * (e.g. 'yup' → yup_desc, yup_alt, yup_role …).
   * Used in Phase 2 to render case study cards per pillar.
   */
  projectKeys: string[];
}

// ─── Pillar data ───────────────────────────────────────────────────────────────
export const PILLARS: Pillar[] = [
  {
    slug: 'high-end-web',
    number: '01',
    titleKey: 'web_title',
    taglineKey: 'web_tagline',
    // Michal B gallery + Better Together coaching site
    projectKeys: ['michal', 'better'],
  },
  {
    slug: 'tech-engines',
    number: '02',
    titleKey: 'engines_title',
    taglineKey: 'engines_tagline',
    // Bullshit Map - full-stack geospatial + NFC system
    projectKeys: ['bullshit'],
  },
  {
    slug: 'strategic-alignment',
    number: '03',
    titleKey: 'alignment_title',
    taglineKey: 'alignment_tagline',
    // Yup.io - SaaS architecture refactor and scale
    projectKeys: ['yup'],
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

/** Lookup a pillar by its URL slug. Returns undefined for unknown slugs. */
export function getPillarBySlug(slug: string): Pillar | undefined {
  return PILLARS.find((p) => p.slug === slug);
}

/**
 * Returns all locale × slug combinations for generateStaticParams.
 * Each nested [locale]/studio/[slug] page calls this at build time.
 */
export function getPillarStaticParams(): { locale: string; slug: string }[] {
  return locales.flatMap((locale) =>
    PILLARS.map((pillar) => ({ locale, slug: pillar.slug }))
  );
}
