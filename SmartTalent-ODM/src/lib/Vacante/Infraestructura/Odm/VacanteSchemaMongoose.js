const mongoose = require("mongoose");

const vacanteSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  // Relación por referencia (Actividad 3: ObjectId referenciando la colección usuarios)
  empresa: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  salario: { type: Number, default: 0 },
  modalidad: { type: String, enum: ["presencial", "remoto", "hibrido"], default: "presencial" },
}, { timestamps: true });

const VacanteModel = mongoose.model("Vacante", vacanteSchema);

module.exports = VacanteModel;
