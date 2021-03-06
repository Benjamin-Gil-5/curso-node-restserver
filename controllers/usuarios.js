 const bcryptjs = require('bcryptjs/dist/bcrypt');
 const {response } = require ('express');

 const  Usuario = require('../models/usuario');

 const usuariosGet = async (req, res = response) => {

    const {limite = 5,desde =0} = req.query;
    const {query} = {estado:true}
    

    const [total,usuarios] = await Promise.all([
      Usuario.countDocuments(query),
      Usuario.find(query)
      .skip(Number(desde))
      .limit(Number(limite))
    ])
    res.json({
        total,
        usuarios
    });
  };
  const usuariosPost = async (req, res = response) => {



    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});
    //verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
      return res.status(400).json(
        {
          msg: 'Ese correo ya está registrado'
        }
      );
    }
    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);
    await usuario.save();
    res.json({
        msg: 'Post API - controlador',
        usuario
    });
  };
  const usuariosPut = async (req, res = response) => {
      const {id} = req.params;
      const {_id,password, google,correo, ...resto} = req.body;

      //Validar contra la base de datos
      if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
      }
      const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json(usuario);
  }; const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - controlador'
    });
  }; 
  const usuariosDelete = async (req, res = response) => {
    const {id} = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
    const usuariuAuth = req.usuario;
    res.json({
        usuario,
        usuariuAuth
    });
  };


  module.exports = {
      usuariosGet,
      usuariosPut,
      usuariosPost,
      usuariosPatch,
      usuariosDelete
  }