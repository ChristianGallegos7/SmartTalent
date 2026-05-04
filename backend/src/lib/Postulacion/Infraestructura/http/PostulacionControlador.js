const CrearPostulacion = require("../../Aplicacion/CrearPostulacion");
const ListarPostulaciones = require("../../Aplicacion/ListarPostulacion");
const ActualizarPostulacion = require("../../Aplicacion/ActualizarPostulacion");
const EliminarPostulacion = require("../../Aplicacion/EliminarPostulacion");

const PostulacionRepository = require("../Orm/PostulacionRepositorioSequelize");
const repo = new PostulacionRepository();

exports.crear = async (req, res) => {
  try {
    const caso = new CrearPostulacion(repo);
    const postulacion = await caso.ejecutar(req.body);
    res.json(postulacion);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.listar = async (req, res) => {
  const caso = new ListarPostulaciones(repo);
  res.json(await caso.ejecutar());
};

exports.actualizar = async (req, res) => {
  const caso = new ActualizarPostulacion(repo);
  res.json(await caso.ejecutar(req.params.id, req.body));
};

exports.eliminar = async (req, res) => {
  const caso = new EliminarPostulacion(repo);
  await caso.ejecutar(req.params.id);
  res.json({ mensaje: "Postulación eliminada" });
};
