export const fallbackLng = 'en';
export const languages = [fallbackLng, 'es'];
export const defaultNS = 'common';
export const i18CookieName = 'i18next';

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: process.env.NODE_ENV === 'development',
    supportedLangs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
