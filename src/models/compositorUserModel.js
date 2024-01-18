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
  const { usuarioId, imagemCapa, audio, titulo, generoMusicalId, texto } = composicaoData;
  
  const result = await connection.execute(
    'INSERT INTO composicoes (usuario_id, imagem_capa, audio, titulo, genero_musical_id, texto) VALUES (?, ?, ?, ?, ?, ?)',
    [usuarioId, imagemCapa, audio, titulo, generoMusicalId, texto]
  );

  return result.insertId;
};

module.exports = {
  getComposicoesByUsuarioId,
  cadastrarComposicao,
  
};
