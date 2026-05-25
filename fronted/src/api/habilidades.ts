import type { Habilidad } from "../tipos/habilidad";

const URL_API = "http://localhost:3977";

export async function listarHabilidades(): Promise<Habilidad[]> {
  const respuesta = await fetch(`${URL_API}/api/habilidades/ver`);
  if (!respuesta.ok) throw new Error("Error al obtener habilidades");
  return respuesta.json();
}
