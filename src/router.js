const express = require('express');
const generosControllers = require('./controllers/generosControllers');
const userControllers = require('./controllers/userControllers');
const composicaoControllers = require('./controllers/composicaoControllers');
const composicoesUserController = require('./controllers/compositorUserControllers');
const authMiddleware = require('./middleware/authMiddleware');

const router = express.Router();

// Rotas públicas (não requerem autenticação)
router.post('/usuarios/cadastro', userControllers.cadastrarUsuario);
router.post('/login', userControllers.loginUsuario);

// Middleware de autenticação aplicado a partir deste ponto
router.use(authMiddleware);

// Rotas protegidas (requerem autenticação)
router.get('/generos', generosControllers.getAllGeneros);

router.get('/usuarios', userControllers.getAllUsuarios);
router.get('/usuarios/:id',  userControllers.getUserById);
router.put('/usuarios/updateUser/:id', userControllers.putUser);

router.get('/composicoes/', composicaoControllers.getAllComposicoes);
router.get('/composicoesUser/:id', composicoesUserController.getComposicoesByUsuarioId);
router.post('/cadastro/ComposicaoUser', composicoesUserController.cadastrarComposicao);


module.exports = router;
