var express = require('express'),
	app = express(),
	server = require('http').Server(app),
	io = require('socket.io')(server),
	util = require('util'),
	port = 3000,
	_ = require('underscore');

server.listen(port, function() {
	console.log('Listening on port', port);
});
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});



//Lib
var Player = require('./player'),
	Wall = require('./wall'),
	config = require('./lib/config'),
	requirejsConfig = require('./requirejs-config'),
	grid = requirejs('grid')(config);

var players = [];
var clientPlayers = [];

for(var i = 0; i < config.gridSize.height; i += config.segmentSize.height)
	var wall = new Wall(grid, 0, i, config.segmentSize.height, 10);
for(var i = 0; i < config.gridSize.width; i += config.segmentSize.width)
	var wall = new Wall(grid, i, 0, 10, config.segmentSize.width);
for(var i = 0; i < config.gridSize.height; i += config.segmentSize.height)
	var wall = new Wall(grid, config.gridSize.width - 10, i, config.segmentSize.height, 10);
for(var i = 0; i < config.gridSize.width; i += config.segmentSize.width)
	var wall = new Wall(grid, i, config.gridSize.height - 10, 10, config.segmentSize.width);
io.on('connection', function(socket) {
	console.log("Socket connected", socket.id);

	socket.emit('canvas', config.gridSize, config.sectionSize);
	socket.emit('grid', grid.getAllSegmentsCoords());

	// Create player and add to collection
	socket.player = new Player(
		socket,
		grid,
		Math.random() * 400,
		Math.random() * 400
	);
	socket.emit('player', socket.player.item.client());
	players.push(socket.player);
	socket.player.init(io);
	// socket.emit('add item', wall.item.client());
	clientPlayers.push(socket.player.item.client());
	io.emit('connected sockets', clientPlayers);

	socket.on('move', function(dir) {
		socket.player.move(dir);
	});
	socket.on('stopmove', function() {
		socket.player.stopmove();
	});

	// socket.on('shoot', function() {
	// 	socket.player.shoot();
	// });

	// socket.on('disconnect', function() {
	// 	grid.removeItem(socket.player);
	// });
})

setInterval(function() {
	for(var i = 0, total = players.length; i < total; i++)
		players[i].tick(io);
}, 1000 / 60);