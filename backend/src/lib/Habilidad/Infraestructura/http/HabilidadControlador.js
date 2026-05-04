const CrearHabilidad = require("../../Aplicacion/CrearHabilidad");
const ListarHabilidades = require("../../Aplicacion/ListarHabilidad");
const ActualizarHabilidad = require("../../Aplicacion/ActualizarHabilidad");
const EliminarHabilidad = require("../../Aplicacion/EliminarHabilidad");

const HabilidadRepository = require("../Orm/HabilidadRepositorioSequelize");
const repo = new HabilidadRepository();

exports.crear = async (req, res) => {
  try {
    const caso = new CrearHabilidad(repo);
    const habilidad = await caso.ejecutar(req.body);
    res.json(habilidad);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.listar = async (req, res) => {
  const caso = new ListarHabilidades(repo);
  res.json(await caso.ejecutar());
};

exports.actualizar = async (req, res) => {
  const caso = new ActualizarHabilidad(repo);
  res.json(await caso.ejecutar(req.params.id, req.body));
};

exports.eliminar = async (req, res) => {
  const caso = new EliminarHabilidad(repo);
  await caso.ejecutar(req.params.id);
  res.json({ mensaje: "Habilidad eliminada" });
};
