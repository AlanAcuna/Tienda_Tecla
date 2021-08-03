const sequelize = require('../../db/db.conexion');

module.exports = class Tienda {
  
    constructor(Productos) {
        this.Productos = Productos
      }
    
    async listarProductos() {
        try {
            let resultado = await sequelize.query('SELECT * FROM dbo.productos');
            console.log(resultado);
            return resultado;
        } catch (err) {
            console.log(err);
            throw new Error ('Ocurrio un problema en la consulta con la DB');      
        }
    }
}

  