'use strict';
define('server/player', ['underscore', 'playerBase', 'box2d/b2vars'], function (_, playerBase, b2vars) {
	
	function Player(socket, manager, x, y) {
		this.id = socket.id;
		this.socket = socket;
		this.frame = 0;
		this.x = x;
		this.y = y;
		this.w = 50;
		this.h = 100;
		this.grid = manager.grid;
		this.type = 'player';
		this.segmentAreaType = '3x3';
		this.bullets = [];
		this.frames = 0;
		this.item = manager.grid.createItem(this);
		this.angle = -90;
		this.speed = 0;
		this.maxSpeed = 4;
		this.acceleration = 20;
		this.stoppingDistance = 20;
		this.server = true;
	}

	Player.prototype = Player.prototype = Object.create(playerBase.prototype, {
		init : {
			value : function(io) {
				var self = this;
				this.emitSegmentArea(io);
				this.socket.emit('subscribed segments', this.item.getSubscribedSegments());
				this.updateGridLocation();
	
			}		
		},

		areaSegmentOnChange : {
			value : function(event, item, segment) {
				this.socket.emit(event, item.client());
				this.socket.emit('subscribed segments', this.item.getSubscribedSegments());
				this.emitSegmentArea();
			}
		},
		tick : {
			value : function(io) {
				this.frames++;
				this.x = this.body.getX();
				this.y = this.body.getY();
				if(this.speed > 0){
					this.move();
					this.updateGridLocation();
				}
			}
		},
		updateGridLocation : {
			value : function() {
				var gridCoords = this.item.getCurrentSegmentCoords();

				this.gridCoords = gridCoords;
				this.socket.emit('player', this.item.client());
			}
		},
		emitSegmentArea : {
			value : function() {
				var segments = this.grid.getAllSegmentsInSegmentArea(this.item.getSegment(), this.item.segmentArea),
					items = [];
				segments.forEach(function(segment) {
					items.push(segment.clientItems());
				});
				this.socket.emit('items', _.flatten(items));
			
			}
		},
		
		
	});
	return Player;
});