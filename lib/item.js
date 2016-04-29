'use strict';

define('item', function() {
	
	function Item(grid, segmentArea, item, segment) {
		this.grid = grid;
		this.segmentArea = segmentArea;
		this.item = item;
		this.segment = segment;

		// Original Creation
		this.originalX = item.x;
		this.originalY = item.y;
		this.originalRow = segment.row;
		this.originalCol = segment.col;

		// Defaults
		this.speed = 5;
	}

	Item.prototype = {
		leftOriginalSegmentArea : function() {
			var dims = this.grid.getSegmentAreaDimensions(this.segment, this.segmentArea);
			if(	this.item.x <= dims.x || 
				this.item.x >= dims.x + dims.w ||
				this.item.y <= dims.y ||
				this.item.y >= dims.y + dims.h)
				return true;
			return false;
		},
		updateX : function(x) {
			this.item.x = x;
			this.row = this.grid.getSegmentFromCoords(x, this.item.y);
		},
		udpateY : function(y) {
			this.item.y = y;
			this.col = this.grid.getSegmentFromCoords(this.item.x, y);
		},
		incrementXBySpeed : function(times) {
			this.updateX(this.item.x + ((this.item.speed || this.speed) * (times || 1)));
		},
		decrementXBySpeed : function(times) {
			this.updateX(this.item.x - ((this.item.speed || this.speed) * (times || 1)));
		},
		incrementYBySpeed : function(times) {
			this.udpateY(this.item.y + ((this.item.speed || this.speed) * (times || 1)));
		},
		decrementYBySpeed : function(times) {
			this.udpateY(this.item.y - ((this.item.speed || this.speed) * (times || 1)));
		},
		getX : function() {
			return this.item.x;
		},
		getY : function() {
			return this.item.y;
		}
	}

	return Item;
});