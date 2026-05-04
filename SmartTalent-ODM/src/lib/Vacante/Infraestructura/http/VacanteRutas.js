const express = require("express");
const VacanteControlador = require("./VacanteControlador");

const router = express.Router();
const ctrl = new VacanteControlador();

router.post("/", ctrl.crear.bind(ctrl));
router.get("/", ctrl.listar.bind(ctrl));
router.get("/:id", ctrl.obtener.bind(ctrl));
router.put("/:id", ctrl.actualizar.bind(ctrl));
router.delete("/:id", ctrl.eliminar.bind(ctrl));

module.exports = router;
