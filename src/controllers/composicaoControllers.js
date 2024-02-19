const { response } = require('express');
const composicaoModel = require('../models/composicaoModel')

const getAllComposicoes = async (request, response) => {
    
    const composicao = await composicaoModel.getAllComposicoes();

    return response.status(200).json(composicao)

};


const getAllComposicoesByGenres = async (request, response) => {
    const genero = request.params.genero; // ou de acordo com sua lógica de roteamento
    
    const composicaoGenero = await composicaoModel.getAllComposicoesByGenres(genero);

    return response.status(200).json(composicaoGenero);
}

module.exports = {
    getAllComposicoes,
    getAllComposicoesByGenres
}