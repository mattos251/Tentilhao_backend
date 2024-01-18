const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token de autenticação ausente' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'suaChaveSuperSecreta');

        // Adicione informações do usuário ao objeto de solicitação para uso posterior nas rotas protegidas
        req.user = await UserModel.buscarUsuarioPorEmailSenha(decodedToken.userId);

        next(); // Avance para a próxima função de middleware ou rota
    } catch (error) {
        console.error('Erro de autenticação:', error);
        res.status(401).json({ message: 'Falha na autenticação: Token inválido' });
    }
};

module.exports = authMiddleware;
