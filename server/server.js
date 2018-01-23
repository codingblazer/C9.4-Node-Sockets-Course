const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
const {isRealString} = require('./utils/validation.js');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));




io.on('connection',(socket)=>{
  console.log('The connection event has occured');


  socket.on('join',(params,callback)=>{
    if(!isRealString(params.name) || !isRealString(params.room))
    callback('Name and room name are required');

    socket.join(params.room);
    socket.emit('newMessage',generateMessage('Admin','You are connected. Welcome to the chat room.'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin','New User joined'));
    callback();
  });




  socket.on('createMessage',(message,callback)=>{
    console.log('New email from client to server', message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback();
  });

  socket.on('createLocationMessage',(coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
  });

  socket.on('disconnect',()=>{
    console.log('disconnect event');
  });

});




server.listen(port,()=>{
  console.log('server is up on port :'+port);
});
