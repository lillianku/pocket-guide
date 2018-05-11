$(function () {

  //loaded stored messages
  const loadMessages = function (message) {
    const text = `${message.name}: ${message.message}`;
    const $li = $('<li>', {text:text});
    $('#messages').append($li);
  };

  $.get('/messages', messages=>{
    const message = messages.results;
    messages.forEach(loadMessages);
    // $('#oldmessage').attr('style');
    // setTimeout(function(){ $('#oldmessage').attr('style'); }, 1000);
  });

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
    $.post('/messages', { name: `${data.name}`, message:`${data.message}`});
    $('#messages').append($('<li>').text(text));
  });

});
