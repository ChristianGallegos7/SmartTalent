const mongoose = require("mongoose");

// Documento embebido: perfil del usuario
const perfilSchema = new mongoose.Schema({
  telefono: { type: String, default: "" },
  ciudad: { type: String, default: "" },
  descripcion: { type: String, default: "" },
}, { _id: false });

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  clave: { type: String, required: true },
  rol: { type: String, enum: ["candidato", "empresa"], default: "candidato" },
  // Documento embebido (Actividad 3: relación por embedding)
  perfil: { type: perfilSchema, default: () => ({}) },
}, { timestamps: true });

const UsuarioModel = mongoose.model("Usuario", usuarioSchema);

module.exports = UsuarioModel;
