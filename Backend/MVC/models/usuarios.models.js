const {DataTypes, Model, DATE} = require('sequelize');
const sequelize = require('../../db/db.conexion');

//Definir el modelo  para usuarios

const Usuarios = sequelize.define('usuarios', {
    id_usuarios : {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombres: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    pass: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    tipo_usuario: {
        type: DataTypes.STRING(50),
        enum: ['user', 'admin'],
        default: 'user',
        allowNull: false
      },
    fecha_creacion: {
        type: DATE,
        allowNull: false,
    },
  },{
    timestamps: false
  });

module.exports = (Usuarios);

  module.exports.listar = async () => {
    let resultado = await sequelize.query('SELECT * FROM usuarios');
    return resultado[0];
  };

  module.exports.existenciaDeUsuario = async (usr)=>{
    //chequear con la base de datos que exista el usuario
    let resultado = await Usuarios.findOne({where: {email: usr.email}});
    if (resultado === null){
        return false;
    }else {
        return true;
    };
  };

  module.exports.usuarioAutenticado = async (usr)=>{
    //chequear con la base de datos que exista el usuario
    let resultado = await Usuarios.findOne({where: {email:usr.email, pass: usr.pass}});
    if (resultado === null){
        return false;
    }else {
        return true;
    };
  };

  module.exports.recuperarInfoUser = async (usr) => {
    let resultado = await Usuarios.findAll({where: {email:usr.email, pass: usr.pass}})
    if (resultado === null){
      return false
    }else {
      return resultado[0];
    };
  };
  

  module.exports.nuevoUsuario = async (data)=> {
    try {
        let resultado = await Usuarios.findOne({where:{email: data.email}});
        if (resultado != null){
          alert("Error en la creacion del usuario o el usuario ya existe");
          //throw new Error ('Error en la creacion del usuario o el usuario ya existe')
          return false; 
        }else {            
            await Usuarios.create(({nombres: data.nombres, apellidos: data.apellidos, email: data.email, pass: data.pass, tipo_usuario: data.tipo_usuario, fecha_creacion: data.fecha_creacion}))
            return true;
        }
    }catch (err) {
        console.log(err);
        throw new Error (err);
    }
  }

  module.exports.nuevoUsuarioCliente = async (data)=> {
    try {
        let resultado = await Usuarios.findOne({where:{email: data.email}});
        if (resultado != null){
          alert("Error en la creacion del usuario o el usuario ya existe");
          //throw new Error ('Error en la creacion del usuario o el usuario ya existe');
          return false; 
        }else {            
            await Usuarios.create(({nombres: data.nombres, apellidos: data.apellidos, email: data.email, pass: data.pass, tipo_usuario: data.tipo_usuario, fecha_creacion: data.fecha_creacion}))
            return true;
        }
    }catch (err) {
        console.log(err);
        throw new Error (err);
    }
  }

  module.exports.buscarUsuarios = async (data) => {
    try{
      let resultado = await Usuarios.findAll({
        where: { id_usuarios : data }
      })
      return resultado[0];
    }catch (err) {
      throw new Error (err);
    };
  };