import en from '../../messages/en.json';
import pt from '../../messages/pt.json';

export type Locale = 'en' | 'pt';

const messages = {
  en,
  pt,
};

export function getMessages(locale: Locale) {
  return messages[locale] || messages.en;
}

export function t(locale: Locale, key: string): string {
  const msgs = getMessages(locale);
  const keys = key.split('.');
  let value: any = msgs;
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}