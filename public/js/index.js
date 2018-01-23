var socket = io();
socket.on('connect',function(){
  console.log('connection event called');
});

socket.on('disconnect',function(){
  console.log('disconnect event');
});

socket.on('newMessage',function(message){

  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{text:message.text,from:message.from,createdAt:formattedTime});
  jQuery('#messages').append(html);

});

socket.on('newLocationMessage', function(message){
var formattedTime = moment(message.createdAt).format('h:mm a');
var template = jQuery('#location-message-template').html();
var html = Mustache.render(template,{url:message.url,from:message.from,createdAt:formattedTime});
  jQuery('#messages').append(html);
});

var messageTextbox = jQuery('[name=message]');
jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{from: 'User',text:messageTextbox.val()}, function(){
  messageTextbox.val('')
});

});

var sendLocation = jQuery('#send-location');
sendLocation.on('click',function(){
  if(!navigator.geolocation)
  return alert('Geolocation not supported by browser');

  sendLocation.attr('disabled','disabled').text('Sending Location..');

  navigator.geolocation.getCurrentPosition(function(position){
    sendLocation.removeAttr('disabled').text('Send Location');;
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  },function(){
    sendLocation.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location');
  });
});
