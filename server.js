

//Importamos los modulos requeridos

const express = require('express');
const app = express();
require('dotenv').config();
const cors = require ('cors');
const midd = require('./Backend/middleware/midd');
const sequelize = require('./Backend/db/db.conexion');
const mLRoutes = require('./Backend/services/mercadoLibre.service');
const local = require('./Backend/routes/productosLocales.routes')
const vistaUsuarios = require('./Backend/MVC/vistas/usuario.vista')
const vistaProductos = require('./Backend/MVC/vistas/producto.vista');



//Middlewares globales
app.use(express.json());
app.use(express.urlencoded( { extended: true }));
app.use(cors());
app.use(midd.limiter);


//Global configuracion
app.use(express.static(__dirname +'/Backend/public'));
app.set ('view engine', 'ejs');
app.set ('views', __dirname +'/Backend/views');

//Captura de errores globales
app.use((err, req, res, next) => {
    console.log(err);
    if (!err){
        return next();
    }
    return res.status(500).json('Se produjo un error inesperado, intente nuevamente')
});


//iniciamos nuestro servidor
async function inicioServer() {
    try {
        
        await sequelize.authenticate();
        console.log('Conexión estabilizada correctamente');
        app.listen(process.env.PORT, function () {
            console.log(`Sistema iniciado en htt://${process.env.HOST}:${process.env.PORT}`);
        });
      } catch (error) {
        console.error('No se pudo conectar correctamente con la Base de datos:', error);
      }
};

const localProductos = require('./Backend/MVC/models/producto.models');




inicioServer();



//Routes
vistaProductos(app);
//mLRoutes(app);
local (app);
vistaUsuarios(app);

