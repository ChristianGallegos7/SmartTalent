const Usuario = require("../../Dominio/Usuario");
const UsuarioModel = require("./UsuarioSchemaMongoose");

class UsuarioRepositorioMongoose {
  async save(datos) {
    const doc = await UsuarioModel.create(datos);
    return new Usuario(doc.toObject());
  }

  async findAll() {
    const docs = await UsuarioModel.find();
    return docs.map((d) => new Usuario(d.toObject()));
  }

  async findById(id) {
    const doc = await UsuarioModel.findById(id);
    return doc ? new Usuario(doc.toObject()) : null;
  }

  async update(id, datos) {
    const doc = await UsuarioModel.findByIdAndUpdate(id, datos, { new: true, runValidators: true });
    return doc ? new Usuario(doc.toObject()) : null;
  }

  async delete(id) {
    const result = await UsuarioModel.findByIdAndDelete(id);
    return !!result;
  }
}

module.exports = UsuarioRepositorioMongoose;
