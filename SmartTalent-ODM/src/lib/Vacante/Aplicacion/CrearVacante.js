class CrearVacante {
  constructor(repositorio) { this.repositorio = repositorio; }
  async ejecutar(datos) { return await this.repositorio.save(datos); }
}
module.exports = CrearVacante;
