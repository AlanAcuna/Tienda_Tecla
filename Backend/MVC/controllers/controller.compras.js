const Compras = require('../models/compras.models')
const Informe = require('../models/infoCompra.models')
const sequelize = require('../../db/db.conexion');


//Guardar una Compra
module.exports.nuevaCompra = async (data) => {
    try {
        await Compras.create(({id: data.id, cliente_id: data.cliente_id, total: data.total, numCalle: data.numCalle, pais: data.pais, direccion: data.direccion, codigo_postal: data.codigo_postal, forma_de_pago: data.forma_de_pago}))
        return true;
    }catch (err){
        throw new Error ('Ocurrio un problema al realizar el alta en la DB');
    };
};

module.exports.nuevoInforme = async (data) => {
    try {
        await Informe.create(({
            compra_id: data.compra_id, 
            producto: data.producto,
            cantidad: data.cantidad,  
            precio: data.precio, 
            subtotal: data.subtotal }));
        return true;
    }catch (err){
        throw new Error ('Ocurrio un problema al realizar el alta');
    };
};