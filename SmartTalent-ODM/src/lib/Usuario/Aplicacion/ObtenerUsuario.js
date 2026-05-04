class ObtenerUsuario {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  async ejecutar(id) {
    const usuario = await this.repositorio.findById(id);
    if (!usuario) throw Object.assign(new Error("Usuario no encontrado"), { statusCode: 404 });
    return usuario;
  }
}

module.exports = ObtenerUsuario;
