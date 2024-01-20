const connection = require('../database/connection')
const bcrypt = require('bcrypt');


const cadastrarUsuario = async (usuario) => {
  const { nome_completo, email, senha, tipo_usuario_id, genero_musical_id, numero_telefone } = usuario;

  const [result] = await connection.execute(`
        INSERT INTO usuarios 
        (nome_completo, email, senha, tipo_usuario_id, genero_musical_id, numero_telefone) 
        VALUES (?, ?, ?, ?, ?, ?)`,
    [nome_completo, email, senha, tipo_usuario_id, genero_musical_id, numero_telefone]
  );

  return result.insertId; // Retorna o ID do usuário recém-criado
};

const buscarUsuarios = async () => {
  const [usuarios] = await connection.execute('SELECT * FROM usuarios');
  return usuarios;
};

const getUserById = async (id) => {
  const [usuario] = await connection.execute('SELECT * FROM usuarios WHERE id = ?', [id]);
  return usuario.length > 0 ? usuario[0] : null;
};


const putUser = async (id, newData) => {
  try {
    // Converte o ID para um número inteiro
    const userId = number(id);

    console.log('ID Recebido:', id);

    const { nome_completo, email, senha, tipo_usuario_id, genero_musical_id, numero_telefone } = newData;
    const camposAtualizaveis = ['nome_completo', 'email', 'senha', 'tipo_usuario_id', 'genero_musical_id', 'numero_telefone'];

    const camposParaAtualizar = camposAtualizaveis.filter(campo => newData[campo] !== undefined);

    if (camposParaAtualizar.length === 0) {
      return false;
    }

    const camposQuery = camposParaAtualizar.map(campo => `${campo}=?`).join(', ');
    const valoresParaAtualizar = camposParaAtualizar.map(campo => newData[campo]);
    const query = `UPDATE usuarios SET ${camposQuery} WHERE id=?`;

    const [result] = await connection.execute(query, [...valoresParaAtualizar, userId]);

    return result.affectedRows > 0; // Retorna true se algum registro foi afetado (editado)
  } catch (error) {
    console.error('Erro ao editar usuário:', error);
    throw error;
  }
};

const buscarUsuarioPorEmailSenha = async (email, senha) => {
  const [usuario] = await connection.execute(
      'SELECT * FROM usuarios WHERE email = ?',
      [email]
  );

  const usuarioEncontrado = usuario.length > 0 ? usuario[0] : null;

  if (usuarioEncontrado) {
      const senhaCorreta = await bcrypt.compare(senha, usuarioEncontrado.senha);
      return senhaCorreta ? usuarioEncontrado : null;
  }

  return null;
};

module.exports = {
  cadastrarUsuario,
  buscarUsuarios,
  putUser,
  buscarUsuarioPorEmailSenha,
  getUserById
};