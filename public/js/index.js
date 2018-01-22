var socket = io();

socket.on('connect',function(){
  console.log('connection event called');
});

socket.on('disconnect',function(){
  console.log('disconnect event');
});

socket.on('newMessage',function(message){
  console.log('Listened about the new received message',message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{from: 'User',text: jQuery('[name=message]').val()}, function(ack){
  }
);
});
