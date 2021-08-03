CREATE DATABASE dataPrueba;
USE dataPrueba;
GO

CREATE TABLE usuarios (
    id_usuarios int IDENTITY (1,1) NOT NULL,
	nombre CHAR (200) NOT NULL,
	apellido CHAR (200) NOT NULL,
	email CHAR (200) NOT NULL,
	contrasena VARCHAR (200) NOT NULL,
	tipo_usuario CHAR NOT NULL,
    fecha_creacion DATE NOT NULL,
    PRIMARY KEY (id_usuarios) 
);
GO

INSERT INTO usuarios (nombre, apellido, email, contrasena, tipo_usuario, fecha_creacion) VALUES (
    'Citlalli', 'Chavez', 'zayda@correo.com', '123456', 'BASICO', '24/07/2021')

    