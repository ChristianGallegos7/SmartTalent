const bcrypt = require("bcryptjs");
const UsuarioModel = require("./lib/Usuario/Infraestructura/Orm/UsuarioModelSequelize");

const usuarios = [
  { nombre: "Admin", correo: "admin@smarttalent.com", clave: "admin1234", rol: "admin" },
  { nombre: "Candidato Demo", correo: "candidato@smarttalent.com", clave: "candidato1234", rol: "candidato" },
];

async function seedUsuarios() {
  for (const data of usuarios) {
    const existe = await UsuarioModel.findOne({ where: { correo: data.correo } });
    if (existe) continue;

    const clave = await bcrypt.hash(data.clave, 10);
    await UsuarioModel.create({ ...data, clave });
    console.log(`Seed: usuario creado → ${data.correo}`);
  }
}

module.exports = { seedUsuarios };
