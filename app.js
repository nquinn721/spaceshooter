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
app.use(express.static(__dirname + '/game'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.get('/webgl', function(req, res) {
	res.sendFile(__dirname + '/webgltest.html');
});



//Lib
var requirejsConfig = require('./requirejs-config');
var World = requirejs('box2d/world'),
	world = new World;

var	Player = requirejs('server/player'),
	config = requirejs('grid/config'),
	Wall = requirejs('server/wall'),
	manager = requirejs('server/manager')(config);
	
world.init();
var wall;
// for(var i = 0; i < config.gridSize.height; i += config.segmentSize.height){
// 	wall = new Wall(manager.grid, 0, i, config.segmentSize.height, 10);
// }
// for(var i = 0; i < config.gridSize.width; i += config.segmentSize.width){
// 	wall = new Wall(manager.grid, i, 0, 10, config.segmentSize.width);
// }
// for(var i = 0; i < config.gridSize.height; i += config.segmentSize.height){
// 	wall = new Wall(manager.grid, config.gridSize.width - 10, i, config.segmentSize.height, 10);
// }
// for(var i = 0; i < config.gridSize.width; i += config.segmentSize.width){
// 	wall = new Wall(manager.grid, i, config.gridSize.height - 10, 10, config.segmentSize.width);
// }

io.on('connection', function(socket) {
	console.log("Socket connected", socket.id);

	socket.emit('canvas', config.gridSize, config.segmentSize);

	// Create player and add to collection
	socket.player = manager.createItem('player', new Player(
		socket,
		manager,
		Math.random() * config.gridSize.width,
		Math.random() * config.gridSize.height
	));
	console.log(socket.player.item.client());
	socket.emit('player', socket.player.item.client());
	socket.player.init(io);

	socket.on('keydown', function(keyCode) {
		socket.player.keydown(keyCode);
	});
	socket.on('keyup', function(keyCode) {
		socket.player.keyup(keyCode);
	});
	// socket.on('stopmove', function() {
	// 	socket.player.stopmove();
	// });
	// socket.on('phone', function (e) {
	// 	socket.player.phoneMove(e);
	// });

	socket.on('disconnect', function() {
		manager.removePlayer(socket.player);
	});
})
setInterval(function() {
	manager.tick();
	// io.emit('minimap', minimap, manager.getPlayersClient());
}, 1000 / 60);


