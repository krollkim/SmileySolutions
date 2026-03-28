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
          Last updated: January 2026. This policy describes how Smiley Solution
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
        <p>
          We do not operate a contact form or any automated data-collection
          mechanism. The only information we receive is what you choose to send
          us directly through the following channels:
        </p>
        <ul className="list-disc list-inside space-y-3 text-gray-400 ps-4">
          <li>
            <strong className="text-white">Email</strong> — messages sent to{' '}
            krollkimdev@gmail.com.
          </li>
          <li>
            <strong className="text-white">WhatsApp</strong> — messages initiated
            through the WhatsApp link on this website.
          </li>
          <li>
            <strong className="text-white">Google Calendar</strong> — scheduling
            information provided when booking a discovery call.
          </li>
        </ul>
        <p>We do not collect payment information. We do not collect anonymised usage data or website analytics.</p>
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
          Our website does not use non-essential cookies or tracking technologies.
          We do not run Google Analytics, advertising pixels, or any third-party
          behavioural tracking.
        </p>
        <p>
          The only cookie this website sets is{' '}
          <strong className="text-white">NEXT_LOCALE</strong> — a functional
          cookie that remembers your language preference (English or Hebrew)
          between visits. It contains no personal information and is not shared
          with any third party.
        </p>
      </div>

      {/* Section 5 */}
      <SectionHeading>5. Data Storage and Security</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>
          The Smiley Solution website is hosted on{' '}
          <strong className="text-white">Netlify</strong>, with all traffic
          served over HTTPS. We do not operate a database or backend server.
          No personal information submitted through this website is stored in
          any data store operated by us — all communication flows directly
          through email, WhatsApp, or Google Calendar.
        </p>
        <p>
          Any information you voluntarily share with us via those channels is
          retained only as long as necessary to complete your enquiry or project
          engagement.
        </p>
      </div>

      {/* Section 6 */}
      <SectionHeading>6. Third-Party Services</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>
          This website integrates with the following external services:
        </p>
        <ul className="list-disc list-inside space-y-3 text-gray-400 ps-4">
          <li>
            <strong className="text-white">Google Fonts</strong> — used to load
            typography. Google may log the font request; no personal data from
            this website is passed to Google.
          </li>
          <li>
            <strong className="text-white">Google Calendar</strong> — a booking
            link allows you to schedule a discovery call. Any information you
            provide during scheduling is governed by Google&apos;s privacy policy.
          </li>
          <li>
            <strong className="text-white">WhatsApp</strong> — a direct
            messaging link (wa.me) opens a conversation in your WhatsApp app.
            Any information exchanged is governed by WhatsApp&apos;s privacy policy.
          </li>
        </ul>
        <p>
          We do not use Google Analytics, Calendly, Facebook Pixel, or any other
          advertising or behavioural tracking service. Each third-party service
          listed above operates under its own privacy policy.
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
          עדכון אחרון: ינואר 2026. מדיניות זו מתארת כיצד Smiley Solution אוספת,
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
        <p>
          איננו מפעילים טופס יצירת קשר או מנגנון אחר לאיסוף נתונים אוטומטי.
          המידע היחיד שאנו מקבלים הוא זה שתבחר לשלוח אלינו ישירות דרך הערוצים
          הבאים:
        </p>
        <ul className="list-disc list-inside space-y-3 text-gray-400 pe-4">
          <li>
            <strong className="text-white">אימייל</strong> — הודעות שנשלחות אל
            krollkimdev@gmail.com.
          </li>
          <li>
            <strong className="text-white">WhatsApp</strong> — הודעות שמתחילות
            דרך קישור WhatsApp באתר זה.
          </li>
          <li>
            <strong className="text-white">Google Calendar</strong> — מידע
            לוח זמנים שנמסר בעת קביעת שיחת היכרות.
          </li>
        </ul>
        <p>איננו אוספים מידע תשלומי. איננו אוספים נתוני שימוש אנונימיים או אנליטיקת אתרים.</p>
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
          האתר שלנו אינו משתמש בעוגיות לא חיוניות או בטכנולוגיות מעקב. איננו
          מפעילים Google Analytics, פיקסלים פרסומיים, או כל מעקב התנהגותי אחר
          של צד שלישי.
        </p>
        <p>
          העוגייה היחידה שאתר זה מגדיר היא{' '}
          <strong className="text-white">NEXT_LOCALE</strong> — עוגייה פונקציונלית
          שזוכרת את העדפת השפה שלך (עברית או אנגלית) בין ביקורים. היא אינה
          מכילה מידע אישי ואינה משותפת עם צד שלישי כלשהו.
        </p>
      </div>

      {/* Section 5 */}
      <SectionHeading>5. אחסון ואבטחת נתונים</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>
          אתר Smiley Solution מתארח על{' '}
          <strong className="text-white">Netlify</strong>, כאשר כל התעבורה
          מוגשת דרך HTTPS. איננו מפעילים מסד נתונים או שרת backend. אין מידע
          אישי שנשלח דרך אתר זה המאוחסן במאגר נתונים המנוהל על ידינו — כל
          התקשורת זורמת ישירות דרך אימייל, WhatsApp, או Google Calendar.
        </p>
        <p>
          כל מידע שתשתף איתנו מרצונך דרך אותם ערוצים יישמר רק כל עוד נחוץ
          להשלמת הפנייה או מעורבות הפרויקט שלך.
        </p>
      </div>

      {/* Section 6 */}
      <SectionHeading>6. שירותי צד שלישי</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>אתר זה משתלב עם השירותים החיצוניים הבאים:</p>
        <ul className="list-disc list-inside space-y-3 text-gray-400 pe-4">
          <li>
            <strong className="text-white">Google Fonts</strong> — משמש לטעינת
            גופנים. ייתכן ש-Google תרשום את בקשת הגופן; לא מועבר לגוגל מידע
            אישי מאתר זה.
          </li>
          <li>
            <strong className="text-white">Google Calendar</strong> — קישור
            הזמנה המאפשר לך לתזמן שיחת היכרות. כל מידע שתמסור בעת התזמון כפוף
            למדיניות הפרטיות של Google.
          </li>
          <li>
            <strong className="text-white">WhatsApp</strong> — קישור הודעה
            ישירה (wa.me) פותח שיחה באפליקציית WhatsApp שלך. כל מידע שתחליף
            כפוף למדיניות הפרטיות של WhatsApp.
          </li>
        </ul>
        <p>
          איננו משתמשים ב-Google Analytics, Calendly, Facebook Pixel, או כל
          שירות מעקב פרסומי או התנהגותי אחר. כל שירות צד שלישי המפורט לעיל
          פועל תחת מדיניות הפרטיות שלו.
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
