import type { Vacancy } from '../types'

const daysAgo = (n: number) => new Date(Date.now() - n * 864e5).toISOString()

export const MOCK_VACANCIES: Vacancy[] = [
  {
    id: 'mock-1',
    title: 'Desarrollador Frontend Senior',
    company: 'TechCorp',
    location: 'Ciudad de México (Híbrido)',
    description:
      'Buscamos un desarrollador frontend con experiencia sólida en React y TypeScript. Trabajarás con el equipo de diseño y backend para construir interfaces modernas y de alto rendimiento.',
    requirements: ['React', 'TypeScript', '3+ años de experiencia', 'Git', 'Tailwind CSS'],
    salary: '$35,000 - $45,000 MXN',
    type: 'hybrid',
    createdAt: daysAgo(2),
  },
  {
    id: 'mock-2',
    title: 'Diseñador UX/UI',
    company: 'CreativeAgency',
    location: 'Monterrey (Presencial)',
    description:
      'Únete a nuestro equipo como Diseñador UX/UI. Serás responsable de crear experiencias de usuario intuitivas y visualmente atractivas para nuestros clientes.',
    requirements: ['Figma', 'Adobe XD', 'Prototipado', 'Research de usuarios', '2+ años'],
    salary: '$25,000 - $35,000 MXN',
    type: 'full-time',
    createdAt: daysAgo(5),
  },
  {
    id: 'mock-3',
    title: 'Analista de Datos',
    company: 'DataInsights',
    location: 'Remoto',
    description:
      'Buscamos un Analista de Datos para generar insights accionables a partir de grandes volúmenes de información. Colaborarás directamente con el equipo de negocio.',
    requirements: ['Python', 'SQL', 'Power BI', 'Estadística', 'Excel avanzado'],
    salary: '$28,000 - $38,000 MXN',
    type: 'remote',
    createdAt: daysAgo(7),
  },
  {
    id: 'mock-4',
    title: 'Backend Engineer',
    company: 'Fintech360',
    location: 'Guadalajara (Remoto)',
    description:
      'Desarrolla y mantén APIs REST y microservicios escalables. Formarás parte de un equipo ágil con desafíos técnicos reales en el sector fintech.',
    requirements: ['Node.js', 'PostgreSQL', 'Docker', 'REST APIs', '4+ años'],
    salary: '$40,000 - $55,000 MXN',
    type: 'remote',
    createdAt: daysAgo(1),
  },
]
