import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { auth as middleware } from './auth';
import { languages, fallbackLng, i18CookieName } from './lib/i18n/settings';
import { Language } from './lib/i18n';

const NON_I18N_ROUTES = ['/admin', '/auth'];

export default middleware((req: NextRequest) => {
  const pathname = req.nextUrl.pathname;

  // 0. Skip i18n for non-localized routes
  const isNonI18nRoute = NON_I18N_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  // 1. i18n handling (ONLY for localized public routes)
  if (!isNonI18nRoute) {
    const pathnameHasLocale = languages.some(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
    );

    if (!pathnameHasLocale) {
      let locale = fallbackLng;

      // Cookie
      const cookieLocale = req.cookies.get(i18CookieName)?.value as Language | undefined;
      if (cookieLocale && languages.includes(cookieLocale)) {
        locale = cookieLocale;
      } else {
        // Accept-Language
        const acceptLanguage = req.headers.get('accept-language');
        if (acceptLanguage) {
          const preferredLocale = acceptLanguage
            .split(',')
            .map((lang) => lang.split(';')[0].trim())
            .find((lang) => languages.includes(lang as Language));

          if (preferredLocale) {
            locale = preferredLocale as Language;
          }
        }
      }

      return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
    }
  }

  // 2. Authentication / Authorization (admin only)
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    if (req.auth?.error === 'RefreshAccessTokenError' || req.auth?.error === 'InvalidTokenError') {
      const loginUrl = new URL('/auth/login', req.url);
      loginUrl.searchParams.set('error', 'SessionExpired');
      return NextResponse.redirect(loginUrl);
    }

    if (!req.auth) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    if (req.auth.user?.role !== 'Admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|apple-touch-icon.png|og-image.png|robots.txt|sitemap.xml).*)',
  ],
};
