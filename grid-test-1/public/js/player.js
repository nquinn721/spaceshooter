function Player(player, stage) {
	this.player = player;
	this.stage = stage;
	this.x = stage.canvas.width / 2;
	this.y = stage.canvas.height / 2;
	this.w = 50;
	this.h = 100;
	this.isMoving = false;
	this.angle = 0;
	this.speed = 0;
	this.maxSpeed = 4;
	this.acceleration = 20;
	this.stoppingDistance = 20;

}

Player.prototype = {
	initClient : function() {
		this.client = true;
		this.sprite = document.getElementById('player');
	},
	update : function(player) {
		this.player = player;
	},
	rotate : function(dir) {
		if(dir === 'left')
			this.angle -= 5;
		if(dir === 'right')
			this.angle += 5;
	},
	keydown : function(e) {
		var self = this;
		if(e.keyCode === 37)
			this.rotate('left');
		
		if(e.keyCode === 39)
			this.rotate('right');
		
		if(e.keyCode === 38){
			clearInterval(this.slowDown);
			this.slowDown = false;
			if(!this.speedUp){
				this.isMoving = true;	
				this.speedUp = setInterval(function() {
					self.speed += 0.1;

					if(self.speed >= self.maxSpeed){
						self.maxSpeedMet = true;
						clearInterval(self.speedUp);
					}
					
				}, this.acceleration);
				
			}

		}

		if(this.client)
			io.emit('keydown', e.keyCode);

	},
	resize : function() {
		this.x = this.stage.canvas.width / 2;
		this.y = this.stage.canvas.height / 2;	
	},
	keyup : function(e) {
		var self = this;
		if(e.keyCode === 38){
			clearInterval(this.speedUp);
			this.speedUp = false;
			if(!this.slowDown){

				this.slowDown = setInterval(function() {
					self.speed -= 0.1;
					self.maxSpeedMet = false;

					if(self.speed <= 0){
						self.isMoving = false;	
						clearInterval(self.slowDown)
					}
					
				}, this.stoppingDistance)
			}
		}

		if(this.client)
			io.emit('keyup', e.keyCode);
	},

	draw : function () {
		var self = this;
		self.stage.ctx.fillStyle = 'white';
		self.stage.ctx.fillRect(this.x, this.y, this.player.w, this.player.h);
		this.stage.rotate(this.angle, this.x, this.y, this.w, this.h, function (x,y,w,h) {
			self.stage.ctx.drawImage(self.sprite, x, y,w,h);
		});

	}
}

