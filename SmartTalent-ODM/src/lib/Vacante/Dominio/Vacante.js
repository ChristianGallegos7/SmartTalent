class Vacante {
  constructor({ _id, titulo, descripcion, empresa, salario, modalidad }) {
    this._id = _id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.empresa = empresa;
    this.salario = salario;
    this.modalidad = modalidad;
  }
}

module.exports = Vacante;
