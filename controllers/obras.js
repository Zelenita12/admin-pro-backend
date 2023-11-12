const { response } = require('express');

const Obra = require('../models/obra');

const getObras = async (req, res = response) => {

    const obras = await Obra.find()
                            .sort({ fecha: -1 })
                            .populate('artesano', 'nombre')
                            .populate({
                                        path: 'artesano', // Asegúrate de que el campo se llame 'artesano'
                                        populate: { 
                                            path: 'ciudad', 
                                            select: 'nombre' // Asegúrate de que 'nombreCiudad' es el campo correcto en el esquema de 'Ciudad'
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
        .populate({
            path: 'artesano', // Asegúrate de que el campo se llame 'artesano'
            populate: { 
                path: 'ciudad', 
                select: 'nombre' // Asegúrate de que 'nombreCiudad' es el campo correcto en el esquema de 'Ciudad'
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