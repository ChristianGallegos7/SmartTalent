const API_URL = "http://localhost:3977";

export interface LoginResponse {
  token: string;
  usuario: { id: number; nombre: string; correo: string; rol: string };
}

export async function loginUsuario(
  correo: string,
  clave: string
): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/api/usuarios/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, clave }),
  });

  const data = (await res.json()) as LoginResponse & { error?: string };

  if (!res.ok) {
    throw new Error(data.error ?? "Error al iniciar sesión");
  }

  return data;
}
