// composicoesModel.js
const connection = require('../database/connection');

const getComposicoesByUsuarioId = async (usuarioId) => {
  const { rows: composicoesUser } = await connection.query(
    'SELECT composicoes.* FROM composicoes JOIN usuarios ON composicoes.usuario_id = usuarios.id WHERE usuarios.id = $1',
    [usuarioId]
  );
  return composicoesUser;
};

const postComposicaoByUsuario = async (composicaoData) => {
  const { usuarioId, imagem_capa, audio, title, genero_musical_id, texto } = composicaoData;

  const { rows: result } = await connection.query(
    'INSERT INTO composicoes (usuario_id, imagem_capa, audio, titulo, genero_musical_id, texto) VALUES ($1, $2, $3, $4, $5, $6)',
    [usuarioId, imagem_capa, audio, title, genero_musical_id, texto]
  );

  return result.insertId;
};

const putComposicaoByUsuario = async (composicaoId, composicaoData) => {
  const userId = Number(composicaoId); 

  const { usuario_id, imagem_capa, audio, titulo, genero_musical_id, texto } = composicaoData;

  await connection.query(
    'UPDATE composicoes SET usuario_id = $1, imagem_capa = $2, audio = $3, titulo = $4, genero_musical_id=$5, texto=$6 WHERE id=$7',
    [usuario_id, imagem_capa, audio, titulo, genero_musical_id, texto, userId]
  );
};

const deleteComposicaoByUsuario = async (composicaoId, composicaoData) => {
  const { id } = composicaoData;

  await connection.query(
    'DELETE FROM composicoes WHERE id = $1',
    [composicaoId]
  );
};

module.exports = {
  getComposicoesByUsuarioId,
  postComposicaoByUsuario,
  putComposicaoByUsuario,
  deleteComposicaoByUsuario
};
