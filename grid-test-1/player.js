var _ = require('underscore');
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
	this.item = manager.createPlayer(this);
	this.angle = -90;
	this.speed = 0;
	this.maxSpeed = 4;
	this.acceleration = 20;
	this.stoppingDistance = 20;
}

Player.prototype = {
	init : function(io) {
		var self = this;
		this.emitSegmentArea(io);
		this.socket.emit('subscribed segments', this.item.getSubscribedSegments());
		this.updateGridLocation();
	},

	areaSegmentOnChange : function(event, item, segment) {
		this.socket.emit(event, item.client());
		this.socket.emit('subscribed segments', this.item.getSubscribedSegments());
	},
	tick : function(io) {
		this.frames++;

		if(this.speed > 0){
			this.move();
			this.updateGridLocation();
		}
		this.emitSegmentArea(io);
	},
	updateGridLocation : function() {
		var gridCoords = this.item.getCurrentSegmentCoords();

		this.gridCoords = gridCoords;
		this.socket.emit('player', this.item.client());
	},
	emitSegmentArea : function() {
		var segments = this.grid.getAllSegmentsInSegmentArea(this.item.getSegment(), this.item.segmentArea),
			items = [];
		segments.forEach(function(segment) {
			items.push(segment.clientItems());
		});
		this.socket.emit('items', _.flatten(items));
	},
	rotate : function(dir) {
		if(dir === 'left')
			this.angle -= 5;
		if(dir === 'right')
			this.angle += 5;

	},
	keydown : function(keyCode) {
		var self = this;
		if(keyCode === 37)
			this.rotate('left');
		if(keyCode === 39)
			this.rotate('right');
		if(keyCode === 38){
			clearInterval(this.slowDown);
			this.slowDown = false;
			if(!this.speedUp){
				this.isMoving = true;	
				this.speedUp = setInterval(function() {
					self.speed += 0.1;

					if(self.speed >= self.maxSpeed){
						self.maxSpeedMet = true;
						clearInterval(self.speedUp);
					}
					
				}, this.acceleration);
				
			}

		}
	},
	keyup : function(keyCode) {
		var self = this;
		if(keyCode === 38){
			clearInterval(this.speedUp);
			this.speedUp = false;
			if(!this.slowDown){

				this.slowDown = setInterval(function() {
					self.speed -= 0.1;
					self.maxSpeedMet = false;

					if(self.speed <= 0){
						self.isMoving = false;	
						clearInterval(self.slowDown)
					}
					
				}, this.stoppingDistance)
			}
		}
	},
	move : function(star) {
			this.x += this.speed * Math.cos(this.angle * Math.PI / 180);
			this.y += this.speed * Math.sin(this.angle * Math.PI / 180);
		// if(this.x + this.w >= this.grid.config.gridSize.width)
		// 	this.x = this.grid.config.gridSize.width - this.w;
		// if(this.x <= 0)
		// 	this.x = 0;
		// if(this.y + this.h >= this.grid.config.gridSize.height)
		// 	this.y = this.grid.config.gridSize.height - this.h;
		// if(this.y <= 0)
		// 	this.y = 0;

		this.item.move(this);
	}
}

module.exports = Player;