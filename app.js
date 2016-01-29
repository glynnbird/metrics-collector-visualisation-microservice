var fs = require('fs');
var cfenv = require('cfenv');
var queue_types = fs.readdirSync("./plugins/hub/").map(function(v) { return v.replace(".js","")});
var queue_type = "null";
var writer = require('./lib/writer.js');
if (queue_types.indexOf(process.env.QUEUE_TYPE) > -1) {
  queue_type = process.env.QUEUE_TYPE;
}
console.log("Queue mode:", queue_type);
var q = require('./plugins/hub/' + queue_type);

q.collect();

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var appEnv = cfenv.getAppEnv();
console.log("App starting on",appEnv.url);
server.listen(appEnv.port);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
  writer.listen().on('news', function(data) {
    socket.emit('news', data); 
  });
});

//require("cf-deployment-tracker-client").track();

