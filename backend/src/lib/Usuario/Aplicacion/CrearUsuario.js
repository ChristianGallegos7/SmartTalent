const Usuario = require("../Dominio/Entidades/Usuario");

class CrearUsuario {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async ejecutar(data) {
    const usuario = new Usuario(data);
    return await this.usuarioRepository.save(usuario);
  }
}

module.exports = CrearUsuario;