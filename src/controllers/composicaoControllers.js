const composicaoModel = require('../models/composicaoModel')

const getAllComposicoes = async (request, response) => {
    
    const composicao = await composicaoModel.getAllComposicoes();

    return response.status(200).json(composicao)

};

module.exports = {
    getAllComposicoes
}