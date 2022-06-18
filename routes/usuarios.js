const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { esRoleValido, esEmailValido, existeUsuarioPorId } = require('../helpers/db-validators');

const {
    validarCampos,
    validarJWT,
    esAdminRole,
    tieneRole
} = require('../middlewares');


const router = Router()

router.get('/', usuariosGet );
router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser de más de 6 letras').isLength({min: 6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom(esEmailValido),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost );
router.put('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
]
, usuariosPut );
router.patch('/', usuariosPatch );
router.delete('/:id',
[
    validarJWT,
    esAdminRole,
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete );


module.exports = router;