// Ruta: '/api/ciudades'


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getCiudades,
    crearCiudad,
    actualizarCiudad,
    borrarCiudad
} = require('../controllers/ciudades');

const router = Router();

router.get('/', getCiudades);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del ciudad es necesario').not().isEmpty(),
        validarCampos
    ],
    crearCiudad
);


router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del ciudad es necesario').not().isEmpty(),
        validarCampos
    ],
    actualizarCiudad
);

router.delete('/:id',
    validarJWT,
    borrarCiudad
);



module.exports = router;

