var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require ('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
    console.log('User joined the chat!');
    
    socket.on('chat message', function(data) {
        io.emit('chat message', {
            msg: data,
            nickName: socket.nickName
        });
    });
    
    socket.on('disconnect', function () {
        console.log('User left the chat!')
    })
    
    socket.on('new user', function (nickName) {
       socket.nickName = nickName;
       io.emit('new user', nickName); 
    });
});

http.listen(3000, function(){
    console.log('listening on port 3000');
})