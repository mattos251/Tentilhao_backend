// composicoesController.js
const composicoesUserModel = require('../models/compositorUserModel');

const getComposicoesByUsuarioId = async (req, res) => {
  try {
    
    const usuarioId = req.params.id; // Use req.params para obter parâmetros de caminho

    const composicoesUser = await composicoesUserModel.getComposicoesByUsuarioId(usuarioId);

    res.status(200).json(composicoesUser);
  } catch (error) {
    console.error('Erro ao buscar composições:', error);
    res.status(500).json({ message: 'Erro ao buscar composições.' });
  }
};

const cadastrarComposicao = async (req, res) => {
  try {
    const { usuarioId, imagem_capa, audio, title, genero_musical_id, texto } = req.body;
    const composicaoData = { usuarioId, imagem_capa, audio, title, genero_musical_id, texto  };
    const composicaoId = await composicoesUserModel.cadastrarComposicao(composicaoData);
    res.status(201).json({ composicaoId });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao cadastrar composição.' });
  }
};


module.exports = {
  getComposicoesByUsuarioId,
  cadastrarComposicao
};