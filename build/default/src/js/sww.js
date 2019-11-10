var socket = new WebSocket("ws://35.184.187.153:5003/ws");
let fprueba = () =>{
    console.log("whutttttttttt");
};
let connect = cb => {
    console.log("connecting");
  
    socket.onopen = () => {
      console.log("Successfully Connected");
    };
  
    socket.onmessage = msg => {
      console.log(msg);
      cb(msg);
    };
  
    socket.onclose = event => {
      console.log("Socket Closed Connection: ", event);
    };
  
    socket.onerror = error => {
      console.log("Socket Error: ", error);
    };
  };

let sendMsg = msg => {
  console.log("sending msg: ", msg);
  socket.send(msg);
};

