var CONFIG = {
	segmentSize : {
		width : 150,
		height : 150
	},
	gridSize : {
		width : 1200,
		height : 900
	},
	segmentAreas : {
		'3x3SegmentArea' : [
			[[-1,-1],[-1, 0],[-1, 1]],
			[[ 0,-1],[ 0, 0],[ 0, 1]],
			[[ 1,-1],[ 1, 0],[ 1, 1]]
		],
		'8x1SegmentArea' : [
			[[0, -4], [0, -3], [0, -2], [0, -1], [0,0],[0,1], [0,2], [0,3]]
		]
		
	}
}


module.exports = CONFIG;