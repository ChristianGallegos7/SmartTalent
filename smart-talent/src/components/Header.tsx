import { useApp } from '../context/AppContext'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import type { EmpresaUser, EmpleadoUser } from '../types'

interface Props {
  onProfileClick?: () => void
  isProfilePage?: boolean
}

export function Header({ onProfileClick, isProfilePage }: Props) {
  const { currentUser, logout } = useApp()

  if (!currentUser) return null

  const isEmpresa = currentUser.role === 'empresa'
  const displayName = isEmpresa
    ? (currentUser as EmpresaUser).companyName
    : (currentUser as EmpleadoUser).name

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">ST</span>
          </div>
          <span className="font-bold text-gray-900 text-lg">SmartTalent</span>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={isEmpresa ? 'blue' : 'green'}>
            {isEmpresa ? 'Empresa' : 'Empleado'}
          </Badge>
          <span className="text-sm text-gray-700 font-medium hidden sm:block">{displayName}</span>
          {!isEmpresa && onProfileClick && (
            <Button
              variant={isProfilePage ? 'primary' : 'ghost'}
              size="sm"
              onClick={onProfileClick}
            >
              Mi perfil
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={logout}>
            Salir
          </Button>
        </div>
      </div>
    </header>
  )
}
