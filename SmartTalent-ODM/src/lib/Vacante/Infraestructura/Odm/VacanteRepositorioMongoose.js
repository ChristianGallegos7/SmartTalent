const Vacante = require("../../Dominio/Vacante");
const VacanteModel = require("./VacanteSchemaMongoose");

class VacanteRepositorioMongoose {
  async save(datos) {
    const doc = await VacanteModel.create(datos);
    // populate para resolver la referencia a empresa
    await doc.populate("empresa", "nombre correo rol");
    return new Vacante(doc.toObject());
  }

  async findAll() {
    const docs = await VacanteModel.find().populate("empresa", "nombre correo rol");
    return docs.map((d) => new Vacante(d.toObject()));
  }

  async findById(id) {
    const doc = await VacanteModel.findById(id).populate("empresa", "nombre correo rol");
    return doc ? new Vacante(doc.toObject()) : null;
  }

  async update(id, datos) {
    const doc = await VacanteModel.findByIdAndUpdate(id, datos, { new: true, runValidators: true })
      .populate("empresa", "nombre correo rol");
    return doc ? new Vacante(doc.toObject()) : null;
  }

  async delete(id) {
    const result = await VacanteModel.findByIdAndDelete(id);
    return !!result;
  }
}

module.exports = VacanteRepositorioMongoose;
