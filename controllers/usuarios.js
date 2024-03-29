const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const Artesano = require('../models/artesano');
const Obra = require('../models/obra');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0;

    const [ usuarios, total ] = await Promise.all([
        Usuario
                .find({}, 'nombre email role google img')
                .skip( desde )
                .limit( 30 ),
            
        Usuario.countDocuments()
    ])

    res.json({
        ok: true,
        usuarios,
        total
    });
}

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        //Guardar Usuario
        await usuario.save();

         // GENERAR UN JWT
        const token = await generarJWT ( usuario.id );   

        res.json({
            ok: true,
            usuario, 
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error, revisar logs'
        });
    }


}

const actualizarUsuario = async (req, res = response) => {
    
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById (uid);

        if ( !usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario con ese id"
            });
        }

        //Actualizaciones

        const { password, google, email, ...campos } = req.body;

        if ( usuarioDB.email !== email){
            const existeEmail = await Usuario.findOne({ email });
            if ( existeEmail) {
                return res.status(400).json({
                    ok:false,
                    msg: "Ya existe un usuario con ese email"
                })
            }
            
        }

        if( usuarioDB.google){
            campos.email = email;
        } else if ( usuarioDB.email !== email ) {
            return res.status(400).json({
                ok:false,
                msg: "Usuario de google no puede cambiar su correo"
        });
        }


        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, {new: true} );



        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    }catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const borrarUsuario = async (req, res = response) => {
    const uid = req.params.id;

    try {
        // Verificar si el usuario existe
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "No existe un usuario con ese id"
            });
        }

        // Eliminar el artesano asociado y sus obras
        const artesano = await Artesano.findOne({ usuario: uid });
        if (artesano) {
            await Obra.deleteMany({ artesano: artesano._id });
            await Artesano.findByIdAndDelete(artesano._id);
        }

        // Eliminar el usuarios
        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario y sus datos asociados eliminados'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }
}


module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
}