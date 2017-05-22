const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);


app.get('/',(req,res)=>{
  res.sendFile(__dirname + '/index.html')
});

io.on('connection',(socket)=>{
  console.log('User Connected');
  // get messages
  socket.on('chat message',(msg)=>{
    socket.broadcast.emit('chat message',msg)
    // io.emit('chat message', msg)
  })
  // disconnect
  socket.on('disconnect',()=>{
    console.log('User Disconnected');
  })
});

http.listen(3000,()=>{
  console.log('Listening on port 3000');
});
