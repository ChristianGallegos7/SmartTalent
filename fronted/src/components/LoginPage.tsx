import { useState } from 'react'

const API_URL = 'http://localhost:3977'

interface LoginResponse {
  token: string
  usuario: { id: number; nombre: string; correo: string; rol: string }
}

export default function LoginPage() {
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/api/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, clave }),
      })

      const data = await res.json() as LoginResponse & { error?: string }

      if (!res.ok) {
        setError(data.error ?? 'Error al iniciar sesión')
        return
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('usuario', JSON.stringify(data.usuario))

      // TODO: redirigir al dashboard
      alert(`Bienvenido, ${data.usuario.nombre}!`)
    } catch {
      setError('No se pudo conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center px-4" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', sans-serif" }}>
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 814 1000"
            className="w-10 h-10 fill-[#1d1d1f]"
            aria-label="SmartTalent"
          >
            <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46 790.7 0 663 0 541.8c0-207.8 134.4-318 266.5-318 99.8 0 160.7 51.9 244 51.9 79.7 0 154.4-55.2 265.2-55.2 22.4 0 150.8 3.2 238.4 138.1zm-234.3-86.4c39.9-47.5 68-112.2 68-176.9 0-9-.6-17.9-2.1-25.7-63.9 2.4-141.4 43-186.5 93.9-35.7 40-73.1 104-73.1 169.4 0 9.6 1.7 19.3 2.4 22.4 4.1.6 10.3 1.5 16.5 1.5 57.8 0 130.3-38.6 174.8-84.6z" />
          </svg>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_2px_20px_rgba(0,0,0,0.08)] px-8 py-9">
          <h1 className="text-[28px] font-semibold tracking-tight text-[#1d1d1f] text-center mb-1">
            Iniciar sesión
          </h1>
          <p className="text-[15px] text-[#6e6e73] text-center mb-8">
            Accede a tu cuenta de SmartTalent
          </p>

          {/* Error banner */}
          {error && (
            <div className="mb-5 rounded-2xl bg-[#fff2f2] border border-[#ffd0d0] px-4 py-3 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0 text-[#ff3b30]" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-[13px] text-[#c0392b]">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="relative">
              <label
                htmlFor="correo"
                className="absolute left-4 top-[11px] text-[11px] font-medium text-[#6e6e73] uppercase tracking-wider pointer-events-none"
              >
                Correo electrónico
              </label>
              <input
                id="correo"
                type="email"
                autoComplete="email"
                required
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="w-full rounded-2xl bg-[#f5f5f7] border border-transparent pt-7 pb-3 px-4 text-[15px] text-[#1d1d1f] outline-none transition-all duration-150
                  focus:border-[#0071e3] focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,113,227,0.15)]"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label
                htmlFor="clave"
                className="absolute left-4 top-[11px] text-[11px] font-medium text-[#6e6e73] uppercase tracking-wider pointer-events-none"
              >
                Contraseña
              </label>
              <input
                id="clave"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                className="w-full rounded-2xl bg-[#f5f5f7] border border-transparent pt-7 pb-3 px-4 pr-12 text-[15px] text-[#1d1d1f] outline-none transition-all duration-150
                  focus:border-[#0071e3] focus:bg-white focus:shadow-[0_0_0_3px_rgba(0,113,227,0.15)]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6e6e73] hover:text-[#1d1d1f] transition-colors"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Forgot password */}
            <div className="flex justify-end -mt-1">
              <a
                href="#"
                className="text-[13px] text-[#0071e3] hover:underline underline-offset-2"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-[#0071e3] hover:bg-[#0077ed] active:bg-[#006edb] disabled:opacity-70 text-white text-[15px] font-medium rounded-2xl py-4 transition-all duration-150 flex items-center justify-center gap-2 shadow-[0_1px_2px_rgba(0,113,227,0.3)]"
            >
              {loading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Iniciando sesión…
                </>
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#d2d2d7]" />
            <span className="text-[12px] text-[#6e6e73]">o continúa con</span>
            <div className="flex-1 h-px bg-[#d2d2d7]" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 rounded-2xl border border-[#d2d2d7] bg-white py-3 text-[14px] font-medium text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors duration-150">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 rounded-2xl border border-[#d2d2d7] bg-white py-3 text-[14px] font-medium text-[#1d1d1f] hover:bg-[#f5f5f7] transition-colors duration-150">
              <svg className="w-5 h-5 fill-[#1d1d1f]" viewBox="0 0 814 1000">
                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-127.4C46 790.7 0 663 0 541.8c0-207.8 134.4-318 266.5-318 99.8 0 160.7 51.9 244 51.9 79.7 0 154.4-55.2 265.2-55.2 22.4 0 150.8 3.2 238.4 138.1zm-234.3-86.4c39.9-47.5 68-112.2 68-176.9 0-9-.6-17.9-2.1-25.7-63.9 2.4-141.4 43-186.5 93.9-35.7 40-73.1 104-73.1 169.4 0 9.6 1.7 19.3 2.4 22.4 4.1.6 10.3 1.5 16.5 1.5 57.8 0 130.3-38.6 174.8-84.6z" />
              </svg>
              Apple
            </button>
          </div>
        </div>

        {/* Sign up link */}
        <p className="text-center text-[14px] text-[#6e6e73] mt-6">
          ¿No tienes cuenta?{' '}
          <a href="#" className="text-[#0071e3] hover:underline underline-offset-2">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  )
}
