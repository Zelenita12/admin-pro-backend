// Ruta: '/api/obras'


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getObras,
} = require('../controllers/obras');

const router = Router();

router.get('/', getObras);


module.exports = router;