const CrearVacante = require("../../Aplicacion/CrearVacante");
const ListarVacante = require("../../Aplicacion/ListarVacante");
const ActualizarVacante = require("../../Aplicacion/ActualizarVacante");
const EliminarVacante = require("../../Aplicacion/EliminarVacante");

const VacanteRepository = require("../Orm/VacanteRepositorioSequelize");
const repo = new VacanteRepository();

exports.crear = async (req, res) => {
  try {
    const caso = new CrearVacante(repo);
    const vacante = await caso.ejecutar(req.body);
    res.json(vacante);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.listar = async (req, res) => {
  const caso = new ListarVacante(repo);
  res.json(await caso.ejecutar());
};

exports.actualizar = async (req, res) => {
  const caso = new ActualizarVacante(repo);
  res.json(await caso.ejecutar(req.params.id, req.body));
};

exports.eliminar = async (req, res) => {
  const caso = new EliminarVacante(repo);
  await caso.ejecutar(req.params.id);
  res.json({ mensaje: "Vacante eliminada" });
};
