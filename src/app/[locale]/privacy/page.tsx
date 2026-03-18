import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { locales } from '@/i18n/config';

const BASE_URL = 'https://smileysolution.com';
const PAGE_PATH = 'privacy';

const pageMeta = {
  en: {
    title: 'Privacy Policy | Smiley Solution',
    description:
      'Privacy policy for Smiley Solution - a tech studio specializing in SaaS products, premium websites, and digital automations.',
    ogLocale: 'en_US',
  },
  he: {
    title: 'מדיניות פרטיות | Smiley Solution',
    description:
      'מדיניות הפרטיות של Smiley Solution - סטודיו לטכנולוגיה המתמחה בפיתוח מוצרי SaaS, אתרים פרימיום ואוטומציות דיגיטליות.',
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
    metadataBase: new URL(BASE_URL),
    robots: { index: false, follow: false },
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
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// ─── Page component ───────────────────────────────────────────────────────────

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isHe = locale === 'he';
  const dir = isHe ? 'rtl' : 'ltr';

  return (
    <>
      <Header />
      <main dir={dir} className="min-h-dvh bg-[#0a0a0a] text-white">
        {isHe ? <HeContent /> : <EnContent />}
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

// ─── English content ──────────────────────────────────────────────────────────

function EnContent() {
  return (
    <article className="container mx-auto px-6 lg:px-12 pt-32 lg:pt-44 pb-20 max-w-[860px]">
      {/* Header */}
      <header className="mb-20">
        <p className="text-crimson text-[1.3rem] uppercase tracking-[0.3rem] font-medium mb-4">
          Smiley Solution | Tech Studio
        </p>
        <h1 className="text-[4rem] sm:text-[5rem] lg:text-[6rem] font-bold leading-[1.1] tracking-tight text-white mb-6">
          Privacy<br />
          <span className="text-crimson">Policy</span>
        </h1>
        <p className="text-[1.7rem] text-gray-400 leading-relaxed max-w-[620px]">
          Last updated: March 2025. This policy describes how Smiley Solution
          collects, uses, and protects your personal information when you visit
          our website or contact us about our services.
        </p>
      </header>

      {/* Section 1 */}
      <SectionHeading>1. Who We Are</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>
          Smiley Solution is a technology studio specializing in the development
          of SaaS products, premium websites, and digital automations. We work
          with startups, small businesses, and professionals who want to build
          meaningful digital products.
        </p>
        <p>
          Our website is located at{' '}
          <span className="text-white font-medium">smileysolution.com</span> and
          our primary contact email is{' '}
          <span className="text-white font-medium">krollkimdev@gmail.com</span>.
        </p>
      </div>

      {/* Section 2 */}
      <SectionHeading>2. Information We Collect</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>We collect only the information necessary to respond to inquiries and improve our website:</p>
        <ul className="list-disc list-inside space-y-3 text-gray-400 ps-4">
          <li>
            <strong className="text-white">Contact information</strong> - name,
            email address, and phone number submitted through our contact or
            lead forms.
          </li>
          <li>
            <strong className="text-white">Message content</strong> - the
            details you share when reaching out about a project or service
            inquiry.
          </li>
          <li>
            <strong className="text-white">Technical data</strong> - anonymised
            usage data such as pages visited, browser type, and device
            information collected via cookies (see Section 4).
          </li>
        </ul>
        <p>We do not collect payment information directly. Any payment processing is handled by third-party providers.</p>
      </div>

      {/* Section 3 */}
      <SectionHeading>3. How We Use Your Information</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>Information you provide is used solely for the following purposes:</p>
        <ul className="list-disc list-inside space-y-3 text-gray-400 ps-4">
          <li>Responding to your inquiries and project requests.</li>
          <li>Scheduling discovery calls or meetings.</li>
          <li>Sending relevant follow-up communications (never unsolicited marketing).</li>
          <li>Improving the performance and content of our website.</li>
        </ul>
        <p>
          We do not sell, rent, or share your personal data with third parties
          for marketing purposes.
        </p>
      </div>

      {/* Section 4 */}
      <SectionHeading>4. Cookies and Tracking Technologies</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>
          Our website uses cookies and similar technologies to understand how
          visitors interact with the site and to improve the user experience.
        </p>
        <ul className="list-disc list-inside space-y-3 text-gray-400 ps-4">
          <li>
            <strong className="text-white">Essential cookies</strong> - required
            for basic site functionality.
          </li>
          <li>
            <strong className="text-white">Analytics cookies</strong> -
            anonymised data used to understand traffic patterns and popular
            content (e.g. Google Analytics).
          </li>
        </ul>
        <p>
          You can disable cookies through your browser settings at any time.
          Note that disabling cookies may affect certain features of the site.
        </p>
      </div>

      {/* Section 5 */}
      <SectionHeading>5. Data Storage and Security</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>
          The Smiley Solution website is hosted on{' '}
          <strong className="text-white">Vercel</strong>, a secure cloud
          infrastructure platform. Data submitted through contact forms may be
          stored and processed using{' '}
          <strong className="text-white">Firebase</strong> or{' '}
          <strong className="text-white">MongoDB</strong> depending on the
          specific integration in use.
        </p>
        <p>
          We take reasonable measures to protect your data from unauthorised
          access, including encrypted connections (HTTPS), access control, and
          secure data handling practices.
        </p>
        <p>
          No method of transmission over the internet is 100% secure. While we
          strive to use commercially acceptable means to protect your
          information, we cannot guarantee absolute security.
        </p>
      </div>

      {/* Section 6 */}
      <SectionHeading>6. Third-Party Services</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>
          We may use third-party tools to operate our website and business,
          including:
        </p>
        <ul className="list-disc list-inside space-y-3 text-gray-400 ps-4">
          <li>
            <strong className="text-white">Google Analytics</strong> - for
            anonymised website usage statistics.
          </li>
          <li>
            <strong className="text-white">Calendly / Google Calendar</strong>{' '}
            - for scheduling discovery calls.
          </li>
          <li>
            <strong className="text-white">WhatsApp Business</strong> - for
            direct client communication.
          </li>
        </ul>
        <p>
          Each of these services operates under its own privacy policy. We
          encourage you to review them if you have concerns about how your data
          is handled by those platforms.
        </p>
      </div>

      {/* Section 7 */}
      <SectionHeading>7. Contact Us</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>
          If you have any questions about this privacy policy, wish to access
          the information we hold about you, or would like to request its
          deletion, please contact us:
        </p>
        <p>
          <strong className="text-white">Email:</strong>{' '}
          <a
            href="mailto:krollkimdev@gmail.com"
            className="text-crimson hover:underline"
          >
            krollkimdev@gmail.com
          </a>
        </p>
        <p className="text-gray-500 text-[1.5rem]">
          We will respond to all requests within 7 business days.
        </p>
      </div>
    </article>
  );
}

// ─── Hebrew content ───────────────────────────────────────────────────────────

function HeContent() {
  return (
    <article className="container mx-auto px-6 lg:px-12 pt-32 lg:pt-44 pb-20 max-w-[860px]">
      {/* Header */}
      <header className="mb-20">
        <p className="text-crimson text-[1.3rem] uppercase tracking-[0.3rem] font-medium mb-4">
          Smiley Solution | סטודיו לטכנולוגיה
        </p>
        <h1 className="text-[4rem] sm:text-[5rem] lg:text-[6rem] font-bold leading-[1.1] tracking-tight text-white mb-6">
          מדיניות<br />
          <span className="text-crimson">פרטיות</span>
        </h1>
        <p className="text-[1.7rem] text-gray-400 leading-relaxed max-w-[620px]">
          עדכון אחרון: מרץ 2025. מדיניות זו מתארת כיצד Smiley Solution אוספת,
          משתמשת ומגינה על המידע האישי שלך כשאתה מבקר באתר שלנו או יוצר איתנו
          קשר.
        </p>
      </header>

      {/* Section 1 */}
      <SectionHeading>1. מי אנחנו</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>
          Smiley Solution הוא סטודיו לטכנולוגיה המתמחה בפיתוח מוצרי SaaS,
          אתרים פרימיום ואוטומציות דיגיטליות. אנו עובדים עם סטארטאפים, עסקים
          קטנים ואנשי מקצוע שרוצים לבנות מוצרים דיגיטליים משמעותיים.
        </p>
        <p>
          אתר האינטרנט שלנו נמצא בכתובת{' '}
          <span className="text-white font-medium">smileysolution.com</span>{' '}
          וכתובת המייל העיקרית שלנו היא{' '}
          <span className="text-white font-medium">krollkimdev@gmail.com</span>.
        </p>
      </div>

      {/* Section 2 */}
      <SectionHeading>2. מידע שאנחנו אוספים</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>אנו אוספים רק את המידע הנחוץ לטיפול בפניות ולשיפור האתר:</p>
        <ul className="list-disc list-inside space-y-3 text-gray-400 pe-4">
          <li>
            <strong className="text-white">פרטי יצירת קשר</strong> - שם,
            כתובת מייל ומספר טלפון שנמסרו דרך טפסי יצירת הקשר.
          </li>
          <li>
            <strong className="text-white">תוכן הפנייה</strong> - הפרטים שאתה
            משתף בעת פנייה לגבי פרויקט או שירות.
          </li>
          <li>
            <strong className="text-white">נתונים טכניים</strong> - נתוני
            שימוש אנונימיים כגון דפים שביקרת בהם, סוג הדפדפן ומידע על המכשיר
            שנאסף באמצעות עוגיות (ראה סעיף 4).
          </li>
        </ul>
        <p>
          איננו אוספים מידע תשלומי ישירות. כל עיבוד תשלומים מתבצע על ידי ספקי
          צד שלישי.
        </p>
      </div>

      {/* Section 3 */}
      <SectionHeading>3. כיצד אנחנו משתמשים במידע</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>המידע שאתה מספק משמש אך ורק למטרות הבאות:</p>
        <ul className="list-disc list-inside space-y-3 text-gray-400 pe-4">
          <li>מענה לפניות ובקשות פרויקטים.</li>
          <li>תיאום שיחות היכרות או פגישות.</li>
          <li>שליחת פולואו-אפ רלוונטי (ללא שיווק לא מבוקש).</li>
          <li>שיפור הביצועים והתוכן של האתר.</li>
        </ul>
        <p>
          איננו מוכרים, משכירים או משתפים את הנתונים האישיים שלך עם צד שלישי
          למטרות שיווקיות.
        </p>
      </div>

      {/* Section 4 */}
      <SectionHeading>4. עוגיות וטכנולוגיות מעקב</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>
          האתר שלנו משתמש בעוגיות וטכנולוגיות דומות כדי להבין כיצד מבקרים
          מתקשרים עם האתר ולשפר את חוויית המשתמש.
        </p>
        <ul className="list-disc list-inside space-y-3 text-gray-400 pe-4">
          <li>
            <strong className="text-white">עוגיות חיוניות</strong> - נדרשות
            לפעולה הבסיסית של האתר.
          </li>
          <li>
            <strong className="text-white">עוגיות אנליטיקה</strong> - נתונים
            אנונימיים לניתוח דפוסי תנועה ותוכן פופולרי (למשל Google Analytics).
          </li>
        </ul>
        <p>
          ניתן לבטל את השימוש בעוגיות דרך הגדרות הדפדפן שלך בכל עת. שים לב
          שהשבתת עוגיות עלולה להשפיע על תכונות מסוימות באתר.
        </p>
      </div>

      {/* Section 5 */}
      <SectionHeading>5. אחסון ואבטחת נתונים</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>
          אתר Smiley Solution מתארח על{' '}
          <strong className="text-white">Vercel</strong>, פלטפורמת תשתית ענן
          מאובטחת. מידע שנשלח דרך טפסי יצירת קשר עשוי להיות מאוחסן ומעובד
          באמצעות{' '}
          <strong className="text-white">Firebase</strong> או{' '}
          <strong className="text-white">MongoDB</strong> בהתאם לאינטגרציה
          הספציפית בשימוש.
        </p>
        <p>
          אנו נוקטים באמצעים סבירים להגנה על הנתונים שלך מפני גישה בלתי
          מורשית, לרבות חיבורים מוצפנים (HTTPS), בקרת גישה ופרקטיקות טיפול
          מאובטח בנתונים.
        </p>
        <p>
          אין שיטת שידור באינטרנט שהיא 100% מאובטחת. בעוד שאנו שואפים להשתמש
          באמצעים מקובלים מסחרית להגנה על המידע שלך, איננו יכולים להבטיח
          אבטחה מוחלטת.
        </p>
      </div>

      {/* Section 6 */}
      <SectionHeading>6. שירותי צד שלישי</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>אנו עשויים להשתמש בכלים של צד שלישי להפעלת האתר והעסק, לרבות:</p>
        <ul className="list-disc list-inside space-y-3 text-gray-400 pe-4">
          <li>
            <strong className="text-white">Google Analytics</strong> - לנתוני
            שימוש אנונימיים באתר.
          </li>
          <li>
            <strong className="text-white">Calendly / Google Calendar</strong>{' '}
            - לתיאום שיחות היכרות.
          </li>
          <li>
            <strong className="text-white">WhatsApp Business</strong> - לתקשורת
            ישירה עם לקוחות.
          </li>
        </ul>
        <p>
          כל אחד מהשירותים הללו פועל תחת מדיניות הפרטיות שלו. אנו ממליצים לך
          לעיין בהן אם יש לך חששות לגבי אופן הטיפול בנתונים שלך על ידי
          פלטפורמות אלו.
        </p>
      </div>

      {/* Section 7 */}
      <SectionHeading>7. צור קשר</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>
          אם יש לך שאלות לגבי מדיניות פרטיות זו, ברצונך לגשת למידע שאנו
          מחזיקים עליך, או שתרצה לבקש את מחיקתו, אנא צור איתנו קשר:
        </p>
        <p>
          <strong className="text-white">אימייל:</strong>{' '}
          <a
            href="mailto:krollkimdev@gmail.com"
            className="text-crimson hover:underline"
          >
            krollkimdev@gmail.com
          </a>
        </p>
        <p className="text-gray-500 text-[1.5rem]">
          נשיב לכל הבקשות תוך 7 ימי עסקים.
        </p>
      </div>
    </article>
  );
}
