const express = require('express');
const app = express();
//const api = require('./Api');
const server = require('http').Server(app)
const io = require('socket.io')(server)
app.use(express.static(__dirname + '/build/default'));
//app.use(api());
io.on('connection', (socket) => {
  console.log(`[ server.js ] ${socket.id} connected`);

  socket.on('disconnect', () => {
    console.log(`[ server.js ] ${socket.id} disconnected`);
  });
});
server.listen(8000, () => {
  console.log('Server listening on port 8000')
 
})s
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