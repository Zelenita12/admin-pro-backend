const fs = require('fs');

const Usuario = require('../models/usuario');
const Artesano = require('../models/artesano');
const Ciudad = require('../models/ciudad');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
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

        case 'ciudades':
            const ciudad = await Ciudad.findById(id);
            if (!ciudad) {
                console.log('No es un ciudad por id');
                return false;
            }
            pathViejo = `./uploads/ciudades/${ciudad.img}`;
            borrarImagen(pathViejo);

            ciudad.img = nombreArchivo;
            await ciudad.save();
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

        default:
            console.log('Tipo no reconocido');
            return false;
    }
};

module.exports = {
    actualizarImagen
};
