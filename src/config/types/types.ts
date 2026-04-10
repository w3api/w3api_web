/**
 * Configuración de tipos de elementos por tecnología
 * Mapea cada tipo de elemento a su nombre pluralizado esperado por DocumentLayout
 * 
 * Este archivo puede ser generado automáticamente desde un script externo
 */

export const elementTypesByTechnology = {
  css: {
    'at-rule': 'at-rules',
    'data-type': 'data-types',
    'event': 'events',
    'function': 'functions',
    'keyword': 'keywords',
    'property': 'properties',
    'pseudo-class': 'pseudo-classes',
    'pseudo-element': 'pseudo-elements',
    'selector': 'selectors',
    'value': 'values',
  },
  html: {
    'attribute': 'attributes',
    'element': 'elements',
    'global-attribute': 'global-attributes',
    'global-event': 'global-events',
  },
  java: {
    'annotation': 'annotations',
    'class': 'classes',
    'constructor': 'constructors',
    'enum': 'enums',
    'enum_constant': 'enum_constants',
    'exception': 'exceptions',
    'field': 'fields',
    'interface': 'interfaces',
    'method': 'methods',
    'record': 'records',
  },
  javascript: {
    'constructor': 'constructors',
    'function': 'functions',
    'method': 'methods',
    'object': 'objects',
    'property': 'properties',
  },
  jquery: {
    'method': 'methods',
    'selector': 'selectors',
  },
  python: {
    'attribute': 'attributes',
    'class': 'classes',
    'constant': 'constants',
    'constructor': 'constructors',
    'exception': 'exceptions',
    'function': 'functions',
    'method': 'methods',
  },
  svg: {
    'attribute': 'attributes',
    'element': 'elements',
  },
  webapi: {
    'constructor': 'constructors',
    'event': 'events',
    'interface': 'interfaces',
    'method': 'methods',
    'property': 'properties',
  },
  xml: {
    'attribute': 'attributes',
    'element': 'elements',
    'function': 'functions',
  },
} as const;
