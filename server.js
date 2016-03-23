var http = require('http');
var path = require('path');
var morgan = require('morgan');

var socketio = require('socket.io');
var express = require('express');
var bodyParser = require("body-parser");
var favicon = require('serve-favicon');

var webSocketManager = require("./webSocketManager");
var students = require("./chatNode/students");
//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
router.use(morgan('combined'));//log
router.use(favicon(__dirname + '/favicon.ico'));
router.use(bodyParser.json()); // support json encoded bodies
router.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
router.get('/students', students.getStudents);
router.post('/addstudent', students.addStudent);

var server = http.createServer(router);
var io = socketio.listen(server);

router.use(express.static(path.resolve(__dirname, 'client')));

io.on('connection', webSocketManager.socketHandler);

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
