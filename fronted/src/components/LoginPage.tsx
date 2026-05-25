import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../api/auth";

export default function PaginaLogin() {
  const navegar = useNavigate();
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  async function manejarEnvio(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      const respuesta = await loginUsuario(correo, clave);
      navegar(respuesta.usuario.rol === "admin" ? "/admin" : "/candidato");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo conectar con el servidor",
      );
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-10 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bienvenido de nuevo
          </h1>
          <p className="text-gray-500">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={manejarEnvio} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Correo electrónico"
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              required
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              className="w-full px-5 py-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-4 rounded-2xl transition-all disabled:opacity-50"
          >
            {cargando ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-8">
          ¿No tienes cuenta?{" "}
          <a href="#" className="text-black font-medium hover:underline">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}
