/* SERVER CODE */

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var activeUsers = [];

app.use(express.static('public'));
app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.on('user_enter', function(usr){
    activeUsers.push({ name:usr, score:0 });
    io.emit('userlist', activeUsers);
    io.emit('chat_alert', "user", "<strong>" + usr + "</strong> joined the game.");
  });
  socket.on('chat_msg', function(usr, msg){
    io.emit('chat_msg', usr, msg);
  });
  socket.on('chat_alert', function(icn, msg){
    io.emit('chat_alert', icn, msg);
  });
  socket.on('user_change', function(oldName, newName){
    for (var i = 0; i < activeUsers.length; i++) {
      if (activeUsers[i].name == oldName) {
        activeUsers[i].name = newName;
      }
    }
    io.emit('userlist', activeUsers);
    io.emit('chat_alert', 'user', "<strong>" + oldName + "</strong> changed their name to <strong>" + newName + "</strong>.");
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
