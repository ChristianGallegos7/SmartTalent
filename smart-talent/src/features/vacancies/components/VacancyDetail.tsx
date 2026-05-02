import type { Vacancy } from '../../../types'
import { Badge } from '../../../components/ui/Badge'
import { Button } from '../../../components/ui/Button'

const JOB_TYPE_CONFIG: Record<
  Vacancy['type'],
  { label: string; variant: 'blue' | 'green' | 'purple' | 'yellow' }
> = {
  'full-time': { label: 'Tiempo completo', variant: 'blue' },
  'part-time': { label: 'Medio tiempo', variant: 'yellow' },
  remote: { label: 'Remoto', variant: 'green' },
  hybrid: { label: 'Híbrido', variant: 'purple' },
}

interface Props {
  vacancy: Vacancy
  hasApplied: boolean
  onApply: () => void
  onBack: () => void
}

export function VacancyDetail({ vacancy, hasApplied, onApply, onBack }: Props) {
  const { label, variant } = JOB_TYPE_CONFIG[vacancy.type]

  const postedDate = new Date(vacancy.createdAt).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        ← Volver a vacantes
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{vacancy.title}</h1>
            <p className="text-gray-500 mt-1 font-medium">{vacancy.company}</p>
          </div>
          {hasApplied ? (
            <Badge variant="green">Ya aplicaste</Badge>
          ) : (
            <Button size="lg" onClick={onApply}>
              Aplicar ahora
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-5">
          <Badge variant={variant}>{label}</Badge>
          <Badge variant="gray">📍 {vacancy.location}</Badge>
          {vacancy.salary && <Badge variant="gray">💰 {vacancy.salary}</Badge>}
          <Badge variant="gray">📅 {postedDate}</Badge>
        </div>

        <div className="mt-6">
          <h2 className="text-base font-semibold text-gray-900 mb-2">Descripción del puesto</h2>
          <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
            {vacancy.description}
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-base font-semibold text-gray-900 mb-3">Requisitos</h2>
          <ul className="space-y-2">
            {vacancy.requirements.map(req => (
              <li key={req} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                {req}
              </li>
            ))}
          </ul>
        </div>

        {!hasApplied && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <Button size="lg" onClick={onApply} className="w-full sm:w-auto">
              Aplicar a esta vacante
            </Button>
          </div>
        )}

        {hasApplied && (
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4">
              <span className="text-green-600 text-xl">✓</span>
              <div>
                <p className="text-sm font-medium text-green-800">Tu aplicación fue enviada</p>
                <p className="text-xs text-green-600 mt-0.5">
                  La empresa revisará tu perfil y se pondrá en contacto contigo.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
