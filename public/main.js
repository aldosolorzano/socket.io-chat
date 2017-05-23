$(function () {
  const userName = prompt("Choose your nickname");
  const socket = io();
  $('form').submit(function(){
    let message = $('#m').val();
    socket.emit('chat message', {
      userName,
      message
    })

    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(client){
    $('#messages').append(`<li><strong>${client.userName}: </strong>${client.message}</li>`);
  });
});
