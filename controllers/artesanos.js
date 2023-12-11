const { response } = require('express');

const Artesano = require('../models/artesano');
const Obra = require('../models/obra');
const Usuario = require('../models/usuario');

const getArtesanos = async (req, res = response) => {

    const artesanos = await Artesano.find()
        .populate('usuario', 'nombre img email')
        .populate('municipio', 'nombre img')
        .populate({
            path: 'obras',
            select: 'titulo imagen', // Selecciona los campos que necesitas de las obras
        });

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
            .populate('obras')
            .populate('municipio', 'nombre img');
console.log(artesano)
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

        const usuario = await Usuario.findById( uid );

        usuario.artesano = artesanoDB._id;

        usuario.save();

        res.json({
            ok: true,
            artesano: artesanoDB
        })

    } catch (error) {
        console.log('error', error);
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

    const idArtesano = req.params.idArtesano;
    const uid = req.uid;

   

    try { 
        
        const obra = new Obra({
        usuario: uid,
        artesano: idArtesano,
        ...req.body
    });

    const obraDB = await obra.save();

        const artesano = await Artesano.findById(idArtesano);

        if (!artesano) {
            return res.status(404).json({
                ok: true,
                msg: 'Artesano no encontrado por id'
            });
        }
       // 6559cff3a56397558f1c7209
        if (!artesano?.obras) {
           artesano.obras = [];
        }

        artesano.obras.push(obraDB);
        
        const artesanoActualizado = await Artesano.findByIdAndUpdate(idArtesano, artesano, { new: true })

        res.json({
            ok: true,
            artesano: artesanoActualizado
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const actualizarObra = async (req, res = response) => {

    const id = req.params.id; // ID de la obra
    const idArtesano = req.params.idArtesano;
    const uid = req.uid;

    try {

        const artesano = await Artesano.findById(idArtesano);

        if (!artesano) {
            return res.status(404).json({
                ok: false,
                msg: 'Artesano no encontrado por id'
            });
        }
        const obraDB = await Obra.findById(id);
        // Los cambios que se quieran hacer a la obra
        const cambiosObra = {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            fecha: obraDB.fecha,
            imagen: req.body.imagen,
            usuario: uid,
            precio: req.body.precio,
        }

        // Actualizar la obra en la base de datos
        const obraActualizada = await Obra.findByIdAndUpdate(id, cambiosObra, { new: true });

        artesano.obras = artesano.obras.filter(obra => obra._id != id);

        artesano.obras.push(obraActualizada);

        const artesanoActualizado = await Artesano.findByIdAndUpdate(idArtesano, artesano, { new: true })

        res.json({
            ok: true,
            obra: obraActualizada
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


const borrarObra = async (req, res = response) => {

    const id = req.params.id;
    const idArtesano = req.params.idArtesano;

    try {

        const artesano = await Artesano.findById(idArtesano);

        if (!artesano) {
            return res.status(404).json({
                ok: true,
                msg: 'Artesano no encontrado por id'
            });
        }

        artesano.obras = artesano.obras.filter(obra => obra._id != id);


        console.log (artesano)
        const artesanoActualizado = await Artesano.findByIdAndUpdate(idArtesano, artesano, { new: true })


        const obra = await Obra.findById(id);

        if (!obra) {
            return res.status(404).json({
                ok: true,
                msg: 'Obra no encontrada por id'
            });
        }

        await Obra.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Obra eliminada',
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
    getArtesanoById,
    crearArtesano,
    actualizarArtesano,
    borrarArtesano,
    crearObra,
    actualizarObra,
    borrarObra
    
}