var socket = io();

socket.on('connect',function(){
  console.log('connection event called');
});

socket.on('disconnect',function(){
  console.log('disconnect event');
});

socket.on('newMessage',function(message){

  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);
  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(message){
var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current Location</a>');
  li.text(`${message.from}: ${formattedTime}`);
  a.attr('href',message.url);
  li.append(a);
  jQuery('#messages').append(li);
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
