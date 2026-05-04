class EliminarPostulacion {
  constructor(repositorio) { this.repositorio = repositorio; }
  async ejecutar(id) {
    const eliminado = await this.repositorio.delete(id);
    if (!eliminado) throw Object.assign(new Error("Postulacion no encontrada"), { statusCode: 404 });
    return { message: "Postulacion eliminada correctamente" };
  }
}
module.exports = EliminarPostulacion;
