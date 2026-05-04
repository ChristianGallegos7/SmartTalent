const vacanteRutas = require("./VacanteRutas");

function registerVacanteModule(app) {
  app.use("/api/vacantes", vacanteRutas);
}

module.exports = registerVacanteModule;
