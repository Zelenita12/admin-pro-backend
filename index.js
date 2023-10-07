require('dotenv').config();

const express = require('express'); 
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Crear el servidor Express
const app = express();

//Configurar cors
app.use( cors() );


//Base de datos
dbConnection();

//mean_user
//hDgUvgUB8xIi6jFJ
// Rutas
app.get( '/', (req, res)=> {

    res.status(400).json({
        ok: true,
        msg: 'Hola mundooooooo'
    })
} );


app. listen( process.env.PORT, () =>{
    console.log ('Servidor corriendo en puerto ' + process.env.PORT);
} );



