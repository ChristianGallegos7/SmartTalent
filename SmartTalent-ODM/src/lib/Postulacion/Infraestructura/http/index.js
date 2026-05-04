const postulacionRutas = require("./PostulacionRutas");

function registerPostulacionModule(app) {
  app.use("/api/postulaciones", postulacionRutas);
}

module.exports = registerPostulacionModule;
