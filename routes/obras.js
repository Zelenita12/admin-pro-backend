// Ruta: '/api/obras'


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getObras, getObrasById, likeObra, unlikeObra
} = require('../controllers/obras');

const router = Router();

router.get('/', getObras);

router.get('/:id', getObrasById);

router.put('/:id/like', validarJWT, likeObra);
router.put('/:id/unlike', validarJWT, unlikeObra);


module.exports = router;