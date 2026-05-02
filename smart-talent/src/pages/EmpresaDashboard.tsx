import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useVacancies } from '../features/vacancies/hooks/useVacancies'
import { useApplications } from '../features/applications/hooks/useApplications'
import { VacancyCard } from '../features/vacancies/components/VacancyCard'
import { VacancyForm } from '../features/vacancies/components/VacancyForm'
import { ApplicationList } from '../features/applications/components/ApplicationList'
import { Modal } from '../components/ui/Modal'
import { Button } from '../components/ui/Button'
import type { EmpresaUser, Vacancy } from '../types'

export function EmpresaDashboard() {
  const { currentUser } = useApp()
  if (!currentUser || currentUser.role !== 'empresa') return null
  const empresa = currentUser as EmpresaUser

  const { createVacancy, deleteVacancy, getByCompany } = useVacancies()
  const { getByVacancy, updateStatus } = useApplications()

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null)

  const companyVacancies = getByCompany(empresa.companyName)
  const totalApplicants = companyVacancies.reduce(
    (sum, v) => sum + getByVacancy(v.id).length,
    0
  )

  const handleCreate = (input: Omit<Vacancy, 'id' | 'createdAt'>) => {
    createVacancy(input)
    setShowCreateModal(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis vacantes</h1>
          <p className="text-sm text-gray-500 mt-1">
            {empresa.companyName} · {companyVacancies.length} publicada
            {companyVacancies.length !== 1 ? 's' : ''} · {totalApplicants} candidato
            {totalApplicants !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>+ Publicar vacante</Button>
      </div>

      {companyVacancies.length === 0 ? (
        <EmptyState onPublish={() => setShowCreateModal(true)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {companyVacancies.map(vacancy => (
            <div key={vacancy.id} className="relative group">
              <VacancyCard
                vacancy={vacancy}
                applicantCount={getByVacancy(vacancy.id).length}
                onView={() => setSelectedVacancy(vacancy)}
              />
              <button
                onClick={() => deleteVacancy(vacancy.id)}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 p-1 rounded"
                title="Eliminar vacante"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Publicar nueva vacante">
        <VacancyForm
          companyName={empresa.companyName}
          onSubmit={handleCreate}
          onCancel={() => setShowCreateModal(false)}
        />
      </Modal>

      <Modal
        isOpen={!!selectedVacancy}
        onClose={() => setSelectedVacancy(null)}
        title={selectedVacancy?.title ?? ''}
        size="lg"
      >
        {selectedVacancy && (
          <ApplicationList
            applications={getByVacancy(selectedVacancy.id)}
            onUpdateStatus={updateStatus}
          />
        )}
      </Modal>
    </div>
  )
}

function EmptyState({ onPublish }: { onPublish: () => void }) {
  return (
    <div className="text-center py-20">
      <span className="text-6xl">📋</span>
      <h2 className="text-xl font-semibold text-gray-900 mt-4">No tienes vacantes publicadas</h2>
      <p className="text-gray-500 text-sm mt-2 mb-6">
        Publica tu primera vacante para comenzar a recibir candidatos.
      </p>
      <Button onClick={onPublish}>Publicar primera vacante</Button>
    </div>
  )
}
