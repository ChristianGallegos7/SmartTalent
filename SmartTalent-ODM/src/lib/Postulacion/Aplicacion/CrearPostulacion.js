class CrearPostulacion {
  constructor(repositorio) { this.repositorio = repositorio; }
  async ejecutar(datos) { return await this.repositorio.save(datos); }
}
module.exports = CrearPostulacion;
