'use strict'
define('client/io', ['socketio'], function(io) {
	var io = io.connect();

	return io;
});