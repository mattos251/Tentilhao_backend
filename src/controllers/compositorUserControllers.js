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

const atualizarComposicao = async (req, res) => {
  try {
    const composicaoId = req.params.id;
    // console.log(" req.params.id",  req.params.id)
    
    const { usuario_id, imagem_capa, audio, titulo, genero_musical_id, texto } = req.body;
    console.log('req.body', req.body)

    if (!composicaoId) {
      return res.status(400).json({ message: 'O ID da composição é obrigatório para a atualização.' });
    }

    const composicaoData = { usuario_id , imagem_capa, audio, titulo, genero_musical_id, texto };

    await composicoesUserModel.atualizarComposicao(composicaoId, composicaoData);
    
    res.status(200).json({ message: 'Composição atualizada com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar composição.' });
  }
};
const deletarComposicao = async (req, res) => {
  try {
    const composicaoId = req.params.id;
    const { id } = req.body;
    const composicaoData = {id};
    
    await composicoesUserModel.deletarComposicao(composicaoId, composicaoData);
    
    res.status(200).json({ message: 'Composição deletada com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar composição.' });
  }
};


module.exports = {
  getComposicoesByUsuarioId,
  cadastrarComposicao,
  atualizarComposicao,
  deletarComposicao
};
