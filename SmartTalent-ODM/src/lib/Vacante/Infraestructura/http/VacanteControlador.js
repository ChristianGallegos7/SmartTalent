const VacanteRepositorioMongoose = require("../Odm/VacanteRepositorioMongoose");
const CrearVacante = require("../../Aplicacion/CrearVacante");
const ListarVacantes = require("../../Aplicacion/ListarVacantes");
const ObtenerVacante = require("../../Aplicacion/ObtenerVacante");
const ActualizarVacante = require("../../Aplicacion/ActualizarVacante");
const EliminarVacante = require("../../Aplicacion/EliminarVacante");

class VacanteControlador {
  async crear(req, res, next) {
    try {
      const repo = new VacanteRepositorioMongoose();
      const resultado = await new CrearVacante(repo).ejecutar(req.body);
      res.status(201).json(resultado);
    } catch (err) { next(err); }
  }

  async listar(req, res, next) {
    try {
      const repo = new VacanteRepositorioMongoose();
      const resultado = await new ListarVacantes(repo).ejecutar();
      res.json(resultado);
    } catch (err) { next(err); }
  }

  async obtener(req, res, next) {
    try {
      const repo = new VacanteRepositorioMongoose();
      const resultado = await new ObtenerVacante(repo).ejecutar(req.params.id);
      res.json(resultado);
    } catch (err) { next(err); }
  }

  async actualizar(req, res, next) {
    try {
      const repo = new VacanteRepositorioMongoose();
      const resultado = await new ActualizarVacante(repo).ejecutar(req.params.id, req.body);
      res.json(resultado);
    } catch (err) { next(err); }
  }

  async eliminar(req, res, next) {
    try {
      const repo = new VacanteRepositorioMongoose();
      const resultado = await new EliminarVacante(repo).ejecutar(req.params.id);
      res.json(resultado);
    } catch (err) { next(err); }
  }
}

module.exports = VacanteControlador;
