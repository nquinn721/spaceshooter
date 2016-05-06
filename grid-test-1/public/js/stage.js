function Stage(canvasEl) {
	// var stage = new createjs.Stage("demoCanvas");
	this.canvas = document.getElementById(canvasEl);
	this.ctx = this.canvas.getContext('2d');

	this.w = this.canvas.width;
	this.h = this.canvas.height;
}

Stage.prototype = {
	initPlayer : function(player) {
		this.player = player;	
	},
	rotate : function(angle, x, y, w, h, cb) {
		this.ctx.save();
		this.ctx.translate(x + (w / 2), y + (h / 2));

		this.ctx.rotate(angle * (Math.PI / 180));
		
		if(cb)cb(-(w / 2), -(h / 2), w, h)
		else this.ctx.fillRect(-(w / 2), -(h / 2), w, h);
		this.ctx.restore();
	},
	drawTranslated : function(cb) {
		if(!this.player)return;
		
		this.ctx.save();
		this.ctx.translate(
			-this.player.player.x + (this.canvas.width / 2), 
			-this.player.player.y + (this.canvas.height / 2));
		cb();

		this.ctx.restore();
	}
}