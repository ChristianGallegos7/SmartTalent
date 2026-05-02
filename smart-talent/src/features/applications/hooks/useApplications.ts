import { useLocalStorage } from '../../../hooks/useLocalStorage'
import type { Application, ApplicationStatus } from '../../../types'

type CreateApplicationInput = Omit<Application, 'id' | 'appliedAt' | 'status'>

export function useApplications() {
  const [applications, setApplications] = useLocalStorage<Application[]>('st_applications', [])

  const createApplication = (input: CreateApplicationInput) => {
    const newApp: Application = {
      ...input,
      id: crypto.randomUUID(),
      appliedAt: new Date().toISOString(),
      status: 'pending',
    }
    setApplications(prev => [newApp, ...prev])
  }

  const updateStatus = (id: string, status: ApplicationStatus) => {
    setApplications(prev => prev.map(a => (a.id === id ? { ...a, status } : a)))
  }

  const getByVacancy = (vacancyId: string) =>
    applications.filter(a => a.vacancyId === vacancyId)

  const hasApplied = (vacancyId: string, email: string) =>
    applications.some(
      a => a.vacancyId === vacancyId && a.email.toLowerCase() === email.toLowerCase()
    )

  return { applications, createApplication, updateStatus, getByVacancy, hasApplied }
}
