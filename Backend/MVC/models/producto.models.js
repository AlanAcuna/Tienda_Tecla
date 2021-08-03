const { Sequelize, DataTypes, Model, Deferrable } = require('sequelize');
const sequelize = require('../../db/db.conexion');

class Producto extends Model {}

Producto.init({
  // Model attributes are defined here
  producto_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false    
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false    
  },
  imagen: {
    type: DataTypes.STRING       
  },
  descripcion: {
    type: DataTypes.STRING,
  },
  inventario: {
    type: DataTypes.INTEGER
  }
}, {
  modelName: 'Producto', 
  tableName: 'productos',
  timestamps: false,
  createdAt: false,
  updatedAt: false,
  sequelize, 
});

module.exports = Producto;