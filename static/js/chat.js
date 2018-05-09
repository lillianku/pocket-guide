$(function () {

      var socket = io();
      $('#form').submit(function(){
        const data = {message: $('#m').val(), name: $('#name').val()};
        socket.emit('chat message', data);
        $('#m').val('');
        return false;
      });

      socket.on('chat message', function(data){
        const text = `${data.name}: ${data.message}`;
        $('#messages').append($('<li>').text(text));
      });

});
