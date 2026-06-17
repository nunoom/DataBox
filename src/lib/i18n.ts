import en from '../../messages/en.json';
import pt from '../../messages/pt.json';

export type Locale = 'en' | 'pt';

export const locales: Locale[] = ['en', 'pt'];
export const defaultLocale: Locale = 'en';

const messages: Record<Locale, typeof en> = { en, pt };

export function getMessages(locale: Locale) {
  return messages[locale] || messages.en;
}

export function t(locale: Locale, key: string): string {
  const msgs = getMessages(locale);
  const keys = key.split('.');
  let value: unknown = msgs;

  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key;
    }
  }

  return typeof value === 'string' ? value : key;
}

/** Pick the right side of a bilingual pair. */
export function tr(locale: Locale, en: string, pt: string): string {
  return locale === 'pt' ? pt : en;
}
