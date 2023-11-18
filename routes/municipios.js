// Ruta: '/api/municipios'


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMunicipios,
    crearMunicipio,
    actualizarMunicipio,
    borrarMunicipio
} = require('../controllers/municipios');

const router = Router();

router.get('/', getMunicipios);

router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre del municipio es necesario').not().isEmpty(),
        validarCampos
    ],
    crearMunicipio
);


router.put('/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del municipio es necesario').not().isEmpty(),
        validarCampos
    ],
    actualizarMunicipio
);

router.delete('/:id',
    validarJWT,
    borrarMunicipio
);



module.exports = router;

