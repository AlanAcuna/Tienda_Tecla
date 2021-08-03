const Producto = require('../models/producto.models');
const Productos = require('../models/product.models');
const  sequelize = require('../../db/db.conexion');
const Tienda = require('../models/productos.models');

module.exports.listarDatos = async () => {
    try {
        let productos = new Tienda();
        let resultado =  await productos.listarProductos();
        return resultado;
    }catch (err) {
        console.log('error en el modelo' + err);
        throw new Error ({ error: err.message });
    };
};


//Seleccionar un solo Producto por ID
module.exports.buscaProducto = async (data) => {
    try {
    let resultado = await Productos.listarProducto(data);
    return resultado
    }catch (err) {
        console.log('Error desde el modelo buscaProducto' + err);
        throw new Error ({error: err.message});
    }
}

// module.exports.modificaProducto = async (data) => {
//     try {      
//         await Producto.update({
//             titulo: data.titulo, 
//             precio: data.precio, 
//             imagen: data.imagen, 
//             inventario: data.inventario, 
//             categoria: data.categoria, 
//             descripcion: data.descripcion
//         },
//         {
//           where: {producto_id:id}
//         });  
//         console.log("Producto actualizado con éxito");
//         return "Producto actualizado con éxito";
//       } catch (error) {
//         console.log(error);
//         return error;
//       }  
// }

module.exports.guardar = async (data) => {
    try {
        let producto = await Producto.create({
            titulo: data.titulo, 
            precio: data.precio, 
            imagen: data.imagen, 
            inventario: data.inventario, 
            categoria: data.categoria, 
            descripcion: data.descripcion}
            );
        return producto;
    } catch (err) {
        console.log(err)
        throw new Error ('Problema al realizar el alta en la BASE DE DATOS');
    }
};

module.exports.eliminar = async (data) => {
    try {
        await Producto.destroy( {
            where: { producto_id : data }
        })
        return true;
    } catch (err) {
        throw new Error ('No se pudo eliminar el producto');
    }
};

module.exports.modificar = async (data) => {
    try {
        await Productos.update({ titulo: data.titulo, precio: data.precio, imagen: data.imagen, inventario: data.inventario, categoria: data.categoria, descripcion: data.descripcion}, {where: { producto_id : data.producto_id }});
        return true;
    } catch (err) {
        throw new Error ('No se pudo actualizar el producto');
    }
};