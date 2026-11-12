import { translations, type MessageKey } from '@/content/translations';
import { locales, type Locale } from '@/lib/locales';

export { defaultLocale, hasLocale, locales, type Locale } from '@/lib/locales';

/** A value in every language, in `locales` order: [en, th, zh, ru] */
export type L4 = readonly [en: string, th: string, zh: string, ru: string];

/** Pick the current language out of an L4 (plain strings pass through). */
export const pick = (value: L4 | string, lang: Locale) =>
  typeof value === 'string' ? value : (value[locales.indexOf(lang)] ?? value[0]);

/** t('Start a project') → the text in `lang`; English is the key, missing entries fall back to it. */
export function getT(lang: Locale) {
  const table: Partial<Record<MessageKey, string>> = lang === 'en' ? {} : translations[lang];
  return (key: MessageKey) => table[key] ?? key;
}
export type T = ReturnType<typeof getT>;
