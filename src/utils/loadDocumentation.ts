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

  return doc;
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
  };
}

/**
 * Genera la tabla de contenidos basada en el documento y si es una página de paquete
 */
export function generateTableOfContents(doc: any, isPackagePage: boolean) {
  const headings = isPackagePage
    ? [
        { level: 2, title: 'Description', id: 'description' },
        { level: 2, title: 'Members', id: 'members' },
      ]
    : [
        { level: 2, title: 'Description', id: 'description' },
        ...(doc.constructors?.length > 0
          ? [{ level: 2, title: 'Constructors', id: 'constructors' }]
          : []),
        ...(doc.methods?.length > 0
          ? [{ level: 2, title: 'Methods', id: 'methods' }]
          : []),
        ...(doc.attributes?.length > 0
          ? [{ level: 2, title: 'Atributos', id: 'attributes' }]
          : []),
        ...(doc.example?.length > 0
          ? [{ level: 2, title: 'Example', id: 'example' }]
          : []),
        { level: 2, title: 'Original Documentation', id: 'original-documentation' },
      ];

  return headings.map((h) => ({
    depth: h.level,
    text: h.title,
    slug: h.id,
  }));
}
