const CrearCandidatoHabilidad = require("../../Aplicacion/CrearCandidatoHabilidad");
const ListarCandidatoHabilidades = require("../../Aplicacion/ListarCandidatoHabilidad");
const ActualizarCandidatoHabilidad = require("../../Aplicacion/ActualizarCandidatoHabilidad");
const EliminarCandidatoHabilidad = require("../../Aplicacion/EliminarCandidatoHabilidad");

const CandidatoHabilidadRepository = require("../Orm/CandidatoHabilidadRepositorioSequelize");
const repo = new CandidatoHabilidadRepository();

exports.crear = async (req, res) => {
  try {
    const caso = new CrearCandidatoHabilidad(repo);
    const registro = await caso.ejecutar(req.body);
    res.json(registro);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.listar = async (req, res) => {
  const caso = new ListarCandidatoHabilidades(repo);
  res.json(await caso.ejecutar());
};

exports.actualizar = async (req, res) => {
  const caso = new ActualizarCandidatoHabilidad(repo);
  res.json(await caso.ejecutar(req.body.candidato_id, req.body.habilidad_id, req.body));
};

exports.eliminar = async (req, res) => {
  const caso = new EliminarCandidatoHabilidad(repo);
  await caso.ejecutar(req.body.candidato_id, req.body.habilidad_id);
  res.json({ mensaje: "Relación candidato-habilidad eliminada" });
};
