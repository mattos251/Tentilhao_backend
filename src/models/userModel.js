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

const pesquisarUsuarios = async (termoPesquisa) => {
  const [usuarios] = await connection.execute(
    'SELECT * FROM usuarios WHERE nome_completo LIKE ? OR email LIKE ?',
    [`%${termoPesquisa}%`, `%${termoPesquisa}%`]
  );
  return usuarios;
};

const putUser = async (id, newData) => {
  try {
    // Converte o ID para um número inteiro
    const userId = number(id);

    const { nome_completo, email, senha, tipo_usuario_id, genero_musical_id, numero_telefone,imagem_perfil } = newData;
    const camposAtualizaveis = ['nome_completo', 'email', 'senha', 'tipo_usuario_id', 'genero_musical_id', 'numero_telefone', 'imagem_perfil'];

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

const putImageUser = async (id, newData) => {
  try {
    const userId = Number(id);
    const { imagem_perfil } = newData;

    if (!imagem_perfil) {
      return false;
    }

    const query = 'UPDATE usuarios SET imagem_perfil=? WHERE id=?';

    const [result] = await connection.execute(query, [imagem_perfil, userId]);

    return result.affectedRows > 0;
  } catch (error) {
    console.error('Erro ao editar a imagem do usuário:', error);
    throw error;
  }
};

module.exports = {
  cadastrarUsuario,
  buscarUsuarios,
  putUser,
  buscarUsuarioPorEmailSenha,
  getUserById,
  putImageUser,
  pesquisarUsuarios
};