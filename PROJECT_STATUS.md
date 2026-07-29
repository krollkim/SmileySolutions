# SmileySolutions — Project Status

> Living reference document. Updated as work progresses.

---

## ⭐ Quick Reference — How many people contacted me from the site?

**Open this in your browser:**

```
https://smileysolution.com/api/track-cta?token=<YOUR_TOKEN>
```

**The token is in [`.env.local`](./.env.local)** in this project root — open that file, copy the full ready-made URL from the comment block at the bottom, paste it into the browser. That file is git-ignored and never leaves your machine.

You get back:

```json
{ "total": 42, "byMonth": { "2026-07": 31, "2026-08": 11 } }
```

| Response | Meaning |
|---|---|
| `{"total": N, …}` | N clicks on the WhatsApp button since launch |
| `401 unauthorized` | Wrong or missing token |
| `404` | Latest code not deployed to Netlify yet |

> 🔒 **The token is deliberately NOT written in this file — this repository is public** (`krollkim/SmileySolutions`). Anything committed here is visible to the world. Keep the token in `.env.local` and in Netlify → Site settings → Environment variables (the two must match). If it ever leaks, generate a new one and update both places — nothing else depends on it.

> **What the number means:** it counts *clicks*, not messages. The gap between this number and the WhatsApp messages you actually receive is your drop-off rate. Full detail in the WhatsApp CTA Migration section below.

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

### Step 3 — Routing Middleware
Created `src/middleware.ts` (standard Next.js middleware):
- Detects preferred locale from `NEXT_LOCALE` cookie, then `Accept-Language` header, then defaults to `he`
- Redirects root `/` to `/he` or `/en` using **301 (permanent redirect)** for proper SEO
- For locale-prefixed paths (`/he/...`, `/en/...`) passes through and sets `x-next-intl-locale` header so `next-intl` resolves the correct message set
- Excludes static files (via regex), `_next/static`, `_next/image`, `favicon.ico`, `/favicon/`, `robots.txt`, `sitemap.xml`
- Matcher config ensures middleware only runs on relevant paths

> **Note:** Previously used `proxy.ts` but migrated to standard `middleware.ts` for better compatibility with Netlify builds and SEO (301 vs 307 redirects).

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

### WhatsApp CTA Migration ✅ (2026-07-20)

**Why:** The Google Calendar booking CTA was not converting — visitors were not booking calls. Every primary CTA now opens a pre-filled WhatsApp message instead. This removes the visitor's effort of composing an opening line, and the conversation arrives with context already attached.

> **History note:** an early WhatsApp implementation existed around Step 7.5, but a later site-wide redesign replaced all CTAs with the Google Calendar link. This step re-establishes WhatsApp deliberately and centrally, rather than as scattered hrefs.

**New files:**

| File | Role |
|---|---|
| `src/config/contact.ts` | Single source of truth — `WHATSAPP_NUMBER`, `buildWhatsAppUrl()`, and `BOOKING_URL` |
| `src/components/WhatsAppCta.tsx` | Client component rendering the CTA anchor: builds the wa.me URL, injects the localized message, fires the click beacon |
| `src/lib/trackCtaClick.ts` | Fire-and-forget `navigator.sendBeacon` to our own endpoint |
| `src/app/api/track-cta/route.ts` | `POST` records a click · `GET` returns totals |

**Booking code is retained, not deleted.** `BOOKING_URL` in `src/config/contact.ts` still holds the Google Calendar link, marked deprecated and wired to nothing. To revert, swap `WhatsAppCta` back to `<a href={BOOKING_URL}>` in the 8 components below.

**CTAs migrated (8):** `Hero`, `Services`, `About`, `FAQ`, `PillarGrid`, `Contact`, `Footer`, `FloatingCTA`. Each passes a distinct `source` prop, so per-surface conversion is visible in the stats.

`WhatsAppCta` keeps each surface's original `className` and `children`, so no layout changes were introduced — only the destination, the copy, the icon and the tracking.

**Button copy — booking language removed.** "Book a Consultation" / "לקביעת שיחה" described an action the site no longer performs. Four keys were changed to the conversational phrasing already used by `services.cta`, so every primary CTA now speaks in one voice:

| Key | Before (HE / EN) | After (HE / EN) |
|---|---|---|
| `hero.book_cta` | לקביעת שיחה / Book a Consultation | **בואו נדבר / Let's Talk** |
| `faq.cta` | לקביעת שיחה / Book a Consultation | **בואו נדבר / Let's Talk** |
| `contact.book_cta` | לקביעת שיחה / Book a Consultation | **בואו נדבר / Let's Talk** |
| `footer.book_cta` | לקביעת שיחה / Book a Consultation | **בואו נדבר / Let's Talk** |

`services.cta` (בואו נדבר), `about.cta` (בואו נעבוד יחד) and `pillars.cta` (נתחיל פרויקט) were already action-oriented and were left as they are.

**The WhatsApp mark is rendered by `WhatsAppCta` itself**, not by each caller — so every CTA that opens WhatsApp is visually identifiable as such, and no future surface can forget it. The icon is sized in `em`, so it scales with whatever `text-[…]` the caller sets. Pass `showIcon={false}` to opt out.

**Accessible labels stay per-surface.** Each of the eight callers keeps passing its own `ariaLabel` from its own namespace (`book_aria` / `cta_aria`). These are deliberately distinct and descriptive — they carry contextual keywords that matter for SEO/GEO and for assistive tech, and must not be collapsed into one shared string. `WhatsAppCta` does expose a shared `cta.whatsapp_aria` fallback, but it is only used when a caller passes no `ariaLabel`.

The seven aria strings were rewritten (not merged) so each one **starts with its own visible label** and then describes the WhatsApp action. This satisfies WCAG 2.5.3 (Label in Name) — previously violated, since the accessible name said "קביעת שיחה" while the visible label said "בואו נדבר" — while preserving the distinct, keyword-bearing phrasing:

| Key | HE | EN |
|---|---|---|
| `hero.book_aria` | בואו נדבר — שליחת הודעת וואטסאפ ל-Smiley Solution | Let's Talk — send a WhatsApp message to Smiley Solution |
| `services.cta_aria` | בואו נדבר — הודעת וואטסאפ על פיתוח Full Stack ו-SaaS | Let's Talk — WhatsApp us about Full Stack and SaaS development |
| `about.cta_aria` | בואו נעבוד יחד — שליחת הודעת וואטסאפ לקים קרול | Work With Me — send a WhatsApp message to Kim Kroll |
| `pillars.cta_aria` | נתחיל פרויקט — שליחת הודעת וואטסאפ ל-Smiley Solution | Start a Project — send a WhatsApp message to Smiley Solution |
| `faq.cta_aria` | בואו נדבר — שליחת שאלה בוואטסאפ ל-Smiley Solution | Let's Talk — send your question to Smiley Solution on WhatsApp |
| `contact.book_aria` | בואו נדבר — שליחת הודעת וואטסאפ ל-Smiley Solution | Let's Talk — send a WhatsApp message to Smiley Solution |
| `footer.book_aria` | בואו נדבר — שליחת הודעת וואטסאפ ל-Smiley Solution | Let's Talk — send a WhatsApp message to Smiley Solution |

**Deliberately left untouched** — these are not WhatsApp CTAs and share confusingly similar strings with the ones above:
- `projects.cta_aria` ("התחלת פרויקט עם Smiley Solution") — byte-identical to the old `pillars.cta_aria`
- `hero.cta_aria` ("לצפייה בעבודות") — the secondary "View Our Work" link
- `nav.book_aria` / `nav.book_cta` — orphaned, referenced by no component

> **Note on aria-label and SEO:** `aria-label` is not a Google ranking signal and is not indexed as content. Its value here is (a) accessibility and (b) GEO — LLM-based crawlers read the DOM to describe what a page offers, and the old "book a consultation" wording would have led them to describe the site as offering calendar booking, which it no longer does.

**Other changes:**
- `layout.tsx` — JSON-LD `contactPoint` now points at `wa.me` + `telephone` instead of the calendar link
- i18n — new `cta` namespace (`whatsapp_message`, `whatsapp_aria`) in `he.json` and `en.json`
- Privacy policy (both locales) — Google Calendar removed as an active channel; the first-party click counter is now disclosed in Sections 2, 4, 5 and 6
- `website-for-therapists` / `website-for-small-business` needed no change — their CTAs point at `#contact`, which now resolves to WhatsApp

**Click tracking — how it works:**
Storage is **Netlify Blobs**, store `cta-clicks`. Each click is written as its own record keyed `clicks/YYYY-MM/<iso-timestamp>-<random>`. Because every write has a unique key, concurrent clicks never race over a shared counter — the total is simply the record count. Stored fields are the timestamp and the button name only: no cookie, no IP, no device identifier.

**How to read the number:** see the ⭐ Quick Reference at the top of this document. The token lives in `.env.local` (git-ignored) and must match `CTA_STATS_TOKEN` in Netlify → Site settings → Environment variables. Without the env var set, `GET` returns `401` — the stats are never public.

✅ **Verified live in production on 2026-07-20** — the endpoint returned `{"total": 2, "byMonth": {"2026-07": 2}}` on the first read (those 2 are our own test clicks, i.e. the baseline).

**Security note:** `.gitignore` previously had a `# env files` heading with **no patterns underneath**, so any `.env` file would have been committed to this public repository. Fixed in the same change — `.env`, `.env.*` are now ignored (`.env.example` excepted). Verified that no env file exists anywhere in the git history.

**Caveat — local dev:** Netlify Blobs is only configured inside the Netlify runtime. Under plain `next dev`, `POST /api/track-cta` silently no-ops (returns `204` and stores nothing). Use `netlify dev` to exercise it locally. The CTA link itself works everywhere.

**What the number actually means:** the true conversion metric is the WhatsApp messages you actually receive. This counter measures *click intent* — including visitors who click but never send — so the gap between the two is your drop-off rate.

### Analytics decision — Microsoft Clarity deferred (2026-07-21)

**Decision: not adding Clarity (or any behavioural analytics) for now.** The integration was built, evaluated, and fully reverted — no trace remains in code or dependencies.

**Why (Kim's call):** Session recordings only pay off when watching *strangers*. On a low-traffic image/brand site, most sessions would be Kim's own, which teach nothing. The cost — setting cookies, rewriting the privacy policy away from its "no behavioural tracking" stance, and taking analytics on visitors — isn't justified by the current traffic. Revisit **when a campaign drives dozens–hundreds of real visitors**; then watching how strangers use the site becomes worthwhile.

**Consequence:** the privacy policy stays as-is (first-party click counter only, no cookies beyond `NEXT_LOCALE`, no third-party tracking). That statement remains true.

**To enable later (≈10 minutes):**
1. `npm i @microsoft/clarity`
2. Create `src/components/ClarityAnalytics.tsx` — a `'use client'` component that calls `Clarity.init('xtqpu0esdj')` inside `useEffect`. **Import is a default export:** `import Clarity from '@microsoft/clarity'` (not `{ clarity }`). Project ID `xtqpu0esdj` is not a secret — it ships in the client bundle regardless.
3. Mount `<ClarityAnalytics />` inside `NextIntlClientProvider` in `layout.tsx`.
4. **Update the privacy policy first** — Clarity sets cookies and records sessions, so Sections 2, 4, 5 and 6 (both locales) must disclose it and drop the "no behavioural tracking / no non-essential cookies" claims. Under EU/IL law, consider a consent banner (Clarity exposes `consentV2()` to gate loading until the visitor agrees).

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
| **WhatsApp message per locale** | ✅ Resolved in the WhatsApp CTA Migration (2026-07-20) — the pre-filled message lives in the shared `cta.whatsapp_message` key in both locales, read by `WhatsAppCta`. The earlier per-namespace `whatsapp_text` key no longer exists |
| **Per-surface WhatsApp message** | `WhatsAppCta` accepts an optional `message` prop that overrides the shared default. Not used yet — a tailored opener on `/website-for-therapists` ("...מעניין אותי אתר למטפלים") would likely convert better than the generic one |
| **CTA button copy** | ✅ Resolved 2026-07-20 — booking language replaced with "בואו נדבר" / "Let's Talk" across the four primary CTAs, plus a WhatsApp mark rendered by `WhatsAppCta`. See the migration section above |
| **Orphaned i18n keys** | `nav.book_cta` / `nav.book_aria` are not referenced by any component. The `book_aria` / `cta_aria` keys are also no longer read now that aria labels are unified. Safe to delete in a cleanup pass |
| **CV file locale** | Only one CV file (`/CV-KIM-KROLL-2025.pdf`) exists. A Hebrew-tailored CV could be added later |
| **Accessibility widget translation** | `AccessibilityMenu.tsx` text (labels, statement text) is still hardcoded in English. This was intentionally left out of Step 7 |
| **Projects section momentum** | Drag release currently stops immediately. Inertia/momentum could be added with a short `gsap.to` deceleration |
| **Global ScrollTrigger kill bug** | `ScrollTrigger.getAll().forEach(t => t.kill())` is in 4 components. Should be replaced with scoped `ctx.revert()` only |
