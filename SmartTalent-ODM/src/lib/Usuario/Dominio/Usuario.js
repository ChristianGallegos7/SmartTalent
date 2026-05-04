class Usuario {
  constructor({ _id, nombre, correo, clave, rol, perfil }) {
    this._id = _id;
    this.nombre = nombre;
    this.correo = correo;
    this.clave = clave;
    this.rol = rol;
    this.perfil = perfil || {};
  }
}

module.exports = Usuario;
