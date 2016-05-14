'use strict'
require.config({
  // The shim config allows us to configure dependencies for
  // scripts that do not call define() to register a module
  shim: {
    'socketio': {
      exports: 'io'
    },
  },
  paths: {
    jquery: 'js/lib/jquery-2.2.3.min',
    socketio: '/socket.io/socket.io',
  }
});
require([
	'client/io', 
	'client/manager', 
	'client/starfield',
	'client/minimap',
	'client/stage',
	'box2d/b2d'
	], function(io, Manager, Starfield, MiniMap, Stage, b2d) {
	var manager = new Manager('game', Stage);



	manager.initClass(Starfield);
	manager.initClass(MiniMap);
	io.on('player', function(player) {
		manager.init(player);
	});
	io.on('items', function(i) {
		manager.setItems(i);
	});
});