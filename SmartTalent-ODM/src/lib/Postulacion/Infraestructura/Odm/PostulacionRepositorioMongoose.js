const Postulacion = require("../../Dominio/Postulacion");
const PostulacionModel = require("./PostulacionSchemaMongoose");

class PostulacionRepositorioMongoose {
  _query() {
    return PostulacionModel.find()
      .populate("candidato", "nombre correo rol perfil")
      .populate({ path: "vacante", populate: { path: "empresa", select: "nombre correo" } });
  }

  async save(datos) {
    const doc = await PostulacionModel.create(datos);
    await doc.populate("candidato", "nombre correo rol perfil");
    await doc.populate({ path: "vacante", populate: { path: "empresa", select: "nombre correo" } });
    return new Postulacion(doc.toObject());
  }

  async findAll() {
    const docs = await this._query();
    return docs.map((d) => new Postulacion(d.toObject()));
  }

  async findById(id) {
    const doc = await PostulacionModel.findById(id)
      .populate("candidato", "nombre correo rol perfil")
      .populate({ path: "vacante", populate: { path: "empresa", select: "nombre correo" } });
    return doc ? new Postulacion(doc.toObject()) : null;
  }

  async update(id, datos) {
    const doc = await PostulacionModel.findByIdAndUpdate(id, datos, { new: true, runValidators: true })
      .populate("candidato", "nombre correo rol perfil")
      .populate({ path: "vacante", populate: { path: "empresa", select: "nombre correo" } });
    return doc ? new Postulacion(doc.toObject()) : null;
  }

  async delete(id) {
    const result = await PostulacionModel.findByIdAndDelete(id);
    return !!result;
  }
}

module.exports = PostulacionRepositorioMongoose;
