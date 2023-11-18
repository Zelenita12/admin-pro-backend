const { response } = require('express');

const Obra = require('../models/obra');

const getObras = async (req, res = response) => {

    const obras = await Obra.find()
                            .sort({ fecha: -1 })
                            .populate('artesano', 'nombre')
                            .populate('usuario', 'email')
                            .populate({
                                        path: 'artesano', // Asegúrate de que el campo se llame 'artesano'
                                        populate: { 
                                            path: 'municipio', 
                                            select: 'nombre' // Asegúrate de que 'nombreMunicipio' es el campo correcto en el esquema de 'Municipio'
                                        }
                                    });

    res.json({
        ok: true,
        obras
    })
}

const getObrasById = async (req, res = response) => {

    const id = req.params.id;

    try {
        const obra = await Obra.findById(id).populate('artesano', 'nombre')
        .populate('usuario', 'email')
                                            .populate({
                                                path: 'artesano', // Asegúrate de que el campo se llame 'artesano'
                                                populate: { 
                                                    path: 'municipio', 
                                                    select: 'nombre img' // Asegúrate de que 'nombreMunicipio' es el campo correcto en el esquema de 'Municipio'
                                                }
                                            });

        res.json({
            ok: true,
            obra
        })


    } catch (error) {
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }


}

module.exports = {
    getObras,
    getObrasById
}