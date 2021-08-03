const {DataTypes, Model} = require('sequelize');
const sequelize = require('../../db/db.conexion');

//Definir mi Modelo con que voy a trabajar
const Productos = sequelize.define('productos', {
    producto_id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo : {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    precio: {
        type: DataTypes.DECIMAL(15,2),
        allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    inventario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    categoria: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  },{
    timestamps: false
  })

module.exports = Productos


module.exports.listar = async () => {
    let resultado = await sequelize.query('SELECT * FROM dbo.productos')
    return resultado[0]
}

module.exports.listarProducto = async (data) => {
    let resultado = await Productos.findAll({
        where: { producto_id : data }
    })
    return resultado[0]
}