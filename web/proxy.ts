import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, hasLocale, locales, type Locale } from '@/lib/locales';

// A path without a language ("/") goes to the visitor's language:
// their last choice (cookie set by LangSwitch), then the browser's language, then English.
function pickLocale(req: NextRequest): Locale {
  const saved = req.cookies.get('lang')?.value;
  if (saved && hasLocale(saved)) return saved;
  const accepted = (req.headers.get('accept-language') ?? '')
    .split(',')
    .map((part) => part.split(';')[0].trim().slice(0, 2).toLowerCase());
  return accepted.find(hasLocale) ?? defaultLocale;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;
  req.nextUrl.pathname = `/${pickLocale(req)}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(req.nextUrl);
}

export const config = {
  matcher: ['/((?!_next|assets|icon|apple-icon|favicon.ico|robots.txt|sitemap.xml).*)'],
};
