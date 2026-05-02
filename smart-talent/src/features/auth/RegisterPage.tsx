import { useState, type FormEvent } from 'react'
import { useApp } from '../../context/AppContext'
import { Button } from '../../components/ui/Button'
import type { RegisterInput, Role } from '../../types'

interface Props {
  onNavigateToLogin: () => void
}

const inputClass =
  'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
const labelClass = 'block text-sm font-medium text-gray-700 mb-1'

export function RegisterPage({ onNavigateToLogin }: Props) {
  const { register } = useApp()
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [companyName, setCompanyName] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 400))

    const data: RegisterInput =
      selectedRole === 'empresa'
        ? { role: 'empresa', email, password, companyName }
        : { role: 'empleado', email, password, name }

    const result = register(data)
    if (!result.success) setError(result.error ?? 'Error al registrarse')
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span className="text-white font-bold text-xl">ST</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">SmartTalent</h1>
        <p className="text-gray-500 mt-1">Portal de empleo inteligente</p>
      </div>

      {!selectedRole ? (
        <div className="w-full max-w-xl">
          <h2 className="text-xl font-bold text-gray-900 text-center mb-6">¿Cómo quieres registrarte?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <RoleCard
              icon="🏢"
              title="Como Empresa"
              description="Publica vacantes y gestiona candidatos"
              onClick={() => setSelectedRole('empresa')}
            />
            <RoleCard
              icon="👤"
              title="Como Empleado"
              description="Explora vacantes y aplica fácilmente"
              onClick={() => setSelectedRole('empleado')}
            />
          </div>
          <p className="text-center text-sm text-gray-500 mt-6">
            ¿Ya tienes cuenta?{' '}
            <button onClick={onNavigateToLogin} className="text-blue-600 font-medium hover:underline">
              Inicia sesión
            </button>
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <button
            onClick={() => setSelectedRole(null)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            ← Volver
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{selectedRole === 'empresa' ? '🏢' : '👤'}</span>
            <h2 className="text-xl font-bold text-gray-900">
              {selectedRole === 'empresa' ? 'Registro de Empresa' : 'Registro de Empleado'}
            </h2>
          </div>
          <p className="text-sm text-gray-500 mb-6">Completa los datos para crear tu cuenta</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {selectedRole === 'empresa' ? (
              <div>
                <label className={labelClass}>Nombre de la empresa *</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  placeholder="Ej: TechCorp S.A."
                  required
                  className={inputClass}
                />
              </div>
            ) : (
              <div>
                <label className={labelClass}>Nombre completo *</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Juan García"
                  required
                  className={inputClass}
                />
              </div>
            )}

            <div>
              <label className={labelClass}>Correo electrónico *</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                autoComplete="email"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Contraseña *</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                required
                autoComplete="new-password"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Confirmar contraseña *</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Repite tu contraseña"
                required
                autoComplete="new-password"
                className={inputClass}
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-5">
            ¿Ya tienes cuenta?{' '}
            <button onClick={onNavigateToLogin} className="text-blue-600 font-medium hover:underline">
              Inicia sesión
            </button>
          </p>
        </div>
      )}
    </div>
  )
}

interface RoleCardProps {
  icon: string
  title: string
  description: string
  onClick: () => void
}

function RoleCard({ icon, title, description, onClick }: RoleCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl shadow-md p-6 text-left hover:shadow-lg hover:-translate-y-1 transition-all border-2 border-transparent hover:border-blue-200 cursor-pointer w-full"
    >
      <span className="text-4xl">{icon}</span>
      <h3 className="text-xl font-bold text-gray-900 mt-3">{title}</h3>
      <p className="text-gray-500 text-sm mt-1">{description}</p>
    </button>
  )
}
