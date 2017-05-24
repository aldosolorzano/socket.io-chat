const express = require('express')
const path = require('path')
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static(__dirname + '/public'));

let onlineUsers = 0;

io.on('connection',(socket)=>{
  console.log('nsp user');

  socket.on('chat message',(msg)=>{
    const {userName,message} = msg
    io.emit('chat message',{userName,message})
  })

  socket.on('add user',(userName)=>{
    onlineUsers++;
    console.log(onlineUsers);
    io.emit('add user',onlineUsers);
  })

  socket.on('typing',(userName)=>{
    socket.broadcast.emit('typing', userName)
  })

  socket.on('disconnect',()=>{
    onlineUsers--;
    io.emit('add user',onlineUsers);
    console.log('user disconnect');
  })
})
