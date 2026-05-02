import type { Application, ApplicationStatus } from '../../../types'
import { Badge } from '../../../components/ui/Badge'
import { Button } from '../../../components/ui/Button'

const STATUS_CONFIG: Record<
  ApplicationStatus,
  { label: string; variant: 'yellow' | 'blue' | 'green' | 'red' }
> = {
  pending: { label: 'Pendiente', variant: 'yellow' },
  reviewed: { label: 'Revisado', variant: 'blue' },
  accepted: { label: 'Aceptado', variant: 'green' },
  rejected: { label: 'Rechazado', variant: 'red' },
}

const STATUS_OPTIONS: { value: ApplicationStatus; label: string }[] = [
  { value: 'pending', label: 'Pendiente' },
  { value: 'reviewed', label: 'Revisado' },
  { value: 'accepted', label: 'Aceptado' },
  { value: 'rejected', label: 'Rechazado' },
]

interface Props {
  applications: Application[]
  onUpdateStatus: (id: string, status: ApplicationStatus) => void
}

const openCV = (base64: string) => {
  const a = document.createElement('a')
  a.href = base64
  a.target = '_blank'
  a.rel = 'noopener noreferrer'
  a.click()
}

export function ApplicationList({ applications, onUpdateStatus }: Props) {
  if (applications.length === 0) {
    return (
      <div className="text-center py-12">
        <span className="text-4xl">📭</span>
        <p className="text-gray-500 mt-3 text-sm">Aún no hay candidatos para esta vacante.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500">
        {applications.length} candidato{applications.length !== 1 ? 's' : ''}
      </p>

      {applications.map(app => {
        const { label, variant } = STATUS_CONFIG[app.status]
        const appliedDate = new Date(app.appliedAt).toLocaleDateString('es-MX', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })

        return (
          <div key={app.id} className="border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-gray-900 text-sm">{app.applicantName}</p>
                <p className="text-xs text-gray-500 mt-0.5">{app.email}</p>
                {app.phone && <p className="text-xs text-gray-500">{app.phone}</p>}
              </div>
              <Badge variant={variant}>{label}</Badge>
            </div>

            {app.cvExtractedData && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-gray-600">Habilidades detectadas en CV</p>
                  {app.cvBase64 && (
                    <Button variant="ghost" size="sm" onClick={() => openCV(app.cvBase64!)}>
                      Ver CV ↗
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {app.cvExtractedData.skills.map(skill => (
                    <Badge key={skill} variant="blue">{skill}</Badge>
                  ))}
                </div>
                {app.cvExtractedData.summary && (
                  <p className="text-xs text-gray-500 leading-relaxed mt-2">
                    {app.cvExtractedData.summary}
                  </p>
                )}
                {app.cvExtractedData.experienceYears !== undefined && (
                  <p className="text-xs text-gray-500 mt-1">
                    {app.cvExtractedData.experienceYears} años de experiencia
                  </p>
                )}
              </div>
            )}

            {!app.cvExtractedData && app.cvFileName && (
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-2">
                <span className="text-xs text-gray-500">📄 {app.cvFileName}</span>
                {app.cvBase64 && (
                  <button
                    onClick={() => openCV(app.cvBase64!)}
                    className="text-xs text-blue-600 hover:underline font-medium"
                  >
                    Ver CV ↗
                  </button>
                )}
              </div>
            )}

            {app.coverLetter && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-600 mb-1">Carta de presentación</p>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{app.coverLetter}</p>
              </div>
            )}

            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-400">Aplicó el {appliedDate}</span>
              <select
                value={app.status}
                onChange={e => onUpdateStatus(app.id, e.target.value as ApplicationStatus)}
                className="text-xs border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {STATUS_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        )
      })}
    </div>
  )
}
