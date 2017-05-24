$(function () {
  const userName = prompt("Choose your nickname");
  const socket = io();

  socket.emit('add user',userName);

  $('form').submit(function(){
    let message = $('#m').val();
    socket.emit('chat message', {
      userName,
      message
    })

    $('#m').val('');
    return false;
  });

  $('#m').focusin(function(){
    console.log('focus');
    socket.emit('typing',userName)
  })
  socket.on('chat message', function(client){
    $('#messages').append(`<li><strong>${client.userName}: </strong>${client.message}</li>`);
  });

  socket.on('add user',function(onlineUsers){
    $('#onlineUsers').text(onlineUsers)
  });

  socket.on('typing',function(userName){
    $('#userTyping').empty().fadeIn('fast').append(userName + ' is typing...').fadeOut(3000)
  });

});
