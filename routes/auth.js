const {Router} = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router()

router.post('/login',[
    check('correo','Ingrese un correo valido').isEmail(),
    check('password','Ingrese una contraseña').not().isEmpty(),
    validarCampos
], login );

module.exports = router;