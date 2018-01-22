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

var sendLocation = jQuery('#send-location');
sendLocation.on('click',function(){
  if(!navigator.geolocation)
  return alert('Geolocation not supported by browser');

  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  },function(){
    alert('Unable to fetch location');
  });
});
