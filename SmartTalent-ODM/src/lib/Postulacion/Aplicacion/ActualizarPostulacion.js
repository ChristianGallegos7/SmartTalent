class ActualizarPostulacion {
  constructor(repositorio) { this.repositorio = repositorio; }
  async ejecutar(id, datos) {
    const item = await this.repositorio.update(id, datos);
    if (!item) throw Object.assign(new Error("Postulacion no encontrada"), { statusCode: 404 });
    return item;
  }
}
module.exports = ActualizarPostulacion;
