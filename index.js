var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  io.emit('chat_alert', "user", "User connected.");
  socket.on('chat_msg', function(usr, msg){
    io.emit('chat_msg', usr, msg);
  });
  socket.on('chat_alert', function(icn, msg){
    io.emit('chat_alert', icn, msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
