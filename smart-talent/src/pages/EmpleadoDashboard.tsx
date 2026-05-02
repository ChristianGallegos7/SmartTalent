import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useVacancies } from '../features/vacancies/hooks/useVacancies'
import { useApplications } from '../features/applications/hooks/useApplications'
import { VacancyCard } from '../features/vacancies/components/VacancyCard'
import { VacancyDetail } from '../features/vacancies/components/VacancyDetail'
import { ApplicationForm } from '../features/applications/components/ApplicationForm'
import { Modal } from '../components/ui/Modal'
import type { EmpleadoUser, Vacancy } from '../types'

export function EmpleadoDashboard() {
  const { currentUser } = useApp()
  if (!currentUser || currentUser.role !== 'empleado') return null
  const empleado = currentUser as EmpleadoUser

  const { vacancies } = useVacancies()
  const { createApplication, hasApplied } = useApplications()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null)
  const [applyingTo, setApplyingTo] = useState<Vacancy | null>(null)

  const filteredVacancies = vacancies.filter(v => {
    const q = searchQuery.toLowerCase()
    return (
      v.title.toLowerCase().includes(q) ||
      v.company.toLowerCase().includes(q) ||
      v.location.toLowerCase().includes(q)
    )
  })

  const handleApply = (input: Parameters<typeof createApplication>[0]) => {
    createApplication(input)
    setApplyingTo(null)
  }

  if (selectedVacancy) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <VacancyDetail
          vacancy={selectedVacancy}
          hasApplied={hasApplied(selectedVacancy.id, empleado.email)}
          onApply={() => setApplyingTo(selectedVacancy)}
          onBack={() => setSelectedVacancy(null)}
        />

        <Modal isOpen={!!applyingTo} onClose={() => setApplyingTo(null)} title="Enviar aplicación">
          {applyingTo && (
            <ApplicationForm
              vacancy={applyingTo}
              applicantName={empleado.name}
              applicantEmail={empleado.email}
              cvData={empleado.cv}
              onSubmit={handleApply}
              onCancel={() => setApplyingTo(null)}
            />
          )}
        </Modal>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Vacantes disponibles</h1>
        <p className="text-sm text-gray-500 mt-1">
          Hola, {empleado.name}. Encuentra tu próxima oportunidad.
        </p>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar por puesto, empresa o ubicación..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {filteredVacancies.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-6xl">🔍</span>
          <p className="text-gray-500 mt-4 text-sm">
            {searchQuery ? 'No se encontraron vacantes con esa búsqueda.' : 'No hay vacantes disponibles.'}
          </p>
        </div>
      ) : (
        <>
          <p className="text-xs text-gray-400 mb-4">
            {filteredVacancies.length} vacante{filteredVacancies.length !== 1 ? 's' : ''}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredVacancies.map(vacancy => (
              <VacancyCard
                key={vacancy.id}
                vacancy={vacancy}
                hasApplied={hasApplied(vacancy.id, empleado.email)}
                onView={() => setSelectedVacancy(vacancy)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
