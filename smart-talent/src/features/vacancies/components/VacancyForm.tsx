import { useState, type FormEvent } from 'react'
import type { Vacancy, JobType } from '../../../types'
import { Button } from '../../../components/ui/Button'

type VacancyInput = Omit<Vacancy, 'id' | 'createdAt'>

interface Props {
  companyName: string
  onSubmit: (input: VacancyInput) => void
  onCancel: () => void
}

const inputClass =
  'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
const labelClass = 'block text-sm font-medium text-gray-700 mb-1'

const JOB_TYPE_OPTIONS: { value: JobType; label: string }[] = [
  { value: 'full-time', label: 'Tiempo completo' },
  { value: 'part-time', label: 'Medio tiempo' },
  { value: 'remote', label: 'Remoto' },
  { value: 'hybrid', label: 'Híbrido' },
]

export function VacancyForm({ companyName, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [type, setType] = useState<JobType>('full-time')
  const [salary, setSalary] = useState('')
  const [description, setDescription] = useState('')
  const [requirementsText, setRequirementsText] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const requirements = requirementsText
      .split('\n')
      .map(r => r.trim())
      .filter(Boolean)

    onSubmit({ title, company: companyName, location, type, salary, description, requirements })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelClass}>Título del puesto *</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Ej: Desarrollador Frontend Senior"
          required
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Ubicación *</label>
          <input
            type="text"
            value={location}
            onChange={e => setLocation(e.target.value)}
            placeholder="Ej: Ciudad de México"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Tipo de empleo *</label>
          <select
            value={type}
            onChange={e => setType(e.target.value as JobType)}
            className={inputClass}
          >
            {JOB_TYPE_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Salario (opcional)</label>
        <input
          type="text"
          value={salary}
          onChange={e => setSalary(e.target.value)}
          placeholder="Ej: $30,000 - $40,000 MXN"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Descripción *</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Describe el puesto, responsabilidades y beneficios..."
          required
          rows={4}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Requisitos (uno por línea) *</label>
        <textarea
          value={requirementsText}
          onChange={e => setRequirementsText(e.target.value)}
          placeholder={`React\nTypeScript\n3+ años de experiencia`}
          required
          rows={4}
          className={inputClass}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" className="flex-1">
          Publicar vacante
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
