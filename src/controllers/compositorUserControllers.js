// composicoesController.js
const composicoesUserModel = require('../models/compositorUserModel');

const getComposicoesByUsuarioId = async (req, res) => {
  try {
    // Supondo que o ID do usuário esteja disponível no objeto de req (após a autenticação)
    const usuarioId = req.usuario.id; // Ajuste conforme sua lógica de autenticação

    const composicoesUser = await composicoesUserModel.getComposicoesByUsuarioId(usuarioId);

    res.status(200).json(composicoesUser);
  } catch (error) {
    console.error('Erro ao buscar composições:', error);
    res.status(500).json({ message: 'Erro ao buscar composições.' });
  }
};

const cadastrarComposicao = async (req, res) => {
  try {
    const { imagemCapa, audio, titulo, generoMusicalId, texto } = req.body;
    const usuarioId = req.usuario.id;
    
    // Ajuste conforme sua lógica de autenticação

    const composicaoData = { usuarioId, imagemCapa, audio, titulo, generoMusicalId, texto };
    console.log("banna",composicaoData)
    const composicaoId = await composicoesUserModel.cadastrarComposicao(composicaoData);
    console.error('Erro ao cadastrar composição:', composicaoId);
    res.status(201).json({ composicaoId });
  } catch (error) {
    
    res.status(500).json({ message: 'Erro ao cadastrar composição.' });
  }
};


module.exports = {
  getComposicoesByUsuarioId,
  cadastrarComposicao
};
