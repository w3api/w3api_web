// Configuración de propiedades por lenguaje para membersByType
const LANGUAGE_MEMBER_CONFIGS = {
  java: {
    classes: 'class',
    interfaces: 'interface',
    exceptions: 'exception',
    enums: 'enum',
    annotations: 'annotation',
  },
  jquery: {
    methods: 'method',
    selector: 'selectors',    
  },
  python: {
    classes: 'class',
    functions: 'function',
    methods: 'method',
    constants: 'constant',
    exceptions: 'exception',
  },
  xml: {
    elements: 'element',
    functions: 'function',
  },
  html: {
    elements: 'element',
    "global-attributes": 'global-attribute',
    "global-events": 'global-event',    
  },
  svg: {
    elements: 'element',
    attributes: 'attribute',
  },
} as const;

type LanguageKey = keyof typeof LANGUAGE_MEMBER_CONFIGS;

/**
 * Construye el objeto membersByType basado en las propiedades del documento
 * y la configuración del lenguaje especificado
 */
export function buildMembersByType(
  doc: any,
  packageName: string,
  languageKey: LanguageKey
): Record<string, any[]> {
  const membersByType: any = {};
  const config = LANGUAGE_MEMBER_CONFIGS[languageKey];

  if (!config) {
    return membersByType;
  }

  Object.entries(config).forEach(([docProp, typeKey]) => {
    if (doc[docProp] && Array.isArray(doc[docProp])) {
      membersByType[typeKey] = doc[docProp].map((item: any) => {
        const name = typeof item === 'string' ? item : item.name;
        return {
          name,
          slug: `${packageName}/${name}`,
          type: typeKey,
        };
      });
    }
  });

  return membersByType;
}

/**
 * Carga un documento desde los módulos cargados dinámicamente
 */
export function loadDocument(
  slug: string,
  distributionFile: any[],
  shardModules: Record<string, any>,
  packageName: string,
  languageKey: LanguageKey
) {
  const routeMeta = distributionFile.find((r: any) => r.slug === slug);

  if (!routeMeta) {
    throw new Error(`Route not found: ${slug}`);
  }

  const shardPath = `../../data/${routeMeta.shard}`;
  const shardModule = shardModules[shardPath] as any;
  const shard = shardModule.default || shardModule;

  const doc = shard[slug];

  if (!doc) {
    throw new Error(`Document not found: ${slug}`);
  }

  // Asegurar que los campos son arrays si no existen
  return {
    ...doc,
    signatures: Array.isArray(doc.signatures) ? doc.signatures : [],
    parameters: Array.isArray(doc.parameters) ? doc.parameters : [],
    constructors: Array.isArray(doc.constructors) ? doc.constructors : [],
    methods: Array.isArray(doc.methods) ? doc.methods : [],
    attributes: Array.isArray(doc.attributes) ? doc.attributes : [],
    exceptions: Array.isArray(doc.exceptions) ? doc.exceptions : [],
    classes: Array.isArray(doc.classes) ? doc.classes : [],
    interfaces: Array.isArray(doc.interfaces) ? doc.interfaces : [],
    enums: Array.isArray(doc.enums) ? doc.enums : [],
    annotations: Array.isArray(doc.annotations) ? doc.annotations : [],
    functions: Array.isArray(doc.functions) ? doc.functions : [],
    constants: Array.isArray(doc.constants) ? doc.constants : [],
    elements: Array.isArray(doc.elements) ? doc.elements : [],
  };
}

/**
 * Carga un paquete y construye su estructura de miembros por tipo
 */
export function loadPackage(
  packageName: string,
  distributionFile: any[],
  shardModules: Record<string, any>,
  languageKey: LanguageKey
) {
  const routeMeta = distributionFile.find((r: any) => r.slug === packageName);

  if (!routeMeta) {
    throw new Error(`Package not found: ${packageName}`);
  }

  const shardPath = `../../data/${routeMeta.shard}`;
  const shardModule = shardModules[shardPath] as any;
  const shard = shardModule.default || shardModule;

  const doc = shard[packageName];

  if (!doc) {
    return {
      name: packageName,
      type: 'Package',
      description: `Package: ${packageName}`,
      membersByType: {},
      signatures: [],
      parameters: [],
      constructors: [],
      methods: [],
      attributes: [],
      exceptions: [],
      classes: [],
      interfaces: [],
      enums: [],
      annotations: [],
      functions: [],
      constants: [],
      elements: [],
    };
  }

  return {
    ...doc,
    membersByType: buildMembersByType(doc, packageName, languageKey),
    signatures: Array.isArray(doc.signatures) ? doc.signatures : [],
    parameters: Array.isArray(doc.parameters) ? doc.parameters : [],
    constructors: Array.isArray(doc.constructors) ? doc.constructors : [],
    methods: Array.isArray(doc.methods) ? doc.methods : [],
    attributes: Array.isArray(doc.attributes) ? doc.attributes : [],
    exceptions: Array.isArray(doc.exceptions) ? doc.exceptions : [],
    classes: Array.isArray(doc.classes) ? doc.classes : [],
    interfaces: Array.isArray(doc.interfaces) ? doc.interfaces : [],
    enums: Array.isArray(doc.enums) ? doc.enums : [],
    annotations: Array.isArray(doc.annotations) ? doc.annotations : [],
    functions: Array.isArray(doc.functions) ? doc.functions : [],
    constants: Array.isArray(doc.constants) ? doc.constants : [],
    elements: Array.isArray(doc.elements) ? doc.elements : [],
  };
}

/**
 * Genera la tabla de contenidos basada en el documento y si es una página de paquete
 * Retorna claves de traducción que deben resolverse usando la función t() del módulo i18n
 */
export function generateTableOfContents(
  doc: any,
  isPackagePage: boolean
) {
  const headings = isPackagePage
    ? [
        { level: 2, i18nKey: 'description', id: 'description' },
        { level: 2, i18nKey: 'members', id: 'members' },
      ]
    : [
        { level: 2, i18nKey: 'description', id: 'description' },
        ...(doc.signatures?.length > 0
          ? [{ level: 2, i18nKey: 'syntax', id: 'sintaxis' }]
          : []),
        ...(doc.parameters?.length > 0
          ? [{ level: 2, i18nKey: 'parameters', id: 'parameters' }]
          : []),
        ...(doc.constructors?.length > 0
          ? [{ level: 2, i18nKey: 'constructors', id: 'constructors' }]
          : []),
        ...(doc.methods?.length > 0
          ? [{ level: 2, i18nKey: 'methods', id: 'methods' }]
          : []),
        ...(doc.attributes?.length > 0
          ? [{ level: 2, i18nKey: 'attributes', id: 'attributes' }]
          : []),
        ...(doc.exceptions?.length > 0
          ? [{ level: 2, i18nKey: 'exceptions', id: 'exceptions' }]
          : []),
        ...(doc.example?.length > 0
          ? [{ level: 2, i18nKey: 'example', id: 'example' }]
          : []),
        { level: 2, i18nKey: 'originalDocumentation', id: 'original-documentation' },
      ];

  return headings.map((h) => ({
    depth: h.level,
    text: h.i18nKey,
    slug: h.id,
  }));
}
