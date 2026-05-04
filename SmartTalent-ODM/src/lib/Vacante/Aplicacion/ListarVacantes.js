class ListarVacantes {
  constructor(repositorio) { this.repositorio = repositorio; }
  async ejecutar() { return await this.repositorio.findAll(); }
}
module.exports = ListarVacantes;
