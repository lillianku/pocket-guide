$(function () {

  //load stored messages
  const loadMessages = function (message) {
    const text = `${message.name}: ${message.message}`;
    const $li = $('<li>', {text:text});
    $('#messages').prepend($li);
  };

  $.get('/messages', messages=>{
    const message = messages.results;
    messages.forEach(loadMessages);
  });

  var socket = io();
  $('#form').submit(function(){
    const data = {message: $('#message').val(), name: $('#name').val()};
    socket.emit('chat message', data);
    $('#message').val('');
    //https://stackoverflow.com/questions/45105992/node-js-send-data-to-backend-with-ajax
    $.post('/messages', {name: `${data.name}`, message:`${data.message}`});
    return false;
  });

  socket.on('chat message', function(data){
    const mes = `${data.name}: ${data.message}`;
    $('#messages').prepend($('<li>').text(mes));
  });

});
