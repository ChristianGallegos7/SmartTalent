class ObtenerPostulacion {
  constructor(repositorio) { this.repositorio = repositorio; }
  async ejecutar(id) {
    const item = await this.repositorio.findById(id);
    if (!item) throw Object.assign(new Error("Postulacion no encontrada"), { statusCode: 404 });
    return item;
  }
}
module.exports = ObtenerPostulacion;
