$(function () {

  var socket = io();
  $('#form').submit(function(){
    const data = {message: $('#message').val(), name: $('#name').val()};
    socket.emit('chat message', data);
    $('#message').val('');
    return false;
  });

  socket.on('chat message', function(data){
    const text = `${data.name}: ${data.message}`;
    //SAve into mongo here
    $('#messages').prepend($('<li>').text(text));
  });

});
