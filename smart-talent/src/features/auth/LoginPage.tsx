import { useState, type FormEvent } from 'react'
import { useApp } from '../../context/AppContext'
import { Button } from '../../components/ui/Button'

interface Props {
  onNavigateToRegister: () => void
}

const inputClass =
  'w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
const labelClass = 'block text-sm font-medium text-gray-700 mb-1'

export function LoginPage({ onNavigateToRegister }: Props) {
  const { login } = useApp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 400))
    const result = login(email, password)
    if (!result.success) setError(result.error ?? 'Error al iniciar sesión')
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

      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Bienvenido de vuelta</h2>
        <p className="text-sm text-gray-500 mb-6">Ingresa con tu cuenta para continuar</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={labelClass}>Correo electrónico</label>
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
            <label className={labelClass}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className={inputClass}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </Button>
        </form>

        <div className="mt-5 pt-5 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            ¿No tienes cuenta?{' '}
            <button
              onClick={onNavigateToRegister}
              className="text-blue-600 font-medium hover:underline"
            >
              Regístrate aquí
            </button>
          </p>
        </div>

        <div className="mt-5 bg-gray-50 rounded-xl p-4">
          <p className="text-xs font-semibold text-gray-500 mb-2">Cuentas de demo</p>
          <div className="space-y-1.5">
            <DemoRow label="Empresa" email="empresa@demo.com" />
            <DemoRow label="Empleado" email="empleado@demo.com" />
          </div>
          <p className="text-xs text-gray-400 mt-2">Contraseña: <span className="font-mono">demo123</span></p>
        </div>
      </div>
    </div>
  )
}

function DemoRow({ label, email }: { label: string; email: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-500 font-medium">{label}</span>
      <span className="text-xs text-gray-700 font-mono">{email}</span>
    </div>
  )
}
