// 'home' is the inline homepage strip (3 objection-killers before Contact).
// 'general' is the /faq standalone page.
export type FAQCategory = 'general' | 'home' | 'services' | 'about' | 'work';

export interface FAQItemMeta {
  qKey: string;
  aKey: string;
  categories: FAQCategory[];
}

// Category composition:
//   home     (homepage)  → q2, q5, q9   — objection-killers before Contact CTA
//   general  (/faq)      → q1, q2, q5, q9, q12
//   services (/services) → q1, q2, q4, q6, q7, q13
//   about    (/about)    → q3, q4, q8, q9, q10
//   work     (/work)     → q11, q12, q13
export const FAQ_ITEMS: FAQItemMeta[] = [
  { qKey: 'q1',  aKey: 'a1',  categories: ['general', 'services'] },
  { qKey: 'q2',  aKey: 'a2',  categories: ['general', 'home', 'services'] },
  { qKey: 'q3',  aKey: 'a3',  categories: ['about'] },
  { qKey: 'q4',  aKey: 'a4',  categories: ['services', 'about'] },
  { qKey: 'q5',  aKey: 'a5',  categories: ['general', 'home'] },
  { qKey: 'q6',  aKey: 'a6',  categories: ['services'] },
  { qKey: 'q7',  aKey: 'a7',  categories: ['services'] },
  { qKey: 'q8',  aKey: 'a8',  categories: ['about'] },
  { qKey: 'q9',  aKey: 'a9',  categories: ['about', 'general', 'home'] },
  { qKey: 'q10', aKey: 'a10', categories: ['about'] },
  { qKey: 'q11', aKey: 'a11', categories: ['work'] },
  { qKey: 'q12', aKey: 'a12', categories: ['work', 'general'] },
  { qKey: 'q13', aKey: 'a13', categories: ['work', 'services'] },
];
