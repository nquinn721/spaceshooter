'use strict'

define('lib/config', function() {
	
	var CONFIG = {
		segmentSize : {
			width : 1200,
			height : 900
		},
		gridSize : {
			width : 2400,
			height : 1800
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