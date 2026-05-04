const UsuarioRepositorioMongoose = require("../Odm/UsuarioRepositorioMongoose");
const CrearUsuario = require("../../Aplicacion/CrearUsuario");
const ListarUsuarios = require("../../Aplicacion/ListarUsuarios");
const ObtenerUsuario = require("../../Aplicacion/ObtenerUsuario");
const ActualizarUsuario = require("../../Aplicacion/ActualizarUsuario");
const EliminarUsuario = require("../../Aplicacion/EliminarUsuario");

class UsuarioControlador {
  async crear(req, res, next) {
    try {
      const repo = new UsuarioRepositorioMongoose();
      const uc = new CrearUsuario(repo);
      const resultado = await uc.ejecutar(req.body);
      res.status(201).json(resultado);
    } catch (err) { next(err); }
  }

  async listar(req, res, next) {
    try {
      const repo = new UsuarioRepositorioMongoose();
      const uc = new ListarUsuarios(repo);
      const resultado = await uc.ejecutar();
      res.json(resultado);
    } catch (err) { next(err); }
  }

  async obtener(req, res, next) {
    try {
      const repo = new UsuarioRepositorioMongoose();
      const uc = new ObtenerUsuario(repo);
      const resultado = await uc.ejecutar(req.params.id);
      res.json(resultado);
    } catch (err) { next(err); }
  }

  async actualizar(req, res, next) {
    try {
      const repo = new UsuarioRepositorioMongoose();
      const uc = new ActualizarUsuario(repo);
      const resultado = await uc.ejecutar(req.params.id, req.body);
      res.json(resultado);
    } catch (err) { next(err); }
  }

  async eliminar(req, res, next) {
    try {
      const repo = new UsuarioRepositorioMongoose();
      const uc = new EliminarUsuario(repo);
      const resultado = await uc.ejecutar(req.params.id);
      res.json(resultado);
    } catch (err) { next(err); }
  }
}

module.exports = UsuarioControlador;
