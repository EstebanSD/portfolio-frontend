import { NextRequest, NextResponse } from 'next/server';
import { languages, fallbackLng, i18CookieName } from './lib/i18n/settings';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the pathname already includes a supported language
  const pathnameHasLocale = languages.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameHasLocale) {
    // Obtain the user's preferred language
    let locale = fallbackLng;

    // Check language cookie
    const cookieLocale = request.cookies.get(i18CookieName)?.value;
    if (cookieLocale && languages.includes(cookieLocale)) {
      locale = cookieLocale;
    } else {
      // Use Accept-Language header
      const acceptLanguage = request.headers.get('accept-language');
      if (acceptLanguage) {
        const preferredLocale = acceptLanguage
          .split(',')
          .map((lang) => lang.split(';')[0].trim())
          .find((lang) => languages.includes(lang));

        if (preferredLocale) {
          locale = preferredLocale;
        }
      }
    }

    // Redirect with the language in the URL
    const redirectUrl = new URL(`/${locale}${pathname}`, request.url);
    return NextResponse.redirect(redirectUrl);
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
