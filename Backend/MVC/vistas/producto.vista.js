const sequelize = require('../../db/db.conexion');
const controladorProductos = require('../controllers/producto.controller');
const middUser = require('../../middleware/middUsuarios');

module.exports = async (app) => {

    //ruta para enlistar productos
    app.get('/listado', async (req,res) => {
        try{
            let resultado = await controladorProductos.listarDatos();
            res.render('listar', { results:resultado });
        } catch (err) {
            console.log(err);
            res.status(400).json('Error en la consulta');
        }
    })

    //Rutas para agregar y guardar un nuevo producto
    app.get('/agregar', async (req,res) => {
        try{
            res.render('agregar');
        } catch (err) {
            console.log(err);
            res.estatus(400).json('No se puede mostrar');
        }
    })

    app.post('/guardar', async (req, res) => {
        let resultado = await controladorProductos.guardar(req.body);
        if(resultado) {
            console.log('Producto agregado correctamente');
            res.redirect('/agregar');
        }
    });

    // ruta para modificar producto
    // app.get('/modificar/:id', async (req, res) => {
    //     let data = req.params;
    //     let data = parseInt(parametro)
    //     console.log(`la data es: ${data} y el tipo es :`+ typeof(data));
    //     try {
    //         let resultado = await controladorProductos.buscaProducto(data);
    //         console.log(`El resultado es ${resultado}`);
            
    //         res.render('editarproducto', { result:resultado.dataValues });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(400).json('Error en la consulta');
    //     }
    // })

    app.get('/modificar/:id' , async (req,res) => {
        let data = req.params.id;
        console.log(`La data es: ${data}`);
        try{
            let resultado = await controladorProductos.buscaProducto(data);
            console.log(resultado.dataValues)
            res.render('editarproducto', { result:resultado.dataValues });
        } catch (err) {
            console.log(err);
            res.status(400).json('Error en la consulta');
        }
    })

    app.post('/actualizar', async (req, res) => {
        try {
            let resultado = await controladorProductos.modificar(req.body);
            if(resultado){
                res.redirect('/listado');
            }
        } catch (error) {
            res.status(400).json('No se pudo actualizar el producto');
        }
    });

    //ruta para Eliminar un producto por ID
    app.get('/eliminar/:id', async (req, res) => {
        let data = req.params.id
        console.log(data);
        try{
            let resultado = await controladorProductos.eliminar(data)
            if(resultado){
                res.redirect('/listado');
            }
        }catch (err){
            res.status(400).json('No se pudo eliminar el producto');
        }
    })

}