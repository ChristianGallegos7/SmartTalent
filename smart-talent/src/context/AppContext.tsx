import { createContext, useContext, useMemo, type ReactNode } from 'react'
import type { AppUser, RegisterInput, CVData } from '../types'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { SEED_USERS } from '../data/seedUsers'

interface AppContextValue {
  currentUser: AppUser | null
  login: (email: string, password: string) => { success: boolean; error?: string }
  register: (data: RegisterInput) => { success: boolean; error?: string }
  logout: () => void
  updateCV: (cv: CVData) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useLocalStorage<AppUser[]>('st_users', SEED_USERS)
  const [currentUserId, setCurrentUserId] = useLocalStorage<string | null>('st_session', null)

  const currentUser = useMemo(
    () => users.find(u => u.id === currentUserId) ?? null,
    [users, currentUserId]
  )

  const login = (email: string, password: string) => {
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    )
    if (!user) return { success: false, error: 'Email o contraseña incorrectos' }
    setCurrentUserId(user.id)
    return { success: true }
  }

  const register = (data: RegisterInput) => {
    const exists = users.some(u => u.email.toLowerCase() === data.email.toLowerCase())
    if (exists) return { success: false, error: 'Ya existe una cuenta con ese email' }

    const base = { id: crypto.randomUUID(), createdAt: new Date().toISOString() }
    const newUser: AppUser =
      data.role === 'empresa'
        ? { ...base, role: 'empresa', email: data.email, password: data.password, companyName: data.companyName }
        : { ...base, role: 'empleado', email: data.email, password: data.password, name: data.name }

    setUsers(prev => [...prev, newUser])
    setCurrentUserId(newUser.id)
    return { success: true }
  }

  const logout = () => setCurrentUserId(null)

  const updateCV = (cv: CVData) => {
    if (!currentUser || currentUser.role !== 'empleado') return
    setUsers(prev =>
      prev.map(u => (u.id === currentUser.id ? { ...u, cv } : u))
    )
  }

  return (
    <AppContext.Provider value={{ currentUser, login, register, logout, updateCV }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
