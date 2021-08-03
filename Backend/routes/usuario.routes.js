
const usuariosServices = require('../services/usuario.services')

module.exports = (app) => {

    app.get('/usuarios', async (req,res) => {
        try {
            let resultado = await usuariosServices.listarUsuario();
            res.json(resultado);
        }catch (err){
            console.log(err.message);
            res.status(500).json({error : err.message});
        };
    });

    app.post('/agregarUsuario', async (req,res) => {
        let usuario = req.body;
        console.log(libro);
        try {
            let resultado = await usuariosServices.nuevoUsuario(usuario);
            console.log(resultado);
            res.json(resultado);
        }catch (err){
            console.log(err.message);
            res.status(500).json({error : err.message});
        };
    });

};