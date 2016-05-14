'use strict';
define('box2d/b2d', function() {
	var canvas = document.getElementById('game'),
		ctx = canvas.getContext('2d');
	var SCALE = 30, world;

	var debug = document.getElementById('debug');



	var keyCodes = {
		 87 : 'w',
		 68 : 'd',
		 83 : 's',
		 65 : 'a',
		 69 : 'e',
		 81 : 'q',
		 70 : 'f',
		 90 : 'z',
		 88 : 'x',
		 71 : 'g',
		 38 : 'up',
		 39 : 'right',
		 40 : 'down',
		 37 : 'left',
		 32 : 'space',
		 13 : 'enter',
		 18 : 'shift',
		 16 : 'ctrl'

	}
	
});

