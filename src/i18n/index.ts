import es from './es.json';
import en from './en.json';

export type Language = 'es' | 'en';

const translations: Record<Language, Record<string, string>> = {
  es,
  en,
};

/**
 * Obtiene una traducción basada en el idioma
 */
export function t(key: string, lang: Language = 'en'): string {
  return translations[lang]?.[key as keyof typeof es] || key;
}

/**
 * Obtiene el objeto completo de traducciones para un idioma
 */
export function getTranslations(lang: Language = 'en'): Record<string, string> {
  return translations[lang] || translations['en'];
}
