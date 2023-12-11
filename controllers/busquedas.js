const { response } = require('express');

const Usuario = require('../models/usuario');
const Artesano = require('../models/artesano');
const Municipio = require('../models/municipio');
const Obra = require('../models/obra'); 


const getTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, artesanos, municipios, obras] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Artesano.find({ nombre: regex }),
        Municipio.find({ nombre: regex }),
        Obra.find({ titulo: regex })

    ])



    res.json({
        ok: true,
        usuarios,
        artesanos,
        municipios,
        obras
    })

}

const getDocumentosColeccion = async (req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'artesanos':
            data = await Artesano.find({ nombre: regex })
                                .populate('usuario', 'nombre img')
                                .populate('municipio', 'nombre img');
        break;
        case 'municipios':
            data = await Municipio.find({ nombre: regex })
                                .populate('usuario', 'nombre img');
        break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
        break;

        case 'obras':
            data = await Usuario.find({ titulo: regex });
        break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/artesanos/municipios'
            });
            
    }

    res.json({
        ok: true,
        resultados: data
    })

}



module.exports = {
    getTodo,
    getDocumentosColeccion
}