 const {response } = require ('express');

 const usuariosGet = (req, res = response) => {

    const query = req.query;
    res.json({
        msg: 'get API - controlador',
        query
    });
  };
  const usuariosPost = (req, res = response) => {
    const body = req.body;

    res.json({
        msg: 'Post API - controlador',
        body
    });
  };
  const usuariosPut = (req, res = response) => {
      const {id} = req.params;
    res.json({
        msg: 'Put API - controlador',
        id
    });
  }; const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'Patch API - controlador'
    });
  }; const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'Delete API - controlador'
    });
  };


  module.exports = {
      usuariosGet,
      usuariosPut,
      usuariosPost,
      usuariosPatch,
      usuariosDelete
  }