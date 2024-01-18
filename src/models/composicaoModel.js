const connection = require('../database/connection')

const getAllComposicoes = async () => {
    const [composicoes] = await connection.execute('SELECT * FROM composicoes;');
    return composicoes;
}

module.exports = {
    getAllComposicoes 
}