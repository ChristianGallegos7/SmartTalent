const express = require("express");
const cors = require("cors");

const registerUserModule = require("./lib/Usuario/Infraestructura/http"); // auto-usa index.js del módulo

function buildApp() {
  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Módulos
  registerUserModule(app);

  // 404 (opcional, recomendado)
  app.use((req, res) => res.status(404).json({ message: "Ruta no encontrada" }));

  // Error handler (opcional, recomendado)
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({
      message: err.message || "Error interno del servidor",
    });
  });

  return app;
}

module.exports = buildApp;