# STUDIO_SOP.md
## Smiley Solution - Studio Operating Procedure

> This file is a **living document**. It is updated at every sprint boundary, every major agent decision, and every structural change to the codebase. It is the single source of truth for the transformation of this site from a Freelancer Portfolio into a Professional Tech Studio.

---

## Mission Statement

**Transform smileysolution.com from a personal freelancer portfolio into a credible, studio-grade digital product presence** - one that reflects the Strategy → Architecture → Engineering → Motion identity of Smiley Solution.

Every sprint, every agent task, and every line changed serves this single goal.

---

## Studio Architecture Vision

```
BEFORE (Freelancer Portfolio)               AFTER (Tech Studio)
─────────────────────────────               ──────────────────────────────
JSON-LD: Person (Kim Kroll)                 JSON-LD: Organization (Smiley Solution)
Section: "The Founder"                      Section: "The Studio"
CTA: "Download CV"                          CTA: "Start a Project"
Voice: "I build", "my portfolio"            Voice: "We build", "our work"
Services: Full Stack / Web Design /         Services: Strategy / Architecture /
          Deployment / Technologies                   Engineering / Motion
Pages: "| Kim Kroll" in titles              Pages: "| Smiley Solution" in titles
```

---

## Agent Skill Tree

These are the internal roles used during every sprint. Each agent has a defined scope - no agent steps outside its lane.

```
┌─────────────────────────────────────────────────────────────────────┐
│                        AGENT SKILL TREE                             │
├────────────────┬────────────────────────────────────────────────────┤
│ AGENT          │ ROLE & SCOPE                                       │
├────────────────┼────────────────────────────────────────────────────┤
│ 🔍 Analyst     │ Reads all files. Maps every instance of the        │
│                │ problem pattern. Produces line-level audit tables. │
│                │ Outputs: change maps, before/after tables, count   │
│                │ summaries. Never writes code.                      │
├────────────────┼────────────────────────────────────────────────────┤
│ ⚙️  Coder      │ Executes only changes that have been explicitly    │
│                │ approved. Works file by file, edit by edit.        │
│                │ Runs TypeScript checks after each batch.           │
│                │ Never makes un-approved changes.                   │
├────────────────┼────────────────────────────────────────────────────┤
│ 🧪 Reviewer    │ Reads the final state of modified files. Verifies  │
│                │ correctness: tag balance, type safety, key         │
│                │ consistency, ARIA validity, layout coherence.      │
│                │ Returns PASS/FAIL with line-level findings.        │
│                │ Blocks merge on any CRITICAL or HIGH finding.      │
└────────────────┴────────────────────────────────────────────────────┘
```

### Agent Current Status

| Agent | Status | Last Action |
|-------|--------|-------------|
| 🔍 Analyst | ✅ IDLE | Sprint 4 complete - 21 changes mapped across 3 files |
| ⚙️ Coder | ✅ IDLE | Sprint 4 complete - 21 changes shipped, title+nav+4 descriptions+crimson tags |
| 🧪 Reviewer | ✅ IDLE | Sprint 4 review - PASS (11 categories, 0 findings) |

---

## Sprint Board

```
╔══════════════════════════════════════════════════════════════════╗
║  BACKLOG            IN PROGRESS         DONE                     ║
╠══════════════════════════════════════════════════════════════════╣
║  -                  -                   Sprint 1 ✅              ║
║                     (All sprints done)  Sprint 2 ✅              ║
║                                         Sprint 3 ✅              ║
║                                         Sprint 4 ✅              ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## SPRINT 1 - Identity & Schema ✅ DONE

**Status:** Complete
**Reviewed:** PASS (0 critical, 0 high, 0 medium, 1 low)
**TypeScript:** Clean - zero errors

### Objective
Remove the deepest freelancer identity signals: schema type, CV button, section title, image filename, and metadata attribution.

### Chain of Thought

> **Why schema first?** JSON-LD schema is the highest-trust signal on the page. Search engines and social platforms read it before any visible copy. A `Person` schema tells Google this is a freelancer's profile. An `Organization` schema tells Google this is a company. Everything else is UI - schema is infrastructure. It had to be the first fix.

> **Why the CV button?** It is the single most recognizable freelancer artifact on any website. No studio, agency, or product company has a "Download CV" button on their About page. Removing it is an identity statement, not just a content edit.

> **Why the image rename?** `/images/profile_picture_portfolio.png` contains "portfolio" - a word baked into the asset itself. Even if no user ever sees the filename, it propagates into OG tags, Twitter cards, JSON-LD, and `<Image>` components. Every social share would carry the word in its metadata.

> **Why the name hierarchy flip?** `SMILEY SOLUTION | KIM KROLL` puts the personal name at equal weight to the brand. The fix (`h3: SMILEY SOLUTION` + `p: Kim Kroll`) is one level of HTML hierarchy apart - invisible as a font change, decisive as an identity change.

### Changes Executed

| # | File | Change | Lines Affected |
|---|------|--------|---------------|
| 1 | `public/images/` | Renamed `profile_picture_portfolio.png` → `profile_picture.png` | File op |
| 2 | `layout.tsx` | Merged dual Person+ProfessionalService schemas into single `Organization` schema. Kim Kroll demoted to `founder` sub-object | 171–225 |
| 3 | `layout.tsx` | `authors` → Smiley Solution. OG/Twitter images → `profile_picture.png`. `creator` → `@smileysolution` | 85, 106, 119, 120 |
| 4 | `en.json` | `about.title` → `"The Stud<highlight>i</highlight>o"`. `about.tagline` updated. `download_cv` + `cv_aria` keys removed. ARIA labels: "portfolio" → "work" | 8, 10, 21, 58–65 |
| 5 | `he.json` | Hebrew equivalents: `"הסטו<highlight>ד</highlight>יו"`. All matching keys updated/removed | 8, 10, 21, 58–65 |
| 6 | `About.tsx` | `FaDownload` import removed. CV block deleted. Name heading: `h3` Studio / `p` Kim. Image col `lg:w-2/5` → `lg:w-[30%]`. Text col → `lg:w-[70%]`. ARIA labels → studio framing | 6, 143, 157, 176–181, 217, 225 |

### Reviewer Findings (Sprint 1)

- **CRITICAL:** 0
- **HIGH:** 0
- **MEDIUM:** 0
- **LOW (1):** `Kim Kroll` / `קים קרול` hardcoded inline in `About.tsx:180` outside translation system. Flagged for Sprint 2 fix.

---

## SPRINT 2 - Copy Shift ✅ DONE

**Status:** Complete
**Reviewed:** PASS (0 critical, 0 high, 0 medium, 0 low)
**TypeScript:** Clean - zero errors
**Files in scope:** 5
**Total changes:** 33

### Objective
Convert all first-person singular language to studio voice. Fix page title attribution. Move hardcoded founder name to translation system. Clean residual "portfolio" word from project descriptions.

### Chain of Thought

> **Why landing pages carry the most risk?** The homepage was already partially studio-voiced ("we build", "our approach"). The SEO landing pages - therapists and small business - were written entirely in first-person and never updated during the initial rebranding. They are the pages most likely to be seen by inbound leads via Google. A potential client finding "I build websites" on a studio's landing page immediately reads: freelancer, not studio.

> **Why `I → We` isn't just find-and-replace?** In Hebrew, verb conjugation carries the pronoun. `אני בונה` (I build) → `אנו בונים` (we build) changes the verb form, not just adds a word. Each instance was checked individually for correct plural conjugation. The Analyst mapped each one before the Coder touched anything.

> **Why move `Kim Kroll` to the translation system?** Consistency. Every other visible string in `About.tsx` goes through `t()`. The hardcoded inline conditional `{isRTL ? 'קים קרול' : 'Kim Kroll'}` is a pattern violation - and if the name or transliteration ever needed updating, it would require a code change instead of a content edit. The fix adds `about.founder_name` to both JSON files and uses `t('founder_name')` in the component.

> **Why change "proudest" to "most meaningful"?** Brand voice note: studios talk about impact, not personal emotion. "One of the projects I am proudest of" is a freelancer expressing personal attachment. "One of our most meaningful projects" is a studio describing significance. Same sentiment, different register.

> **Why rename "portfolio" in the Michal project description?** The client's product is described as a "portfolio website" - technically accurate, but the word `portfolio` now appears nowhere else on the site. Replacing it with "gallery website" is more descriptive of what was actually built (an artwork gallery, not a CV/portfolio site) and removes the last instance of the word from all visible copy.

### Change Map

#### `website-for-therapists/page.tsx` (14 changes)

| # | Line | Current | After |
|---|------|---------|-------|
| T1 | 13 | `Building a Website for Therapists \| Kim Kroll` | `Building a Website for Therapists \| Smiley Solution` |
| T2 | 28 | `בניית אתר למטפלים \| קים קרול` | `בניית אתר למטפלים \| Smiley Solution` |
| T3 | 76 | `creator: '@krollkim'` | `creator: '@smileysolution'` |
| T4 | 90 | `I'll provide a clear quote` | `We'll provide a clear quote` |
| T5 | 102 | `Every site I build` | `Every site we build` |
| T6 | 109 | `אציע הצעת מחיר מדויקת` | `נציע הצעת מחיר מדויקת` |
| T7 | 121 | `כל אתר שאני בונה` | `כל אתר שאנו בונים` |
| T8a | 352 | `One of the projects I am proudest of` | `One of our most meaningful projects` |
| T8b | 358 | `I built the site using React, Vite...` | `We built the site using React, Vite...` |
| T9 | 372 | `View the project in my portfolio →` | `View this project →` |
| T10a | 388 | `I build websites that look professional...` | `We build websites that look professional...` |
| T10b | 395 | `Browse My Projects →` | `Browse Our Work →` |
| T11 | 539 | `אחד הפרויקטים שאני הכי גאה בהם...שבניתי` | `אחד הפרויקטים המשמעותיים ביותר שלנו...שבנינו` |
| T12 | 544 | `בניתי את האתר עם React, Vite` | `בנינו את האתר עם React, Vite` |
| T13 | 556 | `לצפייה בפרויקט בתיק העבודות ←` | `לצפייה בפרויקט ←` |
| T14 | 572 | `אני בונה אתרים שנראים מקצועיים` | `אנו בונים אתרים שנראים מקצועיים` |

#### `website-for-small-business/page.tsx` (12 changes)

| # | Line | Current | After |
|---|------|---------|-------|
| S1 | 13 | `...Small Businesses \| Kim Kroll` | `...Small Businesses \| Smiley Solution` |
| S2 | 27 | `...לעסקים קטנים \| קים קרול` | `...לעסקים קטנים \| Smiley Solution` |
| S3 | 75 | `creator: '@krollkim'` | `creator: '@smileysolution'` |
| S4 | 89 | `I'll give you a clear, fixed quote` | `We'll give you a clear, fixed quote` |
| S5 | 101 | `I can integrate a CMS` | `We can integrate a CMS` |
| S6 | 108 | `אציע הצעת מחיר קבועה וברורה` | `נציע הצעת מחיר קבועה וברורה` |
| S7 | 120 | `אני יכול לשלב CMS` | `אנו יכולים לשלב CMS` |
| S8 | 364 | `I rebuilt the frontend with React` | `We rebuilt the frontend with React` |
| S9a | 405 | `I build websites that load fast` | `We build websites that load fast` |
| S9b | 412 | `Browse My Projects →` | `Browse Our Work →` |
| S10 | 485 | `לאחר שבניתי אתרים לעסקים` | `לאחר שבנינו אתרים לעסקים` |
| S11 | 571 | `בניתי מחדש את הצד הלקוח` | `בנינו מחדש את הצד הלקוח` |
| S12 | 610 | `אני בונה אתרים שנטענים מהר` | `אנו בונים אתרים שנטענים מהר` |

#### `en.json` (3 changes)

| Key | Current | After |
|-----|---------|-------|
| `about.founder_name` (new) | - | `"Kim Kroll"` |
| `projects.michal_desc` | `"Portfolio website for an artist..."` | `"Gallery website for an artist..."` |
| `projects.michal_alt` | `"Artist portfolio website built with..."` | `"Artist gallery website built with..."` |

#### `he.json` (3 changes)

| Key | Current | After |
|-----|---------|-------|
| `about.founder_name` (new) | - | `"קים קרול"` |
| `projects.michal_desc` | `"אתר תיק עבודות לאמנית..."` | `"אתר גלריה לאמנית..."` |
| `projects.michal_alt` | `"אתר תיק עבודות לאמנית בנוי עם..."` | `"אתר גלריה לאמנית בנוי עם..."` |

#### `About.tsx` (1 change)

| Line | Current | After |
|------|---------|-------|
| 180 | `{isRTL ? 'קים קרול' : 'Kim Kroll'}` | `{t('founder_name')}` |

### Execution Log

- [x] `website-for-therapists/page.tsx` - metadata titles + Twitter creator
- [x] `website-for-therapists/page.tsx` - EN FAQ copy (T4, T5)
- [x] `website-for-therapists/page.tsx` - HE FAQ copy (T6, T7)
- [x] `website-for-therapists/page.tsx` - EN case study + link + CTA (T8–T10)
- [x] `website-for-therapists/page.tsx` - HE case study + link + CTA (T11–T14)
- [x] `website-for-small-business/page.tsx` - metadata titles + Twitter creator
- [x] `website-for-small-business/page.tsx` - EN FAQ copy (S4, S5)
- [x] `website-for-small-business/page.tsx` - HE FAQ copy (S6, S7)
- [x] `website-for-small-business/page.tsx` - EN case study + CTA (S8–S9)
- [x] `website-for-small-business/page.tsx` - HE copy (S10–S12)
- [x] `en.json` - add founder_name, fix michal descriptions
- [x] `he.json` - add founder_name, fix michal descriptions
- [x] `About.tsx` - `t('founder_name')` replaces hardcoded string
- [x] TypeScript check - zero errors confirmed
- [x] Reviewer agent - PASS (all 5 categories)

### Reviewer Findings (Sprint 2)

- **CRITICAL:** 0
- **HIGH:** 0
- **MEDIUM:** 0
- **LOW:** 0
- **Note:** Reviewer confirmed zero residual first-person singular instances in Smiley Solution voice across both EN and HE content. Quoted speech attributed to third parties (e.g. therapist homepage copy examples) correctly preserved as intentional.

---

## SPRINT 3 - Studio Services Architecture ✅ DONE

**Status:** Complete
**Reviewed:** PASS (0 critical, 0 high, 0 medium, 0 low)
**TypeScript:** Clean - zero errors
**Files in scope:** `en.json`, `he.json`, `src/components/Services.tsx`
**Cards:** 4 → 3
**Disciplines:** Digital Strategy & Architecture · Full-Stack Engineering · Performance & UI/UX

### Objective
Replace the 4 generic service cards (Full Stack / Web Design / Deployment / Technologies) with 3 studio disciplines that reflect the actual Smiley Solution identity. Add tech stack tags per card. Add sprint-based delivery process row. Update grid and GSAP transforms to 3-card layout.

### Chain of Thought

> **Why 3 disciplines instead of 4?** The user's brief specifies Digital Strategy & Architecture, Full-stack Engineering, and Performance & UI/UX. Three disciplines map precisely to the studio's real service offer: think it → build it → make it feel exceptional. Four cards was one too many - "Deployment" and "Technologies" were list items, not disciplines.

> **Why merge Strategy and Architecture into one card?** In a studio context, you don't sell "strategy" separately from "architecture" - they're the same upstream phase. One card called "Digital Strategy & Architecture" communicates: we think before we build, and we charge for thinking. It's a studio signal, not a freelancer task list.

> **Why tech tags on the cards?** Tags communicate stack fluency without burying it in description prose. A CTO scanning the page sees "React/Next.js · Node.js · MongoDB" as a fast signal. Tags also allow the description to stay narrative rather than becoming a bullet list of tools.

> **Why a delivery process row?** The sprint-based delivery section communicates process maturity. Studios have a method. Discover → Architect → Engineer → Ship is a four-step story that turns "we do web development" into "we run a production pipeline." It lives below the cards as a standalone row - not inside any single card.

> **Why keep `cardTransforms` at 3 entries?** The 3D floating effect depends on array index. Removing the 4th entry and adjusting the 3 remaining to be slightly more dramatic (to fill the wider 3-card layout) preserves the 2026 premium scroll animation identity.

### Analyst Change Map

#### File 1: `src/i18n/messages/en.json` - services namespace

| Key | Action | Current Value | New Value |
|-----|--------|---------------|-----------|
| `services.subtitle` | UPDATE | `"We build modern, scalable applications with full-stack expertise..."` | `"Three disciplines. One studio. We build digital products that scale, perform, and feel exceptional."` |
| `services.fullstack_title` | RENAME→ `strategy_title` | `"Full Stack"` | `"Digital Strategy & Architecture"` |
| `services.fullstack_desc` | RENAME→ `strategy_desc` | Building dynamic apps... | `"We map your product's foundation before a line of code is written - discovery, roadmapping, tech stack selection, and system design that holds under scale."` |
| `services.design_title` | RENAME→ `engineering_title` | `"Web Design"` | `"Full-Stack Engineering"` |
| `services.design_desc` | RENAME→ `engineering_desc` | Crafting responsive designs... | `"Production-ready builds across the full stack - React, Next.js, Node.js, and MongoDB. From API architecture to deployment on AWS and Vercel."` |
| `services.deployment_title` | RENAME→ `performance_title` | `"Deployment"` | `"Performance & UI/UX"` |
| `services.deployment_desc` | RENAME→ `performance_desc` | Expert deployment via Vercel... | `"Interfaces built to move. GSAP-powered animations, Lenis smooth scroll, and a minimalist visual language designed to stop the scroll."` |
| `services.tech_title` | DELETE | `"Technologies"` | - |
| `services.tech_desc` | DELETE | `"Proficient in TypeScript..."` | - |
| `services.process_label` | ADD | - | `"How We Build"` |
| `services.process_1` | ADD | - | `"Discover"` |
| `services.process_2` | ADD | - | `"Architect"` |
| `services.process_3` | ADD | - | `"Engineer"` |
| `services.process_4` | ADD | - | `"Ship"` |

**Net change:** -2 keys removed (`tech_title`, `tech_desc`), +5 keys added (process), 3 pairs renamed+rewritten. Total services namespace: 4 + 5 process = 9 keys (was 9, clean replacement).

#### File 2: `src/i18n/messages/he.json` - services namespace

| Key | Action | New Hebrew Value |
|-----|--------|-----------------|
| `services.subtitle` | UPDATE | `"שלושה תחומים. סטודיו אחד. אנחנו בונים מוצרים דיגיטליים שמסוגלים לצמוח, לבצע ולהרגיש יוצאי דופן."` |
| `services.strategy_title` | RENAME+UPDATE | `"אסטרטגיה ואדריכלות דיגיטלית"` |
| `services.strategy_desc` | RENAME+UPDATE | `"אנחנו מתכננים את הבסיס של המוצר לפני שנכתבת שורת קוד - גילוי, תכנון מפת דרכים, בחירת טכנולוגיות ועיצוב מערכת שמחזיק תחת עומס."` |
| `services.engineering_title` | RENAME+UPDATE | `"הנדסת Full Stack"` |
| `services.engineering_desc` | RENAME+UPDATE | `"פיתוח מוכן לפרודקשן על כל הסטאק - React, Next.js, Node.js ו-MongoDB. מארכיטקטורת API ועד פריסה ב-AWS ו-Vercel."` |
| `services.performance_title` | RENAME+UPDATE | `"ביצועים ו-UI/UX"` |
| `services.performance_desc` | RENAME+UPDATE | `"ממשקים שנבנו לנוע. אנימציות מבוססות GSAP, גלילה חלקה עם Lenis ושפה ויזואלית מינימליסטית שגורמת לאנשים לעצור."` |
| `services.tech_title` | DELETE | - |
| `services.tech_desc` | DELETE | - |
| `services.process_label` | ADD | `"איך אנחנו בונים"` |
| `services.process_1` | ADD | `"גילוי"` |
| `services.process_2` | ADD | `"ארכיטקטורה"` |
| `services.process_3` | ADD | `"הנדסה"` |
| `services.process_4` | ADD | `"פריסה"` |

#### File 3: `src/components/Services.tsx`

| Element | Current | New |
|---------|---------|-----|
| Icons imported | `FaCode, FaPaintBrush, FaRocket, FaTools` | `FaSitemap, FaCode, FaMagic` |
| `Service` interface | `{ title, icon, description }` | `{ title, icon, description, tags: string[] }` |
| `services` array | 4 items | 3 items with tech tag arrays |
| Card 1 tags | - | `['Discovery', 'Roadmap', 'System Design', 'Tech Consulting']` |
| Card 2 tags | - | `['React/Next.js', 'Node.js', 'MongoDB', 'AWS/Vercel', 'Docker']` |
| Card 3 tags | - | `['GSAP', 'Lenis', 'TailwindCSS', 'Motion Design']` |
| Grid class | `lg:grid-cols-4` | `lg:grid-cols-3` |
| `cardTransforms` | 4 entries | 3 entries (4th removed, values adjusted for wider 3-card layout) |
| Card JSX | icon + title + description | icon + title + description + tag pills |
| Delivery process row | - | New row below grid: `process_label` + 4 numbered steps from translation |

### Execution Log

- [x] `en.json` - rename + rewrite 3 service key pairs, remove 2 tech keys, add 5 process keys
- [x] `he.json` - matching Hebrew changes
- [x] `Services.tsx` - icon imports: `FaSitemap`, `FaCode`, `FaMagic`
- [x] `Services.tsx` - Service interface: `tags: string[]` added
- [x] `Services.tsx` - services array: 4 → 3 items with tags
- [x] `Services.tsx` - grid: `lg:grid-cols-4` → `lg:grid-cols-3`, gap widened
- [x] `Services.tsx` - cardTransforms: 4 → 3 entries (values adjusted for wider layout)
- [x] `Services.tsx` - card JSX: left-aligned layout, `flex-1` on description, tag pills at bottom
- [x] `Services.tsx` - delivery process row: border-t separator, mono step numbers, crimson arrows
- [x] TypeScript check - zero errors confirmed
- [x] Reviewer agent - PASS (11 categories)

### Reviewer Findings (Sprint 3)

- **CRITICAL:** 0
- **HIGH:** 0
- **MEDIUM:** 0
- **LOW:** 0
- **Note:** Grid alignment verified. `flex-1` on description ensures tag baseline alignment across all 3 cards regardless of description length. Process row uses `as const` key tuple for type-safe `t()` calls.

---

## SPRINT 4 - Projects → Case Studies ✅ DONE

**Status:** Complete
**Reviewed:** PASS (0 critical, 0 high, 0 medium, 0 low)
**TypeScript:** Clean - zero errors
**Files in scope:** `en.json`, `he.json`, `src/components/Projects.tsx`
**Changes:** Section title · Nav label · Subtitle · 4 × Problem/Solution descriptions · Crimson tag styling

### Objective
Reframe the Projects carousel as Case Studies. Replace flat narrative descriptions with Problem/Solution format. Align tag pill styling with Sprint 3 crimson system.

### Chain of Thought

> **Why Problem/Solution format?** Studios present work as evidence of thinking, not a list of outputs. "We built X with Y" is a freelancer sentence. "X had problem Z - we built Y to solve it" is a studio case study sentence. The format shift changes the register from portfolio showcase to professional evidence.

> **Why keep the carousel structure?** The GSAP ticker, drag handler, and infinite-scroll loop are production-quality and correct. Touching that logic for a copy-and-styling sprint would add risk with zero reward.

> **Why match the crimson tag system?** Visual consistency across sections signals intentional design. Gray tags in Projects after crimson tags in Services would look like two different designers. One tag language = one studio.

> **Why update the nav label?** "Case Studies" in the nav anchors the new framing the moment a visitor scans the navigation. Leaving "Projects" in the nav while the section says "Case Studies" creates a mismatch that undermines the identity signal.

### Execution Log

- [x] `en.json` - `nav.projects` + `nav.projects_aria` updated
- [x] `en.json` - `projects.title` → `"Case Stud<highlight>i</highlight>es"`
- [x] `en.json` - `projects.subtitle` → case study framing
- [x] `en.json` - 4 × descriptions rewritten in Problem/Solution format
- [x] `en.json` - `yup_alt` updated to match new framing
- [x] `he.json` - `nav.projects` + `nav.projects_aria` updated
- [x] `he.json` - `projects.title` → `"מקרי <highlight>ב</highlight>וחן"`
- [x] `he.json` - `projects.subtitle` → Hebrew case study framing
- [x] `he.json` - 4 × descriptions rewritten (plural first-person: `עיצבנו`, `בנינו`)
- [x] `he.json` - `yup_alt` updated
- [x] `Projects.tsx` - tag pills: gray → crimson system
- [x] TypeScript check - zero errors confirmed
- [x] Reviewer agent - PASS (11 categories)

### Reviewer Findings (Sprint 4)

- **CRITICAL:** 0
- **HIGH:** 0
- **MEDIUM:** 0
- **LOW:** 0
- **Note:** All Hebrew verb forms verified as first-person plural. No "portfolio" or first-person singular found in any rewritten copy. Carousel mechanics fully preserved.

---

## Decision Log

> All major decisions made during the transformation are logged here with rationale.

| Date | Decision | Rationale |
|------|---------|-----------|
| 2026-03-20 | `Person` schema → `Organization` | SEO infrastructure. Google/social treat schema type as primary entity signal. |
| 2026-03-20 | CV button deleted entirely | Strongest freelancer signal on the page. No studio equivalent. |
| 2026-03-20 | Image renamed, not just re-referenced | "portfolio" in the filename propagates into OG metadata on every social share. |
| 2026-03-20 | Name hierarchy: Studio `h3` / Founder `p` | One HTML tag difference = complete identity hierarchy shift. Same visual proximity, clear semantic priority. |
| 2026-03-20 | "proudest" → "most meaningful" | Brand voice: studios speak in impact, not personal emotion. |
| 2026-03-20 | `michal_desc`: "portfolio" → "gallery" | More accurate description of the deliverable AND removes last instance of "portfolio" from all visible copy. |
| 2026-03-20 | `founder_name` moved to translation system | Consistency: all visible strings through `t()`. Enables content-level updates without code changes. |

---

## File Change Index

> Quick reference: which files were touched in which sprint.

| File | Sprint 1 | Sprint 2 | Sprint 3 | Sprint 4 |
|------|----------|----------|----------|----------|
| `src/app/[locale]/layout.tsx` | ✅ | - | - | - |
| `src/i18n/messages/en.json` | ✅ | ✅ | ✅ | ✅ |
| `src/i18n/messages/he.json` | ✅ | ✅ | ✅ | ✅ |
| `src/components/About.tsx` | ✅ | ✅ | - | - |
| `src/components/Services.tsx` | - | - | ✅ | - |
| `src/components/Projects.tsx` | - | - | - | ✅ |
| `src/app/[locale]/website-for-therapists/page.tsx` | - | ✅ | - | - |
| `src/app/[locale]/website-for-small-business/page.tsx` | - | ✅ | - | - |
| `public/images/profile_picture_portfolio.png` | ✅ (renamed) | - | - | - |

---

_Last updated: 2026-03-20 - ALL 4 SPRINTS COMPLETE. smileysolution.com is now a Professional Tech Studio._
