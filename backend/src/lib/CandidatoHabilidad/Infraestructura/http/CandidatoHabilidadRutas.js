const express = require("express");
const router = express.Router();

module.exports = (controller) => {
  router.post("/crear", controller.crear);
  router.get("/ver", controller.listar);
  router.put("/actualizar", controller.actualizar); // usa body con candidato_id + habilidad_id
  router.delete("/eliminar", controller.eliminar);  // usa body con candidato_id + habilidad_id
  return router;
};
