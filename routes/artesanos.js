

//RUTA artesanos
//ruta: '/api/artesano'

// Ruta: '/api/hospitales'


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getArtesanos,
    crearArtesano,
    actualizarArtesano,
    borrarArtesano,
    crearObra,
    getArtesanoById
} = require('../controllers/artesanos');

const router = Router();

router.get('/', validarJWT, getArtesanos);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del artesano es necesario').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser válido').isMongoId(),
        validarCampos
    ],
    crearArtesano
);


router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del artesano es necesario').not().isEmpty(),
        check('hospital', 'El id del hospital debe ser válido').isMongoId(),
        validarCampos
    ],
    actualizarArtesano
);

router.delete('/:id',
    validarJWT,
    borrarArtesano
);

router.get('/:id',
    validarJWT,
    getArtesanoById
);

router.put('/obra/:id',
    [
        validarJWT,
        check('titulo', 'El nombre de la obra es necesaria').not().isEmpty(),
        check('descripcion', 'La descripción de la obra debe ser válida').not().isEmpty(),
        check('fecha', 'La fecha de la obra debe ser válida').not().isEmpty(),
        validarCampos
    ],
    crearObra
);



module.exports = router;

