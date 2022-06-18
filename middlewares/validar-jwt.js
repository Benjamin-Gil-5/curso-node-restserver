const { response } = require('express')
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req,res = response,next) =>
{
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }
    try{
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        req.usuario = await Usuario.findById(uid);

        if(!req.usuario){
            return res.status(401).json({
                msg: 'Token no valido - usuario eliminado de la BD'
            })
        }

        if(!req.usuario.estado){
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado: false'
            })
        }

        next();
    }
    catch(error)
    {
        res.status(401).json({
            msg: 'Token no validoo'
        })
    }

    
}

module.exports = 
{
    validarJWT
}