// composicoesModel.js
const connection = require('../database/connection');

const getComposicoesByUsuarioId = async (usuarioId) => {
  const [composicoesUser] = await connection.execute(
    'SELECT composicoes.* FROM composicoes JOIN usuarios ON composicoes.usuario_id = usuarios.id WHERE usuarios.id = ?',
    [usuarioId]
  );
  return composicoesUser;
};

const cadastrarComposicao = async (composicaoData) => {
  const { usuarioId, imagem_capa, audio, title, genero_musical_id, texto  } = composicaoData;
  
  const result = await connection.execute(
    'INSERT INTO composicoes (usuario_id, imagem_capa, audio, titulo, genero_musical_id, texto) VALUES (?, ?, ?, ?, ?, ?)',
    [usuarioId, imagem_capa, audio, title, genero_musical_id, texto ]
  );

  return result.insertId;
};

module.exports = {
  getComposicoesByUsuarioId,
  cadastrarComposicao,
};