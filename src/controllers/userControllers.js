const UserModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const gerarTokenAutenticacao = (credentios) => {
    const jwtSecret = process.env.JWT_SECRET || 'seuSegredoSuperSecreto';
    return jwt.sign(credentios, jwtSecret, { expiresIn: '1d' });
};

const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await UserModel.buscarUsuarioPorEmailSenha(email, password);

        if (!usuario) {
            return res.status(401).json({ message: 'Credenciais inválidas: Usuário não encontrado' });
        }

        const senhaCorreta = await bcrypt.compare(password, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ message: 'Credenciais inválidas: Senha incorreta' });
        }

        const token = gerarTokenAutenticacao({ userId: usuario.id, nome_completo: usuario.nome_completo, email: usuario.email, imagem_perfil: usuario.imagem_perfil, tipo_usuario_id: usuario.tipo_usuario_id, numero_telefone: usuario.numero_telefone, senha: usuario.senha });

        // Enviar dados do usuário junto com o token
        res.status(200).json({ message: 'Login bem-sucedido', token, user: { id: usuario.id, nome_completo: usuario.nome_completo, email: usuario.email, imagem_perfil: usuario.imagem_perfil, tipo_usuario_id: usuario.tipo_usuario_id, umero_telefone: usuario.numero_telefone, senha: usuario.senha } });
    } catch (error) {
        console.error('Erro no login de usuário:', error);
        res.status(500).json({ message: 'Erro no login de usuário.' });
    }
};


const getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await UserModel.buscarUsuarios();
        res.status(200).json({ usuarios });
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        res.status(500).json({ message: 'Erro ao buscar usuários.' });
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await UserModel.getUserById(id);

        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        res.status(200).json({ usuario });
    } catch (error) {
        console.error('Erro ao obter usuário por ID:', error);
        res.status(500).json({ message: 'Erro ao obter usuário por ID.' });
    }
};

const pesquisarUsuarios = async (req, res) => {
    try {
        const { termoPesquisa } = req.query;
        const usuarios = await UserModel.pesquisarUsuarios(termoPesquisa);
        res.status(200).json({ usuarios });
    } catch (error) {
        console.error('Erro ao pesquisar usuários:', error);
        res.status(500).json({ message: 'Erro ao pesquisar usuários.' });
    }
};

const cadastrarUsuario = async (req, res) => {
    try {
        const { nome_completo, email, senha, tipo_usuario_id, genero_musical_id, numero_telefone, imagem_perfil } = req.body;

        // Hash da senha antes de armazenar no banco de dados
        const token = await bcrypt.hash(senha, 10);
        console.log(token)

        const novoUsuario = await UserModel.cadastrarUsuario({
            nome_completo,
            email,
            senha: token,
            tipo_usuario_id,
            genero_musical_id,
            numero_telefone,
            imagem_perfil
        });

        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', usuario: novoUsuario });
    } catch (error) {
        console.error('Erro no cadastro de usuário:', error);
        res.status(500).json({ message: 'Erro no cadastro de usuário.' });
    }
};


const putUser = async (req, res) => {
    try {
        const  id  = req.params.id;
        console.log('banana',id)
        const newData = req.body;
        console.log('açai',req.body)

        const editadoComSucesso = await UserModel.putUser(id, newData);

        if (editadoComSucesso) {
            res.status(200).json({ message: "Usuário editado com sucesso!" })
        } else {
            res.status(404).json({ message: 'Usuário não encontrado ou nenhum dado foi alterado.' });
        }

    } catch (error) {
        console.error('Erro ao editar usuário:', error);
        res.status(500).json({ message: 'Erro ao editar usuário.' });
    }
}
const putImageUser = async (req, res) => {
    try {
        const { id } = req.params;
        const newData = { imagem_perfil: req.body.imagem_perfil };

        const editadoComSucesso = await UserModel.putImageUser(id, newData);

        if (editadoComSucesso) {
            res.status(200).json({ message: "Imagem do usuário editada com sucesso!" });
        } else {
            res.status(404).json({ message: 'Usuário não encontrado ou nenhum dado foi alterado.' });
        }
    } catch (error) {
        console.error('Erro ao editar imagem do usuário:', error);
        res.status(500).json({ message: 'Erro ao editar imagem do usuário.' });
    }
};

module.exports = {
    cadastrarUsuario,
    getAllUsuarios,
    putUser,
    loginUsuario,
    getUserById,
    putImageUser,
    pesquisarUsuarios
};
