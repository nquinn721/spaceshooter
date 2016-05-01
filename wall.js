function Wall(grid, x, y, w, h) {
	this.x = x;
	this.y = y;
	this.h = w;
	this.w = h;
	this.item = grid.createItem(this);
}


Wall.prototype = {

}

module.exports = Wall;