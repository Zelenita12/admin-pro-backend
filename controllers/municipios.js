const { response } = require('express');

const Municipio = require('../models/municipio');

const getMunicipios = async (req, res = response) => {

    const municipios = await Municipio.find()
        .populate('usuario', 'nombre img');
    
    res.json({
        ok: true,
        municipios
    })
}

const crearMunicipio = async (req, res = response) => {

    const uid = req.uid;
    const municipio = new Municipio ({
        usuario: uid,
        ...req.body
    });
 
    try {

        const municipioDB = await municipio.save();

        res.json({
            ok: true,
            municipio: municipioDB
        })


    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarMunicipio = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const municipio = await Municipio.findById ( id );

        if ( !municipio ) {
            return res.status(404).json({
                ok: true,
                msg: 'Municipio no encontrada por id'
            });
        }

        const cambiosMunicipio = {
            ...req.body,
            usuario: uid
        }

        const municipioActualizado = await Municipio.findByIdAndUpdate( id, cambiosMunicipio, { new: true})


        res.json({
            ok: true,
            municipio: municipioActualizado
        })

    } catch (error){
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    
}

const borrarMunicipio = async (req, res = response) => {

    const id = req.params.id;

    try {

        const municipio = await Municipio.findById ( id );

        if ( !municipio ) {
            return res.status(404).json({
                ok: true,
                msg: 'Municipio no encontrado por id'
            });
        }

        await Municipio.findByIdAndDelete( id );

            res.json({
            ok: true,
            msg: 'Municipio eliminado'
        })

    } catch (error){
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    
}


module.exports = {
    getMunicipios,
    crearMunicipio,
    actualizarMunicipio,
    borrarMunicipio
}