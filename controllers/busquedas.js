const { response } = require('express');

const Usuario = require('../models/usuario');
const Artesano = require('../models/artesano');
const Ciudad = require('../models/ciudad');

const getTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, artesanos, ciudades] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Artesano.find({ nombre: regex }),
        Ciudad.find({ nombre: regex })

    ])



    res.json({
        ok: true,
        usuarios,
        artesanos,
        ciudades
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
                                .populate('ciudad', 'nombre img');
        break;
        case 'ciudades':
            data = await Ciudad.find({ nombre: regex })
                                .populate('usuario', 'nombre img');
        break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
        break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/artesanos/ciudades'
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