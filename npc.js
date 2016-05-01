function NPC(grid, x, y, w, h, num) {
	this.grid = grid;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.id = 'npc' + num;

	this.item = grid.createItem(this);
}

module.exports = NPC;