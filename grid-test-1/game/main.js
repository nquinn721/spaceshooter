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
	'box2d/b2d',
	'box2d/character'
	], function(io, Manager, Starfield, MiniMap, Stage, b2d, Character) {
		console.log(Character);
	var manager = new Manager('game', Stage);
	var player = new Character({
		config : {
			body : {
				fixedRotation : true,
				type : 'static',
				density : 150,
				w : 50,
				x : 10,
				h : 50,
			}
		},
		body : [{
			id : 'body',
			y : 300,
		} ,{
			id : 'head',
			y : 50,
		} ,{
			id : 'feet',
			y : 100,
			h : 5
		}],
	});
	manager.initClass(Starfield);
	manager.initClass(MiniMap);
	io.on('player', function(player) {
		manager.init(player);
	});
	io.on('items', function(i) {
		manager.setItems(i);
	});
});