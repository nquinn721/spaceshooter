function NPC(manager, x, y, w, h, num) {
	this.grid = manager.grid;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.id = 'npc' + num;
	this.dir = true;
	this.vx = 5;
	this.vy = 5;

	this.frames = 0;
	this.item = manager.createItem(this);
}

NPC.prototype = {
	tick : function() {
		this.x -= this.vx;
		this.y += this.vy;
		

		this.frames++;

		if(this.frames % (50 + Math.round(Math.random() * 100)) === 0)
			this.vx *= -1;
		
		if(this.frames % (50 + Math.round(Math.random() * 100)) === 0)
			this.vy *= -1;

		if(this.x <= 0 || this.x >= this.grid.config.gridSize.width)this.vx *= -1;
		if(this.y <= 0 || this.y >= this.grid.config.gridSize.height)this.vy *= -1;

	}, rand : function() {
		return -1 + (Math.round(Math.random() * 5));
	}
}

module.exports = NPC;