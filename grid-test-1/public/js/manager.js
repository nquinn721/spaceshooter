function Manager(canvasEl) {
	this.stage = new Stage(canvasEl);

	this.classes = [];
	this.items;
	this.player;
	this.frames = 0;

	this.playerSprite = document.getElementById('player');
	
}

Manager.prototype = {
	init : function(player) {
		if(!this.player){
			this.player = new Player(player, this.stage);
			this.player.initClient();
			this.classes.push(this.player);
			this.draw();
			this.windowResize();
			this.setupEvents();
			this.initClasses();
			this.stage.initPlayer(this.player);
		}else{
			this.player.update(player);
		}
	},
	setItems : function(items) {
		this.items = items;	
		if(this.frames % 500 === 0){
			console.log(this.items);
		}
		this.frames++;
	},
	
	setupEvents : function() {
		$(document).on('keydown', this.keydown.bind(this))
				   .on('keyup', this.keyup.bind(this));
	},
	keydown : function(e) {
		for(var i = 0; i < this.classes.length; i++)
			this.classes[i].keydown && this.classes[i].keydown(e);
	},
	keyup : function(e) {
		for(var i = 0; i < this.classes.length; i++)
			this.classes[i].keyup && this.classes[i].keyup(e);
	},
	initClasses : function() {
		var cl;
		for(var i = 0; i < this.classes.length; i++){
			cl = this.classes[i];
			cl.initPlayer && cl.initPlayer(this.player);
		}
	},
	initClass : function(cl) {
		cl = new cl(this.stage);
		cl.init && cl.init();
		this.classes.push(cl);

	},
	draw : function () {
		var self = this;
		this.stage.ctx.clearRect(0,0, this.stage.canvas.width, this.stage.canvas.height);

		for(var i = 0; i < this.classes.length; i++)
			this.classes[i].draw && this.classes[i].draw(this.player);

		if(this.items){
			// this.stage.ctx.save();
			// this.stage.ctx.translate(-this.player.player.x + (this.stage.canvas.width / 2), -this.player.player.y + (this.stage.canvas.height / 2));
			this.stage.drawTranslated(function() {
				for(var i = 0; i < self.items.length; i++){
					self.drawWall(self.items[i]);
					self.drawPlayer(self.items[i]);
				}
				
			});

			// this.stage.ctx.restore();
		}

		for(var i = 0; i < this.classes.length; i++)
			this.classes[i].drawLast && this.classes[i].drawLast(this.player);

		requestAnimationFrame(this.draw.bind(this));
	},
	drawWall : function(item) {
		if(!item.id){
			this.stage.ctx.fillStyle = 'white';
			if(item.hit)
				this.stage.ctx.fillStyle = 'red';
			this.stage.ctx.fillRect(item.x, item.y, item.w, item.h);	
		}
	},
	drawPlayer : function(item) {
		var self = this;
		if(item.id && item.id !== this.player.player.id){
			this.stage.rotate(item.angle, item.x, item.y, item.w, item.h, function (x,y,w,h) {
				self.stage.ctx.drawImage(self.playerSprite, x, y,w,h);
			});
		}
	},
	windowResize : function() {
		var self = this;
		$(window).resize(function() {
			setCanvasSize();
			setTimeout(function() {
				for(var i = 0; i < self.classes.length; i++)
					self.classes[i].resize && self.classes[i].resize();
			}, 0);
		});

	}
}