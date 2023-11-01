const { response } = require('express');

const Usuario = require('../models/usuario');
const Artesano = require('../models/artesano');
const Hospital = require('../models/hospital');

const getTodo = async (req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, artesanos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Artesano.find({ nombre: regex }),
        Hospital.find({ nombre: regex })

    ])



    res.json({
        ok: true,
        usuarios,
        artesanos,
        hospitales
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
                                .populate('hospital', 'nombre img');
        break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                                .populate('usuario', 'nombre img');
        break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
        break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/artesanos/hospitales'
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