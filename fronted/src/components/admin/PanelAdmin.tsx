import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerSesion } from "../../api/session";
import { logoutUsuario } from "../../api/auth";
import { listarVacantes, crearVacante, eliminarVacante } from "../../api/vacantes";
import { listarPostulaciones } from "../../api/postulaciones";
import { listarHabilidades } from "../../api/habilidades";
import { listarVacanteHabilidades, asociarHabilidadVacante } from "../../api/vacanteHabilidades";
import type { Vacante } from "../../tipos/vacante";
import type { Postulacion } from "../../tipos/postulacion";
import type { Habilidad } from "../../tipos/habilidad";
import type { VacanteHabilidad } from "../../api/vacanteHabilidades";

type Pestana = "vacantes" | "postulaciones";

export default function PanelAdmin() {
  const navegar = useNavigate();
  const usuario = obtenerSesion()!;
  const [pestana, setPestana] = useState<Pestana>("vacantes");
  const [vacantes, setVacantes] = useState<Vacante[]>([]);
  const [postulaciones, setPostulaciones] = useState<Postulacion[]>([]);
  const [habilidades, setHabilidades] = useState<Habilidad[]>([]);
  const [vacanteHabilidades, setVacanteHabilidades] = useState<VacanteHabilidad[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [formulario, setFormulario] = useState({ titulo: "", descripcion: "" });
  const [habilidadesSeleccionadas, setHabilidadesSeleccionadas] = useState<number[]>([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [creando, setCreando] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    setCargando(true);
    setError("");
    try {
      const [listaVacantes, listaPostulaciones, listaHabilidades, listaVH] = await Promise.all([
        listarVacantes(),
        listarPostulaciones(),
        listarHabilidades(),
        listarVacanteHabilidades(),
      ]);
      setVacantes(listaVacantes);
      setPostulaciones(listaPostulaciones);
      setHabilidades(listaHabilidades);
      setVacanteHabilidades(listaVH);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar datos");
    } finally {
      setCargando(false);
    }
  }

  async function manejarCrearVacante(e: React.FormEvent) {
    e.preventDefault();
    setCreando(true);
    try {
      const nuevaVacante = await crearVacante({
        titulo: formulario.titulo,
        descripcion: formulario.descripcion,
      });
      await Promise.all(
        habilidadesSeleccionadas.map((habilidad_id) =>
          asociarHabilidadVacante(nuevaVacante.vacante_id, habilidad_id)
        )
      );
      setFormulario({ titulo: "", descripcion: "" });
      setHabilidadesSeleccionadas([]);
      setMostrarFormulario(false);
      await cargarDatos();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear vacante");
    } finally {
      setCreando(false);
    }
  }

  async function manejarEliminarVacante(id: number) {
    if (!confirm("¿Eliminar esta vacante?")) return;
    try {
      await eliminarVacante(id);
      setVacantes((prev) => prev.filter((v) => v.vacante_id !== id));
      setVacanteHabilidades((prev) => prev.filter((vh) => vh.vacante_id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar vacante");
    }
  }

  function toggleHabilidad(id: number) {
    setHabilidadesSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((h) => h !== id) : [...prev, id]
    );
  }

  function habilidadesDeVacante(vacante_id: number): Habilidad[] {
    const ids = vacanteHabilidades
      .filter((vh) => vh.vacante_id === vacante_id)
      .map((vh) => vh.habilidad_id);
    return habilidades.filter((h) => ids.includes(h.habilidad_id));
  }

  function cerrarSesion() {
    logoutUsuario();
    navegar("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">SmartTalent</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Admin: <span className="font-medium text-gray-800">{usuario.nombre}</span>
          </span>
          <button
            onClick={cerrarSesion}
            className="text-sm text-red-500 hover:text-red-700 font-medium"
          >
            Cerrar sesión
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm border border-red-100">
            {error}
          </div>
        )}

        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-8">
          {(["vacantes", "postulaciones"] as Pestana[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setPestana(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                pestana === tab
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {cargando ? (
          <p className="text-gray-400 text-center py-12">Cargando...</p>
        ) : (
          <>
            {pestana === "vacantes" && (
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Vacantes ({vacantes.length})
                  </h2>
                  <button
                    onClick={() => {
                      setMostrarFormulario(!mostrarFormulario);
                      setHabilidadesSeleccionadas([]);
                    }}
                    className="bg-black text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-all"
                  >
                    {mostrarFormulario ? "Cancelar" : "+ Nueva vacante"}
                  </button>
                </div>

                {mostrarFormulario && (
                  <form
                    onSubmit={manejarCrearVacante}
                    className="bg-white rounded-2xl border border-gray-100 p-6 mb-6 space-y-4"
                  >
                    <h3 className="font-semibold text-gray-800">Nueva vacante</h3>
                    <input
                      type="text"
                      placeholder="Título"
                      required
                      value={formulario.titulo}
                      onChange={(e) =>
                        setFormulario((prev) => ({ ...prev, titulo: e.target.value }))
                      }
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      placeholder="Descripción"
                      required
                      value={formulario.descripcion}
                      onChange={(e) =>
                        setFormulario((prev) => ({ ...prev, descripcion: e.target.value }))
                      }
                      className="w-full px-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={3}
                    />

                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Tecnologías requeridas
                      </p>
                      {habilidades.length === 0 ? (
                        <p className="text-sm text-gray-400">
                          No hay habilidades registradas aún.
                        </p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {habilidades.map((h) => {
                            const seleccionada = habilidadesSeleccionadas.includes(h.habilidad_id);
                            return (
                              <button
                                key={h.habilidad_id}
                                type="button"
                                onClick={() => toggleHabilidad(h.habilidad_id)}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                  seleccionada
                                    ? "bg-black text-white"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                              >
                                {h.nombre}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={creando}
                      className="bg-black text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
                    >
                      {creando ? "Creando..." : "Crear vacante"}
                    </button>
                  </form>
                )}

                <div className="space-y-3">
                  {vacantes.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">
                      No hay vacantes registradas
                    </p>
                  ) : (
                    vacantes.map((vacante) => {
                      const skills = habilidadesDeVacante(vacante.vacante_id);
                      return (
                        <div
                          key={vacante.vacante_id}
                          className="bg-white rounded-2xl border border-gray-100 p-5 flex justify-between items-start"
                        >
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{vacante.titulo}</h3>
                            <p className="text-sm text-gray-500 mt-1">{vacante.descripcion}</p>
                            {skills.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-3">
                                {skills.map((h) => (
                                  <span
                                    key={h.habilidad_id}
                                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg"
                                  >
                                    {h.nombre}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => manejarEliminarVacante(vacante.vacante_id)}
                            className="text-red-400 hover:text-red-600 text-sm font-medium transition-colors shrink-0 ml-4"
                          >
                            Eliminar
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </section>
            )}

            {pestana === "postulaciones" && (
              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Postulaciones ({postulaciones.length})
                </h2>
                {postulaciones.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">
                    No hay postulaciones registradas
                  </p>
                ) : (
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                          <th className="text-left px-5 py-3 font-medium text-gray-500">ID</th>
                          <th className="text-left px-5 py-3 font-medium text-gray-500">Candidato</th>
                          <th className="text-left px-5 py-3 font-medium text-gray-500">Vacante</th>
                          <th className="text-left px-5 py-3 font-medium text-gray-500">Match</th>
                        </tr>
                      </thead>
                      <tbody>
                        {postulaciones.map((p) => (
                          <tr key={p.postulacion_id} className="border-b border-gray-50 last:border-0">
                            <td className="px-5 py-3 text-gray-400">#{p.postulacion_id}</td>
                            <td className="px-5 py-3 text-gray-700">Usuario #{p.usuario_id}</td>
                            <td className="px-5 py-3 text-gray-700">Vacante #{p.vacante_id}</td>
                            <td className="px-5 py-3 text-gray-700">{p.match_score ?? "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            )}
          </>
        )}
      </main>
    </div>
  );
}
