var http = require('http');
var path = require('path');

var socketio = require('socket.io');
var express = require('express');
var favicon = require('serve-favicon');
var webSocketManager = require("./webSocketManager");

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
router.use(favicon(__dirname + '/favicon.ico'))
var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));

io.on('connection', webSocketManager.socketHandler);

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
