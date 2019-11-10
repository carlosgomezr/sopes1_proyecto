Publicacion = require('./postModel')


/**
 * se encarga de registrar un nuevo post
 * 
 */

exports.new = function (req, res, datos,socket) {

    console.log("Voy a guardar un nuevo tweet");
    let publicacion = new Publicacion();
    publicacion.nombre = datos.nom;
    publicacion.usuario = datos.usr;
    publicacion.txt = datos.txt;
    
    let categorias = getCategoria(datos.txt);

    if (categorias.length == 1) {
        publicacion.categoria = categorias[0];
    } else if(categorias.length > 1){
        res.json({
            estado: 'error',
            mensaje: 'un tweet no puede tener mas de una categoria',
            data: categorias
        });
        return;
    }

    publicacion.save(function(err){
        if(err){
            res.json({
                estado: 'error',
                mensaje: 'No se registro la publicacion'
            });
        }
        socket.emit('newtwett',publicacion)
        //socket.broadcast.emit('newtwett',publicacion);
        res.json({
            estado: 'hecho',
            mensaje: 'se creo una nueva publicacion',
            data: publicacion
        });
    });
}

/**
 * se encarga de sacar las posibles categoria del tweet
 * @param {String} texto 
 * @returns {Array} de cadenas posiblemente vacio
 */
function getCategoria(texto) { 
    let r = /#(\w|\d)+/g;
    let lst = [];
    let f;
    while (true) {
        f = r.exec(texto);
        if (f == null) {
            break;
        }
        let cath = f[0];
        let cat = cath.slice(1);
        lst.push(cat);
    }
    return lst;
}

exports.index = function(socket){
    console.log("index de postController")
    let r;
    Publicacion.getinfousuario(function(err, datos){
        if(err){
            /*
            res.json({
                estado: 'error',
                mensaje: err
            });
            */
           console.log(err);
           r = err;
        }
        /*
        res.json({
            estado: 'hecho',
            mensaje: 'los registros son',
            datos: datos
        });
        */
       console.log("datos:=============")
       console.log(datos)
       r= datos;
       socket.emit('ten10',datos);
    },"Byronjl");
   

};

/**
 * 
 * @param {Number} limite 
 */


function getQueryForAUser(nombreusuario){
    /**
     * es un vector con las diferentes consultas y se compoorta
     * como pipe and filters:
     * consulta(registros, query[0])->consulta(resultado1, query[1])....
     */
    let query = [
        {
            $group : {
                _id:"$categoria",
                cantidad: {$sum:1}
            }
        },
        {
            $sort: {"cantidad": -1}
        },
        {
            $limit: limite
        },
        {
            $project: {
                _id:false,
                categoria: "$_id",
                cantidad: "$cantidad"
            }
        }
    ];

    return query;
}


function getQueryCategoria(limite){
    /**
     * es un vector con las diferentes consultas y se compoorta
     * como pipe and filters:
     * consulta(registros, query[0])->consulta(resultado1, query[1])....
     */
    let query = [
        {
            $group : {
                _id:"$categoria",
                cantidad: {$sum:1}
            }
        },
        {
            $sort: {"cantidad": -1}
        },
        {
            $limit: limite
        },
        {
            $project: {
                _id:false,
                categoria: "$_id",
                cantidad: "$cantidad"
            }
        }
    ];

    return query;
}

/**
 * Esta función realiza la consulta, agrupa los tweets por categoria calcula
 * la cantidad, los ordena de mayor a menor, extrae solo 10 registros y 
 * por ultimo crea la proyección que se mostrara en la grafica
 */
exports.grafica_pie = function(req, res){
    let query = getQueryCategoria(10);

    Publicacion.aggregate(query,function(err, datos){
        if(err){
            res.json({
                estado: "error",
                mensaje: "Error en la funcion grafica_pie"
            });
        }

        res.json({
            estado:"hecho",
            mensaje:"datos para la grafica de pie",
            datos: datos
        });
    });
};

/***
 * Esta función recupera la categoria que tiene mas tweets y la cantidad de estos
 */
exports.categoria_top = function(req, res){
    let query = getQueryCategoria(1);
    Publicacion.aggregate(query, function(err, datos){
        if(err){
            res.json({
                estado: "error",
                mensaje: "Error en la funcion categoria_top"
            });
        }
        
        let categoria = datos[0]? datos[0] : {categoria: "no_categoria", cantidad: 0};

        res.json({
            estado: "hecho",
            mensaje: "datos de la categoria mas utilizada",
            datos: categoria
        });
    }); 
};

/***
 * Esta funcion se encarga de consultar la cantidad de categorias
 * que se han agregado
 */
exports.categorias = function(req, res){
    let query = [
        {
            $group : {
                _id: "$categoria",
                suma : {$sum: 1}
            }
        },
        {
            $group: {
                _id: null,
                categorias : {$sum: 1}
            }
        },
        {
            $project:{
                _id: false,
                categorias : "$categorias"
            }
        }
    ]

    Publicacion.aggregate(query, function(err, datos){
        if(err){
            res.json({
                estado: "error",
                mensaje: "Error en la funcion categorias"
            });
        }

        let categorias = datos[0]? datos[0].categorias: 0;

        res.json({
            estado: "hecho",
            mensaje: "la cantidad de categorias es:",
            datos: {
                cantidad: categorias
            }
        })
    });
};

/**
 * Esta funcion obtendrá el query del total de usuarios
 */
exports.getUsuarios = function(req, res){
    let query = [
        {
            $group : {
                _id: "$usuario",
                suma : {$sum: 1}
            }
        },
        {
            $group: {
                _id: null,
                usuario : {$sum: 1}
            }
        },
        {
            $project:{
                _id: false,
                usuario : "$usuario"
            }
        }
    ]

    Publicacion.aggregate(query, function(err, datos){
        if(err){
            res.json({
                estado: "error",
                mensaje: "Error en la funcion usuarios"
            });
        }

        let usr = datos[0]? datos[0].usuario : 0;

        res.json({
            estado: "hecho",
            mensaje: "la cantidad de usuarios es:",
            datos: {
                cantidad: usr
            }
        })
    });
}

/**
 * Esta función obtendrá el query del total de tweets
 */
exports.getTweets = function(req, res){
    let query = [
        {
            $group : {
                _id: null,
                suma : {$sum: 1}
            }
        },
        {
            $project:{
                _id: false,
                txt : "$suma"
            }
        }
    ]

    Publicacion.aggregate(query, function(err, datos){
        if(err){
            res.json({
                estado: "error",
                mensaje: "Error en la funcion tweets"
            });
        }

        let txt = datos[0]? datos[0].txt : 0;

        res.json({
            estado: "hecho",
            mensaje: "la cantidad de tweets es:",
            datos: {
                cantidad: txt
            }
        })
    });
}

/**
 * Esta función realiza el query de obtener el usuario con los tweets más creados
 */
function getQueryUsuario(limite){
        /**
     * es un vector con las diferentes consultas y se compoorta
     * como pipe and filters:
     * consulta(registros, query[0])->consulta(resultado1, query[1])....
     */
    let query = [
        {
            $group : {
                _id:"$usuario",
                cantidad: {$sum:1}
            }
        },
        {
            $sort: {"cantidad": -1}
        },
        {
            $limit: limite
        },
        {
            $project: {
                _id:false,
                usuario: "$_id",
                cantidad: "$cantidad"
            }
        }
    ];

    return query;
}

/**
 * Obtiene los tweets más creados por el usuario
 */
exports.usuario_top = function(req, res){
    let query = getQueryUsuario(1);
    Publicacion.aggregate(query, function(err, datos){
        if(err){
            res.json({
                estado: "error",
                mensaje: "Error en la funcion usuario_top"
            });
        }
        let dato = datos[0]? datos[0] : {usuario:"no_user", cantidad: 0};
        res.json({
            estado: "hecho",
            mensaje: "datos del usuario con tweets mas creados",
            datos: {
                usuario: dato.usuario,
                publicaciones: dato.cantidad
            }
        });
    }); 
}

/**
 * obtiene los tweets que contiene esta palabra adentro de un texto
 */
exports.busqueda = function (req, res, dat) {
    Publicacion.get(function(err, datos){
        if(err){
            res.json({
                estado: "error",
                mensaje: "Error en la funcion busqueda"
            });
        }
        var vector = []; //este vector guardará todas las coincidencias
        for(var i = 0; i < datos.length; i++){ //recorre el vector de tweets
            if(datos[i].txt != null){
                var buscar = (datos[i].txt).match(dat.palabra); //busca la palabra
                if(buscar != null){ //entra solo si la encuentra.
                    vector.push(datos[i]);
                }
            }
        }
        res.json({
            estado: "hecho",
            mensaje: "tweets:",
            datos: vector
        })
    });
}
