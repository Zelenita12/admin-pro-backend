require('dotenv').config();

const express = require('express'); 
const cors = require('cors');

const { dbConnection } = require('./database/config');

//Crear el servidor Express
const app = express();

//Configurar cors
app.use( cors() );

//Carpeta pública
app.use( express.static('public'));

//Lectura y parseo del body
app.use( express.json());


//Base de datos
dbConnection();

app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/ciudades', require('./routes/ciudades') );
app.use( '/api/artesanos', require('./routes/artesanos') );
app.use( '/api/obras', require('./routes/obras') );
app.use( '/api/todo', require('./routes/busquedas') );
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/upload', require('./routes/uploads') );



//mean_user
//hDgUvgUB8xIi6jFJ
// Rutas



app. listen( process.env.PORT, () =>{
    console.log ('Servidor corriendo en puerto ' + process.env.PORT);
} );




