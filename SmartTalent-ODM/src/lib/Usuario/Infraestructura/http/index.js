const usuarioRutas = require("./UsuarioRutas");

function registerUsuarioModule(app) {
  app.use("/api/usuarios", usuarioRutas);
}

module.exports = registerUsuarioModule;
