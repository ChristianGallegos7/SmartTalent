const mongoose = require("mongoose");

const postulacionSchema = new mongoose.Schema({
  candidato: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  vacante: { type: mongoose.Schema.Types.ObjectId, ref: "Vacante", required: true },
  estado: {
    type: String,
    enum: ["pendiente", "en_revision", "aceptado", "rechazado"],
    default: "pendiente",
  },
  carta: { type: String, default: "" },
  fecha: { type: Date, default: Date.now },
}, { timestamps: true });

const PostulacionModel = mongoose.model("Postulacion", postulacionSchema);

module.exports = PostulacionModel;
