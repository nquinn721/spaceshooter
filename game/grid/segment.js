'use strict';

define('grid/segment', ['base'], function(BaseClass) {

	function Segment(config) {
		BaseClass.apply(this);
		this.row = config.row;
		this.col = config.col;
		this.x = config.x;
		this.y = config.y;
		this.w = config.w;
		this.h = config.h;		
		this.items = [];
		this.listeners = [];
		this.subscribers = {};
		this.frames = 0;
	}
	
	Segment.prototype = Object.create(BaseClass.prototype, {
		add : {
			value : function (item) {
				this.items.push(item);
				this.emit('add item', item);
			}
		},
		remove : {
			value : function(item) {
				this.items.splice(this.items.indexOf(item), 1);
				this.emit('remove item', item);
			}
		},
		move : {
			value : function(item) {
				this.checkCollision(item);
				this.emit('moved', item);	
			}
		},
		
		subscribe : {
			value : function(id, cb) {
				this.subscribers[id] = cb;
			}
		},
		unsubscribe : {
			value : function(id) {
				delete this.subscribers[id];
			}
		},
		totalItems : {
			value : function() {
				return this.items.length;
			}
		},
		getItem : {
			value : function(id) {
				for(var i = 0; i < this.items.length; i++)
					if(this.items[i].id === id)return items[i];
			}
		},
		getItemsClient : {
			value : function () {
				var clientObjects = [];
				for(var i = 0; i < this.items.length; i++)
					clientObjects.push(this.items[i].client());
				return clientObjects;
			}
		},
		hasItem : {
			value : function(item) {
				if(typeof item === 'string')
					item = this.getItem(item);
				return this.items.indexOf(item) > -1;
			}
		},
		clientItems : {
			value : function() {
				var arr = [];
				for(var i = 0; i < this.items.length; i++){
					if(this.items[i].client)
						arr.push(this.items[i].client());
				}
				return arr;
			}
		},
		client : {
			value : function() {
				return {
					row : this.row,
					col : this.col,
					x : this.x,
					y : this.y,
					w : this.w,
					h : this.h
				}	
			}
		},
		
	});

	return Segment;	
});