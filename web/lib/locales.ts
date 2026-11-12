// Kept apart from the translations so proxy.ts can import it without pulling in every string.
export const locales = ['en', 'th', 'zh', 'ru'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';
export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);
