var Bullet = require('./bullet');
var _ = require('underscore');
function Player(socket, grid, x, y) {
	this.id = socket.id;
	this.socket = socket;
	this.grid = grid;
	this.coords = {
		x : x, 
		y : y,
		w : 10,
		h : 10
	};
	this.speed = 1;
	this.frame = 0;
	this.type = 'player';
	this.bullets = [];
	this.frames = 0;
	this.facingDir = 'right';
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
		var gridNum = this.getGrid();

		if(gridNum === this.gridNum)return;
		this.frame++;

		if(this.gridNum !== undefined)
			this.grid.removeItem(this);

		this.gridName = 'grid' + gridNum;
		this.gridNum = gridNum;

		this.socket.join(this.gridName);
		this.grid.addItem(this);
	},
	getGrid : function() {
		var num;
		if(this.coords.x < 200 && this.coords.y < 200)
			num = 0;
		if(this.coords.x > 200 && this.coords.y < 200)
			num = 1;
		if(this.coords.x < 200 && this.coords.y > 200)
			num = 2;
		if(this.coords.x > 200 && this.coords.y > 200)
			num = 3;

		return num;
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