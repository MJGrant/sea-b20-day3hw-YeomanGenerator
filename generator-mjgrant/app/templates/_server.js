var express = require('express');
var http = require('http');

var app = express();

app.use(express.static(__dirname));

var server = http.createServer(app);
server.listen(3000, function() {
  console.log('Server runnning on port 3000. Open localhost:3000 in your browser.');
});