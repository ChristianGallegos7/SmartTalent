class EliminarUsuario {
  constructor(repositorio) {
    this.repositorio = repositorio;
  }

  async ejecutar(id) {
    const eliminado = await this.repositorio.delete(id);
    if (!eliminado) throw Object.assign(new Error("Usuario no encontrado"), { statusCode: 404 });
    return { message: "Usuario eliminado correctamente" };
  }
}

module.exports = EliminarUsuario;
