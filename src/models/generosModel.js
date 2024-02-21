const connection = require('../database/connection')

const getAll = async () => {
    const { rows: generos } = await connection.query('SELECT * FROM generos');
    return generos;
}

module.exports = {
    getAll
};