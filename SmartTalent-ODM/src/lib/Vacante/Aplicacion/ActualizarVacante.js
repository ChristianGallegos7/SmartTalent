class ActualizarVacante {
  constructor(repositorio) { this.repositorio = repositorio; }
  async ejecutar(id, datos) {
    const vacante = await this.repositorio.update(id, datos);
    if (!vacante) throw Object.assign(new Error("Vacante no encontrada"), { statusCode: 404 });
    return vacante;
  }
}
module.exports = ActualizarVacante;
