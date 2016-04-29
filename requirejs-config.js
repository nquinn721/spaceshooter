var path = require('path');

global.requirejs = require('requirejs')
global.define = require('amdefine')(module);

requirejs.config({
    nodeRequire: require,
    baseUrl: path.join(__dirname, 'lib')
});

var config = {
	segmentSize : {
		width : 100,
		height : 100
	},
	gridSize : {
		width : 800,
		height : 800
	},
	segmentAreas : {
		playerSegmentArea : [
			[[-1,-1],[-1, 0],[-1, 1]],
			[[ 0,-1],[ 0, 0],[ 0, 1]],
			[[ 1,-1],[ 1, 0],[ 1, 1]]
		]
		
	}
}
module.exports = config;