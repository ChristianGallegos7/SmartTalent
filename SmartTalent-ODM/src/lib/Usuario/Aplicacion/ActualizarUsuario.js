class ActualizarUsuario {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  async ejecutar(id, datos) {
    const usuario = await this.repositorio.update(id, datos);
    if (!usuario) throw Object.assign(new Error("Usuario no encontrado"), { statusCode: 404 });
    return usuario;
  }
}

module.exports = ActualizarUsuario;
