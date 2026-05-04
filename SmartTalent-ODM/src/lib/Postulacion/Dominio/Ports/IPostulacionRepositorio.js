class IPostulacionRepositorio {
  async save(postulacion) { throw new Error("Método save() no implementado"); }
  async findAll() { throw new Error("Método findAll() no implementado"); }
  async findById(id) { throw new Error("Método findById() no implementado"); }
  async update(id, datos) { throw new Error("Método update() no implementado"); }
  async delete(id) { throw new Error("Método delete() no implementado"); }
}

module.exports = IPostulacionRepositorio;
