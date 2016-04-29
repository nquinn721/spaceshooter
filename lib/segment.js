'use strict';

define('segment', function() {

	function Segment(config) {
		this.row = config.row;
		this.col = config.col;
		this.x = config.x;
		this.y = config.y;
		this.w = config.w;
		this.h = config.h;		
		this.items = [];
	}
	
	Segment.prototype = {
		add : function (item) {
			this.items.push(item);
		},
		remove : function(item) {
			this.items.splice(this.items.indexOf(item), 1);
		},
		totalItems : function() {
			return this.items.length;
		},
		getItem : function(id) {
			for(var i = 0; i < this.items.length; i++)
				if(this.items[i].id === id)return items[i];
		},
		getItemsClient : function () {
			var clientObjects = [];
			for(var i = 0; i < this.items.length; i++)
				clientObjects.push(this.items[i].client());
			return clientObjects;
		},
		hasItem : function(item) {
			if(typeof item === 'string')
				item = this.getItem(item);
			return this.items.indexOf(item) > -1;
		}
	}

	return Segment;	
});