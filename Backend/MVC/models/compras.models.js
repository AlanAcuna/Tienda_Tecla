const {DataTypes, Model} = require('sequelize')
const sequelize = require('../../db/db')

const Compras = sequelize.define('compras', {
    id : {
      type: DataTypes.STRING(20),
      primaryKey: true,
      autoIncrement: false,
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      references: {
          model: 'usuarios',
          key: 'id'
       }
    },
    total: {
        type: DataTypes.DECIMAL(15,2),
        allowNull: false,
    },
    numCalle: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    pais: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    codigo_postal: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    forma_de_pago: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
  },{
    timestamps: true
  })


module.exports = (Compras);
