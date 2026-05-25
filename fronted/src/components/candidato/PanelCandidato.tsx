import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerSesion } from "../../api/session";
import { logoutUsuario } from "../../api/auth";
import { listarVacantes } from "../../api/vacantes";
import { listarPostulaciones, crearPostulacion } from "../../api/postulaciones";
import { listarHabilidades } from "../../api/habilidades";
import { listarVacanteHabilidades } from "../../api/vacanteHabilidades";
import type { Vacante } from "../../tipos/vacante";
import type { Postulacion } from "../../tipos/postulacion";
import type { Habilidad } from "../../tipos/habilidad";
import type { VacanteHabilidad } from "../../api/vacanteHabilidades";

type Pestana = "vacantes" | "postulaciones" | "perfil";

const etiquetasPestanas: Record<Pestana, string> = {
  vacantes: "Vacantes",
  postulaciones: "Mis postulaciones",
  perfil: "Mi perfil",
};

export default function PanelCandidato() {
  const navegar = useNavigate();
  const usuario = obtenerSesion()!;
  const [pestana, setPestana] = useState<Pestana>("vacantes");
  const [vacantes, setVacantes] = useState<Vacante[]>([]);
  const [postulaciones, setPostulaciones] = useState<Postulacion[]>([]);
  const [habilidades, setHabilidades] = useState<Habilidad[]>([]);
  const [vacanteHabilidades, setVacanteHabilidades] = useState<VacanteHabilidad[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [postulando, setPostulando] = useState(false);
  const [modalVacante, setModalVacante] = useState<Vacante | null>(null);
  const [archivoCV, setArchivoCV] = useState<File | null>(null);

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

  function abrirModal(vacante: Vacante) {
    setModalVacante(vacante);
    setArchivoCV(null);
    setError("");
  }

  function cerrarModal() {
    setModalVacante(null);
    setArchivoCV(null);
  }

  async function manejarPostular() {
    if (!modalVacante || !archivoCV) return;
    setPostulando(true);
    try {
      await crearPostulacion({
        usuario_id: usuario.id,
        vacante_id: modalVacante.vacante_id,
        cv: archivoCV,
      });
      cerrarModal();
      await cargarDatos();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al postular");
    } finally {
      setPostulando(false);
    }
  }

  function habilidadesDeVacante(vacante_id: number): Habilidad[] {
    const ids = vacanteHabilidades
      .filter((vh) => vh.vacante_id === vacante_id)
      .map((vh) => vh.habilidad_id);
    return habilidades.filter((h) => ids.includes(h.habilidad_id));
  }

  const misPostulaciones = postulaciones.filter((p) => p.usuario_id === usuario.id);
  const yaPostulo = (vacanteId: number) => misPostulaciones.some((p) => p.vacante_id === vacanteId);

  function cerrarSesion() {
    logoutUsuario();
    navegar("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">SmartTalent</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-800">{usuario.nombre}</span>
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
          {(["vacantes", "postulaciones", "perfil"] as Pestana[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setPestana(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                pestana === tab
                  ? "bg-white shadow-sm text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {etiquetasPestanas[tab]}
            </button>
          ))}
        </div>

        {cargando ? (
          <p className="text-gray-400 text-center py-12">Cargando...</p>
        ) : (
          <>
            {pestana === "vacantes" && (
              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Vacantes disponibles
                </h2>
                {vacantes.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">
                    No hay vacantes disponibles
                  </p>
                ) : (
                  <div className="grid gap-4">
                    {vacantes.map((vacante) => {
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
                          onClick={() => abrirModal(vacante)}
                          disabled={yaPostulo(vacante.vacante_id)}
                          className={`shrink-0 ml-4 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                            yaPostulo(vacante.vacante_id)
                              ? "bg-green-50 text-green-600 cursor-default"
                              : "bg-black text-white hover:bg-gray-800"
                          }`}
                        >
                          {yaPostulo(vacante.vacante_id) ? "Postulado" : "Postular"}
                        </button>
                      </div>
                      );
                    })}
                  </div>
                )}
              </section>
            )}

            {pestana === "postulaciones" && (
              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Mis postulaciones ({misPostulaciones.length})
                </h2>
                {misPostulaciones.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">
                    Aún no te has postulado a ninguna vacante
                  </p>
                ) : (
                  <div className="space-y-3">
                    {misPostulaciones.map((p) => {
                      const vacante = vacantes.find((v) => v.vacante_id === p.vacante_id);
                      return (
                        <div
                          key={p.postulacion_id}
                          className="bg-white rounded-2xl border border-gray-100 p-5"
                        >
                          <h3 className="font-semibold text-gray-900">
                            {vacante?.titulo ?? `Vacante #${p.vacante_id}`}
                          </h3>
                          {vacante && (
                            <p className="text-sm text-gray-500 mt-1">{vacante.descripcion}</p>
                          )}
                          {p.match_score != null && (
                            <span className="inline-block mt-2 text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-lg">
                              Match: {p.match_score}%
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            )}

            {pestana === "perfil" && (
              <section>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Mi perfil</h2>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 max-w-md">
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wide">
                      Nombre
                    </label>
                    <p className="text-gray-900 font-medium mt-1">{usuario.nombre}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wide">
                      Correo
                    </label>
                    <p className="text-gray-900 font-medium mt-1">{usuario.correo}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 uppercase tracking-wide">Rol</label>
                    <p className="text-gray-900 font-medium mt-1 capitalize">{usuario.rol}</p>
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {modalVacante && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-5">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Postular a vacante</h2>
              <p className="text-sm text-gray-500 mt-1">{modalVacante.titulo}</p>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm border border-red-100">
                {error}
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                CV en PDF <span className="text-red-400">*</span>
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setArchivoCV(e.target.files?.[0] ?? null)}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-gray-100 file:text-gray-700 file:font-medium hover:file:bg-gray-200 cursor-pointer"
              />
              {archivoCV && (
                <p className="text-xs text-gray-400 mt-1">{archivoCV.name}</p>
              )}
            </div>

            <div className="flex gap-3 pt-1">
              <button
                onClick={cerrarModal}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={manejarPostular}
                disabled={!archivoCV || postulando}
                className="flex-1 py-2.5 rounded-xl bg-black text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
              >
                {postulando ? "Enviando..." : "Enviar postulación"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
