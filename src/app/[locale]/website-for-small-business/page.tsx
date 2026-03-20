import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FAQAccordion from '@/components/FAQAccordion';
import { locales } from '@/i18n/config';

const BASE_URL = 'https://smileysolution.com';
const PAGE_PATH = 'website-for-small-business';

const pageMeta = {
  en: {
    title: 'Building a Website for Small Businesses | Smiley Solution',
    description:
      'Professional websites for small businesses that build credibility, rank on Google, and turn visitors into leads. Fast, mobile-first, and built to convert.',
    keywords: [
      'website for small business',
      'small business web design',
      'business website developer',
      'build small business website',
      'professional business website',
      'local business website',
    ],
    ogLocale: 'en_US',
  },
  he: {
    title: 'בניית אתר לעסקים קטנים | Smiley Solution',
    description:
      'אתרים מקצועיים לעסקים קטנים שבונים אמינות, מדורגים בגוגל והופכים גולשים ללידים. מהיר, מותאם לנייד ובנוי להמרה.',
    keywords: [
      'אתר לעסק קטן',
      'בניית אתר לעסק',
      'אתר לעסקים קטנים',
      'עיצוב אתר לעסק',
      'אתר עסקי מקצועי',
      'בניית אתר עסקי',
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
      siteName: 'Smiley Solution',
      locale: t.ogLocale,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.description,
      creator: '@smileysolution',
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// ─── FAQ data ────────────────────────────────────────────────────────────────

const faqEn = [
  {
    q: 'How much does a website for a small business cost?',
    a: "A clean, professional multi-page site typically ranges from $1,000 to $4,000. E-commerce or booking-integrated projects start higher. We'll give you a clear, fixed quote after a short discovery call - no surprises.",
  },
  {
    q: 'Do I need a website if I already have Instagram?',
    a: "Yes. Social profiles are rented land - you don't own or control them. Algorithms change, accounts get restricted, and you have no SEO value there. A website is your owned digital asset that works for you around the clock.",
  },
  {
    q: 'How long until my site appears on Google?',
    a: "New sites typically appear in Google search results within 2–6 weeks after launch, provided the site is submitted correctly and follows SEO fundamentals. Ranking for competitive terms takes longer and builds over time.",
  },
  {
    q: 'Can I update the site myself after it is done?',
    a: 'Depending on the project scope, yes. We can integrate a CMS (content management system) so you can update text, images, blog posts, and products independently - without touching any code.',
  },
];

const faqHe = [
  {
    q: 'כמה עולה אתר לעסק קטן?',
    a: "אתר רב-עמודי נקי ומקצועי עולה בדרך כלל בין ₪3,500 ל-₪14,000. פרויקטים עם מסחר אלקטרוני או מערכת תורים מתחילים גבוה יותר. לאחר שיחת היכרות קצרה נציע הצעת מחיר קבועה וברורה - בלי הפתעות.",
  },
  {
    q: 'האם אני צריך אתר אם יש לי כבר אינסטגרם?',
    a: 'כן. פרופיל ברשתות חברתיות הוא "קרקע שכורה" - אתה לא שולט בו. אלגוריתמים משתנים, חשבונות נחסמים, ואין לך ערך SEO שם. אתר הוא הנכס הדיגיטלי שלך - שעובד בשבילך 24 שעות ביממה.',
  },
  {
    q: 'כמה זמן עד שהאתר יופיע בגוגל?',
    a: 'אתרים חדשים מופיעים בגוגל בדרך כלל תוך 2–6 שבועות לאחר ההשקה, בתנאי שהאתר הוגש נכון ועומד בעקרונות ה-SEO. דירוג למילות מפתח תחרותיות לוקח זמן ומתפתח עם הזמן.',
  },
  {
    q: 'האם אוכל לעדכן את האתר בעצמי לאחר ההשקה?',
    a: 'בהתאם לסקופ הפרויקט, כן. אנו יכולים לשלב CMS שיאפשר לך לעדכן טקסטים, תמונות, פוסטים ומוצרים באופן עצמאי - מבלי לגעת בקוד.',
  },
];

// ─── Page component ───────────────────────────────────────────────────────────

export default async function SmallBusinessPage({
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
          Smiley Solution | Tech Studio
        </p>
        <h1 className="text-[4rem] sm:text-[5rem] lg:text-[6rem] font-bold leading-[1.1] tracking-tight text-white mb-6">
          Building a Website<br />
          <span className="text-crimson">for Small Businesses</span>
        </h1>
        <p className="text-[1.8rem] text-gray-400 leading-relaxed max-w-[620px]">
          In 2026, a small business without a website is leaving money on the
          table. Your website is your hardest-working team member - available
          24/7, never calls in sick, and works across every market you serve.
        </p>
      </header>

      {/* Section 1 */}
      <SectionHeading>Why Every Small Business Needs a Website</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p className="leading-relaxed">
          It is no longer a question of whether a business needs a website - it
          is a question of whether their website is working for them. Over 80%
          of consumers research a business online before making a purchase or
          booking a service. Whether you run a consulting firm, a salon, a
          restaurant, or a boutique - your potential customers are searching
          Google before they call or walk in.
        </p>
        <p>A professional website gives your business:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-400 ps-4">
          <li>
            <strong className="text-white">Immediate credibility:</strong> A
            polished website signals that you are established and trustworthy.
          </li>
          <li>
            <strong className="text-white">Google discoverability:</strong>{' '}
            SEO-optimised pages that appear when locals search for what you
            offer.
          </li>
          <li>
            <strong className="text-white">24/7 lead capture:</strong> Contact
            forms and calls to action that work while you sleep.
          </li>
          <li>
            <strong className="text-white">Competitive advantage:</strong> Most
            small businesses still have weak digital presences - a strong site
            sets you apart.
          </li>
          <li>
            <strong className="text-white">Brand ownership:</strong> You control
            how your business is described and presented, not a review site.
          </li>
        </ul>
      </div>

      {/* Section 2 */}
      <SectionHeading>Common Mistakes on Small Business Websites</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p className="leading-relaxed">
          After building websites for businesses of all sizes, the same patterns
          repeat. These are the mistakes most likely to cost you clients.
        </p>
        <ul className="space-y-5">
          <li>
            <strong className="text-white">
              Homepage that does not answer &ldquo;what do you do?&rdquo; in under 5
              seconds.
            </strong>{' '}
            If a new visitor cannot immediately understand your offer, they
            leave. Clarity beats cleverness every time.
          </li>
          <li>
            <strong className="text-white">No local SEO.</strong> Many small
            businesses are invisible on Google Maps and in local search results
            because their site lacks location-specific keywords, structured
            data, and proper indexing.
          </li>
          <li>
            <strong className="text-white">Too many pages, not enough clarity.</strong>{' '}
            A sprawling website for a single-service business confuses visitors.
            Focused, well-written pages convert better.
          </li>
          <li>
            <strong className="text-white">Outdated design.</strong> A
            2015-era website in 2026 signals that your business is stagnant.
            Design signals health.
          </li>
          <li>
            <strong className="text-white">No clear call to action.</strong>{' '}
            Every page should guide the visitor toward one clear next step - a
            quote request, a booking, a phone call.
          </li>
          <li>
            <strong className="text-white">Not HTTPS.</strong> Browsers actively
            warn users away from insecure sites, and Google deprioritises them.
          </li>
        </ul>
      </div>

      {/* Section 3 */}
      <SectionHeading>What a Good Business Website Should Include</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p className="leading-relaxed">The anatomy of a high-converting small business website:</p>
        <ul className="space-y-3 list-disc list-inside ps-4 text-gray-400">
          <li>
            <strong className="text-white">Homepage with a clear headline:</strong>{' '}
            What you do, who you serve, and why you are the right choice - in
            one sentence.
          </li>
          <li>
            <strong className="text-white">Services page:</strong> Each service
            with its own description, benefits, and call to action.
          </li>
          <li>
            <strong className="text-white">About page:</strong> The human story
            behind the business - who you are, why you started, what you stand
            for.
          </li>
          <li>
            <strong className="text-white">Contact page:</strong> Phone, email,
            address, and a simple inquiry form.
          </li>
          <li>
            <strong className="text-white">Social proof:</strong> Testimonials,
            Google review count, or case study excerpts.
          </li>
          <li>
            <strong className="text-white">Speed:</strong> Under 2 seconds on
            mobile - every second of delay costs 7% of conversions.
          </li>
          <li>
            <strong className="text-white">Mobile-first:</strong> Tested on
            real devices, not just resized in a browser window.
          </li>
          <li>
            <strong className="text-white">SEO foundations:</strong> Structured
            headings, meta descriptions, image alt text, and local business
            schema.
          </li>
        </ul>
      </div>

      {/* Section 4 */}
      <SectionHeading>Example Projects</SectionHeading>
      <div className="space-y-6 text-[1.7rem] text-gray-300 leading-relaxed">
        <p className="leading-relaxed">
          Here are a few projects that show what this looks like in practice:
        </p>
        <div className="border-s-2 border-crimson ps-6 space-y-2">
          <p className="text-white font-semibold">Yup.io</p>
          <p>
            A SaaS platform redesign focused on modern UX and high-performance
            UI. We rebuilt the frontend with React and TailwindCSS, improving
            load times and overall user experience.
          </p>
        </div>
        <div className="border-s-2 border-crimson ps-6 space-y-2">
          <p className="text-white font-semibold">Better Together</p>
          <p>
            A full Hebrew RTL experience for a personal coach in Tel Aviv -
            complete with CMS integration so the business owner can update her
            own content without touching code.
          </p>
        </div>
        <div className="border-s-2 border-crimson ps-6 space-y-2">
          <p className="text-white font-semibold">Bullshit Map</p>
          <p>
            A full-stack interactive platform with geolocation, NFC tag
            integration, and a real-time global map. Built with Next.js, Node.js,
            and MongoDB.
          </p>
        </div>
        <p>Each project starts with understanding the business - not just the brief.</p>
        <Link
          href={`/${locale}#projects`}
          className="inline-block text-crimson hover:underline text-[1.6rem] font-medium"
        >
          View all projects →
        </Link>
      </div>

      {/* Section 5 - FAQ */}
      <SectionHeading>Frequently Asked Questions</SectionHeading>
      <FAQAccordion items={faq} />

      {/* Section 6 - CTA */}
      <SectionHeading>{"Let's Build Your Business Website"}</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>
          Whether you are starting from scratch or need to rebuild a website
          that is no longer working for you - let&rsquo;s talk.
        </p>
        <p>
          We build websites that load fast, rank on Google, and convert visitors
          into clients. Starting with a clear brief and ending with a site you
          are proud to share.
        </p>
      </div>
      <CtaBlock
        locale={locale}
        primaryLabel="Browse Our Work →"
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
          Smiley Solution | סטודיו לטכנולוגיה
        </p>
        <h1 className="text-[4rem] sm:text-[5rem] lg:text-[6rem] font-bold leading-[1.1] tracking-tight text-white mb-6">
          בניית אתר<br />
          <span className="text-crimson">לעסקים קטנים</span>
        </h1>
        <p className="text-[1.8rem] text-gray-400 leading-relaxed max-w-[620px]">
          ב-2026, עסק קטן בלי אתר הוא עסק שמשאיר כסף על הרצפה. האתר שלך הוא
          העובד הכי קשה שיש לך - זמין 24/7, לא לוקח חופשות, ועובד בשבילך
          בכל שוק שאתה משרת.
        </p>
      </header>

      {/* Section 1 */}
      <SectionHeading>למה כל עסק קטן צריך אתר</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p className="leading-relaxed">
          זו כבר לא שאלה של האם עסק צריך אתר - זו שאלה של האם האתר שלו עובד
          בשבילו. למעלה מ-80% מהצרכנים מחפשים מידע על עסק באינטרנט לפני
          שהם רוכשים שירות. בין אם אתה מנהל משרד ייעוץ, סלון, מסעדה או
          בוטיק - הלקוחות הפוטנציאליים שלך מחפשים בגוגל לפני שהם מתקשרים
          או מגיעים.
        </p>
        <p>אתר מקצועי נותן לעסק שלך:</p>
        <ul className="list-disc list-inside space-y-2 text-gray-400 pe-4">
          <li>
            <strong className="text-white">אמינות מיידית:</strong> אתר מלוטש
            מסמן שאתה מבוסס ואמין.
          </li>
          <li>
            <strong className="text-white">נוכחות בגוגל:</strong> עמודים
            מותאמי SEO שמופיעים כשמישהו מחפש את מה שאתה מציע.
          </li>
          <li>
            <strong className="text-white">לידים 24/7:</strong> טפסי יצירת קשר
            וקריאות לפעולה שעובדים גם כשאתה ישן.
          </li>
          <li>
            <strong className="text-white">יתרון תחרותי:</strong> לרוב העסקים
            הקטנים עדיין יש נוכחות דיגיטלית חלשה - אתר חזק יוצר פער.
          </li>
          <li>
            <strong className="text-white">בעלות על המותג:</strong> אתה שולט
            איך העסק שלך מוצג, לא אתר ביקורות.
          </li>
        </ul>
      </div>

      {/* Section 2 */}
      <SectionHeading>טעויות נפוצות באתרים של עסקים קטנים</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p className="leading-relaxed">
          לאחר שבנינו אתרים לעסקים בכל הגדלים, אותן דפוסים חוזרים על עצמם.
          אלו הטעויות שהכי עולות לכם לקוחות.
        </p>
        <ul className="space-y-5">
          <li>
            <strong className="text-white">
              דף בית שלא עונה על &quot;מה אתה עושה?&quot; תוך 5 שניות.
            </strong>{' '}
            אם מבקר חדש לא מבין מיד מה אתה מציע - הוא עוזב. בהירות עדיפה
            על יצירתיות בכל פעם.
          </li>
          <li>
            <strong className="text-white">אין SEO מקומי.</strong> עסקים רבים
            בלתי נראים בגוגל מפס ובחיפושים מקומיים כי האתר חסר מילות מפתח
            גיאוגרפיות, מידע מובנה ואינדוקס נכון.
          </li>
          <li>
            <strong className="text-white">יותר מדי עמודים, לא מספיק בהירות.</strong>{' '}
            אתר מסועף לעסק עם שירות אחד מבלבל מבקרים. עמודים ממוקדים
            ממירים טוב יותר.
          </li>
          <li>
            <strong className="text-white">עיצוב מיושן.</strong> אתר שנראה
            כמו 2015 ב-2026 מסמן שהעסק תקוע. עיצוב הוא אות לבריאות.
          </li>
          <li>
            <strong className="text-white">אין קריאה ברורה לפעולה.</strong>{' '}
            כל עמוד צריך להוביל את המבקר לצעד ברור אחד - בקשת הצעת מחיר,
            הזמנה, שיחת טלפון.
          </li>
          <li>
            <strong className="text-white">אין HTTPS.</strong> דפדפנים
            מאזהירים פעילית משתמשים מאתרים לא מאובטחים, וגוגל מדרג אותם
            נמוך יותר.
          </li>
        </ul>
      </div>

      {/* Section 3 */}
      <SectionHeading>מה אתר עסקי טוב צריך לכלול</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p className="leading-relaxed">המרכיבים של אתר עסקי שממיר:</p>
        <ul className="space-y-3 list-disc list-inside pe-4 text-gray-400">
          <li>
            <strong className="text-white">דף בית עם כותרת ברורה:</strong> מה
            אתה עושה, למי אתה עוזר, ולמה בחרו בך - במשפט אחד.
          </li>
          <li>
            <strong className="text-white">עמוד שירותים:</strong> כל שירות עם
            תיאור, יתרונות וקריאה לפעולה.
          </li>
          <li>
            <strong className="text-white">אודות:</strong> הסיפור האנושי מאחורי
            העסק - מי אתה, למה התחלת, מה אתה מייצג.
          </li>
          <li>
            <strong className="text-white">צור קשר:</strong> טלפון, מייל, כתובת
            וטופס פנייה פשוט.
          </li>
          <li>
            <strong className="text-white">הוכחה חברתית:</strong> המלצות, מספר
            ביקורות גוגל, או קטעי Case Study.
          </li>
          <li>
            <strong className="text-white">מהירות:</strong> מתחת ל-2 שניות
            בנייד - כל שנייה של עיכוב עולה 7% בהמרות.
          </li>
          <li>
            <strong className="text-white">Mobile-First:</strong> נבדק על
            מכשירים אמיתיים, לא רק בגודל מוקטן בדפדפן.
          </li>
          <li>
            <strong className="text-white">יסודות SEO:</strong> כותרות מובנות,
            תיאורי מטא, טקסטים חלופיים לתמונות ו-Schema לעסק מקומי.
          </li>
        </ul>
      </div>

      {/* Section 4 */}
      <SectionHeading>דוגמאות לפרויקטים</SectionHeading>
      <div className="space-y-6 text-[1.7rem] text-gray-300 leading-relaxed">
        <p className="leading-relaxed">הנה כמה פרויקטים שמראים איך זה נראה בפועל:</p>
        <div className="border-s-2 border-crimson ps-6 space-y-2">
          <p className="text-white font-semibold">Yup.io</p>
          <p>
            עיצוב מחדש של פלטפורמת SaaS עם דגש על UX מודרני וביצועים גבוהים.
            בנינו מחדש את הצד הלקוח עם React ו-TailwindCSS, ושיפרנו זמני
            טעינה וחוויית משתמש.
          </p>
        </div>
        <div className="border-s-2 border-crimson ps-6 space-y-2">
          <p className="text-white font-semibold">Better Together</p>
          <p>
            חוויה עברית מלאה ב-RTL עבור מאמנת אישית בתל אביב - כולל שילוב
            CMS שמאפשר לבעלת העסק לעדכן תכנים בעצמה מבלי לגעת בקוד.
          </p>
        </div>
        <div className="border-s-2 border-crimson ps-6 space-y-2">
          <p className="text-white font-semibold">Bullshit Map</p>
          <p>
            פלטפורמה אינטראקטיבית Full Stack עם גיאולוקיישן, תגי NFC ומפה
            עולמית בזמן אמת. נבנה עם Next.js, Node.js ו-MongoDB.
          </p>
        </div>
        <p>כל פרויקט מתחיל מהבנת העסק - לא רק הבריף.</p>
        <Link
          href={`/${locale}#projects`}
          className="inline-block text-crimson hover:underline text-[1.6rem] font-medium"
        >
          לצפייה בכל הפרויקטים ←
        </Link>
      </div>

      {/* Section 5 - FAQ */}
      <SectionHeading>שאלות נפוצות</SectionHeading>
      <FAQAccordion items={faq} />

      {/* Section 6 - CTA */}
      <SectionHeading>בואו נבנה את האתר העסקי שלכם</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>
          בין אם אתה מתחיל מאפס או צריך לבנות מחדש אתר שכבר לא עובד בשבילך
          - בואו נדבר.
        </p>
        <p>
          אנו בונים אתרים שנטענים מהר, מדורגים בגוגל, והופכים גולשים ללקוחות.
          מתחיל מבריף ברור ומסיים באתר שאתה גאה לשתף.
        </p>
      </div>
      <CtaBlock
        locale={locale}
        primaryLabel="לצפייה בעבודות שלנו ←"
        secondaryLabel="ליצירת קשר"
      />
    </article>
  );
}
