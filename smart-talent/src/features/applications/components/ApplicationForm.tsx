import { useState, type FormEvent } from 'react'
import type { Application, Vacancy, CVData } from '../../../types'
import { Button } from '../../../components/ui/Button'
import { Badge } from '../../../components/ui/Badge'

type ApplicationInput = Omit<Application, 'id' | 'appliedAt' | 'status'>

interface Props {
  vacancy: Vacancy
  applicantName: string
  applicantEmail: string
  cvData?: CVData
  onSubmit: (input: ApplicationInput) => void
  onCancel: () => void
}

const inputClass =
  'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
const labelClass = 'block text-sm font-medium text-gray-700 mb-1'

export function ApplicationForm({
  vacancy,
  applicantName,
  applicantEmail,
  cvData,
  onSubmit,
  onCancel,
}: Props) {
  const [phone, setPhone] = useState('')
  const [coverLetter, setCoverLetter] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({
      vacancyId: vacancy.id,
      applicantName,
      email: applicantEmail,
      phone,
      coverLetter,
      cvFileName: cvData?.fileName,
      cvBase64: cvData?.base64,
      cvExtractedData: cvData?.extractedData,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
        <p className="text-xs text-blue-600 font-medium">Aplicando a</p>
        <p className="text-sm font-semibold text-blue-900 mt-0.5">{vacancy.title}</p>
        <p className="text-xs text-blue-700">{vacancy.company}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Nombre completo</label>
          <input
            type="text"
            value={applicantName}
            disabled
            className={`${inputClass} bg-gray-50 text-gray-500`}
          />
        </div>
        <div>
          <label className={labelClass}>Correo electrónico</label>
          <input
            type="email"
            value={applicantEmail}
            disabled
            className={`${inputClass} bg-gray-50 text-gray-500`}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Teléfono *</label>
        <input
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="+52 55 1234 5678"
          required
          className={inputClass}
        />
      </div>

      <div>
        <p className={labelClass}>CV adjunto</p>
        {cvData ? (
          <div className="flex items-center gap-2 px-3 py-2.5 bg-green-50 border border-green-200 rounded-lg">
            <span className="text-green-500 shrink-0">✓</span>
            <span className="text-sm text-green-800 font-medium truncate">{cvData.fileName}</span>
            {cvData.extractedData && (
              <Badge variant="green">Analizado con IA</Badge>
            )}
          </div>
        ) : (
          <div className="px-3 py-2.5 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              No has subido tu CV.{' '}
              <span className="font-medium">Ve a Mi Perfil para subirlo.</span>
            </p>
          </div>
        )}
      </div>

      <div>
        <label className={labelClass}>Carta de presentación *</label>
        <textarea
          value={coverLetter}
          onChange={e => setCoverLetter(e.target.value)}
          placeholder="Cuéntanos por qué eres el candidato ideal para esta posición..."
          required
          rows={5}
          className={inputClass}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" className="flex-1">
          Enviar aplicación
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
