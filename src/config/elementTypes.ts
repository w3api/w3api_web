/**
 * Utilidades para trabajar con tipos de elementos por tecnología
 * Importa la configuración desde types/types.ts
 */

import { elementTypesByTechnology } from './types/types';
import { t } from '../i18n';
import type { Language } from '../i18n';

/**
 * Obtiene el nombre pluralizado para un tipo de elemento en una tecnología
 */
export function getPluralName(technology: string, elementType: string): string {
  const tech = technology.toLowerCase() as keyof typeof elementTypesByTechnology;
  const types = elementTypesByTechnology[tech];
  
  if (!types) {
    // Si la tecnología no está en la config, retorna el tipo con 's'
    return elementType.endsWith('s') ? elementType : `${elementType}s`;
  }

  return types[elementType as keyof typeof types] || `${elementType}s`;
}

/**
 * Obtiene todos los tipos válidos para una tecnología
 */
export function getElementTypesForTechnology(technology: string): Record<string, string> {
  const tech = technology.toLowerCase() as keyof typeof elementTypesByTechnology;
  return elementTypesByTechnology[tech] || {};
}

/**
 * Obtiene la etiqueta traducida para un tipo de elemento
 */
export function getElementTypeLabel(technology: string, elementType: string, language: Language = 'en'): string {
  const pluralName = getPluralName(technology, elementType);
  const translationKey = `element_types_${pluralName}`;
  return t(translationKey, language) || pluralName;
}

// Re-exportar la configuración para acceso directo si es necesario
export { elementTypesByTechnology } from './types/types';

