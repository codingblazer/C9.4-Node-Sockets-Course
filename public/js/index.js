var socket = io();

socket.on('connect',function(){
  console.log('connection event called');
});

socket.on('disconnect',function(){
  console.log('disconnect event');
});

socket.on('newEmail',function(email){
  console.log('Listened about the new received mail',email);
});
