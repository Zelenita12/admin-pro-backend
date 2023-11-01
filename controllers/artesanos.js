const { response } = require('express');

const Artesano = require('../models/artesano');

const getArtesanos = async (req, res = response) => {

    const artesanos = await Artesano.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img');

    res.json({
        ok: true,
        artesanos
    })
}

const getArtesanoById = async (req, res = response) => {

    const id = req.params.id;

    try {
        const artesano = await Artesano.findById(id)
            .populate('usuario', 'nombre img')
            .populate('hospital', 'nombre img');

        res.json({
            ok: true,
            artesano
        })


    } catch (error) {
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }


}

const crearArtesano = async (req, res = response) => {

    const uid = req.uid;
    const artesano = new Artesano({
        usuario: uid,
        ...req.body
    });

    try {

        const artesanoDB = await artesano.save();

        res.json({
            ok: true,
            artesano: artesanoDB
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el adminstradros'
        })

    }


}

const actualizarArtesano = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const artesano = await Artesano.findById(id);

        if (!artesano) {
            return res.status(404).json({
                ok: true,
                msg: 'Artesano no encontrado por id'
            });
        }

        const cambiosArtesano = {
            ...req.body,
            usuario: uid
        }

        const artesanoActualizado = await Artesano.findByIdAndUpdate(id, cambiosArtesano, { new: true })


        res.json({
            ok: true,
            artesano: artesanoActualizado
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const borrarArtesano = async (req, res = response) => {

    const id = req.params.id;

    try {

        const artesano = await Artesano.findById(id);

        if (!artesano) {
            return res.status(404).json({
                ok: true,
                msg: 'Artesano no encontrado por id'
            });
        }

        await Artesano.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Artesano eliminado'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


const crearObra = async (req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {

        const artesano = await Artesano.findById(id);

        if (!artesano) {
            return res.status(404).json({
                ok: true,
                msg: 'Artesano no encontrado por id'
            });
        }

        if (!artesano?.obras) {
           artesano.obras = [];
        }

        artesano.obras.push(req.body)
        
        const artesanoActualizado = await Artesano.findByIdAndUpdate(id, artesano, { new: true })

        res.json({
            ok: true,
            artesano: artesanoActualizado
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    getArtesanos,
    crearArtesano,
    actualizarArtesano,
    borrarArtesano,
    crearObra,
    getArtesanoById
}