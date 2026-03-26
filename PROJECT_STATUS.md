# SmileySolutions — Project Status

> Living reference document. Updated as work progresses.

---

## 1. Project Overview

**What the site is:**
A single-page portfolio and business landing site for Kim Kroll (SmileySolutions), a Full Stack Developer available for freelance and full-time remote work. The site targets both Israeli (Hebrew) and international (English) audiences.

**Live URL:** https://smileysolution.com/  
**Repository:** C:/Users/kimkr/Desktop/kim-kroll-landing-page/smileysolutions

**Core technologies:**

| Category | Technology |
|---|---|
| Framework | Next.js 16.1.6 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS v4 |
| Animations | GSAP 3.14 + ScrollTrigger |
| Animations (Header) | Framer Motion 12 |
| Internationalization | next-intl 4.8.3 |
| Fonts | Montserrat (Google Fonts) |
| Images | Next.js `<Image>` with optimization |
| Icons | react-icons 5 |
| Deployment | Netlify |
| Node requirement | >=18.0.0 |

---

## 2. Completed Steps

### Step 1 — Install next-intl
- Installed `next-intl@4.8.3`
- Added to `package.json` dependencies

### Step 2 — i18n Infrastructure
Created:
- `src/i18n/config.ts` — defines supported locales (`he`, `en`), default locale (`he`)
- `src/i18n/request.ts` — server-side `getRequestConfig`, loads JSON messages per locale
- `src/i18n/messages/en.json` — English translation keys for all sections
- `src/i18n/messages/he.json` — Hebrew translation keys for all sections

### Step 3 — Proxy / Routing Middleware
Created `src/proxy.ts` (Next.js 16 uses `proxy.ts` instead of `middleware.ts`):
- Detects preferred locale from `NEXT_LOCALE` cookie, then `Accept-Language` header, then defaults to `he`
- Redirects root `/` to `/he` or `/en`
- For locale-prefixed paths (`/he/...`, `/en/...`) passes through and sets `x-next-intl-locale` header so `next-intl` resolves the correct message set
- Excludes `_next/static`, `_next/image`, `favicon.ico`, `/favicon/`, `robots.txt`, `sitemap.xml`

### Step 4 — App Router Restructure
- Deleted `src/app/layout.tsx` and `src/app/page.tsx`
- Created `src/app/[locale]/layout.tsx` (locale-aware root layout)
- Created `src/app/[locale]/page.tsx` (main page with all section components)
- `generateStaticParams` pre-renders both `/he` and `/en`

### Step 5 — next-intl Plugin Integration
Updated `next.config.ts`:
- Added `createNextIntlPlugin` wrapping the Next.js config
- Points to `./src/i18n/request.ts`

### Step 6 — Locale-Aware Metadata + hreflang
Updated `src/app/[locale]/layout.tsx`:
- `generateMetadata` function generates locale-specific title, description, keywords, OpenGraph locale, canonical URL, and `hreflang` alternates
- `hreflang` covers `he`, `en`, and `x-default` (pointing to `/he`)
- `<html lang={locale} dir={locale === 'he' ? 'rtl' : 'ltr'}` set dynamically
- `NextIntlClientProvider` wraps children with locale messages

### Step 7 — Component Translation Integration
All user-facing text extracted from hardcoded strings into translation keys:

| Component | Translation namespace | Hook used |
|---|---|---|
| `Header.tsx` | `nav` | `useTranslations` |
| `Hero.tsx` | `hero` | `useTranslations` |
| `Services.tsx` | `services` | `useTranslations` |
| `Projects.tsx` | `projects` | `useTranslations` |
| `About.tsx` | `about` | `useTranslations` |
| `Contact.tsx` | `contact` | `useTranslations` |
| `[locale]/page.tsx` | `footer` | `getTranslations` (server) |

Rich text titles using `t.rich('key', { highlight: (chunks) => <span>{chunks}</span> })` for accent letters in section headings.

### Step 7.5 ✅ — Hebrew Localization Refinement
Completed in four implementation phases:

**Phase 1 — Copy fixes (he.json):**
- `about.tagline`: "נוודת דיגיטלי" → "נווד דיגיטלי" (gender fix)
- `hero.subtitle`: updated to "יוצר חוויות ווב מודרניות, מהירות ואמינות"
- `services.fullstack_desc`: "חלקים" → "מקצה לקצה"
- `services.design_desc`: "מרשימים חזותית" → "מרהיבים"
- Added `whatsapp_text` translation key to `about` and `contact` namespaces in both locales
- Updated `About.tsx` and `Contact.tsx` to use `encodeURIComponent(t('whatsapp_text'))` for locale-aware WhatsApp pre-fill

**Phase 2 — CSS RTL adjustments:**
- Header: nav underline + logo underline + mobile menu underline now use `rtl:left-auto rtl:right-0` so they expand from right in Hebrew
- Hero CTA fill: changed `-translate-x-full` to `ltr:-translate-x-full rtl:translate-x-full` so fill slides from right in RTL
- About: image border offset uses `useLocale()` — `right: '-20px'` in RTL, `left: '-20px'` in LTR
- Contact: staggered card margin uses `useLocale()` — `lg:mr-[30px]` in RTL, `lg:ml-[30px]` in LTR
- Contact: decorative vertical line uses `rtl:left-0 ltr:right-0`

**Phase 3 — GSAP directional fixes:**
- Hero CTA arrow: replaced hardcoded `→` with `t('cta_arrow')` translation key (`→` in English, `←` in Hebrew)
- Hero GSAP bounce: `x: isRTL ? -5 : 5` — arrow bounces toward the correct edge in both locales
- About text slide: `x: isRTL ? -50 : 50` — text slides in from the correct side in RTL
- Contact left/right column slides: swapped `x` start values when `isRTL` — each column slides from its visible edge
- All affected `useLayoutEffect` hooks now include `isRTL` in their dependency arrays

**Phase 4 — Hero clipPath reveal overhaul:**
- Title reveal `clipPath` start: `isRTL ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)'` (reveals right-to-left in Hebrew)
- Title reveal `clipPath` end: `isRTL ? 'inset(0 0 0 0%)' : 'inset(0 0% 0 0)'`
- Cursor sweep: in LTR animates `left: 0% → 100%`; in RTL animates `right: 0% → 100%`
- Cursor initial inline style: `left`/`right` switched per locale

### Projects Section Redesign (parallel to Step 7.5)
Replaced the previous scroll-hijacking horizontal Projects section:

**Removed:**
- `ScrollTrigger` `pin + scrub` horizontal scroll
- `getScrollAmount()` calculation
- `ScrollTrigger.getAll().forEach(t => t.kill())` global cleanup bug
- End-spacer DOM hack

**Replaced with:**
- GSAP `ticker`-based infinite marquee rail (0.3px/frame ≈ 18px/s)
- Duplicate card array for seamless visual loop
- Pointer event drag with horizontal/vertical intent detection (≥8px threshold)
- `direction: 'ltr'` on track to preserve intentional card order in RTL
- Edge fade gradients as visual affordance
- `drag` / `גרור` translation key for hint text
- Pause on hover (`isHoveredRef`) and during drag (`isDraggingRef`)
- `ResizeObserver` for responsive remeasurement

---

## 3. Current Known Issues

### Remaining RTL Polish Items

| Component | Issue | Severity |
|---|---|---|
| **Services** | Grid card visual order may be reversed in RTL (`dir="rtl"` flips grid columns) — intentionally deferred | Low–Medium |
| **Hero** | Left-side gradient overlay (`bg-linear-to-r`) not yet mirrored to `bg-linear-to-l` in RTL | Low |

### Technical Limitations

- `Services.tsx`, `About.tsx`, `Contact.tsx`, `Hero.tsx` — all use `ScrollTrigger.getAll().forEach(t => t.kill())` in cleanup, which is a global kill and can affect other components on hot reload. Pre-existing issue.
- The `projects.scroll` key in `he.json` / `en.json` is now unused after the carousel redesign. Orphaned key.
- No locale persistence via cookie is currently written by the app — the proxy reads an existing `NEXT_LOCALE` cookie but the app does not set it. A language switcher (Step 8) will resolve this.

---

## 4. Current Phase

> **Step 8 — Language Switcher**
>
> Step 7.5 is complete. Ready to implement the visible language switcher in the header.

---

## 5. Next Planned Steps

### Step 8 — Language Switcher (next)
- Add a visible language switcher in the header (not inside the accessibility menu)
- Suggested design: minimal `EN / עב` toggle or globe icon
- Must set `NEXT_LOCALE` cookie on switch for locale persistence
- Must work on both desktop and mobile header layouts
- Must not break existing GSAP animations

### Step 8 — Language Switcher
- Add a visible language switcher in the header (not inside the accessibility menu)
- Suggested design: minimal globe icon or `EN / עב` toggle
- Must set `NEXT_LOCALE` cookie on switch for persistence
- Must work correctly on both desktop and mobile header layouts
- Must not break any existing GSAP animations

### Future Improvements
- Add `robots.txt` and `sitemap.xml` with locale-aware URLs
- Consider locale persistence cookie (set by the app, not just read)
- Optionally support Arabic (`ar`) as a third locale (scaffolding is ready — just add `ar` to `config.ts` and create `ar.json`)
- Momentum/deceleration on Projects carousel drag release
- Review `ScrollTrigger.getAll().forEach(t => t.kill())` usage in all components and scope cleanups to context only

---

## 6. Open Questions / Future Considerations

| Topic | Notes |
|---|---|
| **Arabic locale** | The architecture supports it. Would need `ar.json`, RTL is identical to Hebrew handling |
| **Cookie persistence** | Currently locale is only read from cookie, never written by the app. A language switcher (Step 8) will resolve this |
| **Hero h1 mixed language** | Lines 1–2–3 are: `Kim Kroll / Full Stack / מפתח`. Whether to keep "Full Stack" in English or translate to "פול סטאק" is a brand decision |
| **WhatsApp message per locale** | ✅ Resolved in Step 7.5 — both About and Contact now use locale-aware `whatsapp_text` translation key |
| **CV file locale** | Only one CV file (`/CV-KIM-KROLL-2025.pdf`) exists. A Hebrew-tailored CV could be added later |
| **Accessibility widget translation** | `AccessibilityMenu.tsx` text (labels, statement text) is still hardcoded in English. This was intentionally left out of Step 7 |
| **Projects section momentum** | Drag release currently stops immediately. Inertia/momentum could be added with a short `gsap.to` deceleration |
| **Global ScrollTrigger kill bug** | `ScrollTrigger.getAll().forEach(t => t.kill())` is in 4 components. Should be replaced with scoped `ctx.revert()` only |
