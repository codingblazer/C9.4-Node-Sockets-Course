var socket = io();

socket.on('connect',function(){
  console.log('connection event called');

  socket.emit('createMessage',{
    to: 'jennifer',
    text: 'Hi i am text'
  });

});

socket.on('disconnect',function(){
  console.log('disconnect event');
});

socket.on('newMessage',function(message){
  console.log('Listened about the new received message',message);
});
