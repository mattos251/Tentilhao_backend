const generosModel = require('../models/generosModel')

const  getAllGeneros = async (request, response) => {
    
    const generos = await generosModel.getAll();

    return response.status(200).json(generos)

};

module.exports = {
    getAllGeneros
}