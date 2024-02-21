const app = require('./app');
require('dotenv').config();

const PORT=  `${process.env.SERVER_lOCAL}` 


app.listen(PORT, ()=> console.log('server runinnig or port 3333'))