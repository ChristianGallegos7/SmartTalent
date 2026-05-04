class EliminarVacante {
  constructor(repositorio) { this.repositorio = repositorio; }
  async ejecutar(id) {
    const eliminado = await this.repositorio.delete(id);
    if (!eliminado) throw Object.assign(new Error("Vacante no encontrada"), { statusCode: 404 });
    return { message: "Vacante eliminada correctamente" };
  }
}
module.exports = EliminarVacante;
