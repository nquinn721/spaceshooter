function Bullet(playerId, bulletId, grid, gridNum, coords, dir) {
	this.owner = 'bullet' + playerId;
	this.id = 'bullet' + bulletId;
	this.type = 'bullet';
	this.speed = 5;
	this.dir = dir;
	this.grid = grid;
	this.gridNum = gridNum;
	this.gridName = 'grid' + gridNum;
	this.coords = {
		x : coords.x + (coords.w / 2 - 1),
		y : coords.y + (coords.h / 2 - 1),
		w : 2,
		h : 2
	},

	this.gridDimensions = grid.getDimension(gridNum);
}

Bullet.prototype = {
	init : function() {
		this.grid.addItem(this);	
	},
	remove : function() {
		this.destroyed = true;
		this.grid.removeItem(this);
	},
	leftGrid : function() {
		if(this.coords.x < this.gridDimensions.left || this.coords.x > this.gridDimensions.right || this.coords.y < this.gridDimensions.top || this.coords.y > this.gridDimensions.bottom)
			return true	
	},

	tick : function() {
		if(this.dir === 'left')
			this.coords.x -= this.speed;
		if(this.dir === 'right')
			this.coords.x += this.speed;
		if(this.dir === 'up')
			this.coords.y -= this.speed;
		if(this.dir === 'down')
			this.coords.y += this.speed;

		if(this.leftGrid())
			this.remove();
	},
	client : function() {
		return {
			id : this.id,
			type : this.type,
			owner : this.id,
			coords : this.coords
		}
	}
}

module.exports = Bullet;