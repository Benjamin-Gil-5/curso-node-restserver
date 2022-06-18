const { response } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const login = async (req,res=response) =>{

    const {correo,password} = req.body;

    try{
        //verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario)
        {
            return res.status(400).json({
                msg: 'Usuario / password incorrecto'
            })
        }

        if(!usuario.estado)
        {
            return res.status(400).json({
                msg: 'Usuario / password incorrecto estado false'
            })
        }

        const validPassword = bcryptjs.compareSync(password,usuario.password);
        if(!validPassword)
        {
            return res.status(400).json({
                msg: 'Usuario / password incorrecto contraseña incorrecta'
            })
        }

        const token = await generarJWT(usuario.id);


        res.json(
            {
                usuario,
                token
            }
        )
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}

module.exports ={ 
    login
}