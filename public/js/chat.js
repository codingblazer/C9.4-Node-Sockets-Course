var socket = io();

function scrollToBottom(){
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();
  var clientHeight = messages.prop('clientHeight');
  var scrollTop =  messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');

  if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight>=scrollHeight){
    messages.scrollTop(scrollHeight); //> case happens when new message arive,
  }
}

socket.on('connect',function(){
  var params = jQuery.deparam(window.location.search);
  socket.emit('join',params,function(err){
    if(err){
      alert(err);
      window.location.href = '/';
    }else{
      console.log('no error');
    }

  });
});

socket.on('disconnect',function(){
  console.log('disconnect event');
});

socket.on('newMessage',function(message){

  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{text:message.text,from:message.from,createdAt:formattedTime});
  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(message){
var formattedTime = moment(message.createdAt).format('h:mm a');
var template = jQuery('#location-message-template').html();
var html = Mustache.render(template,{url:message.url,from:message.from,createdAt:formattedTime});
  jQuery('#messages').append(html);
  scrollToBottom();
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
