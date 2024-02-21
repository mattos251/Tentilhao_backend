const connection = require('../database/connection')
const bcrypt = require('bcrypt');


// const cadastrarUsuario = async (usuario) => {
//   const { nome_completo, email, senha, tipo_usuario_id, genero_musical_id, numero_telefone } = usuario;

//   const [result] = await connection.execute(`
//         INSERT INTO usuarios 
//         (nome_completo, email, senha, tipo_usuario_id, genero_musical_id, numero_telefone) 
//         VALUES (?, ?, ?, ?, ?, ?)`,
//     [nome_completo, email, senha, tipo_usuario_id, genero_musical_id, numero_telefone]
//   );

//   return result.insertId; // Retorna o ID do usuário recém-criado
// };

const cadastrarUsuario = async (usuario) => {
  const { nome_completo, email, senha, tipo_usuario_id, genero_musical_id, numero_telefone } = usuario;

  const { rows } = await connection.query(`
    INSERT INTO usuarios 
    (nome_completo, email, senha, tipo_usuario_id, genero_musical_id, numero_telefone) 
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
    [nome_completo, email, senha, tipo_usuario_id, genero_musical_id, numero_telefone]
  );

  return rows[0].id; // Retorna o ID do usuário recém-criado
};


const buscarUsuarios = async () => {
  const { rows: usuarios } = await connection.query('SELECT * FROM usuarios');
  return usuarios;
};

const getUserById = async (id) => {
  const { rows: usuarios } = await connection.query('SELECT * FROM usuarios WHERE id = $1', [id]);
  return usuarios.length > 0 ? usuarios[0] : null;
};

const pesquisarUsuarios = async (termoPesquisa) => {
  const { rows: usuarios } = await connection.query(
    'SELECT * FROM usuarios WHERE nome_completo ILIKE $1 OR email ILIKE $1',
    [`%${termoPesquisa}%`]
  );
  return usuarios;
};

const putUser = async (id, newData) => {
  try {

    const userId = id;
    console.log('userId ', userId )

    const { nome_completo, email, senha, tipo_usuario_id, genero_musical_id, numero_telefone, imagem_perfil } = newData;
    const camposAtualizaveis = ['nome_completo', 'email', 'senha', 'tipo_usuario_id', 'genero_musical_id', 'numero_telefone', 'imagem_perfil'];

    const camposParaAtualizar = camposAtualizaveis.filter(campo => newData[campo] !== undefined);

    if (camposParaAtualizar.length === 0) {
      return false;
    }

    const camposQuery = camposParaAtualizar.map((campo, index) => `${campo}=$${index + 1}`).join(', ');
    const valoresParaAtualizar = camposParaAtualizar.map(campo => newData[campo]);
    const query = `UPDATE usuarios SET ${camposQuery} WHERE id=$${camposParaAtualizar.length + 1}`;

    const { rowCount } = await connection.query(query, [...valoresParaAtualizar, userId]);

    return rowCount > 0; // Retorna true se algum registro foi afetado (editado)
  } catch (error) {
    console.error('Erro ao editar usuário:', error);
    throw error;
  }
};

const buscarUsuarioPorEmailSenha = async (email, senha) => {
  const { rows: usuarios } = await connection.query('SELECT * FROM usuarios WHERE email = $1', [email]);

  const usuarioEncontrado = usuarios.length > 0 ? usuarios[0] : null;

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

    const query = 'UPDATE usuarios SET imagem_perfil=$1 WHERE id=$2';

    const { rowCount } = await connection.query(query, [imagem_perfil, userId]);

    return rowCount > 0;
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