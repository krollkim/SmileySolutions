import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, type Locale } from './i18n/config';

// Matches any path that has a file extension (e.g. .png, .svg, .ico, .webmanifest)
const PUBLIC_FILE_REGEX = /\.([^.]+)$/;

function detectLocale(request: NextRequest): Locale {
  // Priority 1: User's manual selection stored in cookie
  const cookie = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookie && (locales as readonly string[]).includes(cookie)) {
    return cookie as Locale;
  }

  // Priority 2: Browser's Accept-Language header
  const acceptLanguage = request.headers.get('Accept-Language') ?? '';
  const preferred = acceptLanguage
    .split(',')
    .map(entry => entry.split(';')[0].trim().slice(0, 2).toLowerCase());

  for (const lang of preferred) {
    if ((locales as readonly string[]).includes(lang)) {
      return lang as Locale;
    }
  }

  // Priority 3: Default locale
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip files with extensions (.png, .jpg, .svg, .ico, .webmanifest, .pdf, etc.)
  if (PUBLIC_FILE_REGEX.test(pathname)) return NextResponse.next();

  // Skip Next.js internals
  if (pathname.startsWith('/_next')) return NextResponse.next();

  // Skip API routes (future-proofing)
  if (pathname.startsWith('/api')) return NextResponse.next();

  // Skip sitemap and robots
  if (pathname === '/sitemap.xml' || pathname === '/robots.txt') return NextResponse.next();

  // If the path already starts with a supported locale, pass through with locale header
  // so next-intl's getRequestConfig can resolve requestLocale correctly.
  const activeLocale = locales.find(
    locale => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (activeLocale) {
    const response = NextResponse.next();
    response.headers.set('x-next-intl-locale', activeLocale);
    return response;
  }

  // Detect locale and redirect to the locale-prefixed equivalent
  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  // Explicitly exclude:
  //   _next/static  — compiled JS/CSS bundles
  //   _next/image   — Next.js image optimisation endpoint
  //   favicon.ico   — root-level browser favicon request
  //   favicon/      — /favicon/ directory (png, webmanifest, etc.)
  //   robots.txt    — search engine crawler rules
  //   sitemap.xml   — search engine sitemap
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|favicon/|robots\\.txt|sitemap\\.xml).*)'],
};
