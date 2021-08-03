const productoServices = require('../services/producto.services');

module.exports = (app) => {

    //ruta para visualizar el listado de productos
    app.get('/producto', async (req,res) => {
        try {
            let resultado = await productoServices.listarProducto();
            res.json(resultado);
        }catch (err){
            console.log(err.message);
            res.status(500).json({error : err.message});
        };
    });
    
    // agregar y guardar productos
    app.post('/agregarProducto', async (req,res) => {
        let producto = req.body;
        console.log(producto);
        try {
            let resultado = await productoServices.nuevoProducto(producto);
            console.log(resultado);
            res.json(resultado);
        }catch (err){
            console.log(err.message);
            res.status(500).json({error : err.message});
        };
    });

};