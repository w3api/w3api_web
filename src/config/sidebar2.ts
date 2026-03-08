// Define the sidebar structure for your site
export const sidebar = [
  {
    label: 'Primeros pasos',
    items: [
      { label: 'Introducción', link: '/docs/introduccion' },
      { label: 'Instalación 2', link: '/docs/instalacion', badge: { text: 'Nuevo', variant: 'tip' } },
      { label: 'Configuración', link: '/docs/configuracion' },
    ],
  },
  {
    label: 'Guías',
    items: [
      { label: 'Componentes', link: '/docs/componentes' },
      { label: 'Layouts', link: '/docs/layouts' },
      { label: 'Rutas', link: '/docs/rutas' },
    ],
  },
  {
    label: 'Referencia',
    collapsed: true,
    items: [
      { label: 'API', link: '/docs/api' },
      { label: 'Configuración', link: '/docs/config-ref' },
    ],
  },
];