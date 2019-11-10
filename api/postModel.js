const mongoose = require('mongoose');

const publicacionSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    usuario: {
        type: String,
        require: true
    },
    txt:{
        type: String,
        require: true
    },
    categoria: {
        type: String,
        default: "sin_categoria"
    },
    palabra:{
        type: String,
        default: "sin palabra para busqueda"
    },
    fecha_publicacion:{
        type: Date,
        default: Date.now
    }

});

var Publicacion = module.exports = mongoose.model('publicacion', publicacionSchema);

module.exports.get = function(callback, limit){
    Publicacion.find(callback).limit(limit);
}

module.exports.getinfousuario = function(callback,nombreusuario){
    console.log("se supone que voy a obtener la info del usuario: "+nombreusuario)
    Publicacion.find({usuario:"juanr"},callback);
} 
