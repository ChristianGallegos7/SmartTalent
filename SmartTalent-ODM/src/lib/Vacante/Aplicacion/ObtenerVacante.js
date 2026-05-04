class ObtenerVacante {
  constructor(repositorio) { this.repositorio = repositorio; }
  async ejecutar(id) {
    const vacante = await this.repositorio.findById(id);
    if (!vacante) throw Object.assign(new Error("Vacante no encontrada"), { statusCode: 404 });
    return vacante;
  }
}
module.exports = ObtenerVacante;
