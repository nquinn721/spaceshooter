var Bullet = require('./bullet');
var _ = require('underscore');
function Player(socket, grid, x, y) {
	this.id = socket.id;
	this.socket = socket;
	this.grid = grid;
	this.speed = 2;
	this.frame = 0;
	this.x = x;
	this.y = y;
	this.w = 10;
	this.h = 10;
	this.type = 'player';
	this.segmentAreaType = '3x3';
	this.bullets = [];
	this.frames = 0;
	this.facingDir = 'right';
	this.item = grid.createItem(this);
}

Player.prototype = {
	init : function(io) {
		var self = this;
		this.updateGridLocation(io);
		this.item.subscribeToArea();

		// this.grid.subscribeSegmentArea(this.item.getSegment(), 
									  // this.item.segmentArea, this.id, this.areaSegmentOnChange.bind(this));
	},
	shoot : function() {
		var bullet = new Bullet(this.id, this.bullets.length, this.grid, this.gridNum, this.coords, this.facingDir);
		bullet.init();
		this.bullets.push(bullet);
	},
	areaSegmentOnChange : function(event, item, segment) {
		this.socket.emit(event, item.client());
	},
	tick : function(io) {
		this.frames++;
		if(this.movedir === 'right')
			this.x += this.speed;
		if(this.movedir === 'left')
			this.x -= this.speed;
		if(this.movedir === 'up')
			this.y -= this.speed;
		if(this.movedir === 'down')
			this.y += this.speed;

		// for(var i = 0; i < this.bullets.length; i++){
		// 	this.bullets[i].tick();
		// 	if(!this.bullets[i].destroyed){
		// 		io.in(this.gridName).emit('moved', this.bullets[i].client());
		// 	}
		// }

		// this.bullets = _.reject(this.bullets, function(bullet){ return bullet.destroyed; });
		if(this.movedir){
			this.item.move(this);
			this.updateGridLocation(io);
			// io.in(this.gridName).emit('moved', this.item.client());
		}
		if(this.udpatedSegment){
			this.udpatedSegment = false;
			// this.emitToRoom(io);
			this.emitSegmentArea(io);
		}
	},
	updateGridLocation : function(io) {
		var gridCoords = this.item.getCurrentSegmentCoords();

		if(this.gridCoords && this.gridCoords[0] === gridCoords[0] && this.gridCoords[1] === gridCoords[1]){
			return;
		}

		if(!this.gridCoords)this.gridCoords = gridCoords;

		this.emitToRoom(io);
		this.socket.leave(this.gridName);
		this.gridCoords = gridCoords;
		this.gridName = 'grid-' + gridCoords.join('-');
		this.socket.join(this.gridName);
		this.udpatedSegment = true;
	},
	emitToRoom : function(io) {
		var segment = this.grid.getSegment(this.gridCoords[0], this.gridCoords[1]);
		io.in(this.gridName).emit('items', segment.clientItems());
	},
	emitSegment : function(segment) {
		this.socket.emit('segment items', segment.clientItems());	
	},
	emitSegmentArea : function() {
		var segments = this.grid.getAllSegmentsInSegmentArea(this.item.getSegment(), this.item.segmentArea),
			items = [];
		segments.forEach(function(segment) {
			items.push(segment.clientItems());
		});
		this.socket.emit('items', _.flatten(items));
	},
	move : function(dir) {
		this.movedir = dir;
		this.facingDir = dir;
	},
	stopmove : function() {
		this.movedir = false;
	}
}

module.exports = Player;