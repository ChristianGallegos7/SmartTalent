import type { AppUser } from '../types'

const ts = (daysAgo: number) => new Date(Date.now() - daysAgo * 864e5).toISOString()

export const SEED_USERS: AppUser[] = [
  {
    id: 'seed-empresa-1',
    email: 'empresa@demo.com',
    password: 'demo123',
    role: 'empresa',
    companyName: 'TechCorp',
    createdAt: ts(30),
  },
  {
    id: 'seed-empleado-1',
    email: 'empleado@demo.com',
    password: 'demo123',
    role: 'empleado',
    name: 'Juan García',
    createdAt: ts(15),
  },
]
