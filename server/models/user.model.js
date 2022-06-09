const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const EsquemaUsuario = new mongoose.Schema({
    firstName: {
        type: String, 
        required: [true,"El nombre es obligatorio"]
    },
    lastName: {
        type: String,
        required: [true,"El apellido es obligatorio"]
    },
    email: {
        type: String,
        required: [true,"El email es obligatorio"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            messages: "Ingrese un email válido"
        },
        unique: true
    },
    password: {
        type: String,
        required: [true,"El Password es obligatorio"],
        minLength:[8,"El password debe tener al menos 8 caracteres"]
    }
},{timestamps:true,versionKey:false})

//Se realiza cuando no queremos guardarlo de bd,es virtual o temporal el confirm, se utiliza middleware
EsquemaUsuario.virtual('confirmPassword')
    .get( ()=> this._confirmPassword)
    .set(value => this._confirmPassword = value)

//se hace antes de validar el esquema de usuario 
//validando contrasenas
EsquemaUsuario.pre('validate',function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword','Las contraseñas no coinciden');
    }

    next();
})

//antes de guardar usuario, encriptar la contrasena
EsquemaUsuario.pre('save',function(next) {
    bcrypt.hash(this.password,10)
        .then(hash => {
            this.password = hash;
            next();
        });
        
});

const Usuario = mongoose.model('usuarios',EsquemaUsuario);
module.exports = Usuario;