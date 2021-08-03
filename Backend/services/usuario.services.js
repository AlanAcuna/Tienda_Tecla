const sequelize = require('../db/conexion');

module.exports.nuevoUsuario = async (usuarios) => {
    let nuevoUsuario = [
        usuarios.email,
        usuarios.contraseña,
        usuarios.tipo_usuario,
        usuarios.fecha_creacion
    ]
    try {
        let resultado = await sequelize.query(`INSERT INTO autor (email, contraseña, tipo_usuario, fecha_creacion) VALUES (?,?,?,?)`,
        {replacements: nuevoUsuario, type: sequelize.QueryTypes.SELECT});
        console.log(resultado)
        return ('Alta de autor correctamente');
    }catch (error) {
        console.log(error);
        throw new Error ("Ocurrio un error en la consulta");
    };
};

module.exports.listarUsuario = async () => {
    try {
        let resultado = await sequelize.query('SELECT * FROM usuarios');
        return resultado;
    }catch (error){
        console.log(error);
        throw new Error ("Ocurrio un error en la consulta");
    };
};
