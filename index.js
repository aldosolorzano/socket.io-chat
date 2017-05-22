const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const nsp = io.of('/barrio')
const clients = [];

app.get('/barrio',(req,res)=>{
  res.sendFile(__dirname + '/index.html')
})

nsp.on('connection',(socket)=>{
  console.log('nsp user');

  socket.on('chat message',(msg)=>{
    // socket.broadcast.emit('barrio message',msg)
    nsp.emit('chat message', msg)
  })

  socket.on('disconnect',()=>{
    console.log('user disconnect');
  })
})

http.listen(3000,()=>{
  console.log('Listening on port 3000');
});
