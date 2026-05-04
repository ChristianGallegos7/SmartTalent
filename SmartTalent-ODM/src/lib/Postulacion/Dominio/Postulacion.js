class Postulacion {
  constructor({ _id, candidato, vacante, estado, carta, fecha }) {
    this._id = _id;
    this.candidato = candidato;
    this.vacante = vacante;
    this.estado = estado;
    this.carta = carta;
    this.fecha = fecha;
  }
}

module.exports = Postulacion;
