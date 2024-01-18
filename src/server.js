const app = require('./app');
require('dotenv').config();

const PORT = process.env.MYSQL_PORT || 3333


app.listen(PORT, ()=> console.log('server runinnig or port 3333'))