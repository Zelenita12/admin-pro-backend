const fs = require('fs');

const Usuario = require('../models/usuario');
const Artesano = require('../models/artesano');
const Municipio = require('../models/municipio');
const Obra = require('../models/obra');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        try {
            fs.unlinkSync(path);
        } catch (error) {
            console.error('Error al borrar el archivo:', error);
        }
    }
};

const actualizarImagen = async (tipo, id, nombreArchivo) => {
    let pathViejo = '';  // Declara pathViejo una vez aquí

    switch (tipo) {
        case 'artesanos':
            const artesano = await Artesano.findById(id);
            if (!artesano) {
                console.log('No es un médico por id');
                return false;
            }
            pathViejo = `./uploads/artesanos/${artesano.img}`;
            borrarImagen(pathViejo);

            artesano.img = nombreArchivo;
            await artesano.save();
            return true;

        case 'municipios':
            const municipio = await Municipio.findById(id);
            if (!municipio) {
                console.log('No es un municipio por id');
                return false;
            }
            pathViejo = `./uploads/municipios/${municipio.img}`;
            borrarImagen(pathViejo); 

            municipio.img = nombreArchivo;
            await municipio.save();
            return true;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No es un usuario por id');
                return false;
            }
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            console.log("este es el usuario", usuario);
            await usuario.save();
            return true;

        case 'obras':
            const obra = await Obra.findById(id);
            if (!obra) {
                console.log('No es una obra por id');
                return false;
            }
            pathViejo = `./uploads/obras/${obra.imagen}`;
            borrarImagen(pathViejo);

            obra.imagen = nombreArchivo;
            console.log("esta es la obra", obra);
            await obra.save();
            return true;

        default:
            console.log('Tipo no reconocido');
            return false;
    }
};

module.exports = {
    actualizarImagen
};
