import { obtenerToken } from "./session";
import type { Postulacion } from "../tipos/postulacion";

export type { Postulacion };

const URL_API = "http://localhost:3977";

export async function listarPostulaciones(): Promise<Postulacion[]> {
  const token = obtenerToken();
  const respuesta = await fetch(`${URL_API}/api/postulaciones/ver`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!respuesta.ok) throw new Error("Error al obtener postulaciones");
  return respuesta.json();
}

export async function crearPostulacion(datos: {
  usuario_id: number;
  vacante_id: number;
  cv: File;
}): Promise<Postulacion> {
  const token = obtenerToken();
  const formData = new FormData();
  formData.append("usuario_id", String(datos.usuario_id));
  formData.append("vacante_id", String(datos.vacante_id));
  formData.append("cv", datos.cv);

  const respuesta = await fetch(`${URL_API}/api/postulaciones/crear`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  const data = await respuesta.json();
  if (!respuesta.ok) throw new Error(data.error ?? "Error al postular");
  return data;
}
