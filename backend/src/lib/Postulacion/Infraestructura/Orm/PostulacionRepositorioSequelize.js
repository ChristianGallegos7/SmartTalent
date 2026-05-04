const Postulacion = require("../../Dominio/Postulacion");
const PostulacionModel = require("./PostulacionModelSequelize");

class PostulacionRepositorioSequelize {
  async create(postulacion) {
    const data = await PostulacionModel.create(postulacion);
    return new Postulacion(data.toJSON());
  }
  async findAll() {
    const data = await PostulacionModel.findAll();
    return data.map(p => new Postulacion(p.toJSON()));
  }
  async update(id, datos) {
    await PostulacionModel.update(datos, { where: { postulacion_id: id } });
    return this.findById(id);
  }
  async delete(id) {
    return await PostulacionModel.destroy({ where: { postulacion_id: id } });
  }
  async findById(id) {
    const data = await PostulacionModel.findByPk(id);
    return data ? new Postulacion(data.toJSON()) : null;
  }
}

module.exports = PostulacionRepositorioSequelize;
