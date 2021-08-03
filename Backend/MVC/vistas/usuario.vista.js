const sequelize = require('../../db/db.conexion')
const controladorUsuarios = require('../controllers/usuarios.controller')
const middUser = require('../../middleware/middUsuarios')


module.exports = async (app)=> {
    
    //Ruta para Login
    app.get('/login', async (req,res)=>{
        try{
            res.render('login');
        }catch (err){
            res.estatus(400).json('No se puede mostrar')
        }
    })


    app.post('/login', async (req,res)=>{
        let usuario = req.body
        try {
            let resultado = await controladorUsuarios.chequearUsuario(usuario)
            
            if (resultado){
                let usuarioInfo = await controladorUsuarios.datosUsuario(usuario)
                let tokenResult = await controladorUsuarios.generaToken(usuario)
                res.json({ token: tokenResult, user: usuarioInfo })
            }else {
                throw new Error ("Contraseña Incorrecta")
            }
        }catch (err){
            res.status(400).json({ error: err.message})
        }
    })
    
    app.get('/create',  async (req,res)=>{
            try{
                res.render('nuevo_usuarios.publico.ejs')
            }catch (err){
                console.log(err)
                res.status(400).json('Error al dirigirse a la pagina CREAR')
            }
        })

    // Ruta para usuario administrador
    app.get('/index',  async (req,res)=>{
        try{

            res.render('index.ejs');
        }catch (err){
            res.estatus(400).json('No se puede mostrar')
        }
    });

        //ruta para enlistar
        app.get('/usuarios', async(req,res) => {
            try {
                let resultado = await controladorUsuarios.listarUsuarios()
                res.render('listar_usuarios', {results:resultado});
                
            }catch (err){
                console.log(err)
                res.status(400).json('Error al dirigirse a la ruta vistas')
            }
        })

        app.get('/createAdmin',  async (req,res)=>{
            try{
                res.render('nuevo_usuarios.ejs');
            }catch (err){
                console.log(err);
                res.status(400).json('Error al dirigirse a la pagina CREAR');
            }
        })
         
        app.post('/save',middUser.verificacionUsuario,  async (req,res) => {
            try{
                let resultado = await controladorUsuarios.guardarUsuario(req.body);
                if(resultado) {
                    console.log('Usuario Agregado Correctamente');
                    res.redirect('/usuarios');
                }
            }catch (err){
                res.status(400).json('No se puedo crear el usuarios');
            };
        });

        
        app.post('/nuevoUsuario', async (req,res)=>{
            let usuario = req.body
            console.log(usuario)
            try{
                let guardado = await controladorUsuarios.guardarNuevoUsuario(req.body)
                if(guardado) {
                    let resultado = await controladorUsuarios.chequearUsuario(usuario)
                    if (resultado){
                        let usuarioInfo = await controladorUsuarios.datosUsuario(usuario)
                        let tokenResult = await controladorUsuarios.generaToken(usuario)
                        res.json({ token: tokenResult, user: usuarioInfo })
                    }else {
                        throw new Error ("Contraseña Incorrecta");
                    }
                    res.redirect('/usuarios');
                }
            }catch (err){
                res.status(400).json('No se puedo crear el usuarios');
            }
        });
        // ruta para modificar usuario
        app.get  ('/edita/:id', async (req,res) => {
            let data = req.params.id;
            try {
                let resultado = await controladorUsuarios.buscarUsuario(data); 
                res.render('editar_usuario.ejs', {result: resultado.dataValues });
            }catch (err){
                res.status(400).json('Error al dirigirse a la pagina EDITAR');
            };
        });
        app.post('/update', middUser.verificacionUsuario, async (req, res) => {
            try {
                let resultado = await controladorUsuarios.modificarUsuario(req.body);
                if(resultado){
                    res.redirect('/usuarios');
                }
            } catch (error) {
                res.status(400).json('No se puedo modificar el usuarios')
            }
        });
        // ruta para eliminar usuario  
        app.get('/delete/:id', middUser.verificacionUsuario, async (req,res) => {
            let data = req.params.id;
            try {
                let resultado = await controladorUsuarios.eliminarUsuario(data)
                if(resultado){
                    res.redirect('/usuarios');
                }      
            }catch (err){
                res.status(400).json('No se puedo eliminar el usuario')
            }
        })
}