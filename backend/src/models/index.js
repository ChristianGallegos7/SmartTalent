const { sequelize } = require("../Infraestructura/database/Postgres.js");

// Importa todos tus modelos
const UsuarioModel = require("../lib/Usuario/Infraestructura/Orm/UsuarioModelSequelize");
// Si luego agregas más modelos, los importas aquí:
// const VacanteModel = require("../src/lib/Vacante/Infraestructura/Orm/VacanteModelSequelize");

async function syncModels() {
  try {
    await sequelize.sync({ alter: true }); 
    console.log("Todos los modelos sincronizados con la BD");
  } catch (error) {
    console.error("Error al sincronizar modelos:", error);
    throw error;
  }
}

module.exports = { UsuarioModel, syncModels };
