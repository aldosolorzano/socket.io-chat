const express = require('express')
const path = require('path')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

io.on('connection',(socket)=>{
  console.log('nsp user');
  socket.on('chat message',(msg)=>{
    const {userName} = msg
    const {message} = msg
    io.emit('chat message',{userName,message})
  })

  socket.on('disconnect',()=>{
    console.log('user disconnect');
  })
})
