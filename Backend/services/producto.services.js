const sequelize = require('../db/conexion')

module.exports.listarProducto = async () => {
    try {
        let resultado = await sequelize.query('SELECT * FROM dbo.producto');
        console.log(resultado);
        return resultado;
    }catch (error) {
        console.log(error);
        throw new Error ("Ocurrio un error en la consulta");
    };
};

//AGREGAR PRODUCTO
module.exports.nuevoProducto = async (producto)=> {
    let nuevoProducto = [
        producto.id,
        producto.id_categoria,
        producto.titulo,
        producto.descripcion,
        producto.precio,
        producto.inventario,
        producto.imagen,
    ]
    console.log(nuevoProducto);
    try {
        let resultado = await sequelize.query(`INSERT INTO libros (categoria_id,titulo, descripcion, precio, inventario, imagen) VALUES (?,?,?,?,?,?)`,
        {replacements: nuevoProducto, type: sequelize.QueryTypes.SELECT});
        console.log(resultado)
        return ('alta de libros correctamente') ;
    }catch (error) {
        console.log(error);
        throw new Error ("Ocurrio un error al crear el nuevo libro");
    };
};

//ELIMINAR PRODUCTO
//MODIFICAR PRODUCTO
//BUSCAR PRODUCTO 
