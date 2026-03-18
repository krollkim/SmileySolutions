import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { locales } from '@/i18n/config';

const BASE_URL = 'https://smileysolution.com';
const PAGE_PATH = 'terms';

const pageMeta = {
  en: {
    title: 'Terms of Service | Smiley Solution',
    description:
      'Terms of service for Smiley Solution - covering software development, UI/UX design, technology consulting, and digital product services.',
    ogLocale: 'en_US',
  },
  he: {
    title: 'תנאי שירות | Smiley Solution',
    description:
      'תנאי השירות של Smiley Solution - פיתוח תוכנה, עיצוב UI/UX, ייעוץ טכנולוגי ושירותי מוצר דיגיטלי.',
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

export default async function TermsPage({
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
          Terms of<br />
          <span className="text-crimson">Service</span>
        </h1>
        <p className="text-[1.7rem] text-gray-400 leading-relaxed max-w-[620px]">
          Last updated: March 2025. By engaging Smiley Solution for any service,
          you agree to the following terms. Please read them carefully before
          proceeding.
        </p>
      </header>

      {/* Section 1 */}
      <SectionHeading>1. About These Terms</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>
          These Terms of Service govern the relationship between Smiley Solution
          (&ldquo;the Studio&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) and any individual or business
          (&ldquo;the Client&rdquo;, &ldquo;you&rdquo;) who engages our services or accesses our website
          at smileysolution.com.
        </p>
        <p>
          By contacting us, submitting a brief, signing a proposal, or making a
          payment, you acknowledge that you have read and agreed to these terms.
        </p>
      </div>

      {/* Section 2 */}
      <SectionHeading>2. Services We Provide</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>Smiley Solution offers the following professional services:</p>
        <ul className="list-disc list-inside space-y-3 text-gray-400 ps-4">
          <li>
            <strong className="text-white">Product characterisation</strong> -
            scoping, architecture planning, and technical requirements for
            digital products.
          </li>
          <li>
            <strong className="text-white">UI/UX design</strong> - interface
            design, wireframing, prototyping, and design system creation.
          </li>
          <li>
            <strong className="text-white">Software development</strong> -
            full-stack web development including frontend (React, Next.js),
            backend (Node.js), and cloud deployment (Vercel, AWS).
          </li>
          <li>
            <strong className="text-white">Technology consulting</strong> -
            advisory services on stack selection, architecture decisions, and
            development processes.
          </li>
          <li>
            <strong className="text-white">SaaS product development</strong> -
            end-to-end development of production-ready software products.
          </li>
        </ul>
        <p>
          The exact scope of services for each engagement is defined in a
          separate written proposal or agreement signed by both parties.
        </p>
      </div>

      {/* Section 3 */}
      <SectionHeading>3. Intellectual Property</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>
          All designs, code, content, and visual assets displayed on the Smiley
          Solution website (smileysolution.com) are the exclusive property of
          Smiley Solution. Reproduction, distribution, or use of any materials
          from this website without written permission is strictly prohibited.
        </p>
        <p>
          For client projects: upon receipt of full payment, the Client receives
          ownership of the final deliverables as specified in the project
          agreement. Third-party libraries, fonts, or stock assets included in
          the project remain subject to their respective licences.
        </p>
        <p>
          Smiley Solution retains the right to display completed client work in
          its portfolio unless otherwise agreed in writing prior to project
          commencement.
        </p>
      </div>

      {/* Section 4 */}
      <SectionHeading>4. Client Responsibilities</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>To ensure a smooth and successful project, the Client agrees to:</p>
        <ul className="list-disc list-inside space-y-3 text-gray-400 ps-4">
          <li>
            Provide accurate and complete information required for the project
            in a timely manner.
          </li>
          <li>
            Review and provide feedback on deliverables within the timeframes
            agreed upon in the project schedule.
          </li>
          <li>
            Ensure they have the legal right to use any content, images, or
            materials supplied to the Studio.
          </li>
          <li>
            Make payments according to the agreed schedule outlined in the
            proposal.
          </li>
        </ul>
        <p>
          Delays caused by the Client&rsquo;s failure to meet these responsibilities
          may affect the project timeline and may be subject to additional fees.
        </p>
      </div>

      {/* Section 5 */}
      <SectionHeading>5. Cancellations and Project Changes</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>
          Cancellation and revision policies are defined individually in each
          project agreement. The general terms are as follows:
        </p>
        <ul className="list-disc list-inside space-y-3 text-gray-400 ps-4">
          <li>
            <strong className="text-white">Cancellation before work begins</strong>{' '}
            - any deposit paid is non-refundable unless otherwise stated in
            the specific project agreement.
          </li>
          <li>
            <strong className="text-white">Cancellation during active work</strong>{' '}
            - the Client is responsible for payment of all work completed up to
            the point of cancellation.
          </li>
          <li>
            <strong className="text-white">Scope changes</strong> - any
            additions or significant changes to the original project scope will
            be quoted and agreed upon in writing before work proceeds.
          </li>
          <li>
            <strong className="text-white">Revisions</strong> - the number of
            included revision rounds is specified in the project proposal.
            Additional revisions beyond the agreed scope will be billed at the
            Studio&rsquo;s standard hourly rate.
          </li>
        </ul>
      </div>

      {/* Section 6 */}
      <SectionHeading>6. Limitation of Liability</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>
          Smiley Solution will not be liable for any indirect, incidental,
          special, or consequential damages arising from the use of our services
          or website, including loss of revenue, data, or business opportunity.
        </p>
        <p>
          Our total liability to any Client for any claim arising from a project
          shall not exceed the total fees paid by the Client for that specific
          project.
        </p>
        <p>
          The Studio is not responsible for issues arising from third-party
          services, hosting platforms, or infrastructure that are outside our
          direct control.
        </p>
      </div>

      {/* Section 7 */}
      <SectionHeading>7. Contact Us</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>
          For any questions regarding these Terms of Service, or to discuss a
          project, please reach out:
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
          We will respond to all inquiries within 3 business days.
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
          תנאי<br />
          <span className="text-crimson">שירות</span>
        </h1>
        <p className="text-[1.7rem] text-gray-400 leading-relaxed max-w-[620px]">
          עדכון אחרון: מרץ 2025. על ידי התקשרות עם Smiley Solution לכל שירות,
          אתה מסכים לתנאים הבאים. אנא קרא אותם בעיון לפני המשך.
        </p>
      </header>

      {/* Section 1 */}
      <SectionHeading>1. אודות תנאים אלה</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>
          תנאי שירות אלה מסדירים את היחסים בין Smiley Solution (&ldquo;הסטודיו&rdquo;,
          &ldquo;אנחנו&rdquo;) לבין כל יחיד או עסק (&ldquo;הלקוח&rdquo;, &ldquo;אתה&rdquo;) המשתמש
          בשירותינו או ניגש לאתר שלנו בכתובת smileysolution.com.
        </p>
        <p>
          על ידי יצירת קשר, הגשת בריף, חתימה על הצעת מחיר או ביצוע תשלום, אתה
          מאשר שקראת את התנאים הללו והסכמת להם.
        </p>
      </div>

      {/* Section 2 */}
      <SectionHeading>2. השירותים שאנחנו מספקים</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>Smiley Solution מציע את השירותים המקצועיים הבאים:</p>
        <ul className="list-disc list-inside space-y-3 text-gray-400 pe-4">
          <li>
            <strong className="text-white">אפיון מוצר</strong> - סקופינג,
            תכנון ארכיטקטורה ודרישות טכניות למוצרים דיגיטליים.
          </li>
          <li>
            <strong className="text-white">עיצוב UI/UX</strong> - עיצוב
            ממשקים, wireframing, פרוטוטייפינג ויצירת מערכות עיצוב.
          </li>
          <li>
            <strong className="text-white">פיתוח תוכנה</strong> - פיתוח Full
            Stack כולל Frontend (React, Next.js), Backend (Node.js) ופריסת ענן
            (Vercel, AWS).
          </li>
          <li>
            <strong className="text-white">ייעוץ טכנולוגי</strong> - שירותי
            ייעוץ בבחירת סטאק, החלטות ארכיטקטורה ותהליכי פיתוח.
          </li>
          <li>
            <strong className="text-white">פיתוח מוצרי SaaS</strong> - פיתוח
            מקצה לקצה של מוצרי תוכנה מוכנים לפרודקשן.
          </li>
        </ul>
        <p>
          היקף השירותים המדויק לכל התקשרות מוגדר בהצעת מחיר כתובה נפרדת או
          בהסכם חתום על ידי שני הצדדים.
        </p>
      </div>

      {/* Section 3 */}
      <SectionHeading>3. קניין רוחני</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>
          כל העיצובים, הקוד, התכנים והנכסים הויזואליים המוצגים באתר Smiley
          Solution (smileysolution.com) הם רכושה הבלעדי של Smiley Solution.
          העתקה, הפצה או שימוש בכל חומר מאתר זה ללא אישור בכתב אסורים בהחלט.
        </p>
        <p>
          לגבי פרויקטים של לקוחות: עם קבלת התשלום המלא, הלקוח מקבל בעלות על
          התוצרים הסופיים כפי שמפורט בהסכם הפרויקט. ספריות צד שלישי, גופנים
          או נכסי סטוק הכלולים בפרויקט כפופים לרישיונות הייחודיים שלהם.
        </p>
        <p>
          Smiley Solution שומרת את הזכות להציג עבודות לקוחות שהושלמו בתיק
          העבודות שלה, אלא אם הוסכם אחרת בכתב לפני תחילת הפרויקט.
        </p>
      </div>

      {/* Section 4 */}
      <SectionHeading>4. אחריות הלקוח</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>להבטחת פרויקט חלק ומוצלח, הלקוח מסכים:</p>
        <ul className="list-disc list-inside space-y-3 text-gray-400 pe-4">
          <li>
            לספק מידע מדויק ומלא הנדרש לפרויקט בזמן סביר.
          </li>
          <li>
            לבחון ולספק משוב על תוצרים במסגרות הזמן המוסכמות בלוח הזמנים של
            הפרויקט.
          </li>
          <li>
            להבטיח שיש להם את הזכות החוקית להשתמש בכל תוכן, תמונות או חומרים
            שסופקו לסטודיו.
          </li>
          <li>
            לבצע תשלומים בהתאם ללוח הזמנים המוסכם המפורט בהצעה.
          </li>
        </ul>
        <p>
          עיכובים הנגרמים מאי-עמידת הלקוח בהתחייבויות אלה עשויים להשפיע על
          לוח הזמנים של הפרויקט ועשויים לחייב עמלות נוספות.
        </p>
      </div>

      {/* Section 5 */}
      <SectionHeading>5. ביטולים ושינויים בפרויקט</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>
          מדיניות הביטול והתיקונים מוגדרת באופן אינדיבידואלי בכל הסכם פרויקט.
          התנאים הכלליים הם כדלקמן:
        </p>
        <ul className="list-disc list-inside space-y-3 text-gray-400 pe-4">
          <li>
            <strong className="text-white">ביטול לפני תחילת העבודה</strong> -
            כל מקדמה ששולמה אינה ניתנת להחזר, אלא אם נקבע אחרת בהסכם הפרויקט
            הספציפי.
          </li>
          <li>
            <strong className="text-white">ביטול במהלך עבודה פעילה</strong> -
            הלקוח אחראי לתשלום עבור כל העבודה שהושלמה עד לנקודת הביטול.
          </li>
          <li>
            <strong className="text-white">שינויי היקף</strong> - כל תוספות
            או שינויים משמעותיים להיקף הפרויקט המקורי יוצגו בהצעת מחיר
            ויוסכמו בכתב לפני המשך העבודה.
          </li>
          <li>
            <strong className="text-white">תיקונים</strong> - מספר סבבי
            התיקון הכלולים מפורט בהצעת הפרויקט. תיקונים נוספים מעבר להיקף
            המוסכם יחויבו בתעריף השעתי הרגיל של הסטודיו.
          </li>
        </ul>
      </div>

      {/* Section 6 */}
      <SectionHeading>6. הגבלת אחריות</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>
          Smiley Solution לא תהיה אחראית לכל נזק עקיף, מקרי, מיוחד או
          תוצאתי הנובע מהשימוש בשירותינו או באתר, לרבות אובדן הכנסה, נתונים
          או הזדמנות עסקית.
        </p>
        <p>
          האחריות הכוללת שלנו לכל לקוח בגין כל תביעה הנובעת מפרויקט לא תעלה
          על סך העמלות ששולמו על ידי הלקוח עבור אותו פרויקט ספציפי.
        </p>
        <p>
          הסטודיו אינו אחראי לבעיות הנובעות משירותי צד שלישי, פלטפורמות
          אירוח או תשתיות שאינן בשליטתנו הישירה.
        </p>
      </div>

      {/* Section 7 */}
      <SectionHeading>7. צור קשר</SectionHeading>
      <div className="space-y-4 text-[1.7rem] text-gray-300 leading-relaxed">
        <p>
          לכל שאלה בנוגע לתנאי שירות אלה, או לדיון בפרויקט, אנא צור קשר:
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
          נשיב לכל הפניות תוך 3 ימי עסקים.
        </p>
      </div>
    </article>
  );
}
