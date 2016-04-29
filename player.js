var Bullet = require('./bullet');
var _ = require('underscore');
function Player(socket, grid, x, y) {
	this.id = socket.id;
	this.socket = socket;
	this.grid = grid;
	this.speed = 2;
	this.frame = 0;
	this.type = 'player';
	this.bullets = [];
	this.frames = 0;
	this.facingDir = 'right';
	this.item = grid.createItem(this, x, y, 10, 10);
}

Player.prototype = {
	shoot : function() {
		var bullet = new Bullet(this.id, this.bullets.length, this.grid, this.gridNum, this.coords, this.facingDir);
		bullet.init();
		this.bullets.push(bullet);
	},
	tick : function(io) {
		this.frames++;
		if(this.movedir === 'right')
			this.coords.x += this.speed;
		if(this.movedir === 'left')
			this.coords.x -= this.speed;
		if(this.movedir === 'up')
			this.coords.y -= this.speed;
		if(this.movedir === 'down')
			this.coords.y += this.speed;

		for(var i = 0; i < this.bullets.length; i++){
			this.bullets[i].tick();
			if(!this.bullets[i].destroyed){
				console.log(this.bullets[i].client());
				io.in(this.gridName).emit('moved', this.bullets[i].client());
			}
		}

		this.bullets = _.reject(this.bullets, function(bullet){ return bullet.destroyed; });
		if(this.movedir){
			this.updateGridLocation();
			io.in(this.gridName).emit('moved', this.client());
		}
	},
	updateGridLocation : function() {
		var gridCoords = this.item.getSegmentCoords(this.coords);

		if(gridCoords === this.gridCoords)return;
		this.frame++;

		if(this.gridCoords !== undefined)
			this.grid.removeItem(this);

		this.gridCoords = gridCoords;
		this.gridName = 'grid-' + gridCoords.join('-');
		console.log(this.gridName);

		this.socket.join(this.gridName);
		this.grid.addItem(this);
	},
	
	client : function() {
		return {
			id : this.id,
			type : this.type,
			coords : this.coords
		}
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