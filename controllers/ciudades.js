const { response } = require('express');

const Ciudad = require('../models/ciudad');

const getCiudades = async (req, res = response) => {

    const ciudades = await Ciudad.find()
        .populate('usuario', 'nombre img');
    
    res.json({
        ok: true,
        ciudades
    })
}

const crearCiudad = async (req, res = response) => {

    const uid = req.uid;
    const ciudad = new Ciudad ({
        usuario: uid,
        ...req.body
    });
 
    try {

        const ciudadDB = await ciudad.save();

        res.json({
            ok: true,
            ciudad: ciudadDB
        })


    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarCiudad = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const ciudad = await Ciudad.findById ( id );

        if ( !ciudad ) {
            return res.status(404).json({
                ok: true,
                msg: 'Ciudad no encontrada por id'
            });
        }

        const cambiosCiudad = {
            ...req.body,
            usuario: uid
        }

        const ciudadActualizado = await Ciudad.findByIdAndUpdate( id, cambiosCiudad, { new: true})


        res.json({
            ok: true,
            ciudad: ciudadActualizado
        })

    } catch (error){
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    
}

const borrarCiudad = async (req, res = response) => {

    const id = req.params.id;

    try {

        const ciudad = await Ciudad.findById ( id );

        if ( !ciudad ) {
            return res.status(404).json({
                ok: true,
                msg: 'Ciudad no encontrado por id'
            });
        }

        await Ciudad.findByIdAndDelete( id );

            res.json({
            ok: true,
            msg: 'Ciudad eliminado'
        })

    } catch (error){
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    
}


module.exports = {
    getCiudades,
    crearCiudad,
    actualizarCiudad,
    borrarCiudad
}