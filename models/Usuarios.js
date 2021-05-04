const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../config/db');
const Proyectos = require('../models/Proyectos');

const Usuarios = db.define('usuarios',{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email:{
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail:{
                msg: 'Agregar un Correo Valido'
            }, 
            notEmpty:{
                msg: 'El correo no puede ir vacio'
            }
        },
        unique:{
            args: true,
            msg:'Usuario Ya Registrado'
        }
    },
    password:{
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty:{
                msg: 'El password no puede ir vacio'
            }
        }
    }
},{
    hooks: {
        beforeCreate(usuario){
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10))
        }
    }
});

// Metodo personalizados
Usuarios.prototype.verificarPassword =  function(password){
    return bcrypt.compareSync(password, this.password)
}

// Usuarios.hasMany(Proyectos);

module.exports = Usuarios;