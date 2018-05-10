$(function () {

  var socket = io();
  $('#form').submit(function(){
    const data = {message: $('#message').val(), name: $('#name').val()};
    console.log(data);
    socket.emit('chat message', data);
    $('#message').val('');
    return false;
  });

  socket.on('chat message', function(data){
    const text = `${data.name}: ${data.message}`;
    //https://stackoverflow.com/questions/45105992/node-js-send-data-to-backend-with-ajax
    // $.post('/messages', { name: `${data.name}`, message:`${data.message}`});
    $('#messages').prepend($('<li>').text(text));
  });

});
