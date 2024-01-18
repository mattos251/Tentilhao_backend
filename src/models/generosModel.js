const connection = require('../database/connection')

const getAll = async () => {
    const [generos] = await connection.execute('select * from generos');
    return generos;
}

module.exports = {
    getAll
}