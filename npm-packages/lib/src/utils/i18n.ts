import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// ENUM_VALUE => "Enum Value"
export function getEnumTranslationKey(str: string): string {
  return str
    .split('_')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase())
    .join(' ');
}

export default i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    // debug: true,

    react: {
      wait: true,
    },

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });
