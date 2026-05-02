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
  applicantCount?: number
  hasApplied?: boolean
  onView: () => void
}

export function VacancyCard({ vacancy, applicantCount, hasApplied, onView }: Props) {
  const { label, variant } = JOB_TYPE_CONFIG[vacancy.type]
  const isEmpresaView = applicantCount !== undefined

  const postedDate = new Date(vacancy.createdAt).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
  })

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-base leading-snug">{vacancy.title}</h3>
          <p className="text-sm text-gray-500 mt-0.5">{vacancy.company}</p>
        </div>
        {hasApplied && <Badge variant="green">Aplicaste</Badge>}
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        <Badge variant={variant}>{label}</Badge>
        <span className="text-xs text-gray-500">📍 {vacancy.location}</span>
        {vacancy.salary && <span className="text-xs text-gray-500">💰 {vacancy.salary}</span>}
      </div>

      <p className="text-sm text-gray-600 mt-3 line-clamp-2 flex-1">{vacancy.description}</p>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">
          {isEmpresaView
            ? `${applicantCount} candidato${applicantCount !== 1 ? 's' : ''}`
            : `Publicado ${postedDate}`}
        </span>
        <Button variant="secondary" size="sm" onClick={onView}>
          {isEmpresaView ? 'Ver candidatos' : 'Ver vacante'}
        </Button>
      </div>
    </div>
  )
}
