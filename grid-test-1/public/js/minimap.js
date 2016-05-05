function MiniMap(stage) {
	this.stage = stage;
	this.size = 9;
	this.width = 268;
	this.height = 200;
	this.items;

	this.frames = 0;
}

MiniMap.prototype = {
	init : function() {
		this.socketListeners();
	},
	initPlayer : function(player) {
		this.player = player;
	},
	socketListeners : function() {
		io.on('minimap', this.setMiniMap.bind(this));
		io.on('canvas', this.setMiniMapSize.bind(this));
	},
	setMiniMapSize : function(gridSize, segmentSize) {
		this.scaleWidth = this.size;
		this.scaleHeight = this.size;
		console.log(gridSize, segmentSize);
		console.log(this.scaleWidth, this.scaleHeight);
	},
	setMiniMap : function(items) {
		this.items = items;
	},
	drawLast : function() {
		var coords;

		this.frames++;


		if(!this.items && !this.player)return;
		this.stage.ctx.fillStyle = 'black';
		this.stage.ctx.fillRect(
			this.stage.canvas.width - this.width,
			this.stage.canvas.height - this.height,
			this.width, this.height);	
		this.stage.ctx.fillStyle = 'white';
		for(var i = 0; i < this.items.length; i++){
			coords = this.getItemCoords(this.items[i]);
			this.stage.ctx.fillRect(coords.x, coords.y, coords.w, coords.h);
		}

		coords = this.getItemCoords(this.player.player);
		this.stage.ctx.fillRect(coords.x, coords.y, coords.w, coords.h);
	},
	getItemCoords : function(item) {
		var obj = {
			x : (item.x / this.scaleWidth) + (this.stage.canvas.width - this.width),
			y : (item.y / this.scaleHeight) + (this.stage.canvas.height - this.height),
			w : item.w / this.scaleWidth, 
			h : item.h / this.scaleHeight
		}
		if(obj.w < 1)obj.w = 1;
		if(obj.h < 1)obj.h = 1;
		if(item.id && obj.w < 2)obj.w = 2;
		if(item.id && obj.h < 2)obj.h = 2;

		return obj;
	}
}