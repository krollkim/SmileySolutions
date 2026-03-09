import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQAccordion from '@/components/FAQAccordion';
import { locales } from '@/i18n/config';

const BASE_URL = 'https://smileysolution.com';
const PAGE_PATH = 'website-for-therapists';

const pageMeta = {
  en: {
    title: 'Building a Website for Therapists | Kim Kroll',
    description:
      'Professional websites for therapists, psychologists and couples therapists that build trust and attract new patients. Clean, fast, and SEO-ready.',
    keywords: [
      'therapist website',
      'website for therapist',
      'psychology website',
      'website for psychologist',
      'couples therapist website',
      'mental health website',
      'build therapist website',
    ],
    ogLocale: 'en_US',
  },
  he: {
    title: 'בניית אתר למטפלים | קים קרול',
    description:
      'אתרים מקצועיים למטפלים, פסיכולוגים ומטפלים זוגיים שבונים אמון ומביאים מטופלים חדשים. מהיר, מותאם לנייד ומדורג בגוגל.',
    keywords: [
      'אתר למטפל',
      'בניית אתר למטפלים',
      'אתר לפסיכולוג',
      'אתר למטפל זוגי',
      'אתר לטיפול נפשי',
      'עיצוב אתר למטפל',
    ],
    ogLocale: 'he_IL',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = pageMeta[locale as keyof typeof pageMeta] ?? pageMeta.en;

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${locale}/${PAGE_PATH}`,
      languages: {
        he: `${BASE_URL}/he/${PAGE_PATH}`,
        en: `${BASE_URL}/en/${PAGE_PATH}`,
        'x-default': `${BASE_URL}/he/${PAGE_PATH}`,
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: `${BASE_URL}/${locale}/${PAGE_PATH}`,
      siteName: 'SmileySolutions',
      locale: t.ogLocale,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.description,
      creator: '@krollkim',
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// ─── FAQ data ────────────────────────────────────────────────────────────────

const faqEn = [
  {
    q: 'How much does a website for a therapist cost?',
    a: "Projects typically range from $800 to $2,500 depending on the number of pages, features, and whether you need CMS integration so you can update content yourself. I'll provide a clear quote after a short discovery call.",
  },
  {
    q: 'How long does it take to build a therapist website?',
    a: 'A standard therapist site takes 2 to 4 weeks from brief to launch - including design, development, and a round of revisions. Sites with booking systems or blogs may take slightly longer.',
  },
  {
    q: 'Can a website help me bring in new patients?',
    a: 'Absolutely. A well-structured, SEO-optimized site consistently appears in local and topic-specific Google searches. Combined with clear calls to action, it converts curious visitors into booked appointments.',
  },
  {
    q: 'Will my website be mobile-friendly and accessible?',
    a: "Every site I build is designed mobile-first, tested across devices, and built to WCAG accessibility standards. Most therapy clients search on their phones - this is non-negotiable.",
  },
];

const faqHe = [
  {
    q: 'כמה עולה אתר למטפל?',
    a: "פרויקטים נעים בדרך כלל בין ₪3,000 ל-₪9,000, בהתאם למספר העמודים, הפיצ'רים ולצורך ב-CMS לעדכוני תוכן עצמאיים. לאחר שיחת היכרות קצרה אציע הצעת מחיר מדויקת.",
  },
  {
    q: 'כמה זמן לוקח לבנות אתר למטפל?',
    a: 'אתר תקני למטפל לוקח בין שבועיים לארבעה שבועות מהבריף ועד ההשקה - כולל עיצוב, פיתוח וסבב תיקונים. אתרים עם מערכת תורים או בלוג עשויים לקחת מעט יותר.',
  },
  {
    q: 'האם אתר יכול להביא לי מטופלים חדשים?',
    a: 'בהחלט. אתר מובנה ומותאם לקידום אורגני מופיע בחיפושים בגוגל של אנשים שמחפשים טיפול באזורכם. עם קריאה ברורה לפעולה, גולשים הופכים לפגישות.',
  },
  {
    q: 'האם האתר יהיה מותאם לנייד ונגיש?',
    a: 'כל אתר שאני בונה מעוצב ב-Mobile First, נבדק על מגוון מכשירים ועומד בתקני נגישות WCAG. רוב האנשים שמחפשים מטפל עושים זאת מהטלפון - זה לא אופציונלי.',
  },
];

// ─── Page component ───────────────────────────────────────────────────────────

export default async function TherapistsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isHe = locale === 'he';
  const dir = isHe ? 'rtl' : 'ltr';
  const faq = isHe ? faqHe : faqEn;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main dir={dir} className="min-h-dvh bg-[#0a0a0a] text-white">
        {isHe ? (
          <HeContent locale={locale} faq={faqHe} />
        ) : (
          <EnContent locale={locale} faq={faqEn} />
        )}
      </main>
      <Footer />
    </>
  );
}

// ─── Shared UI primitives ─────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[2.4rem] sm:text-[3rem] font-bold tracking-tight text-white mb-8 mt-20 border-b border-gray-800 pb-4">
      {children}
    </h2>
  );
}

function CtaBlock({
  locale,
  primaryLabel,
  secondaryLabel,
}: {
  locale: string;
  primaryLabel: string;
  secondaryLabel: string;
}) {
  return (
    <div className="flex flex-wrap gap-4 mt-8">
      <Link
        href={`/${locale}#projects`}
        className="inline-flex items-center gap-3 px-8 py-4 text-[1.5rem] font-medium uppercase tracking-[0.2rem] text-white border-2 border-crimson hover:bg-crimson transition-colors duration-300"
      >
        {primaryLabel}
      </Link>
      <Link
        href={`/${locale}#contact`}
        className="inline-flex items-center gap-3 px-8 py-4 text-[1.5rem] font-medium uppercase tracking-[0.2rem] text-gray-300 border-2 border-gray-700 hover:border-white hover:text-white transition-colors duration-300"
      >
        {secondaryLabel}
      </Link>
    </div>
  );
}

// ─── English content ──────────────────────────────────────────────────────────

function EnContent({
  locale,
  faq,
}: {
  locale: string;
  faq: { q: string; a: string }[];
}) {
  return (
    <article className="container mx-auto px-6 lg:px-12 pt-32 lg:pt-44 pb-20 max-w-[860px]">
      {/* Hero heading */}
      <header className="mb-20">
        <p className="text-crimson text-[1.3rem] uppercase tracking-[0.3rem] font-medium mb-4">
          SmileySolutions · Kim Kroll
        </p>
        <h1 className="text-[4rem] sm:text-[5rem] lg:text-[6rem] font-bold leading-[1.1] tracking-tight text-white mb-6">
          Building a Website<br />
          <span className="text-crimson">for Therapists</span>
        </h1>
        <p className="text-[1.8rem] text-gray-400 leading-relaxed max-w-[620px]">
          When someone needs support, their first step is a Google search. A
          professional website ensures that when that moment comes, they find
          you - not a directory listing, not a competitor, but your practice,
          your face, your story.
        </p>
      </header>

      {/* Section 1 */}
      <SectionHeading>Why Therapists Need a Professional Website</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p className="leading-relaxed">
          The therapy industry has moved online. Potential clients - whether
          searching for anxiety treatment, relationship counselling, or trauma
          therapy - research therapists the same way they research any
          professional service. They read your bio, check your specialisations,
          and decide whether they trust you before they ever pick up the phone.
        </p>
        <p>A professional website gives you:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-400 ps-4">
          <li>
            <strong className="text-white">Credibility</strong> that a Google
            Business profile or directory listing alone cannot provide.
          </li>
          <li>
            <strong className="text-white">A controlled narrative</strong> - you
            decide how your practice is presented, not a third-party platform.
          </li>
          <li>
            <strong className="text-white">24/7 availability</strong> for
            prospective clients who search at 2 am during a difficult moment.
          </li>
          <li>
            <strong className="text-white">SEO visibility</strong> in local
            searches like &ldquo;therapist in Tel Aviv&rdquo; or &ldquo;couples therapist near me&rdquo;.
          </li>
        </ul>
        <p>
          Without a dedicated website, you are invisible to a significant
          portion of your potential client base.
        </p>
      </div>

      {/* Section 2 */}
      <SectionHeading>Common Mistakes on Therapist Websites</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p className="leading-relaxed">
          Most therapist websites share the same handful of problems. Knowing
          what to avoid is half the battle.
        </p>
        <ul className="space-y-5">
          <li>
            <strong className="text-white">Generic stock photos.</strong> A
            website full of strangers shaking hands undermines trust immediately.
            Clients want to see who they are trusting with their emotional
            wellbeing.
          </li>
          <li>
            <strong className="text-white">Unclear specialisations.</strong> If
            your homepage says &ldquo;I help people feel better,&rdquo; you are speaking to
            no one. Specificity - &ldquo;I specialise in trauma-focused CBT for adults
            navigating life transitions&rdquo; - speaks directly to the right client.
          </li>
          <li>
            <strong className="text-white">No mobile optimisation.</strong> Over
            60% of therapy-related searches happen on mobile devices. A desktop-
            only site is effectively inaccessible to most searchers.
          </li>
          <li>
            <strong className="text-white">No clear next step.</strong> If a
            visitor cannot easily find how to book or contact you within a few
            seconds, they will leave. Every page needs a visible call to action.
          </li>
          <li>
            <strong className="text-white">Slow loading speed.</strong> Heavy,
            unoptimised sites are penalised by Google and abandoned by users.
            Performance is not optional.
          </li>
        </ul>
      </div>

      {/* Section 3 */}
      <SectionHeading>What a Good Therapist Website Should Include</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p className="leading-relaxed">
          A well-designed therapist site does not need to be complicated. It
          needs to be clear, trustworthy, and easy to navigate.
        </p>
        <p className="text-white font-medium">Core pages and elements:</p>
        <ul className="space-y-3 list-disc list-inside ps-4 text-gray-400">
          <li>
            <strong className="text-white">Homepage:</strong> Who you are, who
            you help, and what makes you different - visible without scrolling.
          </li>
          <li>
            <strong className="text-white">About page:</strong> Your
            credentials, training, therapeutic approach, and something personal
            that builds human connection.
          </li>
          <li>
            <strong className="text-white">Services:</strong> A clear breakdown
            of modalities (CBT, DBT, EMDR, couples therapy, etc.) with honest
            descriptions.
          </li>
          <li>
            <strong className="text-white">Contact or booking:</strong> A
            simple, privacy-conscious form or a direct link to your booking
            system.
          </li>
          <li>
            <strong className="text-white">Mobile-first design:</strong> Tested
            on real devices, not just resized in a browser.
          </li>
          <li>
            <strong className="text-white">Accessibility:</strong> WCAG-
            compliant design so clients with disabilities can access your
            services.
          </li>
          <li>
            <strong className="text-white">Fast load times:</strong> Under 3
            seconds on mobile. Google and your clients both require it.
          </li>
        </ul>
      </div>

      {/* Section 4 */}
      <SectionHeading>Example Project - Better Together</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p className="leading-relaxed">
          One of the projects I am proudest of is a website built for Ofir, a
          personal coach for women based in Tel Aviv who runs emotional healing
          workshops and movement events.
        </p>
        <p className="leading-relaxed">
          The project required a fully Hebrew, RTL-first experience with a
          strong visual identity matching her warm, personal brand. I built the
          site using React, Vite, TailwindCSS, and Framer Motion, with a custom
          WCAG 2.1 AA accessibility widget and a Decap CMS integration - meaning
          Ofir can update her own content, photos, and event listings without
          touching a single line of code.
        </p>
        <p className="leading-relaxed">
          The result: a site that feels like the person behind it, not a generic
          therapy template.
        </p>
        <Link
          href={`/${locale}#projects`}
          className="inline-block mt-2 text-crimson hover:underline text-[1.6rem] font-medium"
        >
          View the project in my portfolio →
        </Link>
      </div>

      {/* Section 5 — FAQ */}
      <SectionHeading>Frequently Asked Questions</SectionHeading>
      <FAQAccordion items={faq} />

      {/* Section 6 - CTA */}
      <SectionHeading>{"Let's Build Your Website"}</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>
          If you are a therapist, psychologist, or coach who needs a website
          that actually reflects the quality of your work - let&rsquo;s talk.
        </p>
        <p>
          I build websites that look professional, load fast, rank well on
          Google, and most importantly, feel right to the people who matter
          most: your clients.
        </p>
      </div>
      <CtaBlock
        locale={locale}
        primaryLabel="Browse My Projects →"
        secondaryLabel="Get in Touch"
      />
    </article>
  );
}

// ─── Hebrew content ───────────────────────────────────────────────────────────

function HeContent({
  locale,
  faq,
}: {
  locale: string;
  faq: { q: string; a: string }[];
}) {
  return (
    <article className="container mx-auto px-6 lg:px-12 pt-32 lg:pt-44 pb-20 max-w-[860px]">
      {/* Hero heading */}
      <header className="mb-20">
        <p className="text-crimson text-[1.3rem] uppercase tracking-[0.3rem] font-medium mb-4">
          SmileySolutions · קים קרול
        </p>
        <h1 className="text-[4rem] sm:text-[5rem] lg:text-[6rem] font-bold leading-[1.1] tracking-tight text-white mb-6">
          בניית אתר<br />
          <span className="text-crimson">למטפלים</span>
        </h1>
        <p className="text-[1.8rem] text-gray-400 leading-relaxed max-w-[620px]">
          כשמישהו מחפש עזרה, הצעד הראשון שלו הוא חיפוש בגוגל. אתר מקצועי
          מבטיח שכשאותו רגע מגיע, הם ימצאו אותך - לא אתר ספרייה, לא מתחרה,
          אלא את המרפאה שלך, הפנים שלך, הסיפור שלך.
        </p>
      </header>

      {/* Section 1 */}
      <SectionHeading>למה מטפלים צריכים אתר מקצועי</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p className="leading-relaxed">
          עולם הטיפול עבר לאונליין. מטופלים פוטנציאליים - בין אם הם מחפשים
          טיפול בחרדה, ייעוץ זוגי או עיבוד טראומה - חוקרים מטפלים בדיוק כמו
          כל שירות מקצועי אחר. הם קוראים את הביוגרפיה שלך, בודקים את
          ההתמחויות שלך, ומחליטים אם הם סומכים עליך - עוד לפני שהם מרימים
          טלפון.
        </p>
        <p>אתר מקצועי נותן לך:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-400 pe-4">
          <li>
            <strong className="text-white">אמינות</strong> שפרופיל גוגל ביזנס
            לבדו לא יכול לספק.
          </li>
          <li>
            <strong className="text-white">שליטה על הנרטיב</strong> - אתה
            מחליט איך המרפאה שלך מוצגת, לא פלטפורמה חיצונית.
          </li>
          <li>
            <strong className="text-white">זמינות 24/7</strong> למטופלים
            פוטנציאליים שמחפשים ב-2 בלילה ברגע קשה.
          </li>
          <li>
            <strong className="text-white">נוכחות בגוגל</strong> בחיפושים
            מקומיים כמו &ldquo;פסיכולוג בתל אביב&rdquo; או &ldquo;מטפל זוגי בירושלים&rdquo;.
          </li>
        </ul>
        <p>בלי אתר, אתה בלתי נראה לחלק משמעותי מהמטופלים הפוטנציאליים שלך.</p>
      </div>

      {/* Section 2 */}
      <SectionHeading>טעויות נפוצות באתרי מטפלים</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p className="leading-relaxed">רוב אתרי המטפלים חולקים אותן בעיות. לדעת מה להימנע ממנו - זה חצי הקרב.</p>
        <ul className="space-y-5">
          <li>
            <strong className="text-white">תמונות סטוק גנריות.</strong> אתר עם
            תמונות של זרים פוגע מיד באמון. מטופלים רוצים לראות למי הם מאמינים
            עם הרגשות שלהם.
          </li>
          <li>
            <strong className="text-white">התמחות לא ברורה.</strong> אם הדף
            הראשי שלך אומר &ldquo;אני עוזר לאנשים להרגיש טוב יותר&rdquo; - אתה לא מדבר
            לאיש. ספציפיות - &ldquo;מתמחה בטיפול ממוקד-טראומה לבוגרים בתהליכי שינוי&rdquo;
            - מדבר ישירות לאדם הנכון.
          </li>
          <li>
            <strong className="text-white">אין התאמה לנייד.</strong> למעלה
            מ-60% מהחיפושים בתחום הטיפול מתבצעים ממכשירים ניידים. אתר שעובד
            רק על מחשב - הוא אתר שרוב המחפשים לא מגיעים אליו.
          </li>
          <li>
            <strong className="text-white">אין קריאה ברורה לפעולה.</strong> אם
            מבקר לא מוצא בקלות איך ליצור קשר תוך כמה שניות - הוא עוזב. כל
            עמוד צריך כפתור ברור.
          </li>
          <li>
            <strong className="text-white">מהירות טעינה איטית.</strong> אתרים
            כבדים נענשים על ידי גוגל ונזנחים על ידי משתמשים. ביצועים הם לא
            אופציונליים.
          </li>
        </ul>
      </div>

      {/* Section 3 */}
      <SectionHeading>מה אתר טוב למטפל צריך לכלול</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p className="leading-relaxed">
          אתר טיפול טוב לא צריך להיות מסובך. הוא צריך להיות ברור, אמין וקל
          לניווט.
        </p>
        <p className="text-white font-medium">דפים ואלמנטים מרכזיים:</p>
        <ul className="space-y-3 list-disc list-inside pe-4 text-gray-400">
          <li>
            <strong className="text-white">דף בית:</strong> מי אתה, למי אתה
            עוזר, ומה מייחד אותך - גלוי בלי גלילה.
          </li>
          <li>
            <strong className="text-white">אודות:</strong> ההסמכות שלך, הגישה
            הטיפולית, ומשהו אנושי שבונה חיבור.
          </li>
          <li>
            <strong className="text-white">שירותים:</strong> תיאור ברור של
            שיטות הטיפול (CBT, DBT, EMDR, טיפול זוגי וכו&rsquo;) עם הסברים כנים.
          </li>
          <li>
            <strong className="text-white">יצירת קשר / קביעת תור:</strong> טופס
            פשוט ופרטי, או קישור ישיר למערכת תורים.
          </li>
          <li>
            <strong className="text-white">עיצוב Mobile-First:</strong> נבדק על
            מכשירים אמיתיים, לא רק בגודל מוקטן בדפדפן.
          </li>
          <li>
            <strong className="text-white">נגישות:</strong> עיצוב תואם WCAG
            שמאפשר גישה למטופלים עם מוגבלויות.
          </li>
          <li>
            <strong className="text-white">מהירות טעינה:</strong> מתחת ל-3
            שניות בנייד - גוגל והמטופלים שלך דורשים את זה.
          </li>
        </ul>
      </div>

      {/* Section 4 */}
      <SectionHeading>דוגמה לפרויקט - Better Together</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p className="leading-relaxed">
          אחד הפרויקטים שאני הכי גאה בהם הוא אתר שבניתי עבור אופיר - מנחת
          תהליכים לנשים מתל אביב, שמקיימת סדנאות ריפוי רגשי ואירועי תנועה.
        </p>
        <p className="leading-relaxed">
          הפרויקט דרש חוויה עברית מלאה ב-RTL, עם זהות ויזואלית חזקה שמתאימה
          למותג האישי החמים שלה. בניתי את האתר עם React, Vite, TailwindCSS
          ו-Framer Motion, כולל ווידג&apos;ט נגישות מותאם WCAG 2.1 AA ושילוב
          Decap CMS - כך שאופיר יכולה לעדכן תכנים, תמונות ואירועים בעצמה מבלי
          לגעת בקוד.
        </p>
        <p className="leading-relaxed">
          התוצאה: אתר שמרגיש כמו האדם שמאחוריו - לא תבנית גנרית.
        </p>
        <Link
          href={`/${locale}#projects`}
          className="inline-block mt-2 text-crimson hover:underline text-[1.6rem] font-medium"
        >
          לצפייה בפרויקט בתיק העבודות ←
        </Link>
      </div>

      {/* Section 5 — FAQ */}
      <SectionHeading>שאלות נפוצות</SectionHeading>
      <FAQAccordion items={faq} />

      {/* Section 6 - CTA */}
      <SectionHeading>בואו נבנה את האתר שלכם</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>
          אם אתה מטפל, פסיכולוג או מאמן שצריך אתר שמשקף באמת את איכות
          העבודה שלך - בואו נדבר.
        </p>
        <p>
          אני בונה אתרים שנראים מקצועיים, נטענים מהר, מדורגים טוב בגוגל,
          ובעיקר - מרגישים נכון לאנשים שחשובים: המטופלים שלך.
        </p>
      </div>
      <CtaBlock
        locale={locale}
        primaryLabel="לצפייה בפרויקטים ←"
        secondaryLabel="ליצירת קשר"
      />
    </article>
  );
}
