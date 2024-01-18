const express = require('express');
const cors = require('cors');
const router = require('./router');

const app = express();

// Configuração do CORS para permitir solicitações da origem específica (substitua 'OriginURL' pela URL real do seu aplicativo Vue.js)
// const corsOptions = {
//   origin: 'http://localhost:8080', // Substitua pelo endereço do seu aplicativo Vue.js
//   credentials: true,
//   exposedHeaders: ['Authorization'],
// };corsOptions

app.use(cors());

app.use(express.json());
app.use('/api', router);

module.exports = app;
