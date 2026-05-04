const express = require("express");
const router = express.Router();

module.exports = (controller) => {
  router.post("/crear", controller.crear);
  router.get("/ver", controller.listar);
  router.put("/:id", controller.actualizar);
  router.delete("/:id", controller.eliminar);
  return router;
};
