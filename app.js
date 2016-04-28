var express = require('express'),
	app = express(),
	server = require('http').Server(app),
	io = require('socket.io')(server),
	util = require('util'),
	_ = require('underscore');

server.listen(3000);
app.use(express.static('public'));
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});



//Lib
var Player = require('./player'),
	config = require('./config'),
	grid = require('./grid')(io);

var players = [];

io.on('connection', function(socket) {
	console.log("Socket connected", socket.id);

	// Create player and add to collection
	socket.player = new Player(
		socket,
		grid,
		Math.random() * 400,
		Math.random() * 400
	);
	players.push(socket.player);
	socket.player.updateGridLocation();

	socket.on('move', function(dir) {
		socket.player.move(dir);
	});
	socket.on('stopmove', function() {
		socket.player.stopmove();
	});
	socket.on('shoot', function() {
		socket.player.shoot();
	});

	socket.on('disconnect', function() {
		grid.removeItem(socket.player);
	});
})

setInterval(function() {
	for(var i = 0, total = players.length; i < total; i++)
		players[i].tick(io);
	grid.tick();
}, 1000 / 60);