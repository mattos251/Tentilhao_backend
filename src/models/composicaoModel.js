const connection = require('../database/connection')

const getAllComposicoes = async () => {
    const [composicoes] = await connection.execute('SELECT * FROM composicoes;');
    return composicoes;
}

const getAllComposicoesByGenres = async (genero) => {
    const [composicoesGenre] = await connection.execute(
        'SELECT composicoes.id, composicoes.usuario_id, usuarios.nome_completo as nome_usuario, composicoes.imagem_capa, composicoes.audio, composicoes.titulo ' +
        'FROM composicoes ' +
        'INNER JOIN generos ON composicoes.genero_musical_id = generos.id ' +
        'INNER JOIN usuarios ON composicoes.usuario_id = usuarios.id ' +
        'WHERE generos.genero = ?',
        [genero]
    );
    return composicoesGenre;
}

module.exports = {
    getAllComposicoes,
    getAllComposicoesByGenres
}