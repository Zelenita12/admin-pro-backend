require('dotenv').config();

const express = require('express'); 
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Crear el servidor Express
const app = express();

//Configurar cors
app.use( cors() );

//Lectura y parseo del body
app.use( express.json());


//Base de datos
dbConnection();

app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/login', require('./routes/auth') );


//mean_user
//hDgUvgUB8xIi6jFJ
// Rutas



app. listen( process.env.PORT, () =>{
    console.log ('Servidor corriendo en puerto ' + process.env.PORT);
} );




