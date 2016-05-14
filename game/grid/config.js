'use strict'

define('grid/config', function() {
	
	var CONFIG = {
		segmentSize : {
			width : 600,
			height : 300
		},
		gridSize : {
			width : 600,
			height : 300
		},
		segmentAreas : {
			'3x3SegmentArea' : [
				[[-1,-1],[-1, 0],[-1, 1]],
				[[ 0,-1],[ 0, 0],[ 0, 1]],
				[[ 1,-1],[ 1, 0],[ 1, 1]]
			]
			
		}
	}


	return CONFIG;
});