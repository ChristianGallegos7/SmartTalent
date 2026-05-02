import { useState } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import { LoginPage } from './features/auth/LoginPage'
import { RegisterPage } from './features/auth/RegisterPage'
import { ProfilePage } from './features/profile/ProfilePage'
import { EmpresaDashboard } from './pages/EmpresaDashboard'
import { EmpleadoDashboard } from './pages/EmpleadoDashboard'
import { Header } from './components/Header'

type AuthView = 'login' | 'register'
type AppPage = 'dashboard' | 'profile'

function AuthFlow() {
  const [view, setView] = useState<AuthView>('login')
  return view === 'login'
    ? <LoginPage onNavigateToRegister={() => setView('register')} />
    : <RegisterPage onNavigateToLogin={() => setView('login')} />
}

function AppContent() {
  const { currentUser } = useApp()
  const [page, setPage] = useState<AppPage>('dashboard')

  if (!currentUser) return <AuthFlow />

  const isEmpresa = currentUser.role === 'empresa'
  const isProfilePage = page === 'profile' && !isEmpresa

  const toggleProfile = () => setPage(prev => (prev === 'profile' ? 'dashboard' : 'profile'))

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onProfileClick={toggleProfile} isProfilePage={isProfilePage} />
      {isProfilePage
        ? <ProfilePage onBack={() => setPage('dashboard')} />
        : isEmpresa
          ? <EmpresaDashboard />
          : <EmpleadoDashboard />}
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
