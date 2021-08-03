const {DataTypes, Model} = require('sequelize')
const sequelize = require('../../db/db')

//Definir  Modelo 
const Productos = sequelize.define('productos', {
    producto_id : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING(50),
        allowNull: false
      },
    precio: {
        type: DataTypes.DECIMAL(20,2),
        allowNull: false,
    },
    inventario: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imagen: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
  },{
    timestamps: false
  });


module.exports = Productos;

