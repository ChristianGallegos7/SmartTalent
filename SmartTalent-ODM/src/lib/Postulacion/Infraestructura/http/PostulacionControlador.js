const PostulacionRepositorioMongoose = require("../Odm/PostulacionRepositorioMongoose");
const CrearPostulacion = require("../../Aplicacion/CrearPostulacion");
const ListarPostulaciones = require("../../Aplicacion/ListarPostulaciones");
const ObtenerPostulacion = require("../../Aplicacion/ObtenerPostulacion");
const ActualizarPostulacion = require("../../Aplicacion/ActualizarPostulacion");
const EliminarPostulacion = require("../../Aplicacion/EliminarPostulacion");

class PostulacionControlador {
  async crear(req, res, next) {
    try {
      const repo = new PostulacionRepositorioMongoose();
      const resultado = await new CrearPostulacion(repo).ejecutar(req.body);
      res.status(201).json(resultado);
    } catch (err) { next(err); }
  }

  async listar(req, res, next) {
    try {
      const repo = new PostulacionRepositorioMongoose();
      const resultado = await new ListarPostulaciones(repo).ejecutar();
      res.json(resultado);
    } catch (err) { next(err); }
  }

  async obtener(req, res, next) {
    try {
      const repo = new PostulacionRepositorioMongoose();
      const resultado = await new ObtenerPostulacion(repo).ejecutar(req.params.id);
      res.json(resultado);
    } catch (err) { next(err); }
  }

  async actualizar(req, res, next) {
    try {
      const repo = new PostulacionRepositorioMongoose();
      const resultado = await new ActualizarPostulacion(repo).ejecutar(req.params.id, req.body);
      res.json(resultado);
    } catch (err) { next(err); }
  }

  async eliminar(req, res, next) {
    try {
      const repo = new PostulacionRepositorioMongoose();
      const resultado = await new EliminarPostulacion(repo).ejecutar(req.params.id);
      res.json(resultado);
    } catch (err) { next(err); }
  }
}

module.exports = PostulacionControlador;
