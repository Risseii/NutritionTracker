const mongoose = require('mongoose');

const EsquemaVisiteur = new mongoose.Schema({ //los atributos de la colección autores
    date: {
        type: Date,
        required:[true,"La fecha es obligatoria"],
    },
    nombre: {
        type: String,
        required:[true,"El nombre del alimento es obligatorio"],
        minLength: [2,"El nombre del alimento debe tener como minimo dos caracteres"]
    },
    cantidad: {
        type: Number,
        required:[true,"Debe tener al menos un numero"]
    },
    calorias: {
        type: Number,
        required:[true,"Debe ingresar las calorias"]
    },

}, {timestamps:true,versionKey: false}); 

//timestamps: creando campos de createdAy y updatedAt

const Visiteur = mongoose.model("visiteurs",EsquemaVisiteur); //primero va el nombre de la colección

//exporta el objeto producto(linea 11) y usarlo en otro archivo
module.exports = Visiteur; 
