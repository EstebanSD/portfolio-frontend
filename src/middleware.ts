import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { auth as middleware } from './auth';
import { languages, fallbackLng, i18CookieName } from './lib/i18n/settings';

export default middleware((req: NextRequest) => {
  const pathname = req.nextUrl.pathname;

  // 1. FIRST: Manage i18n
  const pathnameHasLocale = languages.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameHasLocale) {
    let locale = fallbackLng;

    // Check language cookie
    const cookieLocale = req.cookies.get(i18CookieName)?.value;
    if (cookieLocale && languages.includes(cookieLocale)) {
      locale = cookieLocale;
    } else {
      // Use Accept-Language header
      const acceptLanguage = req.headers.get('accept-language');
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
    const redirectUrl = new URL(`/${locale}${pathname}`, req.url);
    return NextResponse.redirect(redirectUrl);
  }

  // 2. SECOND: Handling authentication

  // Extract the path without language to verify if it is a protected path.
  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, '/');

  // Define routes that require authentication
  const protectedRoutes = ['/admin'];
  const isProtectedRoute = protectedRoutes.some((route) => pathWithoutLocale.startsWith(route));

  if (isProtectedRoute) {
    const currentLocale = pathname.split('/')[1];
    // Check for token errors
    if (req.auth?.error === 'RefreshAccessTokenError' || req.auth?.error === 'InvalidTokenError') {
      const loginUrl = new URL(`/${currentLocale}/auth/login`, req.url);
      // Optional: add query param to display session expired message
      loginUrl.searchParams.set('error', 'SessionExpired');
      return NextResponse.redirect(loginUrl);
    }
    // Verify if the user is authenticated
    if (!req.auth) {
      // Extract current language from the URL for the redirect
      const loginUrl = new URL(`/${currentLocale}/auth/login`, req.url);
      return NextResponse.redirect(loginUrl);
    }

    // Optional: Check admin role
    if (req.auth.user?.role !== 'Admin') {
      const unauthorizedUrl = new URL(`/${currentLocale}/unauthorized`, req.url);
      return NextResponse.redirect(unauthorizedUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|apple-touch-icon.png|og-image.png|robots.txt|sitemap.xml).*)',
  ],
};
