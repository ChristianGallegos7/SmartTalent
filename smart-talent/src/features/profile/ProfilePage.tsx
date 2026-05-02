import { useApp } from '../../context/AppContext'
import { CVUpload } from './CVUpload'
import type { EmpleadoUser, CVData } from '../../types'

interface Props {
  onBack: () => void
}

export function ProfilePage({ onBack }: Props) {
  const { currentUser, updateCV } = useApp()

  if (!currentUser || currentUser.role !== 'empleado') return null
  const empleado = currentUser as EmpleadoUser

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          ← Volver a vacantes
        </button>
        <span className="text-gray-300">/</span>
        <h1 className="text-xl font-bold text-gray-900">Mi perfil</h1>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Información personal</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InfoField label="Nombre" value={empleado.name} />
            <InfoField label="Correo electrónico" value={empleado.email} />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-base font-semibold text-gray-900">Mi CV</h2>
            {empleado.cv?.extractedData && (
              <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                ✓ Analizado con IA
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500 mb-5">
            Tu CV se adjunta automáticamente al aplicar. El análisis con IA extrae tus habilidades
            para que las empresas puedan encontrarte más fácilmente.
          </p>
          <CVUpload
            currentCV={empleado.cv}
            onSave={(cv: CVData) => updateCV(cv)}
          />
        </div>
      </div>
    </div>
  )
}

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-400 mb-1">{label.toUpperCase()}</p>
      <p className="text-sm text-gray-900 font-medium">{value}</p>
    </div>
  )
}
