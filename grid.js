function Grid(io) {
	this.grid = [
		[],[],
		[],[]
	];

	this.io = io;
	this.frames = 0;
}

Grid.prototype = {
	// Add/Remove
	add : function(num, item) {
		this.grid[num].push(item);
		this.updateRoom(item);
	},
	addItem : function(item) {
		this.add(item.gridNum, item);
	},
	remove : function(num, item) {
		this.grid[num].splice(this.grid[num].indexOf(item), 1);
		this.updateRoom(item);
	},
	removeItem : function(item) {
		this.remove(item.gridNum, item);
	},
	updateItem : function(item) {
		this.removeItem(item);
		this.addItem(item);
	},
	// End Add/Remove

	updateRoom : function(item) {
		var itemObjects = this.get(item.gridNum, true);
		this.io.in(item.gridName).emit('items', itemObjects);
	},
	// Could be heavy
	updateAllRooms : function() {
		for(var i = 0, total = this.grid.length; i < total; i++)
			this.io.in('grid' + i).emit(this.get(i, true));
	},
	find : function(id) {
		for(var i = 0; i < this.grid.length; i++)
			for(var j = 0; j < this.grid[i].length; j++)
				if(this.grid[i][j].id === id)return {num : j, item : this.grid[i][j]};
	},
	getDimension : function(num) {
		if(num === 0)
			return {
				left : 0,
				right : 200,
				top : 0,
				bottom : 200
			}	
		if(num === 1)
			return {
				left : 200,
				right : 400,
				top : 0,
				bottom : 200
			}
		if(num === 2)
			return {
				left : 0,
				right : 200,
				top : 200,
				bottom: 400
			}
		if(num === 3)
			return {
				left : 200,
				top : 200,
				right : 400,
				bottom : 400
			}
	},
	get : function(num, clientObj) {
		var objs = [],
			grid = this.grid[num];

		if(clientObj){
			grid.forEach(function(item) {
				objs.push(item.client());
			});
			return objs;
		}
		return grid;
	},
	tick : function() {
		this.frames++;

		if(this.frames % 20)
			this.updateAllRooms();
	}
}

module.exports = function(io) {
	return new Grid(io);
}