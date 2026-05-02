import { useLocalStorage } from '../../../hooks/useLocalStorage'
import { MOCK_VACANCIES } from '../../../data/mockVacancies'
import type { Vacancy } from '../../../types'

type CreateVacancyInput = Omit<Vacancy, 'id' | 'createdAt'>

export function useVacancies() {
  const [vacancies, setVacancies] = useLocalStorage<Vacancy[]>('st_vacancies', MOCK_VACANCIES)

  const createVacancy = (input: CreateVacancyInput) => {
    const newVacancy: Vacancy = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    setVacancies(prev => [newVacancy, ...prev])
  }

  const deleteVacancy = (id: string) => {
    setVacancies(prev => prev.filter(v => v.id !== id))
  }

  const getByCompany = (companyName: string) =>
    vacancies.filter(v => v.company.toLowerCase() === companyName.toLowerCase())

  return { vacancies, createVacancy, deleteVacancy, getByCompany }
}
