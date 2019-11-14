const express = require('express');
const app = express();
//const api = require('./Api');
const server = require('http').Server(app)
const io = require('socket.io')(server)
const postController = require('./api/postController');
const mongoose = require('mongoose');
var cadena_conexion = "mongodb+srv://admin:Birlolo1100@sopes1-ym3ze.gcp.mongodb.net/test?retryWrites=true&w=majority"
//jajjjajaja

app.get('/new', async (req, res) => {
  console.log(req.query);
  postController.new(req,res,req.query,io);
})
/*
app.get('/', async (req, res) => {
  postController.new(req, res, req.query,io);
})
*/
app.use(express.static(__dirname + '/build/default'));
//app.use(api());
io.on('connection', (socket) => {
  console.log(`[ server.js ] ${socket.id} connected`);
  socket.emit('update slide', `Hello ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`[ server.js ] ${socket.id} disconnected`);
    
  });
  //========================================================
  socket.on('obtener10', () => {
    console.log("Me cayo la peticion de recibir10....");
    let t10 = postController.index(io);
    console.log(t10)
    //socket.emit('ten10',t10);

  });
  //=======================RecibirUltimooTweet=============
  //Se tiene que resolver del lado de donde se reciben los twetts para
  //insertarlos en mongo
  //===================RecibirTotalUsuarios================
  //Los totales de usuarios se piden al inicio del backend
  socket.on('obtenerTotalUsuarios', () => {
    console.log("Me cayo la peticion de OBTENER USUARIOS");
    let t10 = postController.getUsuarios(io);
    //console.log(t10)
    //socket.emit('ten10',t10);

  });
  //Los totales de usuarios se mandan cada ves que se ingrese un
  //tweet con nuevos usuarios
  //=======================RecibirTotaldeTweets=============
  socket.on('obtenerTotalTweets', () => {
    console.log("Me cayo la peticion de OBTENER TOTAL DE TWEETS");
    let t10 = postController.getTweets(io);
    console.log(t10)
    //socket.emit('ten10',t10);

  });
  //=======================RecibirTotalCategorias==============
  socket.on('obtenerTotalCategorias', () => {
    console.log("Me cayo la peticion de OBTENER TOTAL DE TWEETS");
    let t10 = postController.categorias(io);
    console.log(t10)
    //socket.emit('ten10',t10);

  });
  //=========================RecibirTopUsuario=====================
  socket.on('obtenerTopUsuario', () => {
    console.log("Me cayo la peticion de  TRAER CATEGORIA TOP");
    let t10 = postController.usuario_top(io);
    console.log(t10)
    //socket.emit('ten10',t10);

  });
  //=========================RecibitCategoriaTop==========================
  socket.on('obtenerCategoriaTop', () => {
    console.log("Me cayo la peticion de  TRAER CATEGORIA TOP");
    let t10 = postController.categoria_top(io);
    console.log(t10)
    //socket.emit('ten10',t10);

  });
  //=======================================================
  //=======================================================
  socket.on('obtenerTweetsOfUser', (cb) => {
    console.log("Me cayo la peticion de traer tweets de "+cb);
    let t10 = postController.indexusuario(cb,io);
    console.log(t10)
    //socket.emit('ten10',t10);

  });
  
  //=======obtiene el numero de tweets de un usuario==========
  socket.on('obtenerNumTweetsOfUser', (cb) => {
    console.log("Me cayo la peticion de traer num tweets de "+cb);
    let t10 = postController.numtweetsusuario(cb,io);
    console.log(t10)
    //socket.emit('ten10',t10);

  });

  //==================================================
  //==================================================
  //===obtiene los ultimos tres tweets de una categoria=======
  socket.on('obtenerTweetsOfCat', (cb) => {
    console.log("Me cayo la peticion de traer num tweets de cat: "+cb);
    let t10 = postController.tweetscat(cb,io);
    console.log(t10)
    //socket.emit('ten10',t10);

  });
  //=======obtiene el numero de tweets de una categoria==========
  socket.on('obtenerNumTweetsOfCat', (cb) => {
    console.log("Me cayo la peticion de traer num tweets de cat: "+cb);
    let t10 = postController.numtweetscat(cb,io);
    console.log(t10)
    //socket.emit('ten10',t10);

  });
});
server.listen(8000, () => {
  console.log('Server listening on port 8000')
  try{
    mongoose.connect(cadena_conexion);
  }
  catch(err){
    console.log("NO ME PUDE CONECTAR A LA BASE DE DATOS DE MONGO!!");
    console.log(err);
  }
  

 
})

app.get('/get/miscomplementos', async (req, res) => {
  
  
  let aa = {
    nombre:"byron"
  };

  io.emit('setinfo',JSON.stringify(aa));
  res.status(200).end(JSON.stringify(aa));
})
/*
server.listen(5001, () => {
  console.log(`Server listening on port 5001`);
});
*/