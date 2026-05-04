const express = require("express");
const cors = require("cors");

const registerUsuarioModule = require("./lib/Usuario/Infraestructura/http");
const registerVacanteModule = require("./lib/Vacante/Infraestructura/http");
const registerPostulacionModule = require("./lib/Postulacion/Infraestructura/http");

function buildApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  registerUsuarioModule(app);
  registerVacanteModule(app);
  registerPostulacionModule(app);

  app.use((req, res) => res.status(404).json({ message: "Ruta no encontrada" }));

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({
      message: err.message || "Error interno del servidor",
    });
  });

  return app;
}

module.exports = buildApp;
