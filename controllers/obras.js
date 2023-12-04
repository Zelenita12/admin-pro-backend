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
        const obra = await Obra.findById(id)
            .populate({
                path: 'artesano',
                select: 'obras img telefono descripcionArt nombre', // Seleccionar solo el campo 'obras' y otros que necesites
                populate: [
                    { path: 'obras', select: 'titulo descripcion fecha precio imagen' }, // Aquí especificas qué campos de 'Obra' quieres
                    {
                        path: 'municipio',
                        select: 'nombre img'
                    }
                ]
            })
            .populate('usuario', 'email');

        res.json({
            ok: true,
            obra
        });

    } catch (error) {
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        });
    }
};

const likeObra = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
  
    try {
      let obra = await Obra.findById(id);
      if (!obra) {
        return res.status(404).json({
          ok: false,
          msg: 'Obra no encontrada',
        });
      }
  
      // Comprobar si el usuario ya dio "me gusta"
      if (obra.likes.some(like => like.usuario.toString() === uid)) {
        return res.status(400).json({
          ok: false,
          msg: 'Ya le has dado like a esta obra',
        });
      }
  
      // Agregar "me gusta"
      obra = await Obra.findByIdAndUpdate(id, { $push: { likes: { usuario: uid } } }, { new: true });
  
      res.json({
        ok: true,
        msg: 'Me gusta añadido',
        likes: obra.likes.length, // Retorna el total de "me gusta"
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        msg: 'Error al dar like a la obra',
      });
    }
  };
  
  const unlikeObra = async (req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
  
    try {
      let obra = await Obra.findById(id);
      if (!obra) {
        return res.status(404).json({
          ok: false,
          msg: 'Obra no encontrada',
        });
      }
  
      // Comprobar si el usuario ya dio "me gusta"
      if (!obra.likes.some(like => like.usuario.toString() === uid)) {
        return res.status(400).json({
          ok: false,
          msg: 'Aún no has dado like a esta obra',
        });
      }
  
      // Quitar "me gusta"
      obra = await Obra.findByIdAndUpdate(id, { $pull: { likes: { usuario: uid } } }, { new: true });
  
      res.json({
        ok: true,
        msg: 'Me gusta quitado',
        likes: obra.likes.length, // Retorna el total de "me gusta"
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        ok: false,
        msg: 'Error al quitar like de la obra',
      });
    }
  };


module.exports = {
    getObras,
    getObrasById,
    unlikeObra, likeObra
}