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
}): Promise<Postulacion> {
  const token = obtenerToken();
  const respuesta = await fetch(`${URL_API}/api/postulaciones/crear`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(datos),
  });
  const data = await respuesta.json();
  if (!respuesta.ok) throw new Error(data.error ?? "Error al postular");
  return data;
}
