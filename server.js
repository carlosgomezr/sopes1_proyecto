const express = require('express');
const app = express();
//const api = require('./Api');
const server = require('http').Server(app)
const io = require('socket.io')(server)
const postController = require('./api/postController');
const mongoose = require('mongoose');
var cadena_conexion = "mongodb+srv://admin:Birlolo1100@sopes1-ym3ze.gcp.mongodb.net/test?retryWrites=true&w=majority"
//jajjjajaja

app.get('/', async (req, res) => {
  postController.new(req, res, req.query,io);
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
  socket.on('quiero10', () => {
    console.log("Me cayo la peticion de traer 10....");
    let t10 = postController.index(io);
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